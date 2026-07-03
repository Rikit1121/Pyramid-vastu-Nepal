import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { SERVICES } from "@/lib/services";
import { getPrimaryAdvisor } from "@/lib/advisors";

export const metadata: Metadata = {
  title: "Vastu Advisory",
  description:
    "Align your home or workplace with the timeless principles of Vastu Shastra. Personalised Vastu consultations in Kathmandu.",
};

export default async function VastuAdvisoryPage() {
  const service = SERVICES["vastu-advisory"];
  const advisor = await getPrimaryAdvisor();
  return (
    <ServicePageLayout
      service={service}
      heroImage="/images/Advisor.png"
      heroImageAlt={advisor.name}
      pageBackgroundImage="/images/background4.png"
      processImage="images/Advisor3.png"
      processImageAlt="Vastu consultation and floor plan review"
      benefitsImage="images/Advisor4.png"
      benefitsImageAlt="Benefits of Vastu Advisory"
      advisor={advisor}
    />
  );
}
