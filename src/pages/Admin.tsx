import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    checkAdminStatus();
    fetchProducts();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();

    if (!profile?.is_admin) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      return;
    }

    setIsAdmin(true);
  };

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
    });
    fetchProducts();
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
    fetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Product deleted successfully",
    });

    fetchProducts();
  };

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

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
            placeholder="Image URL"
            value={editingProduct ? editingProduct.image : newProduct.image}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, image: e.target.value })
                : setNewProduct({ ...newProduct, image: e.target.value })
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

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;