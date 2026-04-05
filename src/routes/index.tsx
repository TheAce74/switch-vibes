import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Footer from "#/components/footer";
import HeroSection from "#/components/hero-section";
import VibeSection from "#/components/layout/vibe-section";
import { Skeleton } from "#/components/ui/skeleton";

const AboutSection = lazy(() => import("#/components/about-section"));
const PerksSection = lazy(() => import("#/components/perks-section"));
const FaqsSection = lazy(() => import("#/components/faqs-section"));

function PerksSkeleton() {
  return (
    <VibeSection id="perks-skeleton" className="flex flex-col gap-6 md:gap-10">
      <Skeleton className="h-10 w-64 md:h-12 md:w-96" />
      <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton
            key={`perk-skel-${i}`}
            className="h-70 w-full rounded-3xl"
          />
        ))}
      </div>
    </VibeSection>
  );
}

function FaqsSkeleton() {
  return (
    <VibeSection id="faqs-skeleton" className="flex flex-col md:gap-2">
      <Skeleton className="h-10 w-32 md:h-12 md:w-48" />
      <div className="w-full max-w-5xl space-y-4 py-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={`faq-skel-${i}`} className="h-16 w-full" />
        ))}
      </div>
    </VibeSection>
  );
}

function AboutSkeleton() {
  return (
    <VibeSection id="about-skeleton" className="flex flex-col gap-6 md:gap-10">
      <Skeleton className="h-10 w-40 md:h-12 md:w-64" />
      <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
        <Skeleton className="h-75 w-full rounded-3xl" />
        <Skeleton className="h-75 w-full rounded-3xl" />
        <Skeleton className="h-75 w-full rounded-3xl" />
        <Skeleton className="h-75 w-full rounded-3xl" />
        <Skeleton className="h-100 w-full rounded-3xl md:col-span-2" />
      </div>
    </VibeSection>
  );
}

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<AboutSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<PerksSkeleton />}>
        <PerksSection />
      </Suspense>
      <Suspense fallback={<FaqsSkeleton />}>
        <FaqsSection />
      </Suspense>
      <Footer />
    </main>
  );
}
