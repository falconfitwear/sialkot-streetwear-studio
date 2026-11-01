import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

function NotFoundComponent() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow text-lime">Error 404</p>
        <h1 className="display-xl mt-5 max-w-3xl">This page isn't in our collection.</h1>
        <p className="mt-6 max-w-lg text-lg text-ink-muted">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-lime">Back to home</Link>
          <Link to="/products" className="btn btn-outline-light">View products</Link>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.shortName} | ${site.descriptor}` },
      { name: "description", content: "Premium streetwear and custom apparel manufacturing with worldwide export from Sialkot, Pakistan." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.shortName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#111214" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.shortName,
          description: `${site.descriptor}. ${site.tagline}`,
          address: { "@type": "PostalAddress", addressLocality: "Sialkot", addressCountry: "PK" },
          ...(site.domain ? { url: site.domain } : {}),
          ...(site.contact.email ? { email: site.contact.email } : {}),
          ...(() => { const s = Object.values(site.social).filter(Boolean); return s.length ? { sameAs: s } : {}; })(),
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </QueryClientProvider>
  );
}
