import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Phone, Mail, CheckCircle } from "lucide-react";

// Sample contractor data focused on North Sydney and surrounding areas
const sampleContractors = [
  {
    id: 1,
    name: "North Shore Renovations",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Kitchen", "Modern"],
    location: "North Sydney, NSW",
    experience: "15+ years",
    priceRange: "$35,000 - $65,000",
    phone: "+61 2 9234 5678",
    email: "info@northshorerevos.com.au",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "Award-winning kitchen specialists with expertise in modern and contemporary designs. We've completed over 500 kitchen renovations across North Sydney and surrounding areas.",
    completedProjects: 487,
    responseTime: "Within 2 hours",
    verified: true,
    portfolio: [
      "Modern kitchen with harbour views",
      "Contemporary open-plan design",
      "Luxury kitchen renovation in Mosman"
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556909502-34060a1dc2ac?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Northern Beaches Builders",
    rating: 4.8,
    reviewCount: 89,
    specialties: ["Kitchen", "Bathroom", "Contemporary"],
    location: "Manly, Northern Beaches",
    experience: "12+ years",
    priceRange: "$30,000 - $55,000",
    phone: "+61 2 9876 5432",
    email: "hello@northernbeachesbuilders.com.au",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Full-service renovation company specializing in contemporary coastal designs. Known for exceptional project management and timely completion across the Northern Beaches.",
    completedProjects: 312,
    responseTime: "Within 4 hours",
    verified: true,
    portfolio: [
      "Coastal kitchen design",
      "Beachside home renovation",
      "Modern bathroom suite in Dee Why"
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571889227646-4d9b42945871?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 3,
    name: "Eastern Suburbs Elite",
    rating: 4.7,
    reviewCount: 156,
    specialties: ["Kitchen", "Traditional", "Modern"],
    location: "Bondi Junction, Eastern Suburbs",
    experience: "20+ years",
    priceRange: "$40,000 - $80,000",
    phone: "+61 2 9345 6789",
    email: "contact@easternsurbselite.com.au",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    description: "Established construction company with two decades of experience in the Eastern Suburbs. We pride ourselves on quality craftsmanship and attention to detail.",
    completedProjects: 678,
    responseTime: "Within 6 hours",
    verified: true,
    portfolio: [
      "Heritage kitchen restoration in Paddington",
      "Modern kitchen extension in Bondi",
      "Luxury penthouse renovation"
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556185781-a47769abb7b9?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564540574859-0dfb63985925?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 4,
    name: "Harbour City Constructions",
    rating: 4.6,
    reviewCount: 203,
    specialties: ["Kitchen", "Bathroom", "Extension"],
    location: "Neutral Bay, North Shore",
    experience: "18+ years",
    priceRange: "$25,000 - $50,000",
    phone: "+61 2 9456 7890",
    email: "info@harbourcityconstructions.com.au",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    description: "Specializing in harbour-side renovations with stunning views. Our team understands the unique requirements of North Shore properties.",
    completedProjects: 425,
    responseTime: "Within 3 hours",
    verified: true,
    portfolio: [
      "Harbour view kitchen renovation",
      "North Shore bathroom upgrade",
      "Open plan living extension"
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909502-34060a1dc2ac?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=300&fit=crop"
    ]
  }
];

interface ProjectData {
  renovationType: string;
  style: string;
  budget: string;
  timeline: string;
  postcode: string;
}

export default function Contractors() {
  const [, setLocation] = useLocation();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // In a real app, this would fetch the latest project from the API
  // For now, we'll simulate getting project data from localStorage or API
  useEffect(() => {
    // Simulate fetching the most recent project
    const mockProject: ProjectData = {
      renovationType: "Kitchen",
      style: "Modern",
      budget: "£25,000 - £50,000",
      timeline: "3-6 months",
      postcode: "SW1A 1AA"
    };
    setSelectedProject(mockProject);
  }, []);

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\+44\s?)(\d{2})\s?(\d{4})\s?(\d{4})/, '$1$2 $3 $4');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Perfect Contractors for Your Project
          </h1>
          <p className="text-gray-600 mb-4">
            We've matched you with the best contractors based on your requirements
          </p>
          
          {selectedProject && (
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <span className="text-sm text-blue-800">
                <strong>{selectedProject.renovationType}</strong> renovation • 
                <strong> {selectedProject.style}</strong> style • 
                <strong> {selectedProject.budget}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Contractors Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleContractors.map((contractor) => (
            <Card key={contractor.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contractor.image} alt={contractor.name} />
                      <AvatarFallback>{contractor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {contractor.name}
                        {contractor.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{contractor.rating}</span>
                        <span className="text-sm text-gray-500">({contractor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{contractor.description}</p>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-1">
                  {contractor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Key Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{contractor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{contractor.experience} • {contractor.completedProjects} projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-green-600">{contractor.priceRange}</span>
                  </div>
                </div>

                {/* Portfolio Images */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Recent Projects:</h4>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {contractor.portfolioImages?.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={contractor.portfolio[index]}
                        className="w-full h-16 object-cover rounded-md border border-gray-200"
                      />
                    ))}
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {contractor.portfolio.slice(0, 2).map((project, index) => (
                      <li key={index}>• {project}</li>
                    ))}
                  </ul>
                </div>

                {/* Response Time */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Typically responds {contractor.responseTime.toLowerCase()}
                    </span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                </div>
                
                <Button className="w-full mt-2" size="sm">
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Need More Options?</h3>
              <p className="text-gray-600 mb-4">
                We're constantly adding new verified contractors to our network. 
                Contact us for additional recommendations.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => setLocation("/onboarding")}>
                  Start New Project
                </Button>
                <Button>Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}