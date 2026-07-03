# Content Update — Pyramid Vaastu Nepal
# Hand this entire file to Cursor for the content pass.

---

## 1. CONTACT DETAILS — fix everywhere they appear (footer, contact page, advisor card, WhatsApp buttons)

**Primary WhatsApp number (used in all WhatsAppButton components):** 9851151618
**All phone numbers (display on contact page and footer):**
- Mobile: 9851151618
- Mobile: 9801051618
- Mobile: 9768582618
- Landline: 01-5909618

**Emails:**
- pyramidvaastunepal618@gmail.com
- pyramid369618@gmail.com

**Social:**
- Instagram: https://www.instagram.com/pyramidvaastunepal
- Facebook: https://www.facebook.com/pyramidvaastunepal
- YouTube: https://www.youtube.com/@PyramidVaastuNepal

**Advisor name:** replace "Meroworks" placeholder with "Pyramid Vaastu Nepal"
**Advisor role:** "Certified Vaastu & Healing Expert"
**Advisor languages:** Nepali, Hindi, English

---

## 2. REPETITION FIX — credibility stats appear too many times

The "13+ years / 57 countries / Jeeten Pyramid certified" facts should appear ONLY in the homepage Philosophy/Stats section.

**Remove from:**
- Advisor section on homepage (just keep the WhatsApp CTA, no stats)
- Footer tagline (change to: "Ancient wisdom. Modern healing. Rooted in Kathmandu.")
- Any service page that repeats these stats

**Footer tagline replacement:**
"Ancient wisdom. Modern healing. Rooted in Kathmandu."

---

## 3. BOOK APPOINTMENT SECTION — add to homepage

**Position:** Between the Services block and the Shop teaser section.

**Section content:**
- Overline: "READY TO BEGIN?"
- Heading: "Book Your Session"
- Subtext: "Whether you're seeking Vastu alignment for your space or a healing therapy session, we're here to guide you. Reach out on WhatsApp for a quick response."
- Primary CTA button: "Book on WhatsApp" → WhatsAppButton with message: "Namaste! I'd like to book a session with Pyramid Vaastu Nepal. Could you please share your availability?"
- Secondary link: "Or send us a message →" linking to /contact
- Visual treatment: full-width section, bg-surface, centered, generous padding — similar weight to the advisor section but positioned higher in the page flow

---

## 4. SERVICE PAGES — add more images, reduce repetition

Both /vastu-advisory and /cupping-healing currently have only 1 image (the hero). Add images to make each page feel richer — 3 visual moments per page minimum.

**For /vastu-advisory — image placements:**
1. Hero image: keep existing picsum placeholder (client will replace)
2. Process section: add a secondary image alongside the steps (a consultation/floor-plan style image) — use picsum seed "vastu-process" for now
3. Benefits section: add a background image or side image (a home interior, warm and calm) — use picsum seed "vastu-home" for now

**For /cupping-healing — image placements:**
1. Hero image: keep existing
2. Process section: add an image showing a therapy setting — picsum seed "cupping-therapy"  
3. Benefits section: add a calm wellness/body image — picsum seed "healing-wellness"

All images: 0px border-radius (sharp frame per design.md), aspect ratio appropriate to their placement.

---

## 5. CONTACT PAGE — add office photos

The client has added office photos to /public/images/ named office1.png, office2.png (and possibly more with the same naming pattern — check for all files matching office*.png or office*.jpg in /public/images/).

**Add to contact page:**
- A new "Visit Us" section below the contact form / above the footer
- Heading: "Our Office"
- Subheading: "Come visit us in Kathmandu — we'd love to meet you in person."
- Display the office photos in a simple 2-column grid (stack on mobile), sharp 0px frames per design.md
- Below photos: address placeholder text "Kathmandu, Nepal" (client will update with exact address)
- Office hours placeholder: "Sunday – Friday: 10:00 AM – 6:00 PM" (client to confirm)

---

## 6. PRODUCTS — replace all 5 placeholder products with real Jiten Pyramid products

