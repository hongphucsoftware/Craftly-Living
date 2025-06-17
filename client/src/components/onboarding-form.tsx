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
import { ArrowLeft, ArrowRight, Home, Bath, Utensils, Bed, Sofa, Hammer } from "lucide-react";
import { insertRenovationProjectSchema } from "@shared/schema";
import type { InsertRenovationProject } from "@shared/schema";

// Form validation schema
const formSchema = insertRenovationProjectSchema.extend({
  budgetMin: z.string().min(1, "Budget minimum is required"),
  budgetMax: z.string().min(1, "Budget maximum is required"),
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
      ...data,
      userId: null, // Will be set in the parent component
    };
    onSubmit(projectData);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
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
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-2 gap-4"
                        >
                          {renovationTypes.map((type) => (
                            <div key={type.value}>
                              <RadioGroupItem
                                value={type.value}
                                id={type.value}
                                className="peer sr-only"
                              />
                              <label
                                htmlFor={type.value}
                                className="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-red-400 peer-checked:craftly-coral peer-checked:text-white transition-all"
                              >
                                <type.icon className="w-8 h-8 mb-2" />
                                <span className="font-medium">{type.label}</span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
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
              <div className="space-y-4">
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
                        <RadioGroup
                          value={`${field.value}-${form.watch("budgetMax")}`}
                          onValueChange={(value) => {
                            const range = budgetRanges.find(r => r.value === value);
                            if (range) {
                              form.setValue("budgetMin", range.min);
                              form.setValue("budgetMax", range.max);
                            }
                          }}
                          className="space-y-3"
                        >
                          {budgetRanges.map((range) => (
                            <div key={range.value}>
                              <RadioGroupItem
                                value={range.value}
                                id={range.value}
                                className="peer sr-only"
                              />
                              <label
                                htmlFor={range.value}
                                className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-red-400 peer-checked:bg-red-50 transition-all"
                              >
                                <span className="text-lg font-medium">{range.label}</span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
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
                  <p className="text-gray-600">Choose the design aesthetic you prefer</p>
                </div>
                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="space-y-3"
                        >
                          {styles.map((style) => (
                            <div key={style.value}>
                              <RadioGroupItem
                                value={style.value}
                                id={style.value}
                                className="peer sr-only"
                              />
                              <label
                                htmlFor={style.value}
                                className="flex flex-col p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-red-400 peer-checked:bg-red-50 transition-all"
                              >
                                <span className="font-medium text-lg">{style.label}</span>
                                <span className="text-gray-500 text-sm mt-1">{style.description}</span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
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
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="space-y-3"
                        >
                          {timelines.map((timeline) => (
                            <div key={timeline.value}>
                              <RadioGroupItem
                                value={timeline.value}
                                id={timeline.value}
                                className="peer sr-only"
                              />
                              <label
                                htmlFor={timeline.value}
                                className="flex flex-col p-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-red-400 peer-checked:bg-red-50 transition-all"
                              >
                                <span className="font-medium">{timeline.label}</span>
                                <span className="text-gray-500 text-sm">{timeline.description}</span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
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