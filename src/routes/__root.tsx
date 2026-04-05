import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { DefaultCatchBoundary } from "#/components/default-catch-boundary";
import Header from "#/components/header";
import { NotFound } from "#/components/not-found";
import { TooltipProvider } from "#/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

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
        href: "/logo192.png",
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
      {
        rel: "stylesheet",
        href: appCss,
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
        <Toaster richColors position="top-right" />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
