import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import JsonLd from "@/components/seo/JsonLd";
import { SERVICES } from "@/lib/services";
import { getActiveAdvisors } from "@/lib/advisors";
import { breadcrumbJsonLd, buildPageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Vaastu Advisory",
  description:
    "Align your home or workplace with the timeless principles of Vaastu Shastra. Personalised Vaastu consultations in Kathmandu, Nepal.",
  path: "/vaastu-advisory",
  ogImage: "/images/Advisor.png",
});

export default async function VaastuAdvisoryPage() {
  const service = SERVICES["vaastu-advisory"];
  const advisors = await getActiveAdvisors();
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service, "/vaastu-advisory"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Vaastu Advisory", path: "/vaastu-advisory" },
          ]),
        ]}
      />
      <ServicePageLayout
        service={service}
        heroImage="/images/Advisor.png"
        heroImageAlt={advisors[0]?.name ?? service.name}
        pageBackgroundImage="/images/background4.png"
        processImage="images/Advisor3.png"
        processImageAlt="Vaastu consultation and floor plan review"
        benefitsImage="images/Advisor4.png"
        benefitsImageAlt="Benefits of Vaastu Advisory"
        advisors={advisors}
      />
    </>
  );
}
