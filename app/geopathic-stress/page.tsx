import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import JsonLd from "@/components/seo/JsonLd";
import { SERVICES } from "@/lib/services";
import { getActiveAdvisors } from "@/lib/advisors";
import { breadcrumbJsonLd, buildPageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Geopathic Stress Assessment & Remedy",
  description:
    "Identify and neutralise harmful earth energies affecting your health, sleep, and well-being — using dowsing, pendulums, and pyramid yantra remedies in Kathmandu, Nepal.",
  path: "/geopathic-stress",
  ogImage: "/images/Healing.png",
});

export default async function GeopathicStressPage() {
  const service = SERVICES["geopathic-stress"];
  const advisors = await getActiveAdvisors();
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service, "/geopathic-stress"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Geopathic Stress", path: "/geopathic-stress" },
          ]),
        ]}
      />
      <ServicePageLayout
        service={service}
        heroImage={service.heroImage}
        pageBackgroundImage="/images/background5.png"
        processImage="/images/Healing.png"
        processImageAlt="Geopathic stress assessment setting"
        benefitsImage="images/Cupping.png"
        benefitsImageAlt="A healthier, more harmonious living environment"
        advisors={advisors}
      />
    </>
  );
}