Replace the entire contents of lib/products.ts placeholder data (or seed via Supabase if the DB cutover is complete) with these 6 real products. These are genuine Jiten Pyramid products certified and sold by Pyramid Vaastu Nepal.

Use picsum placeholder images for now (client will upload real product photos via /admin). Prices are in NPR — use reasonable estimates based on the product tier (client will correct via admin).

---

### Product 1: Pyron 9G
**Slug:** pyron-9g
**Price:** 3500
**Material:** Copper & Gold
**Size:** Standard (wall/floor mount)
**In Stock:** true
**Short description:** All-round prosperity yantra combining pyramid power with pre-programmed copper discs for fast, lasting results.

**Full description (300+ words):**
The Pyron 9G is one of the most versatile and effective Vastu correction tools available from the Jiten Pyramid range — and one of Pyramid Vaastu Nepal's most trusted recommendations for homes and offices alike. Designed for all-round prosperity, this yantra brings together the ancient power of pyramid geometry with modern precision engineering, making it accessible and effective for everyday use.

At its core, the Pyron 9G houses 9 pyramid yantras arranged within an 81-base pyramid grid — a configuration that maximises the flow of cosmic energy into your space. What sets it apart from simpler pyramid yantras is the addition of 9 pre-programmed copper discs embedded at the base. These discs are charged to work continuously as a cosmic energy harmoniser, addressing the day-to-day energetic challenges that affect sleep quality, relationships, finances, and overall well-being.

The yantra is equally effective whether mounted on a wall with a brass screw or placed flat in a specific directional position on a shelf, floor, or ceiling — your Pyramid Vaastu Nepal consultant will advise on the optimal placement based on your home or office layout and the Vastu zones that need correction.

In Vastu Shastra, the Brahmasthan (central zone) and the Northeast corner are considered the most powerful energy centres of any space. The Pyron 9G, when correctly placed in relation to these zones, acts as a continuous energy transmitter — drawing in positive prana and neutralising the stagnant or negative energies that cause disharmony.

Over time, clients who have used the Pyron 9G report improvements in clarity of thought, smoother interpersonal relationships at home, and a general sense of lightness and ease in the space. This is not a one-time remedy — it works continuously, requiring no maintenance or ritual beyond the initial placement and programming guided by your consultant.

Certified by Prof. Dr. Jiten Bhatt's Jiten Pyramid institute — the 48-year-old authority on Pyramid Vaastu science — and brought to Nepal by Pyramid Vaastu Nepal with 13 years of consultancy experience, the Pyron 9G is a reliable, proven tool for anyone beginning their Vastu correction journey.

**Benefits:**
- All-round prosperity and positive energy flow
- Continuous cosmic energy harmonisation
- Improves clarity, relationships, and financial flow
- Suitable for homes, offices, shops, and factories
- Easy placement — wall, floor, or ceiling mount

---

### Product 2: FlatMax Copper
**Slug:** flatmax-copper
**Price:** 5500
**Material:** Pure Copper
**Size:** Flat panel (fits under tiles or on ceiling)
**In Stock:** true
**Short description:** The ultimate Vastu correction tool for apartments and flats — flat enough to install under flooring, inside walls, or on ceilings without any structural changes.

**Full description (300+ words):**
The FlatMax Copper is a revolutionary Vastu correction yantra specifically engineered for modern apartments, flats, and spaces where conventional pyramid tools cannot be placed due to size or space constraints. Developed by Prof. Dr. Jiten Bhatt after years of research into urban living challenges, the FlatMax solves one of the most common problems Vastu practitioners face: how to achieve deep, lasting energy correction in a compact space without any breaking, cracking, or construction work.

The FlatMax earns its name from its uniquely flat profile — slim enough to be fixed under tiles during renovation, inserted into false ceilings, or mounted flush against a wall, completely hidden from view. This makes it ideal not just for existing apartments, but for builders and developers who wish to pre-install Vastu correction tools in new flats before sale — one of the most forward-thinking applications of Pyramid Vaastu science in modern construction.

