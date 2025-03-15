
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Service, HomeContent, defaultContent } from "@/types/home";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [content, setContent] = useState<HomeContent>(defaultContent);
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
        .maybeSingle();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch page content",
          variant: "destructive",
        });
        return;
      }

      if (data?.content) {
        // Type guard to verify the shape of the data
        const isHomeContent = (content: any): content is HomeContent => {
          return (
            content?.hero?.title !== undefined &&
            content?.hero?.subtitle !== undefined &&
            content?.whyChooseUs?.title !== undefined &&
            Array.isArray(content?.whyChooseUs?.items)
          );
        };

        if (isHomeContent(data.content)) {
          setContent(data.content);
        } else {
          toast({
            title: "Warning",
            description: "Invalid page content format, using default content",
          });
        }
      }
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

      setServices(data || []);
    };

    fetchContent();
    fetchServices();
  }, [toast]);

  if (!content) {
    return <div className="min-h-screen container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <HeroSection content={content} onServicesClick={scrollToServices} />
      <ServicesSection services={services} />
      <WhyChooseUsSection content={content} />
    </div>
  );
};

export default Home;
