import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Phone, Mail, Star, CheckCircle } from "lucide-react";
import Navigation from "@/components/navigation";
import { RenovationProject } from "@shared/schema";

interface ContractorMatch {
  id: number;
  name: string;
  rating: number;
  specialties: string[];
  location: string;
  priceRange: string;
  responseTime: string;
  phone: string;
  email: string;
  image: string;
}

export default function Dashboard() {
  const formatBudget = (min: string | null, max: string | null) => {
    if (!min || !max) return "Budget not specified";
    return `$${parseInt(min).toLocaleString()} - $${parseInt(max).toLocaleString()}`;
  };

  // Fetch projects from API - using mock user ID for demonstration
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['/api/renovation-projects/user', 1],
    queryFn: () => fetch('/api/renovation-projects/user/1').then(res => res.json())
  });

  // Contractor matching logic - would connect to matching algorithm in production
  const getContractorMatches = (project: RenovationProject): ContractorMatch[] => {
    // Kitchen projects in North Sydney/Northern Beaches area
    if (project.renovationType === "kitchen" && ["2060", "2065", "2070"].includes(project.postcode)) {
      return [
        {
          id: 1,
          name: "North Shore Kitchen Masters",
          rating: 4.9,
          specialties: ["Kitchen", "Modern", "Contemporary"],
          location: "North Sydney, NSW",
          priceRange: "$30,000 - $70,000",
          responseTime: "Within 2 hours",
          phone: "+61 2 9234 5678",
          email: "hello@northshorekitchens.com.au",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 4,
          name: "Harbour City Constructions",
          rating: 4.6,
          specialties: ["Kitchen", "Bathroom", "Extension"],
          location: "Neutral Bay, North Shore",
          priceRange: "$25,000 - $50,000",
          responseTime: "Within 3 hours",
          phone: "+61 2 9456 7890",
          email: "info@harbourcityconstructions.com.au",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
        }
      ];
    }
    return [];
  };

  const getStatusColor = (contractorMatches: ContractorMatch[]) => {
    if (contractorMatches.length > 0) {
      return "bg-green-100 text-green-800";
    }
    return "bg-yellow-100 text-yellow-800";
  };

  const getStatusText = (contractorMatches: ContractorMatch[]) => {
    if (contractorMatches.length > 0) {
      return "Matches Found";
    }
    return "Finding Matches";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your projects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">Error loading projects. Please try again.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Projects</h1>
          <p className="text-gray-600">Track your renovation projects and connect with matched contractors</p>
        </div>

        <div className="space-y-6">
          {projects?.map((project: RenovationProject) => {
            const contractorMatches = getContractorMatches(project);
            return (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="bg-white border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl capitalize mb-2">
                      {project.renovationType} Renovation
                    </CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{project.postcode}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{formatBudget(project.budgetMin, project.budgetMax)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{project.timeline}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(contractorMatches)}>
                    {getStatusText(contractorMatches)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Style:</span>
                      <span className="ml-2 capitalize">{project.style}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Urgency:</span>
                      <span className="ml-2 capitalize">{project.urgency || 'Not specified'}</span>
                    </div>
                  </div>
                  {project.additionalNotes && (
                    <div className="mt-3">
                      <span className="font-medium text-gray-700">Notes:</span>
                      <p className="text-gray-600 mt-1">{project.additionalNotes}</p>
                    </div>
                  )}
                </div>

                {contractorMatches.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Matched Contractors ({contractorMatches.length})
                    </h3>
                    <div className="grid gap-4">
                      {contractorMatches.map((contractor: ContractorMatch) => (
                        <div key={contractor.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <img
                                src={contractor.image}
                                alt={contractor.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-1">{contractor.name}</h4>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{contractor.rating}</span>
                                  </div>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-sm text-gray-600">{contractor.location}</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {contractor.specialties.map((specialty: string) => (
                                    <Badge key={specialty} variant="secondary" className="text-xs">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <div>{contractor.priceRange}</div>
                                  <div>Responds {contractor.responseTime.toLowerCase()}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button size="sm" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline" className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            );
          })}
        </div>

        {(!projects || projects.length === 0) && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-gray-600 mb-4">Start your renovation journey by submitting your first project</p>
              <Button>Submit New Project</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}