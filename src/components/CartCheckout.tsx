import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartCheckoutProps {
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}

export function CartCheckout({ items, total, onSuccess }: CartCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const { error } = await supabase.from("orders").insert({
        total_amount: total,
        items: orderItems as Json,
      });

      if (error) throw error;

      toast({
        title: "Order placed successfully!",
        description: `Total amount: $${total.toFixed(2)}`,
      });
      
      onSuccess();
      
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border-t mt-4 pt-4">
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button 
        className="w-full mt-4" 
        onClick={handleCheckout}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
}