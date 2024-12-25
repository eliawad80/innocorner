import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to Your Store</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium products designed to enhance your lifestyle.
          </p>
          <div className="pt-4">
            <Link to="/products">
              <Button size="lg" className="text-lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully selected items that meet our high standards.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick delivery to your doorstep.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2">Customer Support</h3>
              <p className="text-gray-600">Always here to help with your questions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;