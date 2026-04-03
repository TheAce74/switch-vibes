"use client";

import Lottie from "lottie-react";
import { Check, ChevronRight, Copy, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CheckmarkAnimation from "#/assets/lottie/purple-check.json";
import SandClockAnimation from "#/assets/lottie/sand-clock-loading.json";
import { Button } from "#/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "#/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { PLATFORM_LOGOS, PLATFORM_META, PLATFORMS } from "#/lib/constants";
import { cn, copyToClipboard, logger } from "#/lib/utils";
import type { Platform } from "#/types/client";

interface MigrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourcePlatform?: Platform;
  sourceUrl?: string;
}

type MigrationStep = "selecting" | "transferring" | "success";

const MOCK_TRACKS = [
  {
    id: "1",
    title: "Lamb Truck",
    artist: "Esskay",
    gradient: "bg-linear-to-br from-[#7B61FF] to-[#00F2FE]",
  },
  {
    id: "2",
    title: "Lamb Truck",
    artist: "Esskay",
    gradient: "bg-linear-to-br from-[#FF61D2] to-[#FE9090]",
  },
  {
    id: "3",
    title: "Lamb Truck",
    artist: "Esskay",
    gradient: "bg-linear-to-br from-[#4facfe] to-[#00f2fe]",
  },
  {
    id: "4",
    title: "Lamb Truck",
    artist: "Esskay",
    gradient: "bg-linear-to-br from-[#f093fb] to-[#f5576c]",
  },
  {
    id: "5",
    title: "Lamb Truck",
    artist: "Esskay",
    gradient: "bg-linear-to-br from-[#5ee7df] to-[#b490ca]",
  },
];

const MOCK_PLAYLIST = {
  title: "Top 100: Nigeria",
  tracksCount: 100,
  selectedCount: 100,
  gradient: "bg-linear-to-br from-[#99CCFF] via-[#E2B1F3] to-[#FF99CC]",
};

