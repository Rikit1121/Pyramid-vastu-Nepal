import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FlowingNav from "@/components/home/FlowingNav";
import BrandIntro from "@/components/home/BrandIntro";
import ServicesBlock from "@/components/home/ServicesBlock";
import BookSessionSection from "@/components/home/BookSessionSection";
import BlogTeaser from "@/components/home/BlogTeaser";
import ShopShowcase from "@/components/home/ShopShowcase";
import AdvisorSection from "@/components/home/AdvisorSection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  titleAbsolute:
    "Pyramid Vaastu Nepal | Vaastu Consultant & Geopathic Stress Expert in Kathmandu",
  description:
    "Book Vaastu advisory, geopathic stress assessment, and pyramid yantra remedies in Kathmandu. Personal consultations for homes and workplaces across Nepal.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlowingNav />
      <BrandIntro />
      <ServicesBlock />
      <BookSessionSection />
      <BlogTeaser />
      <ShopShowcase />
      <AdvisorSection />
    </>
  );
}
