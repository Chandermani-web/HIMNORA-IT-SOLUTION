import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ContactSection } from '../components/sections/ContactSection';
import { SectionHeader } from '../components/ui/SectionHeader';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  return (
    <div className="py-8">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          eyebrow="COMMISSION INQUIRY"
          title="Let's build something exceptional together."
          subtitle="Whether you require a complete digital rebrand, high-velocity web application, or technical SEO overhaul, we are ready to assist."
        />
      </div>
      <ContactSection initialService={initialService} />
    </div>
  );
};
