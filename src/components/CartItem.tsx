import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Minus } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

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
  const { toast } = useToast();
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    const fetchStock = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('stock')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching stock:', error);
        return;
      }

      setStock(data.stock);
    };

    fetchStock();
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < stock) {
      onUpdateQuantity(id, quantity + 1);
    } else {
      toast({
        title: "Stock limit reached",
        description: `Only ${stock} items available`,
        variant: "destructive",
      });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      if (value <= stock) {
        onUpdateQuantity(id, value);
      } else {
        onUpdateQuantity(id, stock);
        toast({
          title: "Stock limit reached",
          description: `Only ${stock} items available`,
          variant: "destructive",
        });
      }
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