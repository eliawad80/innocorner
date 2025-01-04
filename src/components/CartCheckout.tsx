import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CartCheckoutProps {
  items: any[];
  total: number;
  onSuccess: () => void;
}

export function CartCheckout({ items, total, onSuccess }: CartCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // First check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setShowAuthDialog(true);
        return;
      }

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          total_amount: total,
          items: items,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw orderError;
      }

      // Create Stripe checkout session
      const response = await fetch('/functions/v1/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        })
      });

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
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process checkout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for successful authentication
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      setShowAuthDialog(false);
      handleCheckout(); // Retry checkout after successful login
    }
  });

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

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login to Complete Checkout</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2563eb',
                      brandAccent: '#1d4ed8',
                    }
                  }
                }
              }}
              providers={["google"]}
              redirectTo={`${window.location.origin}/auth/callback`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}