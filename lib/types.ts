export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  created_at: string;
};

export type Business = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  short_description: string;
  full_description: string;
  phone: string;
  whatsapp: string | null;
  address: string;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  hours_json: Record<string, string>;
  price_level: 1 | 2 | 3;
  is_featured: boolean;
  rating_average: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  categories?: Category;
  business_images?: BusinessImage[];
};

export type BusinessImage = {
  id: string;
  business_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type Review = {
  id: string;
  business_id: string;
  author_name: string;
  rating: number;
  text: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};
