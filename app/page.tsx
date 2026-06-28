import Hero from "@/components/home/Hero";
import FlowingNav from "@/components/home/FlowingNav";
import BrandIntro from "@/components/home/BrandIntro";
import ServicesBlock from "@/components/home/ServicesBlock";
import ShopShowcase from "@/components/home/ShopShowcase";
import AdvisorSection from "@/components/home/AdvisorSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlowingNav />
      <BrandIntro />
      <ServicesBlock />
      <ShopShowcase />
      <AdvisorSection />
    </>
  );
}
