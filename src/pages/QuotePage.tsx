import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ContactSection } from '../components/sections/ContactSection';
import { PRICING_PLANS } from '../data/agencyData';

export const QuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan');
  const selectedPlan = PRICING_PLANS.find((p) => p.id === planId);

  const initialBudget =
    planId === 'starter'
      ? 'Below Rs.50,000'
      : planId === 'professional'
      ? 'Rs.50,000 - 1,00,000'
      : planId === 'enterprise'
      ? 'Rs.3,00,000+'
      : '';

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-4xl mb-12">
        <SectionHeader
          eyebrow="COMMISSION INQUIRY"
          title="Request a tailored scope proposal."
          subtitle={
            selectedPlan
              ? `You selected the "${selectedPlan.name}" tier (${selectedPlan.price}). Provide your specifications below to receive an itemized proposal.`
              : 'Tell us about your digital objectives, expected timeline, and requirements. We will prepare an architectural breakdown and quote.'
          }
        />
      </div>

      {selectedPlan && (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/5 shadow-sm mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-[#6b6b6b] block">SELECTED TIER</span>
            <h3 className="text-xl font-light text-[#0a0a0a]">{selectedPlan.name}</h3>
            <p className="text-xs text-[#6b6b6b] mt-1">{selectedPlan.timeline}</p>
          </div>
          <div className="text-2xl font-light text-[#0a0a0a]">
            {selectedPlan.price}
          </div>
        </div>
      )}

      {/* Main Contact & Quote Form */}
      <ContactSection initialBudget={initialBudget} />
    </div>
  );
};
