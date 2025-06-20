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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Home, Bath, Utensils, Bed, Sofa, Hammer, Loader2 } from "lucide-react";
import { insertRenovationProjectSchema } from "@/shared/schema";
import type { InsertRenovationProject } from "@/shared/schema";

// Simplified form validation schema
const formSchema = z.object({
  renovationType: z.string().min(1, "Please select a renovation type"),
  postcode: z.string().min(1, "Please enter your postcode"),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
  style: z.string().min(1, "Please select a style"),
  timeline: z.string().min(1, "Please select a timeline"),
  urgency: z.string().optional(),
  additionalNotes: z.string().optional(),
  userId: z.number().nullable().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface OnboardingFormProps {
  onSubmit: (data: InsertRenovationProject) => void;
  isSubmitting?: boolean;
}

const renovationTypes = [
  { value: "kitchen", label: "Kitchen", icon: Utensils },
  { value: "bathroom", label: "Bathroom", icon: Bath },
  { value: "bedroom", label: "Bedroom", icon: Bed },
  { value: "living_room", label: "Living Room", icon: Sofa },
  { value: "full_home", label: "Full Home", icon: Home },
  { value: "other", label: "Other", icon: Hammer },
];

const budgetRanges = [
  { value: "5000-15000", label: "$5,000 - $15,000", min: "5000", max: "15000" },
  { value: "15000-30000", label: "$15,000 - $30,000", min: "15000", max: "30000" },
  { value: "30000-50000", label: "$30,000 - $50,000", min: "30000", max: "50000" },
  { value: "50000-100000", label: "$50,000 - $100,000", min: "50000", max: "100000" },
  { value: "100000+", label: "$100,000+", min: "100000", max: "500000" },
];

const styles = [
  { value: "modern", label: "Modern", description: "Clean lines, minimalist aesthetic" },
  { value: "traditional", label: "Traditional", description: "Classic, timeless design" },
  { value: "contemporary", label: "Contemporary", description: "Current trends, sleek finishes" },
  { value: "rustic", label: "Rustic", description: "Natural materials, cozy feel" },
  { value: "industrial", label: "Industrial", description: "Raw materials, urban aesthetic" },
  { value: "scandinavian", label: "Scandinavian", description: "Light colors, functional design" },
];

const timelines = [
  { value: "asap", label: "ASAP", description: "Start within 2 weeks" },
  { value: "1-3_months", label: "1-3 Months", description: "Flexible start date" },
  { value: "3-6_months", label: "3-6 Months", description: "Planning phase" },
  { value: "6+_months", label: "6+ Months", description: "Future project" },
];

export default function OnboardingForm({ onSubmit, isSubmitting = false }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSteps = 5;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      renovationType: "",
      postcode: "",
      budgetMin: "",
      budgetMax: "",
      style: "",
      timeline: "",
      urgency: "",
      additionalNotes: "",
    },
  });

  const nextStep = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['renovationType'];
        break;
      case 2:
        fieldsToValidate = ['postcode'];
        break;
      case 3:
        fieldsToValidate = ['budgetMin', 'budgetMax'];
        break;
      case 4:
        fieldsToValidate = ['style'];
        break;
      case 5:
        fieldsToValidate = ['timeline'];
        break;
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid && currentStep < totalSteps) {
      setIsTransitioning(true);
      
      // Add a smooth transition delay
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleFormSubmit = (data: FormData) => {
    const projectData: InsertRenovationProject = {
      ...data,
      userId: null, // Will be set in the parent component
    };
    onSubmit(projectData);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto relative overflow-hidden">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>Step {currentStep} of {totalSteps}</CardTitle>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            
            {/* Loading Overlay */}
            {isTransitioning && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-red-400" />
                  <span className="text-sm text-gray-600">Loading next step...</span>
                </div>
              </div>
            )}
            
            {/* Step 1: Renovation Type */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-3 duration-300">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">What type of renovation?</h3>
                  <p className="text-gray-600">Select the main area you want to renovate</p>
                </div>
                <FormField
                  control={form.control}
                  name="renovationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-4">
                          {renovationTypes.map((type) => (
                            <div
                              key={type.value}
                              onClick={() => field.onChange(type.value)}
                              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                field.value === type.value
                                  ? "border-red-400 craftly-coral text-white"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <type.icon className="w-8 h-8 mb-2" />
                              <span className="font-medium">{type.label}</span>
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

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-3 duration-300">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">Where is your project?</h3>
                  <p className="text-gray-600">We'll match you with contractors in your area</p>
                </div>
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode / ZIP Code</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 10001, 90210, M1A 1A1" 
                          {...field}
                          className="text-lg p-3"
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
              <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-3 duration-300">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">What's your budget?</h3>
                  <p className="text-gray-600">This helps us match you with contractors in your price range</p>
                </div>
                <FormField
                  control={form.control}
                  name="budgetMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-3">
                          {budgetRanges.map((range) => {
                            const isSelected = field.value === range.min && form.watch("budgetMax") === range.max;
                            return (
                              <div
                                key={range.value}
                                onClick={() => {
                                  form.setValue("budgetMin", range.min);
                                  form.setValue("budgetMax", range.max);
                                }}
                                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  isSelected
                                    ? "border-red-400 bg-red-50"
                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                <span className="text-lg font-medium">{range.label}</span>
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

            {/* Step 4: Style */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-3 duration-300">
                <div>
                  <h3 className="text-xl font-semibold craftly-navy-text mb-2">What's your style?</h3>
                  <p className="text-gray-600">Choose the design aesthetic you prefer</p>
                </div>
                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-3">
                          {styles.map((style) => (
                            <div
                              key={style.value}
                              onClick={() => field.onChange(style.value)}
                              className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                field.value === style.value
                                  ? "border-red-400 bg-red-50"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <span className="font-medium text-lg">{style.label}</span>
                              <span className="text-gray-500 text-sm mt-1">{style.description}</span>
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
              <div className="space-y-6 animate-in fade-in-50 slide-in-from-right-3 duration-300">
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
                              className={`flex flex-col p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                field.value === timeline.value
                                  ? "border-red-400 bg-red-50"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <span className="font-medium">{timeline.label}</span>
                              <span className="text-gray-500 text-sm">{timeline.description}</span>
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
                          value={field.value || ""}
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
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < totalSteps ? (
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="craftly-coral text-white flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="craftly-coral text-white px-8"
                  >
                    {isSubmitting ? "Creating Project..." : "Get Matched"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}