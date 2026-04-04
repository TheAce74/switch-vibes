"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MigrationSelecting } from "#/components/migration/migration-selecting";
import { MigrationSuccess } from "#/components/migration/migration-success";
import { MigrationTransferring } from "#/components/migration/migration-transferring";
import { Dialog, DialogContent } from "#/components/ui/dialog";
import { useMigration } from "#/hooks/use-migration";
import type { Platform } from "#/types/client";

type MigrationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourcePlatform?: Platform;
  sourceUrl?: string;
};

export default function MigrationDialog({
  open,
  onOpenChange,
  sourcePlatform = "spotify",
  sourceUrl = "",
}: MigrationDialogProps) {
  const [targetPlatform, setTargetPlatform] = useState<Platform | null>(null);
  const { status, tracks, message, finalResult, startMigration, resetState } =
    useMigration(sourcePlatform, targetPlatform);

  // Reset local state when dialog closes
  useEffect(() => {
    if (!open) {
      resetState();
      setTargetPlatform(null);
    }
  }, [open, resetState]);

  const handleStartMigration = () => {
    if (!sourceUrl) {
      toast.error("Source URL is missing.");
      return;
    }
    startMigration(sourceUrl);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen, eventDetails) => {
        // Prevent closing during active transfer
        if (status === "transferring" || status === "connecting") {
          eventDetails?.cancel();
          return;
        }
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        className="p-0 bg-bg md:rounded-xl rounded-none border-none max-w-175 overflow-hidden"
        showCloseButton={status !== "transferring" && status !== "connecting"}
      >
        <div className="flex flex-col items-center px-8 pt-10 pb-8 gap-6 min-h-100 justify-center">
          {status === "idle" || (status === "connecting" && !targetPlatform) ? (
            <MigrationSelecting
              sourcePlatform={sourcePlatform}
              targetPlatform={targetPlatform}
              setTargetPlatform={setTargetPlatform}
              onStart={handleStartMigration}
            />
          ) : status === "transferring" || status === "connecting" ? (
            <MigrationTransferring
              sourcePlatform={sourcePlatform}
              targetPlatform={targetPlatform}
              tracks={tracks}
              message={message}
            />
          ) : status === "success" && finalResult ? (
            <MigrationSuccess
              finalResult={finalResult}
              targetPlatform={targetPlatform}
            />
          ) : status === "error" ? (
            <div className="flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="size-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm">
                <span className="text-4xl font-bold">!</span>
              </div>
              <h2 className="text-xl font-bold text-[#333333]">
                Migration Failed
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs">
                We encountered an issue during the migration process. Please
                check your connection and try again.
              </p>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-primary font-bold hover:underline transition-colors"
              >
                Close and retry
              </button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
