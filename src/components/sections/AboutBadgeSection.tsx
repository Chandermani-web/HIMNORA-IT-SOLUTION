import React from 'react';
import { Trophy } from 'lucide-react';
import { BlurRevealText } from '../ui/BlurRevealText';

export const AboutBadgeSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#6b6b6b] mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
        <span>ABOUT COMPANY</span>
      </div>

      {/* Centered Rotating Circular-Text Badge with Trophy Icon */}
      <div className="relative w-36 h-36 mx-auto mb-12 flex items-center justify-center">
        {/* Rotating SVG with curved circular text */}
        <svg
          className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite]"
          viewBox="0 0 160 160"
        >
          <defs>
            <path
              id="circlePath"
              d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            />
          </defs>
          <text className="text-[11.5px] uppercase font-bold tracking-[0.24em] fill-[#0a0a0a]">
            <textPath href="#circlePath" startOffset="0%">
              &bull; HIMNORA IT SOLUTION &bull; CREATIVE EXCELLENCE
            </textPath>
          </text>
        </svg>

        {/* Center Trophy Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shadow-md">
          <Trophy className="w-7 h-7 text-amber-300" strokeWidth={1.75} />
        </div>
      </div>

      {/* Large Centered Paragraph (6-8 lines) about Himnora IT Solution */}
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-light text-[#0a0a0a] leading-[1.3] tracking-tight">
          At Himnora IT Solution, we exist at the intersection of exacting digital craft and high-velocity software engineering. We reject cookie-cutter templates, bloated plugins, and superficial design gimmicks. Every platform we build is custom-architected for maximum conversion, uncompromising Core Web Vitals performance, and timeless editorial prestige.
        </p>

        {/* The last phrase blurred, then revealed on scroll */}
        <div className="mt-6 text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-light tracking-tight text-[#0a0a0a]">
          <BlurRevealText
            text="We do not just construct digital websites—we engineer enduring competitive advantages that compound your enterprise value."
            highlightWords={['enduring', 'competitive', 'advantages', 'compound']}
            highlightClass="text-[#0a0a0a] font-normal underline decoration-1 underline-offset-8"
          />
        </div>
      </div>
    </section>
  );
};
