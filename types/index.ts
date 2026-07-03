// Shared domain types — single source of truth is architecture.md.
// Import these everywhere; do not redefine inline.

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // NPR
  description: string;
  benefits?: string[]; // Vastu/energy significance
  material?: string;
  size?: string;
  images: string[]; // Supabase Storage URLs
  inStock: boolean;
  createdAt: string;
};

// Static content initially (only 2 services, no admin CRUD yet).
export type Service = {
  slug: "vastu-advisory" | "cupping-healing";
  name: string;
  tagline: string;
  overview: string;
  process: { title: string; description: string }[];
  benefits: string[];
  advisorWhatsAppMessage: string; // pre-filled text per service
};

export type Advisor = {
  id?: string; // present when sourced from DB
  name: string;
  role: string;
  languages: string[];
  photo: string;
  whatsappNumber: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
};
