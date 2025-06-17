import { IdCard, Shield, Star, Handshake, Wrench, Award } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: IdCard,
      title: "Licensed",
      subtitle: "Contractors",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Insured",
      subtitle: "Protection",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Star,
      title: "Top Rated",
      subtitle: "4.8+ Stars",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      icon: Handshake,
      title: "Vetted",
      subtitle: "Background",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Wrench,
      title: "Experienced",
      subtitle: "5+ Years",
      bgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: Award,
      title: "Certified",
      subtitle: "Specialists",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <section className="py-20 craftly-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold craftly-navy-text mb-4">Trusted by Top Professionals</h2>
          <p className="text-xl text-gray-600">Our network includes licensed, insured, and highly-rated contractors</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className={`w-16 h-16 ${badge.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <badge.icon className={`${badge.iconColor} text-2xl`} />
              </div>
              <div className="text-sm font-semibold craftly-navy-text">{badge.title}</div>
              <div className="text-xs text-gray-500">{badge.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
