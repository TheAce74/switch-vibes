import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import HeroImage from "#/assets/hero-image.webp";
import { DefaultCatchBoundary } from "#/components/default-catch-boundary";
import Header from "#/components/header";
import { NotFound } from "#/components/not-found";
import { TooltipProvider } from "#/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

const PWAInstallTrigger = lazy(
  () => import("#/components/pwa-install-trigger"),
);

const TanStackDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-devtools").then((res) => ({
        default: res.TanStackDevtools,
      })),
    )
  : () => null;

const TanStackRouterDevtoolsPanel = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtoolsPanel,
      })),
    )
  : () => null;

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "SwitchVibes | Seamless Playlist Migration",
      },
      {
        name: "description",
        content:
          "Seamlessly migrate music playlists between streaming platforms. Let SwitchVibes do the heavy lifting.",
      },
      {
        name: "keywords",
        content:
          "playlist migration, playlist moving, playlist copy, transfer playlists, spotify to youtube music, youtube music to spotify, spotify to apple music, apple music to spotify, youtube music to apple music, apple music to youtube music, switch vibes, music streaming utility",
      },
      {
        name: "theme-color",
        content: "#000000",
      },
      {
        property: "og:site_name",
        content: "SwitchVibes",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "SwitchVibes | Seamless Playlist Migration",
      },
      {
        property: "og:description",
        content:
          "Seamlessly migrate music playlists between streaming platforms. Let SwitchVibes do the heavy lifting.",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "SwitchVibes | Seamless Playlist Migration",
      },
      {
        name: "twitter:description",
        content:
          "Seamlessly migrate music playlists between streaming platforms. Let SwitchVibes do the heavy lifting.",
      },
      {
        property: "og:image",
        content: "https://switchvibes.vercel.app/seamless-music-migration.png",
      },
      {
        name: "twitter:image",
        content: "https://switchvibes.vercel.app/seamless-music-migration.png",
      },
      {
        property: "og:url",
        content: "https://switchvibes.vercel.app",
      },
      {
        name: "twitter:url",
        content: "https://switchvibes.vercel.app",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preload",
        as: "image",
        href: HeroImage,
        type: "image/webp",
        fetchpriority: "high",
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-16">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere">
        <Header />
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProvider>
        <Suspense fallback={null}>
          <PWAInstallTrigger />
        </Suspense>
        <Toaster richColors position="top-right" />
        <Suspense fallback={null}>
          <TanStackDevtools
            config={{
              position: "bottom-left",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
