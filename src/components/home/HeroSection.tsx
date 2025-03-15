
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HomeContent } from "@/types/home";

interface HeroSectionProps {
  content: HomeContent;
  onServicesClick: () => void;
}

const HeroSection = ({ content, onServicesClick }: HeroSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold">
          {content.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          {content.hero.subtitle}
        </p>
        <div className="pt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" className="text-lg">
              Explore Products
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg"
            onClick={onServicesClick}
          >
            Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
