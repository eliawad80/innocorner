import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface CartItem {
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
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        toast({
          title: "Not logged in",
          description: "Please log in to checkout",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        'https://ozjijrrifxqledgqodzb.supabase.co/functions/v1/create-checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.data.session.access_token}`
          },
          body: JSON.stringify({
            items: items.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity
            }))
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (!url) {
        throw new Error('No checkout URL received');
      }

      // Redirect to Stripe checkout
      window.location.href = url;
      onSuccess();
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process checkout",
        variant: "destructive",
      });
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
        className="w-full"
        disabled={items.length === 0}
      >
        Checkout
      </Button>
    </div>
  );
}