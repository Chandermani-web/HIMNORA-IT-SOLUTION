import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CircleCTA } from '../components/ui/CircleCTA';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeader
        eyebrow="LEGAL CONTRACTS"
        title="Terms of Service"
        subtitle="Last revised: March 2026. Terms governing services provided by Himnora IT Solution."
      />

      <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-black/5 shadow-sm space-y-8 text-sm sm:text-base text-[#6b6b6b] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, engaging Himnora IT Solution for digital engineering, design, or marketing commissions, or signing a formal Statement of Work (SOW), you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">2. Project Engagement & Milestone Deliverables</h2>
          <p>
            All custom software and web development projects are executed under mutually executed Statements of Work that specify project deliverables, milestones, delivery timelines, and payment tranches. Change requests exceeding the agreed scope will be evaluated via standard written change orders.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">3. Intellectual Property Transfer</h2>
          <p>
            Upon settlement of all contracted project milestone fees, 100% of custom design files, UI tokens, frontend code, and server configurations created specifically for the client are irrevocably assigned to the client. Himnora IT Solution retains rights solely to pre-existing general libraries and developer tooling.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">4. Warranty & Support Period</h2>
          <p>
            Every custom platform includes a 30 to 90 day post-launch warranty period during which any defects, cross-browser inconsistencies, or unexpected technical bugs within the agreed scope are remediated at zero additional cost.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">5. Inquiries & Legal Governance</h2>
          <p>
            These terms are governed by the laws of India. For commercial inquiries or contract execution, reach out to:
          </p>
          <p className="font-mono text-[#0a0a0a]">
            Email: visionhuntitsolution@gmail.com<br />
            Himnora IT Solution, Gurugram, India
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <CircleCTA label="BACK TO HOME" to="/" />
      </div>
    </div>
  );
};
