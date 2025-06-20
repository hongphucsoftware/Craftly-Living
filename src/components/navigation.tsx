import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleGetMatched = () => {
    setLocation('/onboarding');
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-[#f3f4f6] shadow-md border-b border-[#fca5a5] backdrop-blur-md'
          : 'bg-[#f3f4f6]/90 backdrop-blur-sm border-b border-red-100'}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold craftly-navy-text">Craftly Living</h1>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-baseline space-x-8">
                <button 
                  onClick={() => setLocation('/dashboard')}
                  className="text-[#7f1d1d] hover:text-red-900 transition-colors duration-200 font-medium"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-[#7f1d1d] hover:text-red-900 transition-colors duration-200 font-medium"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-[#7f1d1d] hover:text-red-900 transition-colors duration-200 font-medium"
                >
                  Reviews
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-[#7f1d1d] hover:text-red-900 transition-colors duration-200 font-medium"
                >
                  Contact
                </button>
              </div>
            </div>
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
                onClick={() => setLocation('/dashboard')}
                className="block w-full text-left px-3 py-2 text-[#7f1d1d] hover:text-red-900 font-medium"
              >
                Dashboard
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-3 py-2 text-[#7f1d1d] hover:text-red-900 font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-[#7f1d1d] hover:text-red-900 font-medium"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-[#7f1d1d] hover:text-red-900 font-medium"
              >
                Contact
              </button>
              <div className="px-3 py-2">
                {/* Removed Get Matched button from mobile nav */}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
