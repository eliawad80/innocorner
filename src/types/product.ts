export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string | null;
  stock: number;
  created_at?: string;
}