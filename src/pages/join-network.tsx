import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, MapPin, Clock, Star, Phone, Mail, ArrowRight, Shield, Target, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

export default function JoinNetwork() {
  const [, setLocation] = useLocation();

  const handleJoinNetwork = () => {
    // For now, redirect to contact form or external application
    window.open('mailto:tradies@craftlyliving.com?subject=Join Network Application', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setLocation('/')}
                className="text-2xl font-bold text-slate-800 hover:text-slate-600 transition-colors"
              >
                Craftly Living
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLocation('/')}
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                For Homeowners
              </button>
              <Button 
                onClick={handleJoinNetwork}
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-sm text-slate-700 font-medium mb-6">
            <Shield className="h-4 w-4 text-slate-600" />
            Trusted by 150+ professional tradies
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            No More Time-Wasters.
            <br />
            <span className="text-blue-600">Just Quality Jobs.</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We send you jobs you actually want — by postcode, scope, and timing. 
            <strong>We manually vet every homeowner before sending a lead.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={handleJoinNetwork}
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join the Network
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">$85k</div>
              <div className="text-slate-600">Average project value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">3-5</div>
              <div className="text-slate-600">Leads per week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">48hrs</div>
              <div className="text-slate-600">Response guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Set Your Preferences</h3>
              <p className="text-slate-600">Tell us your trade, service areas, project types, and availability. We only send relevant opportunities.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Receive Vetted Leads</h3>
              <p className="text-slate-600">We verify every homeowner's budget, timeline, and commitment before sending you their details.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Win More Work</h3>
              <p className="text-slate-600">Connect directly with serious homeowners ready to move forward. No bidding wars or lowball offers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Join Our Network</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Pre-Qualified Homeowners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Every lead has confirmed budget, timeline, and is ready to proceed. No tire-kickers or unrealistic expectations.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  Local Market Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Work exclusively in North Sydney, Northern Beaches, and Eastern Suburbs. No long drives or unfamiliar areas.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                  No Bidding Wars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">We limit each project to 3 carefully selected tradies. Quality over quantity, fair competition guaranteed.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-yellow-600" />
                  Build Your Reputation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Showcase your best work, collect reviews, and build a strong local reputation that attracts more quality clients.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">What Other Tradies Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">"Finally, leads that actually convert. Every homeowner I've met through Craftly has been serious about their project and had a realistic budget."</p>
                <div className="font-semibold text-slate-900">Mike Chen</div>
                <div className="text-sm text-slate-500">Kitchen Renovations, Mosman</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">"The quality of leads is outstanding. I've booked 80% of the projects they've sent me. No more wasting time on quotes that go nowhere."</p>
                <div className="font-semibold text-slate-900">Sarah Williams</div>
                <div className="text-sm text-slate-500">Bathroom Specialist, Manly</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">"Best part is the local focus. All my jobs are within 20 minutes of home. More time working, less time driving."</p>
                <div className="font-semibold text-slate-900">Tom Rodriguez</div>
                <div className="text-sm text-slate-500">General Builder, North Sydney</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join 150+ professional tradies who are winning quality work through our network.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={handleJoinNetwork}
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl"
            >
              Join the Network
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>1800 CRAFTLY</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>tradies@craftlyliving.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}