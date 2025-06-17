import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function HowItWorks() {
  const handleGetStarted = () => {
    console.log('Get Started Now clicked - implement signup/onboarding flow');
  };

  const steps = [
    {
      number: 1,
      title: "Tell Us Your Vision",
      description: "Share your renovation goals, budget, timeline, and style preferences. Upload photos and describe your dream space.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250",
      alt: "Homeowner planning renovation with blueprints and material samples",
      bgColor: "craftly-coral"
    },
    {
      number: 2,
      title: "Get Matched",
      description: "Our algorithm connects you with 3-5 pre-vetted contractors who specialize in your type of project and work in your area.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250",
      alt: "Professional contractors reviewing project plans together",
      bgColor: "craftly-teal"
    },
    {
      number: 3,
      title: "Start Renovating",
      description: "Compare quotes, review portfolios, and choose your perfect match. Then watch your dream space come to life!",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250",
      alt: "Beautiful finished renovation showing modern living room transformation",
      bgColor: "bg-green-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold craftly-navy-text mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting matched with the perfect renovation team has never been easier. 
            Our simple 3-step process connects you with trusted professionals in your area.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center group">
              <div className="craftly-gray rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-white font-bold text-2xl">{step.number}</span>
                </div>
                <h3 className="text-2xl font-semibold craftly-navy-text mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>
                <img 
                  src={step.image}
                  alt={step.alt}
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="craftly-coral-text text-2xl" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={handleGetStarted}
            className="craftly-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-500 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
}
