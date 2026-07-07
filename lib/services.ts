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
  "vaastu-advisory": {
    slug: "vaastu-advisory",
    name: "Vaastu Advisory",
    tagline:
      "Align your home or workplace with the timeless principles of Vaastu Shastra.",
    overview:
      "Vaastu Shastra is the ancient Vedic science of spatial harmony — a system refined over 5,000 years that maps how the flow of energy through your living and working spaces affects every dimension of your life. From the quality of your sleep and the clarity of your thinking, to the health of your relationships and the growth of your business, the energy configuration of your space plays a direct and measurable role.\n\nOur Vaastu Advisory service assesses your space across all key dimensions: directional alignment, elemental balance, Brahmasthan (centre) energy, room-by-room function, and the placement of furniture and structural elements. We then provide a clear, practical correction plan — using pyramid yantras, directional adjustments, and energy tools available in our shop — that requires no construction, no breaking, and no disruption to your daily life.",
    process: [
      {
        title: "Initial Consultation",
        description:
          "We begin with a detailed discussion of your space, your goals, and any existing challenges you have noticed — sleep quality, focus, relationships, finances — all of which can have spatial roots.",
      },
      {
        title: "Space Analysis",
        description:
          "Using your floor plan and, where needed, a site visit, we map the directional zones (Vaastu Mandala), identify elemental imbalances, and note any structural factors — entrance direction, kitchen placement, bathroom locations, Brahmasthan obstructions — that may be affecting the energy of the space.",
      },
      {
        title: "Personalised Recommendations",
        description:
          "We provide a written report with prioritised, practical remedies — from furniture placement and colour guidance to the use of pyramids, yantras, and other Vaastu tools available in our shop.",
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
      "Namaste! I'd like to book a Vaastu consultation for my space. Could you please share your availability and session details?",
    heroImage: "/images/background3.png",
  },

  "geopathic-stress": {
    slug: "geopathic-stress",
    name: "Geopathic Stress Assessment & Remedy",
    tagline:
      "Identify and neutralise the hidden earth energies affecting your health, sleep, and well-being.",
    overview:
      "Geopathic stress refers to harmful earth energies — underground water veins, geological fault lines, and natural radiation zones — that emanate from the earth and disturb the energy field of any space built above them. The word itself comes from the Greek 'geo' (earth) and 'pathos' (suffering): literally, suffering caused by the earth beneath us.\n\nUnlike Vaastu doshas, which arise from the design and layout of a structure, geopathic stress originates from the land itself — and because it operates at a subtle energetic level, it often goes undetected while causing chronic, persistent health and well-being problems in the people living or working in the affected space. At Pyramid Vaastu Nepal, we use a combination of traditional detection methods (dowsing rods, pendulums) and specialised pyramid yantra tools to identify and neutralise geopathic stress zones — without any construction, drilling, or disruption to your space.",
    process: [
      {
        title: "Initial Assessment",
        description:
          "We begin with a detailed consultation about the health patterns, sleep quality, and recurring problems experienced by the people in the space — as these often reveal the signature of geopathic stress long before any instruments are used.",
      },
      {
        title: "Detection & Mapping",
        description:
          "Using dowsing rods, pendulums, and energy scanning techniques refined over 13 years of practice, we identify the precise location, direction, and intensity of geopathic stress lines running through your home or office.",
      },
      {
        title: "Pyramid Yantra Placement",
        description:
          "Specialised geopathic stress neutraliser yantras and copper pyramid tools are placed at the identified stress points — under beds, at corners of the property, and at key intersection zones — to absorb, reflect, and transmute the harmful earth rays.",
      },
      {
        title: "Follow-up & Verification",
        description:
          "We return or check in after an agreed period to verify that the remedies are working and that the energy field of the space has stabilised. Adjustments are made if needed, and guidance is provided for ongoing maintenance.",
      },
    ],
    benefits: [
      "Improved sleep quality and deeper rest",
      "Reduced chronic fatigue, headaches, and morning grogginess",
      "Relief from persistent anxiety, depression, and nervousness",
      "Better concentration and mental clarity at home and work",
      "Healthier, more harmonious environment for the whole family",
      "No construction, drilling, or structural changes required",
    ],
    advisorWhatsAppMessage:
      "Namaste! I'm interested in a Geopathic Stress assessment for my space. Could you please share your availability and session details?",
    heroImage: "/images/Healing_Therapy.png",
  },
};
