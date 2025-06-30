import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/image-upload";
import Navigation from "@/components/navigation";
import { ArrowLeft, Building2, Phone, Mail, MapPin, Award, DollarSign, Camera, Plus, X } from "lucide-react";
import { Link } from "wouter";

const builderSignupSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  abn: z.string().optional(),
  businessAddress: z.string().min(5, "Please enter your business address"),
  serviceAreas: z.array(z.string()).min(1, "Please select at least one service area"),
  specialties: z.array(z.string()).min(1, "Please select at least one specialty"),
  yearsExperience: z.number().min(1, "Years of experience must be at least 1"),
  insuranceDetails: z.string().optional(),
  licenseNumber: z.string().optional(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  profileImageUrl: z.string().optional(),
  portfolioImages: z.array(z.string()).optional(),
  description: z.string().min(50, "Description must be at least 50 characters"),
  priceRangeMin: z.string().optional(),
  priceRangeMax: z.string().optional(),
});

type BuilderSignupForm = z.infer<typeof builderSignupSchema>;

const serviceAreaOptions = [
  "North Sydney",
  "Northern Beaches",
  "Eastern Suburbs",
  "Inner West",
  "Western Sydney",
  "South Sydney",
  "Central Coast",
  "Blue Mountains"
];

const specialtyOptions = [
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Home Extensions",
  "Complete Home Renovation",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Tiling",
  "Flooring",
  "Roofing",
  "Landscaping"
];

export default function BuilderSignup() {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string>();
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);

  const form = useForm<BuilderSignupForm>({
    resolver: zodResolver(builderSignupSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      abn: "",
      businessAddress: "",
      serviceAreas: [],
      specialties: [],
      yearsExperience: 1,
      insuranceDetails: "",
      licenseNumber: "",
      websiteUrl: "",
      profileImageUrl: "",
      portfolioImages: [],
      description: "",
      priceRangeMin: "",
      priceRangeMax: "",
    },
  });

  const createBuilderMutation = useMutation({
    mutationFn: async (data: BuilderSignupForm) => {
      const builderData = {
        ...data,
        profileImageUrl: profileImage || "",
        portfolioImages: portfolioImages,
      };
      
      const response = await fetch("/api/builders", {
        method: "POST",
        body: JSON.stringify(builderData),
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create builder profile");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your builder profile has been created successfully. We'll review your application and contact you soon.",
      });
      form.reset();
      setProfileImage(undefined);
      setPortfolioImages([]);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create builder profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleProfileImageUpload = (file: File) => {
    // In a real app, you'd upload to a file storage service like AWS S3, Cloudinary, etc.
    // For demo purposes, we'll create a local URL
    const url = URL.createObjectURL(file);
    setProfileImage(url);
    form.setValue("profileImageUrl", url);
  };

  const handlePortfolioImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    const newImages = [...portfolioImages, url];
    setPortfolioImages(newImages);
    form.setValue("portfolioImages", newImages);
  };

  const removePortfolioImage = (index: number) => {
    const newImages = portfolioImages.filter((_, i) => i !== index);
    setPortfolioImages(newImages);
    form.setValue("portfolioImages", newImages);
  };

  const onSubmit = (data: BuilderSignupForm) => {
    createBuilderMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/join-network">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Network Page
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Join Our Network
          </h1>
          <p className="text-xl text-amber-700">
            Create your builder profile and start receiving quality leads from homeowners across Sydney.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Business Information */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Building2 className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-bold text-amber-900">Business Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Business Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+61 4XX XXX XXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="abn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ABN (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="11 222 333 444" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="NSW123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="businessAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Business Street, Sydney NSW 2000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourbusiness.com.au" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Service Areas & Specialties */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-bold text-amber-900">Service Areas & Specialties</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="serviceAreas"
                  render={() => (
                    <FormItem>
                      <FormLabel>Service Areas *</FormLabel>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {serviceAreaOptions.map((area) => (
                          <FormField
                            key={area}
                            control={form.control}
                            name="serviceAreas"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(area)}
                                    onCheckedChange={(checked) => {
                                      const updatedAreas = checked
                                        ? [...(field.value || []), area]
                                        : (field.value || []).filter((value) => value !== area);
                                      field.onChange(updatedAreas);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {area}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialties"
                  render={() => (
                    <FormItem>
                      <FormLabel>Specialties *</FormLabel>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {specialtyOptions.map((specialty) => (
                          <FormField
                            key={specialty}
                            control={form.control}
                            name="specialties"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(specialty)}
                                    onCheckedChange={(checked) => {
                                      const updatedSpecialties = checked
                                        ? [...(field.value || []), specialty]
                                        : (field.value || []).filter((value) => value !== specialty);
                                      field.onChange(updatedSpecialties);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {specialty}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Experience & Credentials */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-bold text-amber-900">Experience & Credentials</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="yearsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience *</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(50)].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} year{i + 1 !== 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="priceRangeMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Price Range</FormLabel>
                        <FormControl>
                          <Input placeholder="$25,000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceRangeMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Price Range</FormLabel>
                        <FormControl>
                          <Input placeholder="$100,000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="insuranceDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Details (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your insurance coverage (public liability, workers compensation, etc.)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Profile & Portfolio */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Camera className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-bold text-amber-900">Profile & Portfolio</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <FormLabel>Profile Photo</FormLabel>
                  <div className="mt-2">
                    <ImageUpload
                      onImageUpload={handleProfileImageUpload}
                      onImageRemove={() => setProfileImage(undefined)}
                      previewUrl={profileImage}
                      maxSize={5}
                      accept="image/*"
                    />
                  </div>
                </div>

                <div>
                  <FormLabel>Portfolio Images (Up to 6 images)</FormLabel>
                  <div className="mt-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {portfolioImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`Portfolio ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-amber-200"
                          />
                          <button
                            type="button"
                            onClick={() => removePortfolioImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {portfolioImages.length < 6 && (
                      <div className="mt-4">
                        <ImageUpload
                          onImageUpload={handlePortfolioImageUpload}
                          onImageRemove={() => {}}
                          maxSize={5}
                          accept="image/*"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell homeowners about your business, experience, and what makes you special. Include your approach to projects, quality standards, and customer service." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 text-lg"
                disabled={createBuilderMutation.isPending}
              >
                {createBuilderMutation.isPending ? "Creating Profile..." : "Create Builder Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}