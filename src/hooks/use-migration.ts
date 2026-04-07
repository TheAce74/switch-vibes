import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMigrateSpotifyToYT } from "#/hooks/use-migrate-spotify-to-yt";
import { useMigrateYTToSpotify } from "#/hooks/use-migrate-yt-to-spotify";
import { ENV } from "#/lib/schema";
import { requestNotificationPermission, sendLocalNotification } from "#/lib/notifications";
import { logger } from "#/lib/utils";
import type { Platform } from "#/types/client";
import type {
  ErrorResponse,
  PlaylistMigration,
  SpotifyDestinationTrackFoundMessage,
  SpotifySourceTrackFoundMessage,
  SpotifyToYTSocketsPlaylistMigration,
  Track,
  TrackNotFoundMessage,
  TracksSearchDoneMessage,
  TracksSearchMessage,
  YTDestinationTrackFoundMessage,
  YTSourceTrackFoundMessage,
  YTToSpotifySocketsPlaylistMigration,
} from "#/types/server";

export type MigrationStatus =
  | "idle"
  | "connecting"
  | "transferring"
  | "success"
  | "error";

export type MigrationType = "yt_to_spotify" | "spotify_to_yt";

type SocketMessage =
  | TracksSearchMessage
  | YTSourceTrackFoundMessage
  | TrackNotFoundMessage
  | TracksSearchDoneMessage
  | SpotifyDestinationTrackFoundMessage
  | YTToSpotifySocketsPlaylistMigration
  | SpotifySourceTrackFoundMessage
  | YTDestinationTrackFoundMessage
  | SpotifyToYTSocketsPlaylistMigration
  | ErrorResponse;

export function useMigration(
  sourcePlatform: Platform,
  targetPlatform: Platform | null,
) {
  const [status, setStatus] = useState<MigrationStatus>("idle");
  // Seems redundant but had to be done because of how useState works
  // It helps ensure that the sockets init and connect don't use a stale state
  const statusRef = useRef<MigrationStatus>("idle");

  const [tracks, setTracks] = useState<Partial<Track<unknown>>[]>([]);
  const [message, setMessage] = useState<string>("");
  const [finalResult, setFinalResult] =
    useState<PlaylistMigration<unknown> | null>(null);

  const socketRef = useRef<WebSocket | null>(null);

  const migrationType: MigrationType | null =
    sourcePlatform === "youtube-music" && targetPlatform === "spotify"
      ? "yt_to_spotify"
      : sourcePlatform === "spotify" && targetPlatform === "youtube-music"
        ? "spotify_to_yt"
        : null;

  const updateStatus = useCallback((newStatus: MigrationStatus) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  }, []);

  // REST Fallback Mutations
  const ytToSpotifyMut = useMigrateYTToSpotify(
    (data) => {
      setFinalResult(data);
      setTracks(data.spotify_playlist);
      updateStatus("success");
      sendLocalNotification(
        "Migration Complete! 🎉",
        "Successfully migrated to Spotify (via Channel 2)."
      );
    },
    (err) => {
      toast.error(err.detail || "Migration Failed");
      updateStatus("error");
      sendLocalNotification(
        "Migration Failed ❌",
        err.detail || "Something went wrong during migration."
      );
    },
  );

  const spotifyToYTMut = useMigrateSpotifyToYT(
    (data) => {
      setFinalResult(data);
      setTracks(data.yt_playlist);
      updateStatus("success");
      sendLocalNotification(
        "Migration Complete! 🎉",
        "Successfully migrated to YouTube Music (via Channel 2)."
      );
    },
    (err) => {
      toast.error(err.detail || "Migration Failed");
      updateStatus("error");
      sendLocalNotification(
        "Migration Failed ❌",
        err.detail || "Something went wrong during migration."
      );
    },
  );

  const startRestFallback = (payload: {
    yt_playlist_url?: string;
    spotify_playlist_url?: string;
  }) => {
    logger("Sockets unavailable, falling back to REST...");
    setMessage("Channel 1 unavailable, switching to Channel 2...");
    if (migrationType === "yt_to_spotify" && payload.yt_playlist_url) {
      ytToSpotifyMut.mutate({ yt_playlist_url: payload.yt_playlist_url });
    } else if (
      migrationType === "spotify_to_yt" &&
      payload.spotify_playlist_url
    ) {
      spotifyToYTMut.mutate({
        spotify_playlist_url: payload.spotify_playlist_url,
      });
    }
  };

  const resetState = useCallback(() => {
    updateStatus("idle");
    setTracks([]);
    setMessage("");
    setFinalResult(null);
  }, [updateStatus]);

  const startMigration = async (sourceUrl: string) => {
    // Request permission during user gesture
    await requestNotificationPermission();

    if (!migrationType || !targetPlatform) {
      toast.error("Invalid migration path selected.");
      return;
    }

    const payload =
      migrationType === "yt_to_spotify"
        ? { yt_playlist_url: sourceUrl }
        : { spotify_playlist_url: sourceUrl };

    updateStatus("connecting");
    setMessage("Connecting to migration server...");

    const wsUrl = `${ENV.VITE_APP_SOCKETS_BASE_URL}/ws/${migrationType}/`;
    const socket = new WebSocket(wsUrl);

    socketRef.current = socket;

    socket.onopen = () => {
      updateStatus("transferring");
      setMessage("Connection established. Starting migration...");
      socket.send(JSON.stringify(payload));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as SocketMessage;

        // Success state
        if ("playlist" in data) {
          setFinalResult(data);
          setTracks(data.playlist);
          updateStatus("success");
          sendLocalNotification(
            "Migration Complete! 🎉",
            `Successfully migrated to ${targetPlatform === "spotify" ? "Spotify" : "YouTube Music"}.`
          );
          socket.close();
          return;
        }

        // Track state
        // check track data: if track data is present and comes from destination, display it else don't do anything
        if ("track" in data) {
          if (!data.track) {
            return;
          } else {
            if (migrationType === "yt_to_spotify" && "uri" in data.track) {
              setTracks((prev) => [...prev, data.track]);
            } else if (
              migrationType === "spotify_to_yt" &&
              "yt_url" in data.track
            ) {
              setTracks((prev) => [...prev, data.track]);
            }
          }
        }

        // General message
        if ("message" in data) {
          setMessage(data.message);
        }

        // Error message
        if ("detail" in data && "code" in data) {
          toast.error(data.detail);
          updateStatus("error");
          sendLocalNotification("Migration Failed ❌", data.detail);
          socket.close();
        }
      } catch (err) {
        logger("Error parsing socket message", err);
      }
    };

    socket.onerror = (err) => {
      logger("Socket error", err);
      // Only an actual error if not already "success" or "connecting"
      // if still in "connecting" state, the connection failed before the playlist transfer, it wouldn't make sense to show the generic error screen
      // instead, we close the connection and let the onclose handler handle the fallback
      if (
        statusRef.current !== "success" &&
        statusRef.current !== "connecting"
      ) {
        toast.error("Migration channel interrupted.");
        updateStatus("error");
      }
      socket.close();
    };

    socket.onclose = (event) => {
      if (!event.wasClean && statusRef.current !== "success") {
        logger("Socket closed unexpectedly", event);
        startRestFallback(payload);
      }
    };
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return {
    status,
    tracks,
    message,
    finalResult,
    startMigration,
    resetState,
  };
}
