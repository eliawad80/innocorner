import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Service } from "@/types/service";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = id ? parseInt(id) : undefined;

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", numericId],
    queryFn: async () => {
      if (!numericId) throw new Error("Invalid ID");
      
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", numericId)
        .single();

      if (error) throw error;
      return data as Service;
    },
    enabled: !!numericId && !isNaN(numericId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service || !numericId || isNaN(numericId)) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Button onClick={() => navigate("/services")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="container mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate("/services")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Button>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="bg-primary/5 p-6 rounded-lg">
              <p className="text-2xl font-bold text-primary mb-2">
                ${service.price.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
            <ul className="space-y-3">
              {service.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="space-y-3">
              {service.features?.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;