import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#fff1f2] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-[#be123c]">Craftly Living</h3>
            <p className="text-[#7f1d1d] mb-6 leading-relaxed">
              Connecting homeowners with trusted renovation professionals. 
              We make home improvement projects simple, reliable, and stress-free.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-[#be123c] rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[#be123c] rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[#be123c] rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[#be123c] rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#be123c]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-[#7f1d1d] hover:text-[#dc2626] transition-colors duration-200"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-[#7f1d1d] hover:text-[#dc2626] transition-colors duration-200"
                >
                  Reviews
                </button>
              </li>
              <li>
                <a href="#" className="text-[#7f1d1d] hover:text-[#dc2626] transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#7f1d1d] hover:text-[#dc2626] transition-colors duration-200">
                  For Contractors
                </a>
              </li>
              <li>
                <a href="#" className="text-[#7f1d1d] hover:text-[#dc2626] transition-colors duration-200">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#be123c]">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-[#be123c]" />
                <span className="text-[#7f1d1d]">hi.craftlyliving@gmail.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-[#be123c]" />
                <span className="text-[#7f1d1d]">+61 401 093 899</span>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-[#be123c]" />
                <span className="text-[#7f1d1d]">Sydney, NSW, Australia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#fca5a5] mt-12 pt-8 text-center">
          <p className="text-[#7f1d1d]">
            © 2024 Craftly Living. All rights reserved. | 
            <a href="#" className="hover:text-[#dc2626] transition-colors duration-200 ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-[#dc2626] transition-colors duration-200 ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
