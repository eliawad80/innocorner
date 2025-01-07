import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  description: string | null;
  onAddToCart: (quantity: number) => void;
}

export function ProductCard({ 
  name, 
  price, 
  image, 
  stock, 
  description, 
  onAddToCart 
}: ProductCardProps) {
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
    <div className="product-card group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative aspect-square">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
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
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          {description && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{description}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">{stock} in stock</p>
        </div>
      </div>
    </div>
  );
}