import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Settings, Users, Zap, BarChart, Cloud, Code, Shield, ArrowUpRight, ArrowDown } from "lucide-react";

const Home = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold">
            Transform Your Business with Innovative Technology
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            At InnoCorner, we blend innovative technology with practical solutions to help businesses 
            and individuals achieve their goals through secure, efficient, and scalable solutions.
          </p>
          <div className="pt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="text-lg">
                Go to Products
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg"
              onClick={scrollToServices}
            >
              Our Services <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  Cloud Architecture Design
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert cloud architecture design and optimization services. We help design scalable, secure and cost-effective cloud infrastructure tailored to your needs.
                </p>
                <Link to="/contact" className="inline-flex items-center text-primary hover:text-primary/80">
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  DevOps Implementation
                </h3>
                <p className="text-gray-600 mb-4">
                  End-to-end DevOps implementation service. We help streamline your development pipeline, implement CI/CD, and optimize your deployment processes.
                </p>
                <Link to="/contact" className="inline-flex items-center text-primary hover:text-primary/80">
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  Security Assessment
                </h3>
                <p className="text-gray-600 mb-4">
                  Thorough security assessment of your cloud infrastructure and applications. Includes vulnerability scanning, compliance checking, and detailed recommendations.
                </p>
                <Link to="/contact" className="inline-flex items-center text-primary hover:text-primary/80">
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  Performance Optimization
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive analysis and optimization of your systems for maximum performance. We identify bottlenecks and implement solutions for better efficiency.
                </p>
                <Link to="/contact" className="inline-flex items-center text-primary hover:text-primary/80">
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  Team Training
                </h3>
                <p className="text-gray-600 mb-4">
                  Customized training programs for your team on cloud technologies, DevOps practices, and security best practices. Build internal expertise and capabilities.
                </p>
                <Link to="/contact" className="inline-flex items-center text-primary hover:text-primary/80">
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose InnoCorner?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-4">Innovative Products</h3>
              <p className="text-gray-600 mb-4">
                Carefully curated solutions designed to transform your daily operations and enhance efficiency.
              </p>
              <Link to="/products" className="text-primary hover:text-primary/80 inline-flex items-center">
                View Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-4">Collaborative Approach</h3>
              <p className="text-gray-600 mb-4">
                We work alongside you to develop solutions that align perfectly with your goals and values.
              </p>
              <Link to="/about" className="text-primary hover:text-primary/80 inline-flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-4">Expert Support</h3>
              <p className="text-gray-600 mb-4">
                Dedicated team committed to your success with continuous technical support and guidance.
              </p>
              <Link to="/contact" className="text-primary hover:text-primary/80 inline-flex items-center">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
