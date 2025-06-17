import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function CTASection() {
  const [, setLocation] = useLocation();

  const handleGetMatched = () => {
    setLocation('/onboarding');
  };

  const handleScheduleConsultation = () => {
    console.log('Schedule Consultation clicked - implement scheduling flow');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#fda4af] to-[#fb7185]">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Renovation?</h2>
        <p className="text-xl mb-8 leading-relaxed" style={{ color: '#fcdcdc' }}>
          Join thousands of homeowners who have found their perfect contractor match. 
          Get started today and turn your dream space into reality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGetMatched}
            className="bg-white text-[#e11d48] px-12 py-6 rounded-full text-2xl font-semibold shadow-md hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            Get Matched Now
          </Button>
          <Button 
            onClick={handleScheduleConsultation}
            className="bg-white text-[#e11d48] border-2 border-white px-12 py-6 rounded-full text-2xl font-semibold shadow-md hover:bg-gray-100 hover:text-[#be123c] transition-all duration-200"
          >
            Schedule Consultation
          </Button>
        </div>
        <p className="text-sm mt-6" style={{ color: '#fcdcdc' }}>No upfront costs • Free matching service • 100% satisfaction guarantee</p>
      </div>
    </section>
  );
}
