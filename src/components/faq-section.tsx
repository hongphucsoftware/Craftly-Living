import { useState } from "react";

const faqs = [
  {
    question: "How does this actually work?",
    answer:
      "We make renovating easier by personally matching you with a small group of trusted local builders. You tell us about your project, and we handpick the right tradies based on your needs, budget, and timeline — no spam, no pressure.",
  },
  {
    question: "Is this just another lead gen site?",
    answer:
      "Nope. We're not a directory or marketplace where dozens of tradies fight for your job. We take the time to understand your project and only connect you with builders who are a great fit.",
  },
  {
    question: "Do I have to pay for this service?",
    answer:
      "No, our matching service is completely free for homeowners. You only pay your builder if you decide to go ahead with the project.",
  },
  {
    question: "Are the builders vetted?",
    answer:
      "Yes. Every builder we work with is manually reviewed for quality, experience, and professionalism. We only recommend builders we'd trust with our own homes.",
  },
  {
    question: "Do you service my area?",
    answer:
      "We're currently matching projects in North Sydney, Northern Beaches, and Eastern Suburbs. If you're outside of this area, you can still submit your project and we'll do our best to help — or let you know when we expand.",
  },
  {
    question: "What kind of projects do you help with?",
    answer:
      "We help with a range of renovations, including kitchen and bathroom renos, full home remodels, extensions and additions, and outdoor and landscaping work. If you're unsure, just ask!",
  },
  {
    question: "How long does it take to get matched?",
    answer:
      "Once you submit your project, we'll review it and get back to you within 1–3 business days with a shortlist of builders. From there, it's up to you how fast you want to move.",
  },
  {
    question: "What happens after I'm matched?",
    answer:
      "You'll get direct contact with the builders — no middlemen. You can chat, request quotes, and move forward at your own pace.",
  },
  {
    question: "What if I don't like any of the builders?",
    answer:
      "No worries. There's no obligation. If none of the matches feel right, we'll either suggest alternatives or leave it at that — no hard feelings.",
  },
  {
    question: "Is my information safe?",
    answer:
      "Absolutely. We only share your details with the builders we match you with. We never sell your info or spam you.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about getting matched with trusted tradies</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 focus:outline-none hover:bg-amber-50 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-lg font-semibold text-gray-900 text-left">{faq.question}</span>
                <span
                  className={`ml-4 text-amber-600 text-2xl transform transition-transform duration-200 ${openIndex === idx ? 'rotate-45' : ''}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {openIndex === idx && (
                <div
                  id={`faq-panel-${idx}`}
                  className="px-6 pb-5 text-gray-700 text-base leading-relaxed border-t border-amber-100 bg-amber-50/30"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 