import { useMutation } from "@tanstack/react-query";
import { migrateSpotifyToYT } from "#/services/migration";
import type {
  ErrorResponse,
  SpotifyToYTRestPlaylistMigration,
} from "#/types/server";

export function useMigrateSpotifyToYT(
  onSuccess: (data: SpotifyToYTRestPlaylistMigration) => void,
  onError: (err: ErrorResponse) => void,
) {
  return useMutation({
    mutationFn: migrateSpotifyToYT,
    onSuccess: (res) => {
      onSuccess(res.data);
    },
    onError: (err: ErrorResponse) => {
      onError(err);
    },
  });
}
