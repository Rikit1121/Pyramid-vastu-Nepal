import type { MetadataRoute } from "next";
import { getAllPublishedPosts } from "@/lib/blog";
import { getAllProducts } from "@/lib/products";
import { STATIC_SITEMAP_PATHS, absoluteUrl, getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, products] = await Promise.all([
    getAllPublishedPosts(),
    getAllProducts(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_PATHS.map(
    (path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path === "/vaastu-advisory" || path === "/geopathic-stress" ? 0.9 : 0.7,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.createdAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/shop/${product.slug}`),
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  // Ensure sitemap always resolves even if env is missing during build.
  void getSiteUrl();

  return [...staticEntries, ...blogEntries, ...productEntries];
}
