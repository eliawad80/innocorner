import { CartItem } from "./CartItem";

interface CartListProps {
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  onRemoveItem: (id: number) => void;
}

export function CartList({ items, onRemoveItem }: CartListProps) {
  if (items.length === 0) {
    return <p className="text-muted-foreground text-center">Your cart is empty</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onRemove={onRemoveItem}
        />
      ))}
    </div>
  );
}