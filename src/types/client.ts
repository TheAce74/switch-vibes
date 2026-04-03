import type z from "zod";
import type { PLATFORMS } from "#/lib/constants";
import type { migrationSchema } from "#/lib/schema";

export type Platform = (typeof PLATFORMS)[number];

export type MigrationFormValues = z.infer<typeof migrationSchema>;
