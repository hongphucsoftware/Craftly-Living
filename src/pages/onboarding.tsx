import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import OnboardingForm from "@/components/onboarding-form-simple";
import type { InsertRenovationProject } from "@shared/schema";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: InsertRenovationProject) => {
      return await fetch("/api/renovation-projects", {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to create project");
        }
        return res.json();
      });
    },
    onSuccess: () => {
      toast({
        title: "Project Created Successfully!",
        description: "We're finding the perfect contractors for your renovation.",
      });
      setLocation("/contractors");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (data: InsertRenovationProject) => {
    // Submit project without user ID for anonymous submissions
    // In production, userId would come from authenticated user session
    createProjectMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold craftly-navy-text mb-2">Tell Us About Your Project</h1>
          <p className="text-gray-600">Help us find the perfect contractors for your renovation</p>
        </div>
        
        <OnboardingForm 
          onSubmit={handleFormSubmit}
          isSubmitting={createProjectMutation.isPending}
        />
      </div>
    </div>
  );
}