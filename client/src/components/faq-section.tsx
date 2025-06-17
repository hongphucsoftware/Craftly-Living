import { useState } from "react";

const faqs = [
  {
    question: "Why do traditional lead gen platforms frustrate builders?",
    answer:
      "Most platforms send the same leads to dozens of contractors, making it a race to the bottom. Builders waste time chasing unqualified leads who often ghost or price-shop, not value real craftsmanship.",
  },
  {
    question: "Why do I pay for leads that go nowhere?",
    answer:
      "You're often charged per lead, regardless of quality or outcome. Many builders end up spending hundreds just to get a handful of real conversations — and even those can be dead ends.",
  },
  {
    question: "How does Craftly Living actually help builders?",
    answer:
      "We pre-qualify homeowners, limit matches to a few top builders, and support both sides through the process. You get fewer, but far better, opportunities — and homeowners who are ready to move forward.",
  },
  {
    question: "What makes Craftly Living different from other platforms?",
    answer:
      "We listen to builders. Our system is designed to respect your time, reward quality, and build real trust — not just generate as many leads as possible.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-8 text-center">Why Builders Deserve Better</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-lg font-semibold text-[#111827]">{faq.question}</span>
                <span
                  className={`ml-4 text-gray-400 text-2xl transform transition-transform duration-200 ${openIndex === idx ? 'rotate-45' : ''}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {openIndex === idx && (
                <div
                  id={`faq-panel-${idx}`}
                  className="px-6 pb-5 text-[#6b7280] text-base leading-relaxed border-t border-gray-100"
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