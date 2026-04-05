import { Download, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const DISMISS_KEY = "PWA_INSTALL_DISMISSED_COUNT";

export default function PWAInstallTrigger() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const checkVisibilityDelayed = useCallback(() => {
    const dismissCount = Number(localStorage.getItem(DISMISS_KEY) || "0");
    if (dismissCount >= 2) return;

    setTimeout(() => {
      setIsVisible(true);
    }, 5000);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    const currentCount = Number(localStorage.getItem(DISMISS_KEY) || "0");
    localStorage.setItem(DISMISS_KEY, String(currentCount + 1));
  };

  const handleInstall = async () => {
    if (isIOS) {
      toast.info("Install SwitchVibes", {
        description:
          "Tap the 'Share' button in Safari and select 'Add to Home Screen'",
        duration: 8000,
      });
      return;
    }

    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setInstallPrompt(null);
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

    const isStandaloneMode = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    setIsIOS(isIOSDevice);
    setIsStandalone(isStandaloneMode);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      checkVisibilityDelayed();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (isIOSDevice && !isStandaloneMode) {
      checkVisibilityDelayed();
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, [checkVisibilityDelayed]);

  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-2 right-2 z-50 flex items-center gap-3">
          <div className="relative">
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-primary"
            />

            <Tooltip>
              <TooltipTrigger
                render={
                  <motion.button
                    layoutId="pwa-trigger"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleInstall}
                    className={cn(
                      "relative flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-shadow hover:shadow-primary/25 cursor-pointer",
                      "bg-linear-to-br from-primary to-primary/80",
                    )}
                  >
                    <Download className="size-6" />
                  </motion.button>
                }
              />
              <TooltipContent side="left">Install SwitchVibes</TooltipContent>
            </Tooltip>
          </div>

          <Tooltip>
            <TooltipTrigger
              render={
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={handleDismiss}
                  className="flex size-8 items-center justify-center rounded-full bg-bg/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </motion.button>
              }
            />
            <TooltipContent side="left">Dismiss</TooltipContent>
          </Tooltip>
        </div>
      )}
    </AnimatePresence>
  );
}
