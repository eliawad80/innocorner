
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HomeContent } from "@/types/home";

interface WhyChooseUsSectionProps {
  content: HomeContent;
}

const WhyChooseUsSection = ({ content }: WhyChooseUsSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.whyChooseUs.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.whyChooseUs.items.map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-4">{item.title}</h3>
              <p className="text-gray-600 mb-4">
                {item.description}
              </p>
              {index === 0 && (
                <Link to="/products" className="text-primary hover:text-primary/80 inline-flex items-center">
                  View Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
              {index === 1 && (
                <Link to="/about" className="text-primary hover:text-primary/80 inline-flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
              {index === 2 && (
                <Link to="/contact" className="text-primary hover:text-primary/80 inline-flex items-center">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
