// generic
export type Track<T = unknown> = {
  title: string;
  artists: string[];
  year: number;
  duration_seconds: number;
  video: boolean;
  flag: boolean;
} & T;

export type SpotifyTrack = Track<{
  uri: string;
}>;

export type YTTrack = Track<{
  yt_id: string;
  yt_url: string;
}>;

export type YTToSpotifyPayload = {
  yt_playlist_url: string;
};

export type SpotifyToYTPayload = {
  spotify_playlist_url: string;
};

export type PlaylistMigration<T> = {
  link: string;
  flagged: Pick<Track, "title" | "artists">[];
} & T;

// errors
export type ErrorResponse = {
  detail: string;
  code: number;
};

// sockets
export type ServerMessage<T = unknown> = {
  message: string;
} & T;

export type TracksSearchMessage = ServerMessage;

export type TrackNotFoundMessage = ServerMessage<{ track: null }>;

export type TracksSearchDoneMessage = ServerMessage;

// yt to spotify
export type YTSourceTrackFoundMessage = ServerMessage<{
  track: Omit<YTTrack, "flag">;
}>;

export type SpotifyDestinationTrackFoundMessage = ServerMessage<{
  track: Omit<SpotifyTrack, "video">;
}>;

export type YTToSpotifySocketsPlaylistMigration = PlaylistMigration<{
  playlist: Omit<SpotifyTrack, "video">[];
  nulls: Pick<Track, "title" | "artists">[];
}>;

// spotify to yt
export type SpotifySourceTrackFoundMessage = ServerMessage<{
  track: Omit<SpotifyTrack, "flag">;
}>;

export type YTDestinationTrackFoundMessage = ServerMessage<{
  track: Omit<YTTrack, "year" | "video">;
}>;

export type SpotifyToYTSocketsPlaylistMigration = PlaylistMigration<{
  playlist: Omit<YTTrack, "year" | "video">[];
  nulls: {
    title: string;
    artists: { name: string }[];
  }[];
}>;

// REST
export type YTToSpotifyRestPlaylistMigration = PlaylistMigration<{
  spotify_playlist: Omit<SpotifyTrack, "video">[];
  nulls: Pick<Track, "title" | "artists">[];
}>;

export type SpotifyToYTRestPlaylistMigration = PlaylistMigration<{
  yt_playlist: Omit<YTTrack, "year" | "video">[];
  nulls: {
    title: string;
    artists: { name: string }[];
  }[];
}>;
