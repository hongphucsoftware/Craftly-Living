import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Home, Bath, Utensils, Bed, Sofa, Hammer, Loader2 } from "lucide-react";
import type { InsertRenovationProject } from "@shared/schema";

// Simplified form schema
const formSchema = z.object({
  renovationType: z.string().min(1, "Please select a renovation type"),
  postcode: z.string().min(1, "Please enter your postcode"),
  budget: z.string().min(1, "Please select a budget range"),
  style: z.string().min(1, "Please select a style"),
  timeline: z.string().min(1, "Please select a timeline"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface OnboardingFormProps {
  onSubmit: (data: InsertRenovationProject) => void;
  isSubmitting?: boolean;
}

export default function OnboardingForm({ onSubmit, isSubmitting = false }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      renovationType: "",
      postcode: "",
      budget: "",
      style: "",
      timeline: "",
      additionalNotes: "",
    },
  });

  const renovationTypes = [
    { value: "kitchen", label: "Kitchen", icon: Utensils },
    { value: "bathroom", label: "Bathroom", icon: Bath },
    { value: "bedroom", label: "Bedroom", icon: Bed },
    { value: "living_room", label: "Living Room", icon: Sofa },
    { value: "whole_house", label: "Whole House", icon: Home },
    { value: "other", label: "Other", icon: Hammer },
  ];

  const budgetRanges = [
    { value: "under_10k", label: "Under $10,000" },
    { value: "10k_25k", label: "$10,000 - $25,000" },
    { value: "25k_50k", label: "$25,000 - $50,000" },
    { value: "50k_100k", label: "$50,000 - $100,000" },
    { value: "over_100k", label: "Over $100,000" },
  ];

  const styles = [
    { value: "modern", label: "Modern" },
    { value: "traditional", label: "Traditional" },
    { value: "contemporary", label: "Contemporary" },
    { value: "rustic", label: "Rustic" },
    { value: "industrial", label: "Industrial" },
    { value: "minimalist", label: "Minimalist" },
  ];

  const timelines = [
    { value: "asap", label: "ASAP" },
    { value: "1_month", label: "Within 1 month" },
    { value: "3_months", label: "Within 3 months" },
    { value: "6_months", label: "Within 6 months" },
    { value: "planning", label: "Just planning" },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (data: FormData) => {
    const projectData: InsertRenovationProject = {
      renovationType: data.renovationType,
      postcode: data.postcode,
      budget: data.budget,
      style: data.style,
      timeline: data.timeline,
      additionalNotes: data.additionalNotes || "",
    };
    onSubmit(projectData);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl craftly-navy-text">Tell Us About Your Project</CardTitle>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <p className="text-gray-600">Help us find the perfect contractors for your renovation</p>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            
            {/* Step 1: Renovation Type */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">What type of renovation?</h3>
                  <p className="text-gray-600">Select the main area you want to renovate</p>
                </div>
                
                <FormField
                  control={form.control}
                  name="renovationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Renovation Type</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {renovationTypes.map((type) => {
                            const IconComponent = type.icon;
                            return (
                              <div
                                key={type.value}
                                onClick={() => field.onChange(type.value)}
                                className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  field.value === type.value
                                    ? "border-red-400 bg-red-50"
                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                <IconComponent className="w-8 h-8 mb-2 text-gray-600" />
                                <span className="text-sm font-medium">{type.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">Where is your project?</h3>
                  <p className="text-gray-600">Enter your postcode to find local contractors</p>
                </div>
                
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 2000" 
                          {...field}
                          className="text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Budget */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">What's your budget?</h3>
                  <p className="text-gray-600">This helps us match you with the right contractors</p>
                </div>
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Range</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          {budgetRanges.map((budget) => (
                            <div
                              key={budget.value}
                              onClick={() => field.onChange(budget.value)}
                              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                field.value === budget.value
                                  ? "border-red-400 bg-red-50"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <span className="font-medium">{budget.label}</span>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 4: Style */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">What's your style?</h3>
                  <p className="text-gray-600">Choose your preferred design style</p>
                </div>
                
                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Design Style</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {styles.map((style) => (
                            <div
                              key={style.value}
                              onClick={() => field.onChange(style.value)}
                              className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                field.value === style.value
                                  ? "border-red-400 bg-red-50"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <span className="font-medium">{style.label}</span>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 5: Timeline & Notes */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">When do you want to start?</h3>
                  <p className="text-gray-600">Help us understand your timeline and any special requirements</p>
                </div>
                
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          {timelines.map((timeline) => (
                            <div
                              key={timeline.value}
                              onClick={() => field.onChange(timeline.value)}
                              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                field.value === timeline.value
                                  ? "border-red-400 bg-red-50"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <span className="font-medium">{timeline.label}</span>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more about your vision, specific requirements, or any other details..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 craftly-red-bg hover:bg-red-500"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 craftly-red-bg hover:bg-red-500"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Matched
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}