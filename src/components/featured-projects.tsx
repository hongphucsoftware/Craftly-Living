export default function FeaturedProjects() {
  const projects = [
    {
      title: "Master Bathroom",
      description: "Complete renovation in 3 weeks",
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      alt: "Stunning before and after bathroom renovation with modern fixtures"
    },
    {
      title: "Kitchen Remodel",
      description: "Open concept transformation",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      alt: "Modern kitchen renovation with island and stainless steel appliances"
    },
    {
      title: "Living Room",
      description: "Contemporary style makeover",
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      alt: "Beautiful living room renovation with modern furniture and lighting"
    },
    {
      title: "Master Bedroom",
      description: "Custom built-in storage",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      alt: "Bright and airy bedroom renovation with custom built-ins and natural lighting"
    }
  ];

  return (
    <section className="py-20 craftly-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold craftly-navy-text mb-4">Recent Success Stories</h2>
          <p className="text-xl text-gray-600">See the amazing transformations our matched contractors have created</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={project.image}
                alt={project.alt}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold craftly-navy-text mb-2">{project.title}</h4>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
