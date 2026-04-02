import { z } from "zod";

export const envSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum(["dev", "prod"]),
});

export const ENV = envSchema.parse(import.meta.env);
