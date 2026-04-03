import { zodResolver } from "@hookform/resolvers/zod";
import { lazy, Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import HeroImage from "#/assets/hero-image.png?url";
import withErrorMessage from "#/components/hocs/with-error-message";
import VibeSection from "#/components/layout/vibe-section";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Skeleton } from "#/components/ui/skeleton";
import { useImageLoader } from "#/hooks/use-image-loader";
import { PLATFORM_LOGOS, PLATFORM_META, PLATFORMS } from "#/lib/constants";
import { migrationSchema } from "#/lib/schema";
import { cn, detectPlatform } from "#/lib/utils";
import type { MigrationFormValues } from "#/types/client";

const MigrationDialog = lazy(() => import("#/components/migration-dialog"));

export default function HeroSection() {
  const { loaded: heroLoaded } = useImageLoader(HeroImage);
  const [isMigrationOpen, setIsMigrationOpen] = useState(false);
  const [activeMigrationData, setActiveMigrationData] =
    useState<MigrationFormValues | null>(null);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<MigrationFormValues>({
    // Bypassing a strict type collision. Our version of @hookform/resolvers expects older Zod internal types (like _zod.version).
    // @ts-expect-error
    resolver: zodResolver(migrationSchema),
    defaultValues: {
      sourceUrl: "",
    },
  });

  const sourceUrl = watch("sourceUrl");

  // Auto-detect platform from pasted URL
  useEffect(() => {
    if (!sourceUrl) return;
    const detected = detectPlatform(sourceUrl);
    if (detected) {
      setValue("platform", detected, { shouldValidate: true });
    }
  }, [sourceUrl, setValue]);

  const onSubmit = (data: MigrationFormValues) => {
    setActiveMigrationData(data);
    setIsMigrationOpen(true);
    // delay this for visual coherence
    setTimeout(reset, 1000);
  };

  return (
    <VibeSection id="hero" containerClassName="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] xl:gap-20">
        <div className="flex flex-col gap-6 sm:gap-8 max-lg:items-center max-lg:text-center">
          {/* Heading */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <h1 className="font-heading text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.5rem]">
              Switch
              <br />
              the Vibe
            </h1>
            <p className="max-w-sm text-base text-muted-foreground sm:text-lg">
              Transfer, sync &amp; move your music library
            </p>
          </div>

          {/* Migration form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-md flex-col gap-12"
          >
            {/* URL input + platform select row */}
            <div className="flex gap-2.5">
              <div className="flex-1">
                <Controller
                  control={control}
                  name="sourceUrl"
                  render={({ field }) =>
                    withErrorMessage<MigrationFormValues>(
                      <Input
                        {...field}
                        id="sourceUrl"
                        placeholder="Enter Source URL"
                        type="url"
                        error={Boolean(errors.sourceUrl)}
                      />,
                      {
                        errors,
                        key: "sourceUrl",
                      },
                    )
                  }
                />
              </div>

              <Controller
                control={control}
                name="platform"
                render={({ field }) =>
                  withErrorMessage<MigrationFormValues>(
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger error={Boolean(errors.platform)}>
                        <SelectValue placeholder="🎵">
                          {field.value ? (
                            <img
                              src={PLATFORM_LOGOS[field.value]}
                              alt={PLATFORM_META[field.value].label}
                              className="size-6 object-contain"
                            />
                          ) : (
                            <span className="text-muted-foreground">🎵</span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="end" alignItemWithTrigger={false}>
                        {PLATFORMS.map((p) => {
                          const meta = PLATFORM_META[p];
                          return (
                            <SelectItem
                              key={p}
                              value={p}
                              disabled={meta.disabled}
                            >
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={PLATFORM_LOGOS[p]}
                                  alt={meta.label}
                                  className="size-5 object-contain"
                                />
                                <span>{meta.label}</span>
                                {meta.disabled && (
                                  <span className="ml-1 text-muted-foreground">
                                    (coming soon)
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>,
                    {
                      errors,
                      key: "platform",
                    },
                  )
                }
              />
            </div>

            {/* Convert button */}
            <Button
              type="submit"
              variant="glow"
              className="w-max mx-auto lg:ml-0"
            >
              Convert
            </Button>
          </form>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          {!heroLoaded && (
            <div className="flex w-full items-center justify-center xl:my-25.5 lg:my-[88.5px]">
              <div className="flex w-full max-w-175 items-center justify-center -space-x-8 sm:-space-x-10">
                <Skeleton className="aspect-9/14.5 w-[31%] -rotate-6 translate-y-6 rounded-2xl sm:rounded-3xl" />
                <Skeleton className="relative z-10 aspect-9/14.5 w-[38%] -translate-y-2 rounded-2xl sm:rounded-3xl" />
                <Skeleton className="aspect-9/14.5 w-[31%] rotate-6 translate-y-6 rounded-2xl sm:rounded-3xl" />
              </div>
            </div>
          )}
          <img
            src={HeroImage}
            alt="Playlist migration preview across Spotify, YouTube Music, and Apple Music"
            className={cn(
              "w-full max-w-175 object-contain transition-opacity duration-500",
              heroLoaded ? "opacity-100" : "opacity-0 absolute",
            )}
          />
        </div>
      </div>

      <Suspense fallback={null}>
        <MigrationDialog
          open={isMigrationOpen}
          onOpenChange={setIsMigrationOpen}
          sourcePlatform={activeMigrationData?.platform}
          sourceUrl={activeMigrationData?.sourceUrl}
        />
      </Suspense>
    </VibeSection>
  );
}
