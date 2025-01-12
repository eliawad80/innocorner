import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Json } from "@/integrations/supabase/types";

interface Service {
  id: number;
  name: string;
  description: string;
  detailed_description: string;
  price: number;
  image: string;
  features: string[];
  benefits: string[];
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
        .eq("id", parseInt(id as string))
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch service details",
          variant: "destructive",
        });
        return;
      }

      // Convert JSON fields to string arrays and handle null values
      const processedData: Service = {
        ...data,
        features: Array.isArray(data.features) 
          ? (data.features as Json[]).map(item => String(item))
          : [],
        benefits: Array.isArray(data.benefits)
          ? (data.benefits as Json[]).map(item => String(item))
          : []
      };

      setService(processedData);
    };

    fetchService();
  }, [id, toast]);

  if (!service) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
              <p className="text-xl mb-4">${service.price}</p>
              <p className="mb-6">{service.description}</p>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Detailed Description</h2>
                <p>{service.detailed_description}</p>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Features</h2>
                <ul className="list-disc pl-6">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">Benefits</h2>
                <ul className="list-disc pl-6">
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicePage;