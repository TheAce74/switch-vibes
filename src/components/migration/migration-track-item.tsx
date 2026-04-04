import { Check, Info, Play } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { PLATFORM_META } from "#/lib/constants";
import { cn, formatDuration, getGradientForTrack } from "#/lib/utils";
import type { Platform } from "#/types/client";

type MigrationTrackItemProps = {
  track: {
    title?: string;
    artists?: string[];
    year?: number;
    duration_seconds?: number;
    flag?: boolean;
    yt_url?: string;
    uri?: string;
  };
  targetPlatform: Platform | null;
};

export function MigrationTrackItem({
  track,
  targetPlatform,
}: MigrationTrackItemProps) {
  const meta = targetPlatform ? PLATFORM_META[targetPlatform] : null;
  const playUrl = track.yt_url || track.uri || null;

  return (
    <li className="flex items-center gap-4 group p-1">
      {/* Status Icon */}
      <div
        className={cn(
          "size-5 rounded-sm flex items-center justify-center shrink-0 transition-colors",
          track.flag ? "bg-amber-400" : "bg-[#7B61FF]",
        )}
      >
        {track.flag ? (
          <Info className="size-3.5 text-white stroke-3" />
        ) : (
          <Check className="size-3.5 text-white stroke-3" />
        )}
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-2 flex-1">
        <div
          className={cn(
            "size-11 rounded-md shadow-inner bg-linear-to-br",
            getGradientForTrack(),
          )}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#333333] text-sm leading-tight truncate line-clamp-1 max-w-18 sm:max-w-80 md:max-w-100">
              {track.title}
            </span>
            {track.year && (
              <span className="text-[10px] bg-foreground/5 px-1 rounded text-muted-foreground">
                {track.year}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#828282] font-semibold uppercase tracking-wider">
            <span className="truncate line-clamp-1 max-w-18 sm:max-w-80 md:max-w-100">
              {track.artists?.join(", ")}
            </span>
            {track.duration_seconds && (
              <>
                <span className="size-1 rounded-full bg-foreground/20" />
                <span>{formatDuration(track.duration_seconds)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {playUrl && (
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  onClick={() => window.open(playUrl, "_blank")}
                  className="size-8 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[#4F4F4F] hover:bg-[#E0E0E0] transition-colors cursor-pointer"
                >
                  <Play className="size-3.5 fill-current" />
                </button>
              }
            />
            <TooltipContent>Play on {meta?.label || "Platform"}</TooltipContent>
          </Tooltip>
        )}
      </div>
    </li>
  );
}
