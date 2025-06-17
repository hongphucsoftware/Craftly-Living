import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Sydney, NSW",
      initials: "SJ",
      rating: 5,
      comment: "Craftly Living made our kitchen renovation stress-free. They matched us with an amazing contractor who understood exactly what we wanted. The whole process was seamless!",
      bgColor: "craftly-coral"
    },
    {
      name: "Mike Chen",
      location: "Parramatta, NSW",
      initials: "MC",
      rating: 5,
      comment: "We were matched with three excellent contractors for our bathroom remodel. The quality of work exceeded our expectations, and the project finished on time and budget.",
      bgColor: "craftly-teal"
    },
    {
      name: "Emily Davis",
      location: "Bondi Beach, NSW",
      initials: "ED",
      rating: 5,
      comment: "The matching process was incredibly thorough. We felt confident in our choice and our contractor delivered exactly what we envisioned for our living room renovation.",
      bgColor: "bg-green-500"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold craftly-navy-text mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Real stories from homeowners who found their perfect match</p>
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