export default function MigrationDialog({
  open,
  onOpenChange,
  sourcePlatform = "spotify",
  sourceUrl = "",
}: MigrationDialogProps) {
  const [step, setStep] = useState<MigrationStep>("selecting");
  const [targetPlatform, setTargetPlatform] = useState<Platform | null>(null);
  const [transferProgress, setTransferProgress] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);

  logger(sourceUrl);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setStep("selecting");
      setTargetPlatform(null);
      setTransferProgress(1);
      setIsExpanded(true);
    }
  }, [open]);

  const handleStartMigration = () => {
    if (!targetPlatform) return;
    setStep("transferring");

    // Simulate progress
    const interval = setInterval(() => {
      setTransferProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("success");
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 300);
  };

  const sourceMeta = PLATFORM_META[sourcePlatform];
  const targetMeta = targetPlatform ? PLATFORM_META[targetPlatform] : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen, eventDetails) => {
        if (
          eventDetails?.reason === "escape-key" ||
          eventDetails?.reason === "outside-press" ||
          eventDetails?.reason === "trigger-press" ||
          eventDetails?.reason === "focus-out" ||
          eventDetails?.reason === "imperative-action"
        ) {
          eventDetails.cancel();
          return;
        }
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        className="p-0 bg-bg md:rounded-xl rounded-none border-none max-w-175"
        showCloseButton={step !== "transferring"}
      >
        <div className="flex flex-col items-center px-8 pt-10 pb-8 gap-6">
          {/* Top Icon Area */}
          <div className="relative flex items-center justify-center">
            {step === "selecting" && (
              <img
                src={PLATFORM_LOGOS[sourcePlatform]}
                alt={sourceMeta.label}
                className="size-16"
              />
            )}
            {step === "transferring" && (
              <Lottie
                animationData={SandClockAnimation}
                className="size-32 -mb-11"
                loop
              />
            )}
            {step === "success" && (
              <Lottie
                animationData={CheckmarkAnimation}
                loop={false}
                className="size-16"
              />
            )}
          </div>

          {/* Titles */}
          <div className="text-center space-y-1">
            {step === "selecting" && (
              <DialogTitle className="text-xl font-semibold text-[#4F4F4F]">
                Transfer your music from{" "}
                <span className="font-bold text-[#333333]">
                  {sourceMeta.label}
                </span>
              </DialogTitle>
            )}
            {step === "transferring" && (
              <DialogTitle className="text-xl font-semibold text-[#4F4F4F]">
                Transferring your music from{" "}
                <span className="font-bold text-[#333333]">
                  {sourceMeta.label}
                </span>{" "}
                to{" "}
                <span className="font-bold text-[#333333]">
                  {targetMeta?.label}
                </span>
              </DialogTitle>
            )}
            {step === "success" && (
              <DialogTitle className="text-xl font-bold text-[#333333]">
                Playlist Converted Successfully
              </DialogTitle>
            )}
          </div>

          {/* Playlist Container (Gradient BG with separate cards) */}
          {step !== "selecting" && (
            <div className="w-full rounded-xl p-2.5 transition-all duration-500 bg-linear-to-r from-[#99CCFF] via-[#E2B1F3] to-[#FF99CC] flex flex-col gap-2.5">
              {/* Playlist Header Card */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between bg-bg rounded-xl transition-all duration-300 cursor-pointer hover:bg-bg/80 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn("size-14 rounded-md", MOCK_PLAYLIST.gradient)}
                  />
                  <div className="flex flex-col items-start">
                    <h3 className="font-bold text-[#333333] text-lg leading-tight">
                      {MOCK_PLAYLIST.title}
                    </h3>
                    <p className="text-xs text-[#828282] font-semibold">
                      {step === "transferring"
                        ? `${transferProgress} / ${MOCK_PLAYLIST.tracksCount} Transferred`
                        : `${MOCK_PLAYLIST.selectedCount} / ${MOCK_PLAYLIST.tracksCount} Selected`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  {step === "success" && (
                    <>
                      <Tooltip>
                        <TooltipTrigger
                          render={() => (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("playlistUrl", "_blank");
                              }}
                              className="size-8 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[#4F4F4F] hover:bg-[#E0E0E0] transition-colors cursor-pointer"
                            >
                              <ExternalLink className="size-5" />
                            </button>
                          )}
                        />
                        <TooltipContent>Open Playlist</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger
                          render={() => (
                            <button
                              type="button"
                              onClick={async (e) => {
                                e.stopPropagation();
                                const [success, message] =
                                  await copyToClipboard("playlistUrl");
                                if (success) {
                                  toast.success(message);
                                } else {
                                  toast.error(message);
                                }
                              }}
                              className="size-8 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[#4F4F4F] hover:bg-[#E0E0E0] transition-colors cursor-pointer"
                            >
                              <Copy className="size-5" />
                            </button>
                          )}
                        />
                        <TooltipContent>Copy Link</TooltipContent>
                      </Tooltip>
                    </>
                  )}
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

              {/* Track List or Progress Area Card */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-bg rounded-xl overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="h-60 overflow-y-auto pr-2 custom-scrollbar">
                        <ul className="space-y-4 pt-4">
                          {MOCK_TRACKS.map((track) => (
                            <li
                              key={track.id}
                              className="flex flex-wrap items-center gap-4"
                            >
                              <div className="size-5 rounded-sm bg-[#7B61FF] flex items-center justify-center">
                                <Check className="size-3.5 text-white stroke-3" />
                              </div>
                              <div
                                className={cn(
                                  "size-11 rounded-md shadow-inner",
                                  track.gradient,
                                )}
                              />
                              <div className="flex flex-col">
                                <span className="font-bold text-[#333333] text-sm leading-tight">
                                  {track.title}
                                </span>
                                <span className="text-xs text-[#828282] uppercase font-bold tracking-wider">
                                  {track.artist}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Bottom Actions (Selection only) */}
          {step === "selecting" && (
            <div className="w-full flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                onClick={handleStartMigration}
                disabled={!targetPlatform}
              >
                Choose Destination
              </Button>

              <div className="flex items-center gap-3">
                {PLATFORMS.filter((p) => p !== sourcePlatform).map(
                  (platform) => {
                    const meta = PLATFORM_META[platform];
                    const isSelected = targetPlatform === platform;
                    const isDisabled = meta.disabled;

                    return (
                      <Tooltip key={platform}>
                        <TooltipTrigger
                          render={() => (
                            <Button
                              variant="brand"
                              brandLogoUrl={PLATFORM_LOGOS[platform]}
                              onClick={() =>
                                !isDisabled && setTargetPlatform(platform)
                              }
                              disabled={isDisabled}
                              className={cn(
                                isSelected && "border-[#FF99CC] ring-[#FF99CC]",
                              )}
                            />
                          )}
                        />
                        <TooltipContent>
                          {isDisabled ? meta.disabledReason : meta.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  },
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
