import { Button } from "@/components/ui/button";
import { Heart, Home, Users, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import LocationSearch from "./location-search";

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
    <section className="pt-16 bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-amber-700 font-medium mb-6 border border-amber-200">
              <Heart className="h-4 w-4 text-amber-600" />
              Trusted by 2,500+ happy homeowners
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Dream Renovation,<br />
              <span className="text-amber-600">Made Simple.</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              We personally match you with trusted local tradies who care about your home as much as you do. 
              <strong>No stress. No spam. Just honest help for your reno.</strong>
            </p>
            
            {/* Location Search */}
            <div className="mb-8">
              <LocationSearch 
                onSearch={(location) => {
                  localStorage.setItem('selectedLocation', location);
                  setLocation('/onboarding');
                }}
                defaultLocation="North Sydney, NSW"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                onClick={handleGetMatched}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Matched
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={handleLearnMore}
                className="border-2 border-amber-200 text-gray-700 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                See How It Works
              </Button>
            </div>

            {/* Simple 3-step flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Tell us about your project</h3>
                <p className="text-gray-600 text-xs">Share your renovation dreams in just 2 minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">We find perfect matches</h3>
                <p className="text-gray-600 text-xs">Our team personally selects trusted local tradies</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Start your renovation</h3>
                <p className="text-gray-600 text-xs">Connect directly and begin your dream project</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=700" 
                alt="Happy family in their beautiful renovated kitchen" 
                className="rounded-2xl w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2 text-amber-600">
                  <Heart className="h-5 w-5 fill-current" />
                  <span className="font-semibold text-sm">4.9★ Happy Homes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
