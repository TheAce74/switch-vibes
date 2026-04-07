interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number[];
  badge?: string;
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    return "unsupported";
  }

  if (Notification.permission === "default") {
    return await Notification.requestPermission();
  }

  return Notification.permission;
}

export async function sendLocalNotification(title: string, body: string) {
  // 1. Check for support and permission
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  // 2. Only show notification if the app is currently in the background
  if (document.visibilityState === "visible") {
    return;
  }

  const options: ExtendedNotificationOptions = {
    body: body,
    icon: "/logo192.png",
    badge: "/logo192.png",
    vibrate: [200, 100, 200],
    tag: "migration-status",
    requireInteraction: true,
  };

  // 3. Trigger via Service Worker for better background reliability
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, options);
      return;
    } catch (error) {
      console.error("Service worker notification failed:", error);
    }
  }

  // Fallback to standard browser notification
  try {
    new Notification(title, options);
  } catch (error) {
    console.error("Standard notification fallback failed:", error);
  }
}
