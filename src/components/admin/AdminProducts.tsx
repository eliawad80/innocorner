import { useState, useEffect } from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductTable } from "@/components/admin/ProductTable";
import type { Product } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function AdminProducts() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id");

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const handleProductsUpdate = () => {
    fetchProducts(); // Refresh products list
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <ProductForm
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        onSuccess={handleProductsUpdate}
      />
      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleProductsUpdate}
      />
    </div>
  );
}
