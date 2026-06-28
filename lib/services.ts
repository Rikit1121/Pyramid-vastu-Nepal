import type { Advisor, Service } from "@/types";

export const ADVISOR: Advisor = {
  name: "Pyramid Vaastu Nepal",
  role: "Certified Pyramid Vastu Expert · 13 Years in Practice",
  languages: ["Nepali", "Hindi", "English"],
  photo: "/images/Advisor.png",
  whatsappNumber: "9779851151618",
};

// Extended service data — heroImage is separate from the Service type so the
// base type stays clean (architecture.md defines Service without image URLs).
type ServiceData = Service & { heroImage: string };

export const SERVICES: Record<Service["slug"], ServiceData> = {
  "vastu-advisory": {
    slug: "vastu-advisory",
    name: "Vastu Advisory",
    tagline:
      "Align your home or workplace with the timeless principles of Vastu Shastra.",
    overview:
      "Vastu Shastra is the ancient Indian science of spatial harmony — a precise system that maps the flow of energy through your living and working spaces. A balanced Vastu environment supports clarity, well-being, and prosperity. Our consultations assess directional alignment, room placement, elemental balance, and energy pathways, and provide you with a clear, actionable plan to bring your space into alignment.",
    process: [
      {
        title: "Initial Consultation",
        description:
          "We begin with a detailed discussion of your space, your goals, and any existing challenges you have noticed — sleep quality, focus, relationships, finances — all of which can have spatial roots.",
      },
      {
        title: "Space Assessment",
        description:
          "Using floor plans and, where possible, a site visit, we map the directional zones (Vastu mandala), identify imbalances in the five elements, and note structural factors that may be affecting the energy of the space.",
      },
      {
        title: "Personalised Recommendations",
        description:
          "We provide a written report with prioritised, practical remedies — from furniture placement and colour guidance to the use of pyramids, yantras, and other Vastu tools available in our shop.",
      },
      {
        title: "Follow-Up Review",
        description:
          "After you have implemented the changes, we schedule a follow-up to assess the results and refine the plan as needed.",
      },
    ],
    benefits: [
      "Improved sleep quality and mental clarity",
      "Stronger focus and productivity in work spaces",
      "Reduced household stress and tension",
      "Better flow of natural light and energy through the home",
      "Practical, non-invasive remedies suited to modern living",
    ],
    advisorWhatsAppMessage:
      "Namaste! I'd like to book a Vastu consultation for my space. Could you please share your availability and session details?",
    heroImage: "/images/background3.png",
  },

  "cupping-healing": {
    slug: "cupping-healing",
    name: "Cupping & Healing Therapy",
    tagline:
      "Restore circulation, release tension, and rebalance your body's natural energy flow.",
    overview:
      "Cupping therapy is one of the oldest healing modalities in the world — used across traditional Nepali, Chinese, and Ayurvedic medicine for centuries. By applying cups to specific points on the body, the therapy creates gentle suction that lifts underlying tissue, promotes blood flow, and encourages the release of stagnation. We combine traditional cupping with complementary energy-healing techniques to address both the physical and energetic dimensions of your well-being.",
    process: [
      {
        title: "Health & Wellness Intake",
        description:
          "Your first session begins with a conversation about your health history, current concerns, stress levels, and specific areas of tension or discomfort.",
      },
      {
        title: "Preparation & Points Selection",
        description:
          "Based on your intake, we identify the appropriate meridian points and body zones for cupping, and prepare the therapy area for a calm, grounded experience.",
      },
      {
        title: "Cupping Session",
        description:
          "We apply cups — typically along the back, shoulders, and key meridian lines — leaving them in place for 10–15 minutes. Stationary and gliding techniques are used depending on your needs.",
      },
      {
        title: "Closing & Integration",
        description:
          "The session closes with light energy work and breathing guidance. We share care notes and, where relevant, suggest complementary Vastu or yantra tools to support ongoing healing.",
      },
    ],
    benefits: [
      "Relief from chronic back, neck, and shoulder tension",
      "Improved circulation and lymphatic drainage",
      "Reduced anxiety and better sleep",
      "Release of deep-seated muscular stagnation",
      "A grounded, renewed sense of physical and energetic ease",
    ],
    advisorWhatsAppMessage:
      "Namaste! I'd like to book a cupping and healing therapy session. Could you please share your availability and session details?",
    heroImage: "/images/Healing_Therapy.png",
  },
};
