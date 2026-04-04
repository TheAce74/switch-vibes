import Lottie from "lottie-react";
import {
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  Filter,
  Info,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CheckmarkAnimation from "#/assets/lottie/purple-check.json";
import { MigrationTrackItem } from "#/components/migration/migration-track-item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { PLATFORM_LOGOS, PLATFORM_META } from "#/lib/constants";
import { cn, copyToClipboard } from "#/lib/utils";
import type { Platform } from "#/types/client";
import type { PlaylistMigration, Track } from "#/types/server";

type MigrationSuccessProps = {
  finalResult: PlaylistMigration<unknown> & {
    playlist?: Partial<Track<unknown>>[];
    nulls?: { title: string; artists: string[] | { name: string }[] }[];
    spotify_playlist?: Partial<Track<unknown>>[];
    yt_playlist?: Partial<Track<unknown>>[];
  };
  targetPlatform: Platform | null;
};

type FilterType = "all" | "found" | "flagged" | "not-found";

type NormalizedTrack = Partial<Track<unknown>> & {
  status: FilterType;
};

export function MigrationSuccess({
  finalResult,
  targetPlatform,
}: MigrationSuccessProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [isExpanded, setIsExpanded] = useState(true);

  const normalizedTracks = useMemo(() => {
    const playlist =
      finalResult.playlist ||
      finalResult.spotify_playlist ||
      finalResult.yt_playlist ||
      [];
    const successTracks = playlist.map((t) => ({
      ...t,
      status: (t.flag ? "flagged" : "found") as FilterType,
    }));

    const notFoundTracks = (finalResult.nulls || []).map((t) => ({
      ...t,
      status: "not-found" as FilterType,
      artists: Array.isArray(t.artists)
        ? t.artists.map((a: string | { name: string }) =>
            typeof a === "string" ? a : a.name,
          )
        : [t.artists],
    }));

    return [...successTracks, ...notFoundTracks] as NormalizedTrack[];
  }, [finalResult]);

  const filteredTracks = useMemo(() => {
    if (filter === "all") return normalizedTracks;
    return normalizedTracks.filter((t) => t.status === filter);
  }, [normalizedTracks, filter]);

  const stats = useMemo(
    () => ({
      all: normalizedTracks.length,
      found: normalizedTracks.filter((t) => t.status === "found").length,
      flagged: normalizedTracks.filter((t) => t.status === "flagged").length,
      notFound: normalizedTracks.filter((t) => t.status === "not-found").length,
    }),
    [normalizedTracks],
  );

  const targetLabel = targetPlatform
    ? PLATFORM_META[targetPlatform].label
    : "Destination";
  const targetLogo = targetPlatform ? PLATFORM_LOGOS[targetPlatform] : "";

  return (
    <div className="flex flex-col items-center gap-6 w-full animate-in fade-in zoom-in-95 duration-500">
      <Lottie
        animationData={CheckmarkAnimation}
        loop={false}
        className="size-20"
      />

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-[#333333]">
          Playlist Converted Successfully
        </h2>
        <p className="text-sm text-muted-foreground font-semibold">
          Your vibes have been moved to {targetLabel}
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full rounded-xl p-2.5 transition-all duration-500 bg-linear-to-r from-[#99CCFF] via-[#E2B1F3] to-[#FF99CC] flex flex-col gap-2.5">
          {/* Playlist Header Card */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between bg-bg rounded-xl transition-all duration-300 cursor-pointer hover:bg-bg/80 active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <img
                src={targetLogo}
                alt={targetLabel}
                className="size-14 object-contain"
              />
              <div className="flex flex-col items-start">
                <h3 className="font-bold text-[#333333] text-lg leading-tight">
                  Converted Playlist
                </h3>
                <p className="text-xs text-[#828282] font-semibold">
                  {stats.found + stats.flagged} / {stats.all} Created
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-2 justify-end">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      onClick={() => window.open(finalResult.link, "_blank")}
                      className="size-8 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[#4F4F4F] hover:bg-[#E0E0E0] transition-colors cursor-pointer"
                    >
                      <ExternalLink className="size-5" />
                    </button>
                  }
                />
                <TooltipContent>Open Playlist</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      onClick={async () => {
                        const [success, message] = await copyToClipboard(
                          finalResult.link,
                        );
                        if (success) toast.success(message);
                        else toast.error(message);
                      }}
                      className="size-8 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[#4F4F4F] hover:bg-[#E0E0E0] transition-colors cursor-pointer"
                    >
                      <Copy className="size-5" />
                    </button>
                  }
                />
                <TooltipContent>Copy Link</TooltipContent>
              </Tooltip>

              <div
                className={cn(
                  "size-8 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[#4F4F4F] transition-transform duration-300",
                  isExpanded ? "rotate-90" : "rotate-0",
                )}
              >
                <ChevronRight className="size-5" />
              </div>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-bg rounded-xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar p-2"
              >
                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-2 p-1 bg-foreground/5 rounded-lg w-full mb-4">
                  <FilterButton
                    active={filter === "all"}
                    onClick={() => setFilter("all")}
                    label="All"
                    count={stats.all}
                    icon={<Filter className="size-3 shrink-0" />}
                  />
                  <FilterButton
                    active={filter === "found"}
                    onClick={() => setFilter("found")}
                    label="Found"
                    count={stats.found}
                    icon={
                      <CheckCircle2 className="size-3 shrink-0 text-emerald-500" />
                    }
                  />
                  <FilterButton
                    active={filter === "flagged"}
                    onClick={() => setFilter("flagged")}
                    label="Flagged"
                    count={stats.flagged}
                    icon={<Info className="size-3 shrink-0 text-amber-500" />}
                  />
                  <FilterButton
                    active={filter === "not-found"}
                    onClick={() => setFilter("not-found")}
                    label="Missing"
                    count={stats.notFound}
                    icon={<XCircle className="size-3 shrink-0 text-rose-500" />}
                  />
                </div>

                {/* Tracks List */}
                <ul className="space-y-4">
                  {filteredTracks.map((track) => (
                    <MigrationTrackItem
                      key={`${track.title}-${track.artists?.join("")}-${track.duration_seconds}`}
                      track={
                        track as {
                          title: string;
                          artists: string[];
                          year?: number;
                          duration_seconds?: number;
                          flag?: boolean;
                          yt_url?: string;
                          uri?: string;
                        }
                      }
                      targetPlatform={targetPlatform}
                    />
                  ))}
                  {filteredTracks.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground opacity-50">
                      <Filter className="size-10 mb-2" />
                      <p className="text-sm font-bold">
                        No tracks in this category
                      </p>
                    </div>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon: React.ReactNode;
}

function FilterButton({
  active,
  onClick,
  label,
  count,
  icon,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "sm:flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all w-max shrink-0",
        active
          ? "bg-white text-[#333333] scale-[1.02]"
          : "text-muted-foreground hover:bg-white/50",
      )}
    >
      {icon}
      <span>{label}</span>
      <span className="opacity-50">({count})</span>
    </button>
  );
}
