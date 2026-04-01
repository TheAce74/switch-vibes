import { z } from "zod";

export const envSchema = z.object({
	VITE_APP_ENVIRONMENT: z.enum(["dev", "prod"]).optional().default("dev"),
});

export const ENV = envSchema.parse(import.meta.env);
