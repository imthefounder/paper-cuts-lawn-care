import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { SITE, AREA_TOWNS } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const title = "Paper Cuts Lawn Care | Lawn Mowing & Yard Cleanups in Vandalia, OH";
const description =
  "Free estimates on lawn mowing, bush and tree trimming, core aeration, dethatching, leaf clean up, gutter cleaning, flowerbeds, and landscaping in Vandalia, Ohio. Ask for James — (313) 505-1600.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | Paper Cuts Lawn Care",
  },
  description,
  applicationName: SITE.name,
  keywords: [
    "lawn care Vandalia OH",
    "lawn mowing Vandalia Ohio",
    "lawn service Vandalia",
    "yard cleanup Vandalia OH",
    "leaf clean up Dayton",
    "aeration Vandalia Ohio",
    "dethatching Vandalia",
    "gutter cleaning Vandalia",
    "landscaping Vandalia OH",
    "Paper Cuts Lawn Care",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Home Services",
};

export const viewport: Viewport = {
  themeColor: "#080b09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  description,
  url: SITE.url,
  telephone: "+1-313-505-1600",
  email: SITE.email,
  image: `${SITE.url}/opengraph-image`,
  slogan: SITE.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    addressCountry: "US",
  },
  areaServed: AREA_TOWNS.map((town) => ({
    "@type": "City",
    name: town === "Vandalia" ? "Vandalia, OH" : `${town}, OH`,
  })),
  knowsLanguage: "en-US",
  makesOffer: SERVICES.map((service) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: service.name, description: service.blurb },
  })),
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/#estimate`,
      inLanguage: "en-US",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Free lawn care estimate" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
