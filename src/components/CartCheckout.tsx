import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CartCheckoutProps {
  items: any[];
  total: number;
  onCheckoutComplete: () => void;
}

const CartCheckout = ({ items, total, onCheckoutComplete }: CartCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // First check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Please login to checkout",
          variant: "destructive",
        });
        return;
      }

      // Create order in database
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          total_amount: total,
          items: items,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Checkout error:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Order placed successfully!",
      });
      
      onCheckoutComplete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process checkout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-lg">${total.toFixed(2)}</span>
      </div>
      <Button 
        onClick={handleCheckout} 
        disabled={isLoading || items.length === 0}
        className="w-full"
      >
        {isLoading ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
};

export default CartCheckout;