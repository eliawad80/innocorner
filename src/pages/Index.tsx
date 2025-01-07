import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string | null;
  stock: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
      return;
    }

    setProducts(data);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= product.stock) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          );
        } else {
          toast({
            title: "Stock limit reached",
            description: `Only ${product.stock} items available`,
            variant: "destructive",
          });
          return prev;
        }
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h2 className="text-3xl font-bold mb-4">Featured Tech Products</h2>
          <p className="text-gray-600">
            Discover our curated selection of cutting-edge technology solutions designed to transform your digital experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={(quantity) => addToCart(product, quantity)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;