Beneath its slim exterior, the FlatMax Copper contains a dense configuration of Vastu correction tools: 9 copper pyramid yantras arranged in a grid, 81 pyra-grid cells, 81 radiating crystals for energy amplification, and 81 directional copper arrows that work to re-align the flow of energy within the space along the correct Vastu directional axes.

The result is a correction yantra that punches well above its size — addressing center (Brahmasthan) imbalances, directional doshas, and elemental imbalances that affect everything from career growth to family harmony. Because it works at the structural level of the space, its effects are continuous and deep rather than surface-level.

For those living in apartments where traditional Vastu remedies feel impractical or aesthetically incompatible, the FlatMax Copper offers a clean, invisible, and scientifically grounded solution. Pyramid Vaastu Nepal's certified consultants will assess your floor plan and identify the precise location for installation.

**Benefits:**
- Flat design — installs under tiles, in ceilings, or behind walls
- No construction damage required
- Deep Brahmasthan and directional correction
- 9 copper pyramids + 81 pyra-grid + 81 radiating crystals
- Ideal for apartments, flats, and new construction projects

---

### Product 3: Fatron Yantra
**Slug:** fatron-yantra
**Price:** 2800
**Material:** Copper & Gold
**Size:** Octagonal, wall-mount
**In Stock:** true
**Short description:** An octagonal energy booster for success and creativity — ideal for kitchens, living rooms, offices, and near study or work areas.

**Full description (300+ words):**
The Fatron Yantra is a uniquely designed Vastu tool focused on a single powerful outcome: increasing energy. Specifically, it is designed to boost the creative, productive, and success-oriented energy of a space — making it one of the most practical and widely applicable yantras in the Jiten Pyramid range.

The Fatron's octagonal shape is not arbitrary. In sacred geometry, the octagon represents the meeting point of the earthly square and the heavenly circle — a threshold between the material and the energetic. Eight copper triangles radiate from this octagonal base, converging at a centre that houses 9 pyramid yantras. On the reverse side, a gold radiating circular spiral plate attracts the infinite flow of positive energy from the universe into your space. This dual-sided design means the Fatron is simultaneously drawing in positive energy and radiating it outward — a rare combination in a single yantra.

In practical Vastu terms, the Fatron is recommended for spaces where energy tends to become dull or stagnant: kitchens where the fire element needs support, living rooms where family energy needs lifting, near computers and workstations where mental clarity and creativity are needed, and in children's rooms to support focus and learning. Marketing professionals and business owners find particular benefit from the Fatron placed near their workspace, as it is specifically noted for helping individuals meet targets and generate new ideas.

Charging and activating the Fatron is simple — hold it between both palms, set a clear intention or purpose, and place it in the recommended location. It can be fixed with a brass screw or simply placed on a surface. For multiple placements, the Fatron can be used in pairs or sets for amplified results.

Sold and installed by Pyramid Vaastu Nepal with 13 years of consultancy experience, the Fatron comes pre-programmed and ready for placement as per your consultant's guidance.

**Benefits:**
- Boosts creative energy and mental clarity
- Supports success, new ideas, and productivity
- Ideal for kitchens, living rooms, offices, near computers
- Octagonal sacred geometry design with copper and gold elements
- Simple activation — no rituals, no maintenance

---

### Product 4: Natron Yantra
**Slug:** natron-yantra
**Price:** 2200
**Material:** Copper
**Size:** Hexagonal, shelf or screw-mount
**In Stock:** true
**Short description:** A hexagonal copper yantra designed to neutralise negative energy in bathrooms, toilets, and other energetically challenging spaces.

**Full description (300+ words):**
In Vastu Shastra, attached toilets and bathrooms represent one of the most common and challenging energy problems in modern homes. The presence of toilet facilities inside or adjacent to living spaces — especially when attached to bedrooms, near the kitchen, or in the Northeast zone — creates a persistent source of negative energy that can affect sleep, health, relationships, and finances. Traditional Vastu remedies for these spaces were often structural and impractical. The Natron Yantra changes that.

