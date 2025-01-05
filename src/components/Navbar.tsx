import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/af45abc9-729e-4fce-8df2-33470279c418.png" 
              alt="InnoCorner Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-foreground hover:text-primary">Home</Button>
            </Link>
            <Link to="/products">
              <Button variant="ghost" className="text-foreground hover:text-primary">Products</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="text-foreground hover:text-primary">About</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="text-foreground hover:text-primary">Contact</Button>
            </Link>
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-foreground hover:text-primary"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-foreground hover:text-primary">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" className="p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;