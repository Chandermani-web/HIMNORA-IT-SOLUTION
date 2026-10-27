import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { PRICING_PLANS, FAQ_ITEMS } from '../../data/agencyData';
import { SectionHeader } from '../ui/SectionHeader';
import { CircleCTA } from '../ui/CircleCTA';

interface PricingSectionProps {
  showPricingCards?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  showPricingCards = true,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header with Title and Talk CTA Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader
          eyebrow="TRANSPARENT VALUE"
          title="Predictable investment, exceptional compounding return."
          subtitle="Fixed-scope pricing designed for fast delivery and zero hidden surprises. Every engagement includes post-launch support and complete intellectual property handover."
          className="mb-0"
        />
        <div className="shrink-0 pb-2">
          {/* Button for talk right from here */}
          <CircleCTA label="LET'S TALK" to="/contact" />
        </div>
      </div>

      {/* Conditionally Render Pricing Cards (Only when showPricingCards is true) */}
      {showPricingCards && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isFeatured = plan.popular;

            return (
              <div
                key={plan.id}
                className={`rounded-[24px] p-8 flex flex-col justify-between transition-all duration-300 editorial-card ${
                  isFeatured
                    ? 'bg-[#0a0a0a] text-white border border-white/10 shadow-xl lg:-translate-y-2'
                    : 'bg-white text-[#0a0a0a] border border-black/5 shadow-sm'
                }`}
              >
                <div>
                  {/* Plan header */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold ${
                        isFeatured ? 'text-gray-400' : 'text-[#6b6b6b]'
                      }`}
                    >
                      {plan.targetAudience}
                    </span>
                    {isFeatured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-[#0a0a0a]">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isFeatured ? 'text-gray-300' : 'text-[#6b6b6b]'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className="my-6 pb-6 border-b border-current/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-light tracking-tight">
                        {plan.price}
                      </span>
                      <span
                        className={`text-xs uppercase font-mono ${
                          isFeatured ? 'text-gray-400' : 'text-[#6b6b6b]'
                        }`}
                      >
                        / {plan.billingPeriod}
                      </span>
                    </div>
                    <span
                      className={`inline-block mt-2 text-xs font-medium ${
                        isFeatured ? 'text-gray-400' : 'text-[#6b6b6b]'
                      }`}
                    >
                      Estimated timeline: {plan.timeline}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8 text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isFeatured ? 'bg-white/10 text-white' : 'bg-black/5 text-[#0a0a0a]'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </span>
                        <span className={isFeatured ? 'text-gray-200' : 'text-[#0a0a0a]'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-current/10">
                  <CircleCTA
                    label="CHOOSE THIS PLAN"
                    to={`/quote?plan=${plan.id}`}
                    variant={isFeatured ? 'light' : 'dark'}
                    className="w-full justify-center"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto pt-6">
        <SectionHeader
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Everything you need to know about partnering with Himnora."
          align="center"
        />

        <div className="space-y-4 mt-12">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-[24px] border border-black/5 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-6 cursor-pointer focus-visible:outline-none focus-visible:bg-gray-50"
                >
                  <span className="text-lg sm:text-xl font-light text-[#0a0a0a] tracking-tight">
                    {faq.question}
                  </span>
                  <span
                    className={`w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-[#0a0a0a] text-white' : 'text-[#0a0a0a]'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-8 sm:px-8 pt-0 animate-in fade-in duration-200">
                    <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed pt-2 border-t border-black/5">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
