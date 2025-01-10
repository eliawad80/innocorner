import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = id ? parseInt(id) : undefined;

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", numericId],
    queryFn: async () => {
      if (!numericId) throw new Error("Invalid ID");
      
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", numericId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!numericId && !isNaN(numericId),
  });

  const getDetailedDescription = (name: string) => {
    const descriptions: { [key: string]: { benefits: string[], features: string[] } } = {
      "AI Development & Integration": {
        benefits: [
          "Accelerate business growth with custom AI solutions",
          "Improve decision-making with AI-powered insights",
          "Automate complex tasks and reduce operational costs",
          "Stay competitive with cutting-edge AI technology"
        ],
        features: [
          "Custom AI model development and training",
          "Integration with GPT, DALL-E, and other AI platforms",
          "AI solution architecture and implementation",
          "Continuous monitoring and optimization",
          "Performance analytics and reporting"
        ]
      },
      "Process Automation Suite": {
        benefits: [
          "Reduce manual workload by up to 80%",
          "Minimize human error in repetitive tasks",
          "Improve operational efficiency and productivity",
          "Scale operations without proportional cost increase"
        ],
        features: [
          "End-to-end workflow automation",
          "Custom RPA bot development",
          "Process analysis and optimization",
          "Integration with existing systems",
          "Automated reporting and analytics"
        ]
      },
      "AI Chatbot Development": {
        benefits: [
          "24/7 customer support availability",
          "Reduced support costs",
          "Improved customer satisfaction",
          "Scalable customer interaction handling"
        ],
        features: [
          "Natural Language Processing integration",
          "Multi-platform deployment",
          "Custom knowledge base integration",
          "Analytics and performance tracking",
          "Continuous learning and improvement"
        ]
      },
      "Data Analytics & ML Pipeline": {
        benefits: [
          "Data-driven decision making",
          "Predictive analytics capabilities",
          "Improved business intelligence",
          "Automated data processing and analysis"
        ],
        features: [
          "Custom ML model development",
          "Automated data collection and processing",
          "Real-time analytics dashboard",
          "Predictive modeling and forecasting",
          "Data visualization and reporting"
        ]
      },
      "Cloud Infrastructure Automation": {
        benefits: [
          "Reduced infrastructure management overhead",
          "Improved deployment reliability",
          "Scalable cloud resource management",
          "Cost optimization through automation"
        ],
        features: [
          "Infrastructure as Code implementation",
          "Automated deployment pipelines",
          "Cloud resource optimization",
          "Security automation and compliance",
          "Performance monitoring and scaling"
        ]
      }
    };

    return descriptions[name] || {
      benefits: ["Customized solutions for your needs"],
      features: ["Professional service delivery", "Expert consultation"]
    };
  };

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
          <Button onClick={() => navigate("/products")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Button>
        </div>
      </div>
    );
  }

  const details = getDetailedDescription(service.name);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="container mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate("/products")}
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
              <p className="text-sm text-gray-500">
                {service.stock} slots available
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
              {details.benefits.map((benefit, index) => (
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
              {details.features.map((feature, index) => (
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