Developed by Jiten Pyramid as a revolutionary solution specifically for bathrooms, toilets, and other negatively charged spaces, the Natron is a hexagonal yantra featuring 8 copper triangles converging toward a copper dome at the centre. Inside the dome is a sealed chamber designed to hold non-iodised sea salt — a powerful natural absorber of negative energies that has been used in cleansing practices across cultures for thousands of years. The combination of the geometric copper structure and the sea salt creates a continuous energy absorption field within the room.

The Natron is discreet and easy to install — it can be mounted with a brass screw or simply placed on a shelf inside the bathroom. Once placed, it works silently and continuously, requiring only occasional replacement of the sea salt to maintain its effectiveness (a simple process that takes less than a minute). This makes it one of the lowest-maintenance Vastu tools available while addressing one of the highest-impact problem areas in any home or office.

Pyramid Vaastu Nepal recommends the Natron for virtually every modern home with attached toilets — which, in today's urban construction landscape, means nearly all homes can benefit. It is one of the first tools placed during a full Vastu correction consultation.

**Benefits:**
- Specifically designed for bathrooms and toilets
- Absorbs and neutralises negative energy continuously
- Hexagonal copper geometry with sea salt absorption chamber
- Discreet — mounts on wall or sits on shelf
- Low maintenance — only sea salt replacement needed

---

### Product 5: Education Pyramid — Saraswati Yantra
**Slug:** education-pyramid-saraswati
**Price:** 3200
**Material:** Copper
**Size:** 3-tier vertical, wall-mount near study area
**In Stock:** true
**Short description:** A three-tier pyramid yantra dedicated to academic success, memory retention, and the blessings of Goddess Saraswati — designed for students and learners of all ages.

**Full description (300+ words):**
The Education Pyramid with Saraswati Yantra is one of the most purposeful and focused tools in the Jiten Pyramid range — designed with a single, powerful intention: to support students and learners in achieving academic success, improving memory retention, and accessing deeper levels of knowledge and understanding.

The yantra consists of three pyramid yantras placed one above the other — representing the three levels of consciousness (conscious, subconscious, and superconscious). At the apex of this three-tier structure sits the Saraswati Yantra, charged with the energy of Goddess Saraswati, the Hindu goddess of knowledge, wisdom, learning, and the arts. In the Vedic tradition, Saraswati's blessings are considered essential for academic achievement — and this yantra serves as a physical anchor for that energy in the student's study space.

The design includes dedicated spaces for personalisation: a slot for writing a wish or positive affirmation (such as a study goal or exam target), a slot for the student's photograph, and a slot for the student's name or signature in their own handwriting. These personalisation elements, combined with the charged pyramid yantras, create a deeply intentional and individual tool rather than a generic remedy.

Placement is specific and important: the Education Pyramid should be fixed on the east wall, directly in the student's line of sight while studying. As the student faces east — the direction associated with new beginnings, sunrise, and the awakening of knowledge — the yantra and the rising sun's energy work together to support focus, retention, and mental clarity during study sessions.

Parents seeking to support their children's academic performance, and adults engaged in professional learning or skill development, both find consistent benefit from this yantra. Pyramid Vaastu Nepal's consultants can guide on exact placement based on the student's room layout.

**Benefits:**
- Dedicated to academic success and memory enhancement
- Three-tier pyramid structure representing three levels of consciousness
- Includes Saraswati Yantra at apex for divine blessings of knowledge
- Personalised — slots for wish, photo, and student's own handwriting
- Wall-mount facing east for optimal energy alignment

---

### Product 6: Pyra Max 9x9 (Supermax)
**Slug:** pyra-max-9x9
**Price:** 12500
**Material:** Copper & Gold
**Size:** 9x9 inches
**In Stock:** true
**Short description:** The flagship Vastu correction yantra from Jiten Pyramid — a 9x9 inch multi-layer energy grid for powerful Brahmasthan and whole-space correction.

