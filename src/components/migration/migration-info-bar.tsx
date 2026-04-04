import { Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type MigrationInfoBarProps = {
  message: string;
};

export function MigrationInfoBar({ message }: MigrationInfoBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="mx-auto w-max max-w-full bg-linear-to-r from-[#7B61FF]/90 to-[#00F2FE]/90 backdrop-blur-md px-6 py-2 rounded-full pointer-events-auto border border-white/20"
          >
            <div className="flex items-center gap-2 text-white">
              <Info className="size-4 animate-pulse font-bold shrink-0" />
              <span className="text-xs font-bold tracking-wide uppercase italic">
                {message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
