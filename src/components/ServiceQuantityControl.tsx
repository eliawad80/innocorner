import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

interface ServiceQuantityControlProps {
  quantity: number;
  stock: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export function ServiceQuantityControl({
  quantity,
  stock,
  onIncrement,
  onDecrement,
  onChange,
  onClick
}: ServiceQuantityControlProps) {
  return (
    <div className="flex items-center gap-2 bg-white/90 p-2 rounded-lg">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={(e) => {
          e.stopPropagation();
          onDecrement();
        }}
        className="h-8 w-8"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min="1"
        max={stock}
        value={quantity}
        onChange={onChange}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        className="w-16 h-8 text-center"
      />
      <Button 
        variant="outline" 
        size="icon" 
        onClick={(e) => {
          e.stopPropagation();
          onIncrement();
        }}
        className="h-8 w-8"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}