**Full description (300+ words):**
The Pyra Max 9x9, known among Pyramid Vaastu practitioners as the Supermax, is the flagship correction tool in the Jiten Pyramid range — and the most comprehensive single-yantra solution available for whole-space Vastu correction. Where other yantras address specific zones or specific problems, the Pyra Max 9x9 works at the level of the entire space, correcting directional doshas, elemental imbalances, and Brahmasthan (centre) energies simultaneously.

At 9x9 inches, the Pyra Max contains a multi-layer energy grid of extraordinary complexity: 81 copper yantras with radiating crystals, 9 gold booster ring plates with 72 directional copper arrows, and a base configuration that creates overlapping fields of energy correction in every direction simultaneously. The 9x9 grid geometry is based on the ancient Vastu Purusha Mandala — the sacred diagram used in Vedic architecture to map the energy field of any space — making this yantra a direct geometric translation of that 5000-year-old science.

The Pyra Max is recommended for placement in the Brahmasthan — the exact centre of the home or office — which in Vastu Shastra is the most energetically sensitive point of any space. Correct placement here affects the entire property, radiating correction energy outward through all the directional zones. Where the Brahmasthan has been compromised (by a pillar, staircase, toilet, or heavy furniture placed at the centre), the Pyra Max is one of the few tools powerful enough to correct the imbalance without requiring physical changes to the structure.

This is the tool Pyramid Vaastu Nepal recommends for clients who are serious about full, lasting Vastu correction — particularly for large homes, offices, or commercial spaces where the cumulative effect of multiple Vastu doshas requires a comprehensive correction approach. It represents an investment in the energy quality of your space for years to come.

**Benefits:**
- Whole-space correction — addresses all directional doshas simultaneously
- Based on Vastu Purusha Mandala — the ancient 9x9 sacred grid
- 81 copper yantras + 72 directional copper arrows + 9 gold booster plates
- Ideal for Brahmasthan placement in large homes, offices, commercial spaces
- Most powerful single yantra in the Jiten Pyramid range

---

## 7. VASTU ADVISORY PAGE — updated copy (no repetition of stats)

**Overview section — replace current text with:**
Vastu Shastra is the ancient Vedic science of spatial harmony — a system refined over 5,000 years that maps how the flow of energy through your living and working spaces affects every dimension of your life. From the quality of your sleep and the clarity of your thinking, to the health of your relationships and the growth of your business, the energy configuration of your space plays a direct and measurable role.

Our Vastu Advisory service assesses your space across all key dimensions: directional alignment, elemental balance, Brahmasthan (centre) energy, room-by-room function, and the placement of furniture and structural elements. We then provide a clear, practical correction plan — using pyramid yantras, directional adjustments, and energy tools available in our shop — that requires no construction, no breaking, and no disruption to your daily life.

**Process — update step 2 (currently missing/truncated in screenshot):**
Step 2 title: "Space Analysis"
Step 2 description: "Using your floor plan and, where needed, a site visit, we map the directional zones (Vastu Mandala), identify elemental imbalances, and note any structural factors — entrance direction, kitchen placement, bathroom locations, Brahmasthan obstructions — that may be affecting the energy of the space."

---

## 8. CUPPING & HEALING PAGE — updated overview (make it feel distinct from Vastu page)

**Overview section — replace current text with:**
Cupping therapy is one of the world's oldest physical healing modalities — practiced for thousands of years across Nepali, Chinese, and Ayurvedic traditions. By creating gentle suction at specific meridian points and body zones, cupping lifts underlying tissue, promotes deep blood flow, releases muscular stagnation, and encourages the movement of blocked energy through the body.

At Pyramid Vaastu Nepal, we combine traditional cupping with complementary energy-healing techniques — including pyramid energy tools and healing therapy — to address not just the physical symptoms but the energetic roots of chronic tension, fatigue, and stress. This integrated approach means our sessions support you on multiple levels simultaneously: physical release, energetic rebalancing, and deep nervous system rest.

Sessions are available for individuals dealing with chronic back, neck, and shoulder tension; recurring headaches; anxiety and poor sleep; and general fatigue or energetic depletion. No prior experience with cupping or energy healing is required — our therapist will guide you through every step.
