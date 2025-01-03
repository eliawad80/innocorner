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
      
      onSuccess();
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