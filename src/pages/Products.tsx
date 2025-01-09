import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";
import { toast } from "sonner";

const Products = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  if (error) {
    console.error("Error loading products:", error);
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-8">Our Services</h1>
          <p className="text-red-500">Error loading services. Please try again later.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = (quantity: number) => {
    toast.success(`Added ${quantity} slots to cart`);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Our Services</h1>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;