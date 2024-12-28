import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CartList } from "./CartList";
import { CartCheckout } from "./CartCheckout";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
}

export function Cart({ items, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutSuccess = () => {
    // Clear cart items by removing each item
    items.forEach(item => onRemoveItem(item.id));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          <CartList items={items} onRemoveItem={onRemoveItem} />
          {items.length > 0 && (
            <CartCheckout 
              items={items} 
              total={total} 
              onSuccess={handleCheckoutSuccess}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}