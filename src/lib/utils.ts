import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { URL_PATTERNS } from "#/lib/constants";
import { ENV } from "#/lib/schema";
import type { Platform } from "#/types/client";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function logger(...args: unknown[]): void {
	if (ENV.VITE_APP_ENVIRONMENT === "prod") {
		console.log("Check server logs");
	} else {
		console.log(...args);
	}
}

export function detectPlatform(url: string): Platform | undefined {
	for (const [platform, regex] of Object.entries(URL_PATTERNS)) {
		if (regex.test(url)) return platform as Platform;
	}
	return undefined;
}
