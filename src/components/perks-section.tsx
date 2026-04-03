import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Perk1 from "#/assets/perks-1.svg?url";
import Perk2 from "#/assets/perks-2.svg?url";
import Perk3 from "#/assets/perks-3.svg?url";
import Perk4 from "#/assets/perks-4.svg?url";
import Perk5 from "#/assets/perks-5.svg?url";
import Perk6 from "#/assets/perks-6.svg?url";
import VibeSection from "#/components/layout/vibe-section";
import { cn } from "#/lib/utils";

const PERKS = [
  {
    id: "faster-runtime",
    title: "Faster Runtime",
    icon: Perk1,
    description:
      "As at writing this, our performance testing reveals that SwitchVibes completes playlist migrations up to 77.13%. This was tested across different sizes of playlists.",
  },
  {
    id: "no-account-access",
    title: "No Account Access Required",
    icon: Perk2,
    description:
      "SwitchVibes offers a simpler, more secure and privacy-conscious approach as we do not require users to log into their source and destination platform accounts to grant access for the migration to happen.",
  },
  {
    id: "accurate-tracks",
    title: "Accurate Tracks",
    icon: Perk3,
    description:
      "Besides its speed, SwitchVibes also excels in maintaining the accuracy and integrity of your playlists. We understand the importance of preserving your carefully curated playlists, and our intelligent song matching algorithm ensures precise migration results.",
  },
  {
    id: "higher-success-rate",
    title: "Higher Success Rate in Track Finding",
    icon: Perk4,
    description:
      "We consistently achieves a higher success rate in finding all tracks within a playlist. Our intelligent song matching algorithms ensure that your playlist is meticulously migrated, reducing the number missing tracks to the barest minimum.",
  },
  {
    id: "flagged-tracks",
    title: "Flagged Tracks",
    icon: Perk5,
    description:
      "We don't leave you out to hang dry, we admit our shortcomings. And that is why we include flagged tracks (a list of the tracks whose accuracy have been marked low by our intelligent song matching algorithm). This allows you to go back and crosscheck these specific tracks and ensure they are the correct tracks (which most of the time, they are).",
  },
  {
    id: "no-limitations",
    title: "No Limitations on Playlist Size",
    icon: Perk6,
    description:
      "SwitchVibes does not impose any limitations on the number of tracks you can migrate from a playlist. Whether you have 50, 500, or even 1000 songs in your playlist, SwitchVibes allows you to transfer it in its entirety without any constraints.",
  },
];

// Shared transition settings for layout and rotation to keep them perfectly synced
const transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 1,
} as const;

export default function PerksSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const selectedPerk = PERKS.find((p) => p.id === selectedId);

  return (
    <VibeSection id="perks" className="flex flex-col gap-6 md:gap-10">
      {/* Heading */}
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight lg:text-5xl text-foreground">
        Why Choose Switch Vibes
      </h2>

      {/* Grid */}
      <ul className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PERKS.map((perk) => (
          <li key={perk.id} className="relative h-70">
            <motion.div
              layoutId={`card-outer-${perk.id}`}
              onClick={() => setSelectedId(perk.id)}
              transition={transition}
              className={cn(
                "group relative h-full w-full rounded-3xl border border-[#DAE6C9] bg-bg cursor-pointer transition-shadow will-change-transform transform-gpu",
                "hover:ring-1 hover:ring-primary focus-within:ring-1 focus-within:ring-primary outline-none",
                selectedId === perk.id && "opacity-0 invisible",
              )}
            >
              {/* Flip inner handles rotation independently from layout grow */}
              <motion.div
                className="relative h-full w-full preserve-3d"
                initial={false}
                animate={{ rotateY: 0 }}
                transition={transition}
              >
                {/* Front Side */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 backface-hidden">
                  <motion.img
                    src={perk.icon}
                    alt=""
                    className="mb-6 size-20 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className="font-heading text-lg font-bold leading-tight sm:px-4 text-center">
                    {perk.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          </li>
        ))}
      </ul>

      {/* Modal / Popup with High-Performance Isolated Flip-and-Grow */}
      <AnimatePresence>
        {selectedId && selectedPerk && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Simplified Backdrop for performance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"
            />

            {/* OUTER: Shared Layout Growth */}
            <motion.div
              layoutId={`card-outer-${selectedId}`}
              transition={transition}
              className="relative w-full max-w-xl rounded-3xl border border-[#DAE6C9] bg-bg shadow-2xl overflow-hidden will-change-transform transform-gpu"
            >
              {/* INNER: 3D Coin Flip Rotation */}
              <motion.div
                className="relative h-full w-full preserve-3d transform-gpu"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                exit={{ rotateY: 0 }}
                transition={transition}
                style={{ perspective: 1200 }}
              >
                {/* FRONT FACE (Original Grid Card) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 backface-hidden bg-bg rounded-3xl border border-transparent">
                  <img
                    src={selectedPerk.icon}
                    alt=""
                    className="mb-10 size-24 object-contain"
                  />
                  <h3 className="font-heading text-2xl font-bold text-center">
                    {selectedPerk.title}
                  </h3>
                </div>

                {/* BACK FACE (Modal Description Content) */}
                <div
                  className="relative flex flex-col items-center justify-center text-center p-8 sm:p-12 backface-hidden bg-bg rounded-3xl min-h-105"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  {/* Close Button UI */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(null);
                    }}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors cursor-pointer z-10"
                  >
                    <X className="size-6 text-foreground/50" />
                  </button>

                  <img
                    src={selectedPerk.icon}
                    alt=""
                    className="mb-8 size-24 object-contain"
                  />

                  <div className="flex flex-col gap-6 w-full">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold leading-tight px-6 text-foreground text-center">
                      {selectedPerk.title}
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-2 sm:px-4 max-w-md mx-auto">
                      {selectedPerk.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </VibeSection>
  );
}
