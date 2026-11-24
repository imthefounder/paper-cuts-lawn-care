import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: `Lawn mowing and full-property clean ups in ${SITE.region}. Free estimates.`,
    start_url: "/",
    display: "standalone",
    background_color: "#080b09",
    theme_color: "#080b09",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
