import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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

  const NavLinks = () => (
    <>
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
    </>
  );

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
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <NavLinks />
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col space-y-4 mt-4">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;