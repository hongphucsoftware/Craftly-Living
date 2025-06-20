import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Phone, Mail, CheckCircle } from "lucide-react";

// Sample contractor data that would typically come from an API
const sampleContractors = [
  {
    id: 1,
    name: "Elite Kitchen Renovations",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Kitchen", "Modern"],
    location: "Central London",
    experience: "15+ years",
    priceRange: "£25,000 - £50,000",
    phone: "+44 20 7123 4567",
    email: "info@elitekitchens.co.uk",
    image: "/api/placeholder/150/150",
    description: "Award-winning kitchen specialists with expertise in modern and contemporary designs. We've completed over 500 kitchen renovations across London.",
    completedProjects: 487,
    responseTime: "Within 2 hours",
    verified: true,
    portfolio: [
      "Modern kitchen with island",
      "Contemporary open-plan design",
      "Luxury kitchen renovation"
    ]
  },
  {
    id: 2,
    name: "London Home Transformers",
    rating: 4.8,
    reviewCount: 89,
    specialties: ["Kitchen", "Bathroom", "Contemporary"],
    location: "West London",
    experience: "12+ years",
    priceRange: "£20,000 - £45,000",
    phone: "+44 20 7234 5678",
    email: "hello@londonhometransformers.co.uk",
    image: "/api/placeholder/150/150",
    description: "Full-service renovation company specializing in contemporary designs. Known for exceptional project management and timely completion.",
    completedProjects: 312,
    responseTime: "Within 4 hours",
    verified: true,
    portfolio: [
      "Contemporary kitchen design",
      "Open-plan living renovation",
      "Modern bathroom suite"
    ]
  },
  {
    id: 3,
    name: "Precision Build Solutions",
    rating: 4.7,
    reviewCount: 156,
    specialties: ["Kitchen", "Traditional", "Modern"],
    location: "North London",
    experience: "20+ years",
    priceRange: "£30,000 - £60,000",
    phone: "+44 20 7345 6789",
    email: "contact@precisionbuild.co.uk",
    image: "/api/placeholder/150/150",
    description: "Established construction company with two decades of experience. We pride ourselves on quality craftsmanship and attention to detail.",
    completedProjects: 678,
    responseTime: "Within 6 hours",
    verified: true,
    portfolio: [
      "Traditional kitchen restoration",
      "Modern kitchen extension",
      "Luxury kitchen renovation"
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

                {/* Portfolio */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Recent Projects:</h4>
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