import FlowingMenu, { type FlowingMenuItem } from "@/components/shared/FlowingMenu";

const ITEMS: FlowingMenuItem[] = [
  {
    link: "/vastu-advisory",
    text: "Vastu Advisory",
    image: "/images/background4.png",
  },
  {
    link: "/cupping-healing",
    text: "Cupping & Healing",
    image: "/images/Healing_Therapy.png",
  },
  {
    link: "/shop",
    text: "Sacred Geometry",
    image: "/images/background3.png",
  },
];

/**
 * Full-width FlowingMenu strip positioned after the hero.
 * Acts as a dramatic, interactive site-section intro.
 */
export default function FlowingNav() {
  return (
    <section
      aria-label="Site navigation strip"
      style={{ height: "clamp(240px, 30vh, 360px)" }}
    >
      <FlowingMenu
        items={ITEMS}
        speed={18}
        textColor="#ede8dd"
        bgColor="#0e0d12"
        marqueeBgColor="#b87333"
        marqueeTextColor="#0e0d12"
        borderColor="rgba(212, 175, 106, 0.2)"
      />
    </section>
  );
}
