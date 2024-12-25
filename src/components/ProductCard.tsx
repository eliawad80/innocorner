import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

export function ProductCard({ id, name, price, image, onAddToCart }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart();
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className="product-image" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-primary font-medium">${price.toFixed(2)}</p>
        <Button 
          onClick={handleAddToCart}
          className="w-full mt-2"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}