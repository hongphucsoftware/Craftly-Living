import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import OnboardingForm from "@/components/onboarding-form";
import type { InsertRenovationProject } from "@shared/schema";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: InsertRenovationProject) => {
      return apiRequest("/api/renovation-projects", {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Project Created Successfully!",
        description: "We're finding the perfect contractors for your renovation.",
      });
      setLocation("/dashboard");
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
    // For MVP, we'll use a demo user ID (1)
    // In production, this would come from authenticated user session
    const projectData = {
      ...data,
      userId: 1,
    };
    createProjectMutation.mutate(projectData);
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