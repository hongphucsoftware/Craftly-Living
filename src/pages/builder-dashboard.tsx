import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Builder } from "@shared/schema";

export default function BuilderDashboard() {
  const { builderId } = useParams();

  const { data: builder, isLoading, error } = useQuery<Builder>({
    queryKey: ["/api/builders", builderId],
    enabled: !!builderId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h1>
          <p className="text-gray-600">Unable to load builder profile. Please try again.</p>
          <button 
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!builder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Builder Not Found</h1>
          <p className="text-gray-600">The builder profile you're looking for doesn't exist.</p>
          <button 
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Safely parse JSON data with fallbacks
  let specialties: string[] = [];
  let serviceAreas: string[] = [];

  try {
    specialties = JSON.parse(builder.specialties || '[]');
    serviceAreas = JSON.parse(builder.serviceAreas || '[]');
  } catch (e) {
    console.error('Error parsing builder data:', e);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-800 text-xl font-semibold">
                  {builder.businessName?.charAt(0) || 'B'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{builder.businessName}</h1>
                <p className="text-gray-600">{builder.contactName}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">
                    {parseFloat(builder.rating || "0").toFixed(1)} ({builder.totalReviews} reviews)
                  </span>
                  {builder.verified && (
                    <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to your Craftly Living dashboard, {builder.contactName}!
          </h2>
          <p className="text-gray-600">
            Your profile is live and ready to receive leads. Here's how your business appears to potential clients.
          </p>
        </div>

        {/* Business Information */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contact Details</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 mr-2">📧</span>
                  {builder.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 mr-2">📞</span>
                  {builder.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 mr-2">📍</span>
                  {builder.businessAddress}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
              <p className="text-sm text-gray-600 mb-3">{builder.yearsExperience} years in the industry</p>
              
              <h4 className="font-medium text-gray-900 mb-2">Service Areas</h4>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty: string, index: number) => (
                <span key={index} className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-2">About</h4>
            <p className="text-sm text-gray-600">{builder.description}</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-amber-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-amber-600 mr-3">✓</span>
              <span className="text-gray-700">Profile created successfully</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">◯</span>
              <span className="text-gray-600">Add portfolio images to showcase your work</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">◯</span>
              <span className="text-gray-600">Complete verification process</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">◯</span>
              <span className="text-gray-600">Start receiving and responding to leads</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}