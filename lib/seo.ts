import type { Metadata } from "next";
import type { BlogPost, Product } from "@/types";
import type { Service } from "@/types";
import {
  EMAILS,
  OFFICE_ADDRESS,
  PHONES,
  SOCIAL_LINKS,
} from "@/lib/contact";

export const SITE_NAME = "Pyramid Vaastu Nepal";
export const SITE_SHORT_NAME = "Pyramid Vaastu Yantra";

export const DEFAULT_DESCRIPTION =
  "Vaastu advisory, geopathic stress assessment, and pyramid yantras in Kathmandu, Nepal. Personal consultations rooted in ancient Vaastu Shastra and sacred geometry.";

export const SITE_KEYWORDS = [
  "Vaastu Nepal",
  "Vaastu consultant Kathmandu",
  "Vaastu Shastra Nepal",
  "pyramid yantra Nepal",
  "geopathic stress assessment Kathmandu",
  "Vaastu advisory Nepal",
  "sacred geometry Nepal",
  "Vaastu correction without demolition",
  "Pyramid Vaastu Nepal",
  "Vaastu for home Nepal",
  "Vaastu for office Kathmandu",
] as const;

export const DEFAULT_OG_IMAGE = "/images/hero_poster1.png";

/** Public marketing routes included in the sitemap. */
export const STATIC_SITEMAP_PATHS = [
  "/",
  "/vaastu-advisory",
  "/geopathic-stress",
  "/shop",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) return `https://${vercelUrl}`;

  return "https://www.pyramidvaastunepal.com";
}

export function absoluteUrl(path = ""): string {
  const base = getSiteUrl();
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function resolveImageUrl(image?: string | null): string | undefined {
  if (!image) return absoluteUrl(DEFAULT_OG_IMAGE);
  return image.startsWith("http") ? image : absoluteUrl(image);
}

type BuildPageMetadataInput = {
  title?: string;
  titleAbsolute?: string;
  description?: string;
  path?: string;
  ogImage?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildPageMetadata(
  input: BuildPageMetadataInput = {},
): Metadata {
  const description = input.description ?? DEFAULT_DESCRIPTION;
  const canonical = input.path ? absoluteUrl(input.path) : undefined;
  const ogImageUrl = resolveImageUrl(input.ogImage);
  const documentTitle = input.titleAbsolute
    ? { absolute: input.titleAbsolute }
    : input.title;

  const socialTitle = input.titleAbsolute
    ? input.titleAbsolute
    : input.title
      ? `${input.title} | ${SITE_SHORT_NAME}`
      : SITE_SHORT_NAME;

  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }
    : undefined;

  return {
    title: documentTitle,
    description,
    keywords: [...SITE_KEYWORDS],
    metadataBase: new URL(getSiteUrl()),
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: input.type ?? "website",
      locale: "en_NP",
      url: canonical,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: ogImageUrl
        ? [{ url: ogImageUrl, alt: SITE_NAME, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    verification,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl("/images/logo.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: DEFAULT_DESCRIPTION,
    email: EMAILS[0],
    telephone: `+977-${PHONES[0].tel}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: getSiteUrl(),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: DEFAULT_DESCRIPTION,
    telephone: PHONES.map((phone) => `+977-${phone.tel}`),
    email: EMAILS,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    openingHours: "Mo-Sa 10:00-18:00",
    priceRange: "$$",
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: getSiteUrl(),
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-NP",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo.png"),
      },
    },
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: Service, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.tagline,
    url: absoluteUrl(path),
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: getSiteUrl(),
      address: {
        "@type": "PostalAddress",
        addressLocality: OFFICE_ADDRESS,
        addressCountry: "NP",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    serviceType: service.name,
  };
}

export function productJsonLd(product: Product) {
  const image = product.images[0]
    ? product.images[0].startsWith("http")
      ? product.images[0]
      : absoluteUrl(product.images[0])
    : absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: absoluteUrl(`/shop/${product.slug}`),
    image,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/${product.slug}`),
      priceCurrency: "NPR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };
}

export function articleJsonLd(post: BlogPost) {
  const image = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : absoluteUrl(post.coverImage)
    : absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.content.slice(0, 160),
    url: absoluteUrl(`/blog/${post.slug}`),
    image,
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    inLanguage: "en-NP",
  };
}

/** Global structured data injected once in the root layout. */
export function rootStructuredData() {
  return [organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()];
}
