import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CircleCTA } from '../components/ui/CircleCTA';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeader
        eyebrow="LEGAL POLICIES"
        title="Privacy Policy"
        subtitle="Last revised: March 2026. How Himnora IT Solution safeguards your data."
      />

      <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-black/5 shadow-sm space-y-8 text-sm sm:text-base text-[#6b6b6b] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">1. Overview & Commitment</h2>
          <p>
            Himnora IT Solution (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates this website and associated client platforms. We are strictly committed to respecting your privacy, protecting business confidences, and ensuring complete compliance with global privacy regulations (including GDPR and CCPA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">2. Information We Collect</h2>
          <p>
            We collect personal information that you provide voluntarily when requesting a project quote, filling out our contact inquiry form, or corresponding with our engineering team. This typically includes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#0a0a0a]">
            <li>Full Name and Professional Title</li>
            <li>Corporate or Personal Email Address</li>
            <li>Project Budget Range and Service Requirements</li>
            <li>Project Specifications and Scope Details</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">3. How We Utilize Your Data</h2>
          <p>
            Your information is used strictly to prepare project proposals, deliver commissioned engineering services, communicate milestone deliverables, and provide ongoing technical maintenance. We never sell, lease, or monetize your contact information to third parties or advertising networks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">4. Data Security & Storage</h2>
          <p>
            We implement industry-standard encryption protocols (TLS/SSL), enterprise firewalls, and least-privilege access permissions to safeguard all stored data. Client repositories and proprietary codebases are managed under strict bilateral non-disclosure agreements (NDAs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-light text-[#0a0a0a]">5. Contact Us Regarding Privacy</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data deletion, please contact our Data Protection Officer at:
          </p>
          <p className="font-mono text-[#0a0a0a]">
            Email: visionhuntitsolution@gmail.com<br />
            Address: Cyber City Innovation Hub, Tower B, Level 7, Gurugram, India
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <CircleCTA label="BACK TO HOME" to="/" />
      </div>
    </div>
  );
};
