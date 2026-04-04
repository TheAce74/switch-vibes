import { Button } from "#/components/ui/button";
import { DialogTitle } from "#/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { PLATFORM_LOGOS, PLATFORM_META, PLATFORMS } from "#/lib/constants";
import { cn } from "#/lib/utils";
import type { Platform } from "#/types/client";

type MigrationSelectingProps = {
  sourcePlatform: Platform;
  targetPlatform: Platform | null;
  setTargetPlatform: (platform: Platform) => void;
  onStart: () => void;
};

export function MigrationSelecting({
  sourcePlatform,
  targetPlatform,
  setTargetPlatform,
  onStart,
}: MigrationSelectingProps) {
  const sourceMeta = PLATFORM_META[sourcePlatform];

  return (
    <div className="flex flex-col items-center gap-6 w-full animate-in fade-in zoom-in-95 duration-300">
      <img
        src={PLATFORM_LOGOS[sourcePlatform]}
        alt={sourceMeta.label}
        className="size-16"
      />

      <div className="text-center space-y-1">
        <DialogTitle className="text-xl font-semibold text-[#4F4F4F]">
          Transfer your music from{" "}
          <span className="font-bold text-[#333333]">{sourceMeta.label}</span>
        </DialogTitle>
        <p className="text-sm text-muted-foreground italic">
          Select the target for your chill vibes
        </p>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" onClick={onStart} disabled={!targetPlatform}>
          Choose Destination
        </Button>

        <div className="flex items-center gap-3">
          {PLATFORMS.filter((p) => p !== sourcePlatform).map((platform) => {
            const meta = PLATFORM_META[platform];
            const isSelected = targetPlatform === platform;
            const isDisabled = meta.disabled;

            return (
              <Tooltip key={platform}>
                <TooltipTrigger
                  render={
                    <Button
                      variant="brand"
                      brandLogoUrl={PLATFORM_LOGOS[platform]}
                      onClick={() => !isDisabled && setTargetPlatform(platform)}
                      disabled={isDisabled}
                      className={cn(
                        isSelected &&
                          "border-[#FF99CC] ring-[#FF99CC] scale-110",
                        "transition-all duration-300",
                      )}
                    />
                  }
                />
                <TooltipContent>
                  {isDisabled ? meta.disabledReason : meta.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}
