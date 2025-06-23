import { useState, useEffect } from "react";
import { Star, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeaturedContractors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const tradies = [
    {
      id: 1,
      name: "David Miller",
      business: "North Shore Renovations",
      rating: 4.9,
      reviews: 127,
      specialties: ["Kitchen", "Modern", "Bathroom"],
      location: "North Sydney, NSW",
      experience: "15+ years",
      projects: 487,
      priceRange: "$35,000 - $65,000",
      responseTime: "Typically responds within 2 hours",
      phone: "+61 2 9555 0123",
      email: "david@northshorerenos.com.au",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80",
      portfolioImages: [
        {
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Modern kitchen with harbour views",
          description: "Contemporary open-plan design"
        },
        {
          url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Luxury kitchen renovation in Cremorne",
          description: "Award-winning design"
        },
        {
          url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Modern kitchen extension in Bondi",
          description: "Heritage kitchen restoration in Paddington"
        }
      ],
      badges: ["✓ Verified", "✓ Award-winning", "✓ Quick Response"],
      description: "Award-winning kitchen specialists with expertise in modern and contemporary designs. We've completed over 500 kitchen renovations across North Sydney and surrounding areas.",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      business: "Northern Beaches Builders",
      rating: 4.8,
      reviews: 89,
      specialties: ["Kitchen", "Bathroom", "Contemporary"],
      location: "Manly, Northern Beaches",
      experience: "12+ years",
      projects: 312,
      priceRange: "$30,000 - $55,000",
      responseTime: "Typically responds within 4 hours",
      phone: "+61 2 9977 0456",
      email: "sarah@nbbuilders.com.au",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332b1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80",
      portfolioImages: [
        {
          url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Coastal kitchen design",
          description: "Beachside home renovation"
        },
        {
          url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Modern bathroom suite in Dee Why",
          description: "Contemporary coastal designs"
        },
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Luxury penthouse renovation",
          description: "Luxury penthouse renovation"
        }
      ],
      badges: ["✓ Verified", "✓ Coastal Specialist", "✓ Eco-Friendly"],
      description: "Full-service renovation company specializing in contemporary coastal designs. Known for exceptional project management and timely completion across the Northern Beaches.",
      verified: true
    },
    {
      id: 3,
      name: "Marcus Thompson",
      business: "Eastern Suburbs Elite",
      rating: 4.7,
      reviews: 156,
      specialties: ["Kitchen", "Traditional", "Modern"],
      location: "Bondi Junction, Eastern Suburbs",
      experience: "20+ years",
      projects: 678,
      priceRange: "$40,000 - $80,000",
      responseTime: "Typically responds within 6 hours",
      phone: "+61 2 9387 0789",
      email: "marcus@eselite.com.au",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80",
      portfolioImages: [
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Heritage kitchen restoration in Paddington",
          description: "Heritage kitchen restoration in Paddington"
        },
        {
          url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Modern kitchen extension in Bondi",
          description: "Modern kitchen extension in Bondi"
        },
        {
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Luxury penthouse renovation",
          description: "Luxury penthouse renovation"
        }
      ],
      badges: ["✓ Verified", "✓ Master Craftsman", "✓ Heritage Specialist"],
      description: "Established construction company with two decades of experience in the Eastern Suburbs. We pride ourselves on quality craftsmanship and attention to detail.",
      verified: true
    },
    {
      id: 4,
      name: "Luke Sully",
      business: "Harbour City Constructions",
      rating: 4.6,
      reviews: 203,
      specialties: ["Plumbing", "Bathroom", "Kitchen"],
      location: "Northern Beaches",
      experience: "18+ years",
      projects: 542,
      priceRange: "$45,000 - $75,000",
      responseTime: "Typically responds within 3 hours",
      phone: "+61 2 9955 0321",
      email: "luke@harbourcity.com.au",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80",
      portfolioImages: [
        {
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Luxury kitchen renovation",
          description: "Luxury kitchen renovation"
        },
        {
          url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Modern bathroom suite",
          description: "Modern bathroom suite"
        },
        {
          url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150",
          title: "Heritage home plumbing",
          description: "Heritage home plumbing"
        }
      ],
      badges: ["✓ Verified", "✓ Master Plumber", "✓ Northern Beaches Specialist"],
      description: "Specializing in harbour-side renovations with stunning views. Our team understands the unique challenges of waterfront properties and coastal plumbing requirements.",
      verified: true
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === tradies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [tradies.length]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === tradies.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? tradies.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTradie = tradies[currentIndex];

  return (
    <section className="py-20 bg-[#fff1f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#be123c] mb-4">
            Featured Tradies
          </h2>
          <p className="text-xl text-[#7f1d1d] max-w-3xl mx-auto">
            Meet trusted local tradies who deliver exceptional results across Sydney's premier suburbs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border border-[#fca5a5] shadow-lg rounded-2xl overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={currentTradie.image}
                    alt={currentTradie.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#fca5a5]"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#be123c] mb-1 flex items-center">
                      {currentTradie.business}
                      {currentTradie.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                      )}
                    </h3>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold text-[#be123c]">
                          {currentTradie.rating}
                        </span>
                        <span className="text-[#7f1d1d] ml-1 text-sm">
                          ({currentTradie.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-[#7f1d1d] text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{currentTradie.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#7f1d1d] mb-6 leading-relaxed">
                {currentTradie.description}
              </p>

              {/* Specialties */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {currentTradie.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="bg-[#fff1f2] text-[#be123c] px-3 py-1 rounded-full text-sm font-medium border border-[#fca5a5]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-[#7f1d1d]">{currentTradie.experience} • {currentTradie.projects} projects</span>
                </div>
                <div>
                  <span className="text-[#7f1d1d]">{currentTradie.priceRange}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{currentTradie.responseTime}</span>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#be123c] mb-3">Recent Projects:</h4>
                <div className="grid grid-cols-3 gap-3">
                  {currentTradie.portfolioImages.map((project, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={project.url}
                        alt={project.title}
                        className="w-full h-24 object-cover rounded-lg border border-[#fca5a5]"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <p className="text-white text-xs text-center px-2">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentTradie.badges.map((badge, index) => (
                  <span 
                    key={index}
                    className="text-green-700 text-sm font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-[#be123c] hover:bg-[#dc2626] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  onClick={() => window.open(`tel:${currentTradie.phone}`, '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button 
                  variant="outline"
                  className="border-[#be123c] text-[#be123c] hover:bg-[#fff1f2] px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  onClick={() => window.open(`mailto:${currentTradie.email}`, '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button 
                  className="bg-[#be123c] hover:bg-[#dc2626] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-[#fca5a5] text-[#be123c] hover:bg-[#fff1f2] transition-colors duration-200 flex items-center justify-center"
              aria-label="Previous tradie"
            >
              ←
            </button>
            
            <div className="flex space-x-2">
              {tradies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-[#be123c]' : 'bg-[#fca5a5]'
                  }`}
                  aria-label={`Go to tradie ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-[#fca5a5] text-[#be123c] hover:bg-[#fff1f2] transition-colors duration-200 flex items-center justify-center"
              aria-label="Next tradie"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}