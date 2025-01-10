import { Json } from "@/integrations/supabase/types";

export interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string;
  detailed_description: string | null;
  features: string[];
  benefits: string[];
  created_at?: string;
}