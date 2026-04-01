import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ENV } from "./schema";

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
