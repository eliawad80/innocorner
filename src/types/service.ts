export interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string | null;
  detailed_description: string | null;
  features: string[];
  benefits: string[];
  created_at?: string;
}