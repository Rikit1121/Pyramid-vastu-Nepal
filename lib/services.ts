import type { Advisor, Service } from "@/types";
import { WHATSAPP_NUMBER } from "@/lib/contact";

export const ADVISOR: Advisor = {
  name: "Pyramid Vaastu Nepal",
  role: "Certified Vaastu & Healing Expert",
  languages: ["Nepali", "Hindi", "English"],
  photo: "/images/Advisor.png",
  whatsappNumber: WHATSAPP_NUMBER,
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
      "Vastu Shastra is the ancient Vedic science of spatial harmony — a system refined over 5,000 years that maps how the flow of energy through your living and working spaces affects every dimension of your life. From the quality of your sleep and the clarity of your thinking, to the health of your relationships and the growth of your business, the energy configuration of your space plays a direct and measurable role.\n\nOur Vastu Advisory service assesses your space across all key dimensions: directional alignment, elemental balance, Brahmasthan (centre) energy, room-by-room function, and the placement of furniture and structural elements. We then provide a clear, practical correction plan — using pyramid yantras, directional adjustments, and energy tools available in our shop — that requires no construction, no breaking, and no disruption to your daily life.",
    process: [
      {
        title: "Initial Consultation",
        description:
          "We begin with a detailed discussion of your space, your goals, and any existing challenges you have noticed — sleep quality, focus, relationships, finances — all of which can have spatial roots.",
      },
      {
        title: "Space Analysis",
        description:
          "Using your floor plan and, where needed, a site visit, we map the directional zones (Vastu Mandala), identify elemental imbalances, and note any structural factors — entrance direction, kitchen placement, bathroom locations, Brahmasthan obstructions — that may be affecting the energy of the space.",
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
      "Cupping therapy is one of the world's oldest physical healing modalities — practiced for thousands of years across Nepali, Chinese, and Ayurvedic traditions. By creating gentle suction at specific meridian points and body zones, cupping lifts underlying tissue, promotes deep blood flow, releases muscular stagnation, and encourages the movement of blocked energy through the body.\n\nAt Pyramid Vaastu Nepal, we combine traditional cupping with complementary energy-healing techniques — including pyramid energy tools and healing therapy — to address not just the physical symptoms but the energetic roots of chronic tension, fatigue, and stress. This integrated approach means our sessions support you on multiple levels simultaneously: physical release, energetic rebalancing, and deep nervous system rest.\n\nSessions are available for individuals dealing with chronic back, neck, and shoulder tension; recurring headaches; anxiety and poor sleep; and general fatigue or energetic depletion. No prior experience with cupping or energy healing is required — our therapist will guide you through every step.",
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
