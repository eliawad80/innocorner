import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

export function ProductCard({ name, price, image, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card group">
      <div className="relative">
        <img src={image} alt={name} className="product-image" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button onClick={onAddToCart} variant="secondary" className="bg-white/90 hover:bg-white">
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}