import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Service } from "@/types/service";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("id");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
      return;
    }

    setServices(data);
  };

  const addToCart = (service: Service, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === service.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: service.id, name: service.name, price: service.price, quantity }];
    });
  };

  const removeFromCart = (serviceId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== serviceId));
  };

  const updateCartItemQuantity = (serviceId: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === serviceId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">High-Tech Innovation Hub</h1>
          <Cart 
            items={cartItems} 
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartItemQuantity}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600">
            Discover our range of innovative technology services designed to transform your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ProductCard
              key={service.id}
              id={service.id}
              name={service.name}
              price={service.price}
              image={service.image}
              description={service.description}
              stock={1}
              onAddToCart={(quantity) => addToCart(service, quantity)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;