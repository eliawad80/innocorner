import { Button } from "./ui/button";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: number) => void;
}

export function CartItem({ id, name, price, quantity, onRemove }: CartItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">
          ${price.toFixed(2)} x {quantity}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(id)}
      >
        Remove
      </Button>
    </div>
  );
}