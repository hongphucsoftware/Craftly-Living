import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import FeaturedProjects from "@/components/featured-projects";
import Testimonials from "@/components/testimonials";
import TrustBadges from "@/components/trust-badges";
import CTASection from "@/components/cta-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <FeaturedProjects />
      <Testimonials />
      <TrustBadges />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
}
