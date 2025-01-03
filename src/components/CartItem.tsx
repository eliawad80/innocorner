import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Minus } from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export function CartItem({ 
  id, 
  name, 
  price, 
  quantity, 
  onRemove, 
  onUpdateQuantity 
}: CartItemProps) {
  const incrementQuantity = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      onUpdateQuantity(id, value);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">
          ${price.toFixed(2)} x {quantity}
        </p>
      </div>
      <div className="flex items-center gap-2">
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}