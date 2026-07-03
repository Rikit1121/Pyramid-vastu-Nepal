import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { SERVICES } from "@/lib/services";
import { getPrimaryAdvisor } from "@/lib/advisors";

export const metadata: Metadata = {
  title: "Cupping & Healing Therapy",
  description:
    "Traditional cupping and energy-healing therapy to restore circulation, release tension, and rebalance your body's natural flow.",
};

export default async function CuppingHealingPage() {
  const service = SERVICES["cupping-healing"];
  const advisor = await getPrimaryAdvisor();
  return (
    <ServicePageLayout
      service={service}
      heroImage={service.heroImage}
      pageBackgroundImage="/images/background5.png"
      processImage="/images/Healing.png"
      processImageAlt="Cupping therapy session setting"
      benefitsImage="images/Cupping.png"
      benefitsImageAlt="Calm wellness and body healing"
      advisor={advisor}
    />
  );
}
