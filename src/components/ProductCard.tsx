import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ServiceImage } from "./ServiceImage";
import { ServiceQuantityControl } from "./ServiceQuantityControl";
import { ServiceDialog } from "./ServiceDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    } else {
      toast({
        title: "Slot limit reached",
        description: `Only ${stock} slots available`,
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
          title: "Slot limit reached",
          description: `Only ${stock} slots available`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <div className="product-card group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
        <ServiceImage
          image={image}
          name={name}
          onClick={() => setIsDialogOpen(true)}
        >
          <ServiceQuantityControl
            quantity={quantity}
            stock={stock}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            onChange={handleQuantityChange}
          />
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(quantity);
            }} 
            variant="secondary" 
            className="bg-white/90 hover:bg-white"
            disabled={stock === 0}
          >
            {stock === 0 ? "No Slots Available" : "Book Service"}
          </Button>
        </ServiceImage>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 
              className="font-semibold text-lg cursor-pointer hover:text-primary"
              onClick={() => setIsDialogOpen(true)}
            >
              {name}
            </h3>
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
            <p className="text-sm text-gray-500">{stock} slots available</p>
          </div>
        </div>
      </div>

      <ServiceDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        name={name}
        description={description}
        image={image}
        price={price}
        stock={stock}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        onAddToCart={() => {
          onAddToCart(quantity);
          setIsDialogOpen(false);
        }}
      />
    </>
  );
}