import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const handleGetMatched = () => {
    setLocation('/onboarding');
  };

  const handleLearnMore = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold craftly-navy-text leading-tight mb-6">
              Smarter Renovations.<br />
              <span className="craftly-coral-text">Matched to You.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with trusted contractors and designers who understand your vision. 
              From kitchen remodels to full home makeovers, we match you with the perfect team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={handleGetMatched}
                className="bg-red-500 text-white px-12 py-6 rounded-full text-2xl font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Matched Today
              </Button>
              <Button 
                variant="outline"
                onClick={handleLearnMore}
                className="border-2 border-red-400 text-red-500 px-12 py-6 rounded-full text-2xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                Learn More
              </Button>
            </div>
            <div className="flex items-center justify-center lg:justify-start mt-8 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold craftly-navy-text">500+</div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold craftly-navy-text">50+</div>
                <div className="text-sm text-gray-500">Trusted Contractors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold craftly-navy-text">4.9★</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=700" 
              alt="Modern kitchen renovation showcasing sleek white cabinets and marble countertops" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
