import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0f0e0c",
    theme_color: "#0f0e0c",
    lang: "en-NP",
    icons: [
      {
        src: absoluteUrl("/images/favicon-32.png"),
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: absoluteUrl("/images/favicon-128.png"),
        sizes: "128x128",
        type: "image/png",
      },
    ],
  };
}
