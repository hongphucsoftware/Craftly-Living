import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, MapPin, Award } from "lucide-react";

const featuredContractors = [
  {
    id: 1,
    name: "Michael Chen",
    company: "Premium Kitchens Sydney",
    specialty: "Kitchen Renovations",
    location: "Mosman, NSW",
    rating: 4.9,
    reviewCount: 127,
    completedProjects: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Specializing in high-end kitchen transformations with 15+ years experience.",
    badges: ["Licensed", "Insured", "Award Winner"]
  },
  {
    id: 2,
    name: "Sarah Williams",
    company: "Coastal Bathrooms",
    specialty: "Bathroom Specialist",
    location: "Manly, NSW",
    rating: 4.8,
    reviewCount: 94,
    completedProjects: 67,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b300?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Creating beautiful, functional bathrooms that stand the test of time.",
    badges: ["Licensed", "Eco-Friendly", "Design Expert"]
  },
  {
    id: 3,
    name: "Tom Rodriguez",
    company: "Harbour City Builders",
    specialty: "General Building",
    location: "North Sydney, NSW",
    rating: 5.0,
    reviewCount: 156,
    completedProjects: 143,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Full home renovations and extensions with meticulous attention to detail.",
    badges: ["Master Builder", "Licensed", "Quality Guarantee"]
  },
  {
    id: 4,
    name: "Emma Thompson",
    company: "Urban Living Designs",
    specialty: "Interior Design & Build",
    location: "Paddington, NSW",
    rating: 4.9,
    reviewCount: 88,
    completedProjects: 72,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Combining design expertise with quality construction for stunning results.",
    badges: ["Design Award", "Licensed", "Sustainable Build"]
  },
  {
    id: 5,
    name: "James Park",
    company: "Elite Home Extensions",
    specialty: "Extensions & Additions",
    location: "Neutral Bay, NSW",
    rating: 4.8,
    reviewCount: 112,
    completedProjects: 95,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Seamlessly blending new extensions with existing architecture.",
    badges: ["Heritage Specialist", "Licensed", "Architect Partner"]
  }
];

export default function FeaturedContractors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredContractors.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredContractors.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredContractors.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Top-Rated Contractors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked professionals who consistently deliver exceptional results for Sydney homeowners
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredContractors.map((contractor) => (
                <div key={contractor.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 border-none shadow-lg bg-gradient-to-br from-red-50 to-pink-50 border border-red-100">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {/* Contractor Photo */}
                        <div className="text-center">
                          <div className="relative inline-block">
                            <img
                              src={contractor.image}
                              alt={contractor.name}
                              className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full">
                              <Award className="h-4 w-4" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mt-4">{contractor.name}</h3>
                          <p className="text-red-600 font-semibold">{contractor.company}</p>
                          <p className="text-gray-600">{contractor.specialty}</p>
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-5 w-5 ${i < Math.floor(contractor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="font-semibold text-gray-900 ml-2">{contractor.rating}</span>
                              <span className="text-gray-600">({contractor.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{contractor.location}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                            {contractor.description}
                          </p>

                          <div className="flex items-center gap-4 mb-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600">{contractor.completedProjects}</div>
                              <div className="text-sm text-gray-600">Projects Completed</div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {contractor.badges.map((badge, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>

                          <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-red-200 hover:border-red-300 z-10"
          >
            <ChevronLeft className="h-5 w-5 text-red-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-red-200 hover:border-red-300 z-10"
          >
            <ChevronRight className="h-5 w-5 text-red-600" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {featuredContractors.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-red-500' : 'bg-gray-300 hover:bg-red-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}