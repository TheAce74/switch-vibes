import AppleMusicLogo from "#/assets/apple-music.svg?url";
import SpotifyLogo from "#/assets/spotify.svg?url";
import YTMusicLogo from "#/assets/ytmusic.svg?url";
import type { Platform } from "#/types/client";

export const PLATFORMS = ["spotify", "youtube-music", "apple-music"] as const;

export const PLATFORM_META: Record<
  Platform,
  { label: string; disabled: boolean; disabledReason?: string }
> = {
  spotify: { label: "Spotify", disabled: false },
  "youtube-music": { label: "YouTube Music", disabled: false },
  "apple-music": {
    label: "Apple Music",
    disabled: true,
    disabledReason: "Apple Music is not yet supported",
  },
};

export const PLATFORM_LOGOS: Record<Platform, string> = {
  spotify: SpotifyLogo,
  "youtube-music": YTMusicLogo,
  "apple-music": AppleMusicLogo,
};

export const URL_PATTERNS: Record<Platform, RegExp> = {
  spotify: /open\.spotify\.com/i,
  "youtube-music": /music\.youtube\.com/i,
  "apple-music": /music\.apple\.com/i,
};
