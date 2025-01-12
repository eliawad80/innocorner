import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Settings, Bot, Cloud, Database } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Service {
  id: number;
  name: string;
  description: string | null;
  image: string;
}

interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
  };
  whyChooseUs: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [content, setContent] = useState<HomeContent | null>(null);
  const { toast } = useToast();

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("content")
        .eq("page_name", "home")
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch page content",
          variant: "destructive",
        });
        return;
      }

      // Type guard to verify the shape of the data
      const isHomeContent = (data: any): data is { content: HomeContent } => {
        return (
          data?.content?.hero?.title !== undefined &&
          data?.content?.hero?.subtitle !== undefined &&
          data?.content?.whyChooseUs?.title !== undefined &&
          Array.isArray(data?.content?.whyChooseUs?.items)
        );
      };

      if (!isHomeContent(data)) {
        toast({
          title: "Error",
          description: "Invalid page content format",
          variant: "destructive",
        });
        return;
      }

      setContent(data.content);
    };

    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, description, image");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch services",
          variant: "destructive",
        });
        return;
      }

      setServices(data);
    };

    fetchContent();
    fetchServices();
  }, [toast]);

  if (!content) {
    return <div className="min-h-screen container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
              onClick={scrollToServices}
            >
              Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-secondary">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                      {getServiceIcon(service.name)}
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{service.name}</h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
    </div>
  );
};

const getServiceIcon = (name: string) => {
  switch (name) {
    case "Process Automation Suite":
      return <Settings className="h-6 w-6 text-primary" />;
    case "AI Chatbot Integration":
      return <Bot className="h-6 w-6 text-secondary" />;
    case "Data Analytics & ML Pipeline":
      return <Database className="h-6 w-6 text-primary" />;
    case "Cloud Infrastructure Automation":
      return <Cloud className="h-6 w-6 text-secondary" />;
    default:
      return <Settings className="h-6 w-6 text-primary" />;
  }
};

export default Home;