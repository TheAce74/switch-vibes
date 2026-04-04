import Lottie from "lottie-react";
import { AnimatePresence, motion } from "motion/react";
import SandClockAnimation from "#/assets/lottie/sand-clock-loading.json";
import { MigrationInfoBar } from "#/components/migration/migration-info-bar";
import { MigrationTrackItem } from "#/components/migration/migration-track-item";
import { PLATFORM_META } from "#/lib/constants";
import type { Platform } from "#/types/client";
import type { Track } from "#/types/server";

type MigrationTransferringProps = {
  sourcePlatform: Platform;
  targetPlatform: Platform | null;
  tracks: Partial<Track<unknown>>[];
  message: string;
};

export function MigrationTransferring({
  sourcePlatform,
  targetPlatform,
  tracks,
  message,
}: MigrationTransferringProps) {
  const sourceMeta = PLATFORM_META[sourcePlatform];
  const targetMeta = targetPlatform ? PLATFORM_META[targetPlatform] : null;

  return (
    <div className="flex flex-col items-center gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative">
        <Lottie
          animationData={SandClockAnimation}
          className="size-32 -mb-11"
          loop
        />
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold text-[#4F4F4F]">
          Transferring your music from{" "}
          <span className="font-bold text-[#333333]">{sourceMeta.label}</span>{" "}
          to{" "}
          <span className="font-bold text-[#333333]">{targetMeta?.label}</span>
        </h2>
      </div>

      <div className="w-full relative rounded-xl p-2.5 bg-linear-to-r from-[#99CCFF]/40 via-[#E2B1F3]/40 to-[#FF99CC]/40 border border-white/20 min-h-100 flex flex-col max-h-60">
        <div className="bg-bg/80 backdrop-blur-sm rounded-xl p-4 flex-1 flex flex-col max-h-full overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Live Progress
            </span>
            <span className="text-xs font-bold text-primary">
              {tracks.length} Tracks Matched
            </span>
          </div>

          <div className="flex-1">
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {[...tracks].reverse().map((track) => (
                  <motion.div
                    key={`${track.title}-${track.artists?.join("")}-${track.duration_seconds}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MigrationTrackItem
                      track={track}
                      targetPlatform={targetPlatform}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        <MigrationInfoBar message={message} />
      </div>
    </div>
  );
}
