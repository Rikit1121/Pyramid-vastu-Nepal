-- =============================================================================
-- Pyramid Vaastu Nepal — real Jiten Pyramid product catalog (6 products)
-- =============================================================================
-- Run in Supabase Dashboard → SQL Editor after schema.sql.
-- Uses ON CONFLICT to upsert by slug — safe to re-run.
-- Images are picsum placeholders until real photos are uploaded via /admin.
-- =============================================================================

insert into public.products (slug, name, price, description, benefits, material, size, images, in_stock)
values
  (
    'pyron-9g',
    'Pyron 9G',
    3500,
    $pyron9g$The Pyron 9G is one of the most versatile and effective Vastu correction tools available from the Jiten Pyramid range — and one of Pyramid Vaastu Nepal's most trusted recommendations for homes and offices alike. Designed for all-round prosperity, this yantra brings together the ancient power of pyramid geometry with modern precision engineering, making it accessible and effective for everyday use.

At its core, the Pyron 9G houses 9 pyramid yantras arranged within an 81-base pyramid grid — a configuration that maximises the flow of cosmic energy into your space. What sets it apart from simpler pyramid yantras is the addition of 9 pre-programmed copper discs embedded at the base. These discs are charged to work continuously as a cosmic energy harmoniser, addressing the day-to-day energetic challenges that affect sleep quality, relationships, finances, and overall well-being.

The yantra is equally effective whether mounted on a wall with a brass screw or placed flat in a specific directional position on a shelf, floor, or ceiling — your Pyramid Vaastu Nepal consultant will advise on the optimal placement based on your home or office layout and the Vastu zones that need correction.

In Vastu Shastra, the Brahmasthan (central zone) and the Northeast corner are considered the most powerful energy centres of any space. The Pyron 9G, when correctly placed in relation to these zones, acts as a continuous energy transmitter — drawing in positive prana and neutralising the stagnant or negative energies that cause disharmony.

Over time, clients who have used the Pyron 9G report improvements in clarity of thought, smoother interpersonal relationships at home, and a general sense of lightness and ease in the space. This is not a one-time remedy — it works continuously, requiring no maintenance or ritual beyond the initial placement and programming guided by your consultant.

Certified by Prof. Dr. Jiten Bhatt's Jiten Pyramid institute — the 48-year-old authority on Pyramid Vaastu science — and brought to Nepal by Pyramid Vaastu Nepal with 13 years of consultancy experience, the Pyron 9G is a reliable, proven tool for anyone beginning their Vastu correction journey.$pyron9g$,
    array[
      'All-round prosperity and positive energy flow',
      'Continuous cosmic energy harmonisation',
      'Improves clarity, relationships, and financial flow',
      'Suitable for homes, offices, shops, and factories',
      'Easy placement — wall, floor, or ceiling mount'
    ],
    'Copper & Gold',
    'Standard (wall/floor mount)',
    array['https://picsum.photos/seed/pyron-9g/800/800'],
    true
  ),
  (
    'flatmax-copper',
    'FlatMax Copper',
    5500,
    $flatmax$The FlatMax Copper is a revolutionary Vastu correction yantra specifically engineered for modern apartments, flats, and spaces where conventional pyramid tools cannot be placed due to size or space constraints. Developed by Prof. Dr. Jiten Bhatt after years of research into urban living challenges, the FlatMax solves one of the most common problems Vastu practitioners face: how to achieve deep, lasting energy correction in a compact space without any breaking, cracking, or construction work.

The FlatMax earns its name from its uniquely flat profile — slim enough to be fixed under tiles during renovation, inserted into false ceilings, or mounted flush against a wall, completely hidden from view. This makes it ideal not just for existing apartments, but for builders and developers who wish to pre-install Vastu correction tools in new flats before sale — one of the most forward-thinking applications of Pyramid Vaastu science in modern construction.

Beneath its slim exterior, the FlatMax Copper contains a dense configuration of Vastu correction tools: 9 copper pyramid yantras arranged in a grid, 81 pyra-grid cells, 81 radiating crystals for energy amplification, and 81 directional copper arrows that work to re-align the flow of energy within the space along the correct Vastu directional axes.

The result is a correction yantra that punches well above its size — addressing center (Brahmasthan) imbalances, directional doshas, and elemental imbalances that affect everything from career growth to family harmony. Because it works at the structural level of the space, its effects are continuous and deep rather than surface-level.

For those living in apartments where traditional Vastu remedies feel impractical or aesthetically incompatible, the FlatMax Copper offers a clean, invisible, and scientifically grounded solution. Pyramid Vaastu Nepal's certified consultants will assess your floor plan and identify the precise location for installation.$flatmax$,
    array[
      'Flat design — installs under tiles, in ceilings, or behind walls',
      'No construction damage required',
      'Deep Brahmasthan and directional correction',
      '9 copper pyramids + 81 pyra-grid + 81 radiating crystals',
      'Ideal for apartments, flats, and new construction projects'
    ],
    'Pure Copper',
    'Flat panel (fits under tiles or on ceiling)',
    array['https://picsum.photos/seed/flatmax-copper/800/800'],
    true
  ),
  (
    'fatron-yantra',
    'Fatron Yantra',
    2800,
    $fatron$The Fatron Yantra is a uniquely designed Vastu tool focused on a single powerful outcome: increasing energy. Specifically, it is designed to boost the creative, productive, and success-oriented energy of a space — making it one of the most practical and widely applicable yantras in the Jiten Pyramid range.

The Fatron's octagonal shape is not arbitrary. In sacred geometry, the octagon represents the meeting point of the earthly square and the heavenly circle — a threshold between the material and the energetic. Eight copper triangles radiate from this octagonal base, converging at a centre that houses 9 pyramid yantras. On the reverse side, a gold radiating circular spiral plate attracts the infinite flow of positive energy from the universe into your space. This dual-sided design means the Fatron is simultaneously drawing in positive energy and radiating it outward — a rare combination in a single yantra.

In practical Vastu terms, the Fatron is recommended for spaces where energy tends to become dull or stagnant: kitchens where the fire element needs support, living rooms where family energy needs lifting, near computers and workstations where mental clarity and creativity are needed, and in children's rooms to support focus and learning. Marketing professionals and business owners find particular benefit from the Fatron placed near their workspace, as it is specifically noted for helping individuals meet targets and generate new ideas.

Charging and activating the Fatron is simple — hold it between both palms, set a clear intention or purpose, and place it in the recommended location. It can be fixed with a brass screw or simply placed on a surface. For multiple placements, the Fatron can be used in pairs or sets for amplified results.

Sold and installed by Pyramid Vaastu Nepal with 13 years of consultancy experience, the Fatron comes pre-programmed and ready for placement as per your consultant's guidance.$fatron$,
    array[
      'Boosts creative energy and mental clarity',
      'Supports success, new ideas, and productivity',
      'Ideal for kitchens, living rooms, offices, near computers',
      'Octagonal sacred geometry design with copper and gold elements',
      'Simple activation — no rituals, no maintenance'
    ],
    'Copper & Gold',
    'Octagonal, wall-mount',
    array['https://picsum.photos/seed/fatron-yantra/800/800'],
    true
  ),
  (
    'natron-yantra',
    'Natron Yantra',
    2200,
    $natron$In Vastu Shastra, attached toilets and bathrooms represent one of the most common and challenging energy problems in modern homes. The presence of toilet facilities inside or adjacent to living spaces — especially when attached to bedrooms, near the kitchen, or in the Northeast zone — creates a persistent source of negative energy that can affect sleep, health, relationships, and finances. Traditional Vastu remedies for these spaces were often structural and impractical. The Natron Yantra changes that.

Developed by Jiten Pyramid as a revolutionary solution specifically for bathrooms, toilets, and other negatively charged spaces, the Natron is a hexagonal yantra featuring 8 copper triangles converging toward a copper dome at the centre. Inside the dome is a sealed chamber designed to hold non-iodised sea salt — a powerful natural absorber of negative energies that has been used in cleansing practices across cultures for thousands of years. The combination of the geometric copper structure and the sea salt creates a continuous energy absorption field within the room.

The Natron is discreet and easy to install — it can be mounted with a brass screw or simply placed on a shelf inside the bathroom. Once placed, it works silently and continuously, requiring only occasional replacement of the sea salt to maintain its effectiveness (a simple process that takes less than a minute). This makes it one of the lowest-maintenance Vastu tools available while addressing one of the highest-impact problem areas in any home or office.

Pyramid Vaastu Nepal recommends the Natron for virtually every modern home with attached toilets — which, in today's urban construction landscape, means nearly all homes can benefit. It is one of the first tools placed during a full Vastu correction consultation.$natron$,
    array[
      'Specifically designed for bathrooms and toilets',
      'Absorbs and neutralises negative energy continuously',
      'Hexagonal copper geometry with sea salt absorption chamber',
      'Discreet — mounts on wall or sits on shelf',
      'Low maintenance — only sea salt replacement needed'
    ],
    'Copper',
    'Hexagonal, shelf or screw-mount',
    array['https://picsum.photos/seed/natron-yantra/800/800'],
    true
  ),
  (
    'education-pyramid-saraswati',
    'Education Pyramid — Saraswati Yantra',
    3200,
    $education$The Education Pyramid with Saraswati Yantra is one of the most purposeful and focused tools in the Jiten Pyramid range — designed with a single, powerful intention: to support students and learners in achieving academic success, improving memory retention, and accessing deeper levels of knowledge and understanding.

The yantra consists of three pyramid yantras placed one above the other — representing the three levels of consciousness (conscious, subconscious, and superconscious). At the apex of this three-tier structure sits the Saraswati Yantra, charged with the energy of Goddess Saraswati, the Hindu goddess of knowledge, wisdom, learning, and the arts. In the Vedic tradition, Saraswati's blessings are considered essential for academic achievement — and this yantra serves as a physical anchor for that energy in the student's study space.

The design includes dedicated spaces for personalisation: a slot for writing a wish or positive affirmation (such as a study goal or exam target), a slot for the student's photograph, and a slot for the student's name or signature in their own handwriting. These personalisation elements, combined with the charged pyramid yantras, create a deeply intentional and individual tool rather than a generic remedy.

Placement is specific and important: the Education Pyramid should be fixed on the east wall, directly in the student's line of sight while studying. As the student faces east — the direction associated with new beginnings, sunrise, and the awakening of knowledge — the yantra and the rising sun's energy work together to support focus, retention, and mental clarity during study sessions.

Parents seeking to support their children's academic performance, and adults engaged in professional learning or skill development, both find consistent benefit from this yantra. Pyramid Vaastu Nepal's consultants can guide on exact placement based on the student's room layout.$education$,
    array[
      'Dedicated to academic success and memory enhancement',
      'Three-tier pyramid structure representing three levels of consciousness',
      'Includes Saraswati Yantra at apex for divine blessings of knowledge',
      'Personalised — slots for wish, photo, and student''s own handwriting',
      'Wall-mount facing east for optimal energy alignment'
    ],
    'Copper',
    '3-tier vertical, wall-mount near study area',
    array['https://picsum.photos/seed/education-pyramid/800/800'],
    true
  ),
  (
    'pyra-max-9x9',
    'Pyra Max 9x9 (Supermax)',
    12500,
    $pyramax$The Pyra Max 9x9, known among Pyramid Vaastu practitioners as the Supermax, is the flagship correction tool in the Jiten Pyramid range — and the most comprehensive single-yantra solution available for whole-space Vastu correction. Where other yantras address specific zones or specific problems, the Pyra Max 9x9 works at the level of the entire space, correcting directional doshas, elemental imbalances, and Brahmasthan (centre) energies simultaneously.

At 9x9 inches, the Pyra Max contains a multi-layer energy grid of extraordinary complexity: 81 copper yantras with radiating crystals, 9 gold booster ring plates with 72 directional copper arrows, and a base configuration that creates overlapping fields of energy correction in every direction simultaneously. The 9x9 grid geometry is based on the ancient Vastu Purusha Mandala — the sacred diagram used in Vedic architecture to map the energy field of any space — making this yantra a direct geometric translation of that 5000-year-old science.

The Pyra Max is recommended for placement in the Brahmasthan — the exact centre of the home or office — which in Vastu Shastra is the most energetically sensitive point of any space. Correct placement here affects the entire property, radiating correction energy outward through all the directional zones. Where the Brahmasthan has been compromised (by a pillar, staircase, toilet, or heavy furniture placed at the centre), the Pyra Max is one of the few tools powerful enough to correct the imbalance without requiring physical changes to the structure.

This is the tool Pyramid Vaastu Nepal recommends for clients who are serious about full, lasting Vastu correction — particularly for large homes, offices, or commercial spaces where the cumulative effect of multiple Vastu doshas requires a comprehensive correction approach. It represents an investment in the energy quality of your space for years to come.$pyramax$,
    array[
      'Whole-space correction — addresses all directional doshas simultaneously',
      'Based on Vastu Purusha Mandala — the ancient 9x9 sacred grid',
      '81 copper yantras + 72 directional copper arrows + 9 gold booster plates',
      'Ideal for Brahmasthan placement in large homes, offices, commercial spaces',
      'Most powerful single yantra in the Jiten Pyramid range'
    ],
    'Copper & Gold',
    '9x9 inches',
    array['https://picsum.photos/seed/pyra-max-9x9/800/800'],
    true
  )
on conflict (slug) do update set
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  benefits = excluded.benefits,
  material = excluded.material,
  size = excluded.size,
  images = excluded.images,
  in_stock = excluded.in_stock;
