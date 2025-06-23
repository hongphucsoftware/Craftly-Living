import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah & Tom",
      location: "Mosman, NSW",
      initials: "ST",
      rating: 5,
      comment: "We honestly didn't know where to start with our kitchen reno. The team found us the perfect tradie who made everything so simple. No stress, no runaround - just honest help.",
      bgColor: "bg-amber-500"
    },
    {
      name: "Jenny Williams",
      location: "Manly, NSW",
      initials: "JW",
      rating: 5,
      comment: "After being let down by other services, this was refreshing. They genuinely cared about finding the right fit for our family. Our bathroom renovation was a dream come true.",
      bgColor: "bg-orange-500"
    },
    {
      name: "David & Lisa",
      location: "North Sydney, NSW",
      initials: "DL",
      rating: 5,
      comment: "The personal touch made all the difference. They took time to understand what we wanted and matched us with a tradie who felt like family. Couldn't be happier with our new living space.",
      bgColor: "bg-yellow-600"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Happy Homes, Happy Families</h2>
          <p className="text-xl text-gray-600">Real stories from Sydney families who trusted us with their dream renovations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="craftly-gray rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center justify-center">
                <div className={`w-12 h-12 ${testimonial.name === "Mike Chen" || testimonial.name === "Sarah Johnson" ? 'bg-green-500' : testimonial.bgColor} rounded-full flex items-center justify-center mr-4`}>
                  <span className="text-white font-semibold">{testimonial.initials}</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold craftly-navy-text">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
