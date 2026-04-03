import { z } from "zod";
import { PLATFORM_META, PLATFORMS, URL_PATTERNS } from "#/lib/constants";
import { detectPlatform } from "#/lib/utils";

export const envSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum(["dev", "prod"]),
});

export const ENV = envSchema.parse(import.meta.env);

const supportedPlatformNames = Object.values(PLATFORM_META).map((m) => m.label);

export const migrationSchema = z
  .object({
    sourceUrl: z.url("Please enter a valid URL").refine(
      (url) => {
        return Object.values(URL_PATTERNS).some((regex) => regex.test(url));
      },
      {
        message: `URL must be from ${supportedPlatformNames.slice(0, -1).join(", ")} or ${supportedPlatformNames.at(-1)}`,
      },
    ),
    platform: z.enum(PLATFORMS, {
      error: "Please select a platform",
    }),
  })
  .superRefine(({ sourceUrl, platform }, ctx) => {
    const detected = detectPlatform(sourceUrl);

    // 1. Check if detected platform from URL is disabled
    if (detected && PLATFORM_META[detected].disabled) {
      ctx.addIssue({
        code: "custom",
        message:
          PLATFORM_META[detected].disabledReason ||
          `Support for ${PLATFORM_META[detected].label} is coming soon`,
        path: ["sourceUrl"],
      });
    }

    // 2. Check if selected platform is disabled
    if (platform && PLATFORM_META[platform].disabled) {
      ctx.addIssue({
        code: "custom",
        message:
          PLATFORM_META[platform].disabledReason ||
          `Support for ${PLATFORM_META[platform].label} is coming soon`,
        path: ["platform"],
      });
    }

    // 3. Platform mismatch (only if both are valid/enabled/detected)
    if (detected && detected !== platform) {
      ctx.addIssue({
        code: "custom",
        message: "Selected platform doesn't match the URL",
        path: ["platform"],
      });
    }
  });
