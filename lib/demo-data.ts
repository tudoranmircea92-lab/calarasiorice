import { Business, Category, Review } from "@/lib/types";

export const demoCategories: Category[] = [
  ["Mâncare", "mancare", "Utensils"],
  ["Servicii", "servicii", "Scissors"],
  ["Auto", "auto", "Car"],
  ["Imobiliare", "imobiliare", "Home"],
  ["Evenimente", "evenimente", "CalendarDays"],
  ["Anunțuri", "anunturi", "Megaphone"]
].map(([name, slug, icon], idx) => ({ id: String(idx + 1), name, slug, icon, created_at: new Date().toISOString() }));

const hours = { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-18:00", sat: "10:00-14:00", sun: "closed" };

export const demoBusinesses: Business[] = Array.from({ length: 15 }).map((_, i) => {
  const c = demoCategories[i % demoCategories.length];
  return {
    id: `b-${i + 1}`,
    name: `Demo ${c.name} ${i + 1}`,
    slug: `demo-${c.slug}-${i + 1}`,
    category_id: c.id,
    short_description: "Conținut demo: profil de prezentare pentru MVP.",
    full_description: "Acesta este un business demo pentru testarea platformei CălărașiOrice. Datele sunt fictive și sigure pentru demonstrație.",
    phone: "0722 000 000",
    whatsapp: "40722000000",
    address: `Str. Exemplu ${i + 1}, Călărași`,
    neighborhood: i % 2 ? "Mircea Vodă" : "Centru",
    latitude: null,
    longitude: null,
    hours_json: hours,
    price_level: ((i % 3) + 1) as 1 | 2 | 3,
    is_featured: i < 3,
    rating_average: 4.2,
    review_count: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: c,
    business_images: [
      { id: `img-${i + 1}`, business_id: `b-${i + 1}`, image_url: `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80`, sort_order: 0, created_at: new Date().toISOString() }
    ]
  };
});

export const demoReviews: Review[] = [
  { id: "r-1", business_id: "b-1", author_name: "Demo review", rating: 5, text: "Exemplu de recenzie demonstrativă.", status: "approved", created_at: new Date().toISOString() }
];
