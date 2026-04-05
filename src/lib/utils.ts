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
    console.log("Nothing to see here 👀");
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
        logger(err);
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
      logger(err);
      return [false, "Failed to copy"];
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

export function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (hrs > 0) parts.push(hrs.toString().padStart(2, "0"));
  parts.push(mins.toString().padStart(2, "0"));
  parts.push(secs.toString().padStart(2, "0"));

  return parts.join(":");
}

export function getGradientForTrack(): string {
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-yellow-500 to-amber-500",
    "from-indigo-500 to-violet-500",
    "from-teal-500 to-cyan-500",
    "from-rose-500 to-pink-500",
    "from-pink-500 to-purple-500",
    "from-purple-500 to-indigo-500",
    "from-indigo-500 to-blue-500",
    "from-cyan-500 to-teal-500",
    "from-teal-500 to-green-500",
    "from-emerald-500 to-yellow-500",
    "from-amber-500 to-orange-500",
    "from-red-500 to-rose-500",
  ];

  const index = Math.floor(Math.random() * gradients.length);
  return gradients[index];
}
