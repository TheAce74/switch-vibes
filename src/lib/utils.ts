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

export const copyToClipboard = async (
  text: string,
): Promise<[boolean, string]> => {
  if (navigator.clipboard && window.isSecureContext) {
    return await navigator.clipboard.writeText(text).then(
      () => [true, "Copied to clipboard successfully."],
      (err) => {
        console.error(err);
        return [false, "Failed to copy"];
      },
    );
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        return [true, "Copied to clipboard successfully."];
      } else {
        return [false, "Failed to copy"];
      }
    } catch (err) {
      console.error(err);
      return [false, "Failed to copy"];
    } finally {
      document.body.removeChild(textArea);
    }
  }
};
