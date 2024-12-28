import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";
import type { Product } from "@/types/product";

interface ProductFormProps {
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  onSuccess: () => void;
}

export function ProductForm({ editingProduct, setEditingProduct, onSuccess }: ProductFormProps) {
  const { toast } = useToast();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    stock: 0,
  });

  const handleAddProduct = async () => {
    const price = parseFloat(newProduct.price);
    if (isNaN(price)) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name: newProduct.name,
        price,
        image: newProduct.image,
        description: newProduct.description,
        stock: newProduct.stock,
      },
    ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Product added successfully",
    });

    setNewProduct({
      name: "",
      price: "",
      image: "",
      description: "",
      stock: 0,
    });
    onSuccess();
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    const { error } = await supabase
      .from("products")
      .update({
        name: editingProduct.name,
        price: editingProduct.price,
        image: editingProduct.image,
        description: editingProduct.description,
        stock: editingProduct.stock,
      })
      .eq("id", editingProduct.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Product updated successfully",
    });

    setEditingProduct(null);
    onSuccess();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Product Name"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <Input
          placeholder="Price"
          type="number"
          step="0.01"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(e.target.value),
                })
              : setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <Input
          placeholder="Stock"
          type="number"
          value={editingProduct ? editingProduct.stock : newProduct.stock}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  stock: parseInt(e.target.value),
                })
              : setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })
          }
        />
        <ImageUpload
          currentImage={editingProduct ? editingProduct.image : newProduct.image}
          onImageUpload={(url) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, image: url })
              : setNewProduct({ ...newProduct, image: url })
          }
        />
        <Input
          placeholder="Description"
          value={
            editingProduct
              ? editingProduct.description || ""
              : newProduct.description
          }
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              : setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
      </div>
      <div className="mt-4">
        {editingProduct ? (
          <div className="space-x-2">
            <Button onClick={handleUpdateProduct}>Update Product</Button>
            <Button
              variant="outline"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={handleAddProduct}>Add Product</Button>
        )}
      </div>
    </div>
  );
}