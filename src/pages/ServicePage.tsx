import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Service {
  id: number;
  name: string;
  description: string | null;
  detailed_description: string | null;
  image: string;
  features: string[];
  benefits: string[];
  price: number;
  created_at: string;
}

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchService = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", parseInt(id || "0"))
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch service details",
          variant: "destructive",
        });
        return;
      }

      // Convert JSON fields to arrays
      const processedData: Service = {
        ...data,
        features: Array.isArray(data.features) ? data.features : [],
        benefits: Array.isArray(data.benefits) ? data.benefits : []
      };

      setService(processedData);
    };

    fetchService();
  }, [id, toast]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">{service.name}</h1>
        
        {/* Hero Section */}
        <div className="mb-12">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-6"
          />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto text-center">
            {service.description}
          </p>
        </div>

        {/* Detailed Description */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {service.detailed_description}
            </p>
          </CardContent>
        </Card>

        {/* Features and Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                {service.features?.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <ul className="list-disc pl-6 space-y-2">
                {service.benefits?.map((benefit, index) => (
                  <li key={index} className="text-gray-700">{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;