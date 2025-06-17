import { Button } from "@/components/ui/button";

export default function CTASection() {
  const handleGetMatched = () => {
    console.log('Get Matched Now clicked - implement signup/onboarding flow');
  };

  const handleScheduleConsultation = () => {
    console.log('Schedule Consultation clicked - implement scheduling flow');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-red-400 to-red-500">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Renovation?</h2>
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Join thousands of homeowners who have found their perfect contractor match. 
          Get started today and turn your dream space into reality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGetMatched}
            className="bg-white text-red-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Matched Now
          </Button>
          <Button 
            variant="outline"
            onClick={handleScheduleConsultation}
            className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-red-500 transition-all duration-200"
          >
            Schedule Consultation
          </Button>
        </div>
        <p className="text-white/80 text-sm mt-6">No upfront costs • Free matching service • 100% satisfaction guarantee</p>
      </div>
    </section>
  );
}
