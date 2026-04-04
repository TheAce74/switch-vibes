import type { AxiosResponse } from "axios";
import { axiosInstance } from "#/lib/axios";
import type {
  SpotifyToYTPayload,
  SpotifyToYTRestPlaylistMigration,
  YTToSpotifyPayload,
  YTToSpotifyRestPlaylistMigration,
} from "#/types/server";

// POST requests
export const migrateYTToSpotify = async (
  body: YTToSpotifyPayload,
): Promise<AxiosResponse<YTToSpotifyRestPlaylistMigration>> => {
  return await axiosInstance.post<YTToSpotifyRestPlaylistMigration>(
    "/yt_to_spotify/",
    body,
  );
};

export const migrateSpotifyToYT = async (
  body: SpotifyToYTPayload,
): Promise<AxiosResponse<SpotifyToYTRestPlaylistMigration>> => {
  return await axiosInstance.post<SpotifyToYTRestPlaylistMigration>(
    "/spotify_to_yt/",
    body,
  );
};
