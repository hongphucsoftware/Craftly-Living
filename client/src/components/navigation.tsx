import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleGetMatched = () => {
    // TODO: Implement get matched flow
    console.log('Get Matched clicked - implement signup/onboarding flow');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold craftly-navy-text">Craftly Living</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="craftly-navy-text hover:craftly-coral-text transition-colors duration-200 font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="craftly-navy-text hover:craftly-coral-text transition-colors duration-200 font-medium"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="craftly-navy-text hover:craftly-coral-text transition-colors duration-200 font-medium"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button 
              onClick={handleGetMatched}
              className="craftly-coral text-white px-6 py-2 rounded-full font-semibold hover:bg-red-500 transition-colors duration-200"
            >
              Get Matched
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className=""
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-3 py-2 craftly-navy-text hover:craftly-coral-text font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 craftly-navy-text hover:craftly-coral-text font-medium"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 craftly-navy-text hover:craftly-coral-text font-medium"
              >
                Contact
              </button>
              <div className="px-3 py-2">
                <Button 
                  onClick={handleGetMatched}
                  className="w-full craftly-coral text-white rounded-full font-semibold hover:bg-red-500 transition-colors duration-200"
                >
                  Get Matched
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
