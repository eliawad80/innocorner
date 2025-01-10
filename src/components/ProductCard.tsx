import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  onAddToCart: (quantity: number) => void;
}

export function ProductCard({ name, price, image, stock, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    } else {
      toast({
        title: "Stock limit reached",
        description: `Only ${stock} items available`,
        variant: "destructive",
      });
    }
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      if (value <= stock) {
        setQuantity(value);
      } else {
        setQuantity(stock);
        toast({
          title: "Stock limit reached",
          description: `Only ${stock} items available`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="product-card group">
      <div className="relative">
        <img src={image} alt={name} className="product-image" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 bg-white/90 p-2 rounded-lg">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={decrementQuantity}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              max={stock}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 h-8 text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={incrementQuantity}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            onClick={() => onAddToCart(quantity)} 
            variant="secondary" 
            className="bg-white/90 hover:bg-white"
            disabled={stock === 0}
          >
            {stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">${price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{stock} in stock</p>
      </div>
    </div>
  );
}