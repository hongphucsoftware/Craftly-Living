import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Builder } from "@shared/schema";

export default function BuilderDashboard() {
  const { builderId } = useParams();

  const { data: builder, isLoading, error } = useQuery<Builder>({
    queryKey: ["/api/builders", builderId],
    queryFn: async () => {
      const response = await fetch(`/api/builders/${builderId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch builder');
      }
      return response.json();
    },
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
  let portfolioImages: string[] = [];

  try {
    specialties = JSON.parse(builder.specialties || '[]');
    serviceAreas = JSON.parse(builder.serviceAreas || '[]');
    portfolioImages = JSON.parse(builder.portfolioImages || '[]');
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
              <div className="relative">
                {builder.profileImageUrl ? (
                  <img
                    src={builder.profileImageUrl}
                    alt={`${builder.businessName} profile`}
                    className="h-16 w-16 rounded-full object-cover border-2 border-amber-200"
                  />
                ) : (
                  <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-800 text-xl font-semibold">
                      {builder.businessName?.charAt(0) || 'B'}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                  <span className="text-xs">📷</span>
                </div>
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

        {/* Portfolio Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Portfolio Gallery</h3>
            <button className="px-4 py-2 text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50">
              Add Images
            </button>
          </div>
          
          {portfolioImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolioImages.map((imageUrl: string, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Portfolio project ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 transition-all duration-200">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add new image placeholder */}
              <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-colors">
                <div className="text-center">
                  <span className="text-2xl text-gray-400">📷</span>
                  <p className="text-sm text-gray-500 mt-1">Add Image</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <span className="text-4xl text-gray-400 block mb-2">📷</span>
              <h4 className="text-lg font-medium text-gray-700 mb-2">No portfolio images yet</h4>
              <p className="text-gray-500 mb-4">
                Showcase your best work by adding project photos. High-quality images help attract more clients.
              </p>
              <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                Upload First Image
              </button>
            </div>
          )}
        </div>

        {/* Profile Image Management */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Image</h3>
          <div className="flex items-center space-x-6">
            <div className="relative">
              {builder.profileImageUrl ? (
                <img
                  src={builder.profileImageUrl}
                  alt={`${builder.businessName} profile`}
                  className="h-24 w-24 rounded-full object-cover border-4 border-amber-200"
                />
              ) : (
                <div className="h-24 w-24 bg-amber-100 rounded-full flex items-center justify-center border-4 border-amber-200">
                  <span className="text-amber-800 text-2xl font-semibold">
                    {builder.businessName?.charAt(0) || 'B'}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-200 cursor-pointer hover:bg-gray-50">
                <span className="text-sm">📷</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">
                {builder.profileImageUrl ? 'Update Profile Picture' : 'Add Profile Picture'}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                A professional photo helps clients trust your business. Use a clear headshot or company logo.
              </p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                  {builder.profileImageUrl ? 'Change Photo' : 'Upload Photo'}
                </button>
                {builder.profileImageUrl && (
                  <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
                    Remove
                  </button>
                )}
              </div>
            </div>
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