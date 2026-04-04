import { useMutation } from "@tanstack/react-query";
import { migrateYTToSpotify } from "#/services/migration";
import type {
  ErrorResponse,
  YTToSpotifyRestPlaylistMigration,
} from "#/types/server";

export function useMigrateYTToSpotify(
  onSuccess: (data: YTToSpotifyRestPlaylistMigration) => void,
  onError: (err: ErrorResponse) => void,
) {
  return useMutation({
    mutationFn: migrateYTToSpotify,
    onSuccess: (res) => {
      onSuccess(res.data);
    },
    onError: (err: ErrorResponse) => {
      onError(err);
    },
  });
}
