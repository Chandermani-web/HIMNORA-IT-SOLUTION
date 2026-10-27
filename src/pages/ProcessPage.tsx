import React from 'react';
import { PROCESS_STEPS } from '../data/agencyData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CircleCTA } from '../components/ui/CircleCTA';

export const ProcessPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-4xl mb-16">
        <SectionHeader
          eyebrow="EXECUTION FRAMEWORK"
          title="A systematic, 6-phase engineering lifecycle."
          subtitle="How Himnora IT Solution translates ambitious product visions into bulletproof production reality with zero friction and guaranteed delivery timelines."
        />
        <div className="pt-4">
          <CircleCTA label="START YOUR PROJECT" to="/contact" />
        </div>
      </div>

      {/* 6 Process Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {PROCESS_STEPS.map((step, idx) => {
          const isBlack = idx === 3; // Feature engineering step in black card

          return (
            <div
              key={step.step}
              className={`rounded-[24px] p-8 border transition-all duration-300 editorial-card flex flex-col justify-between ${
                isBlack
                  ? 'bg-[#0a0a0a] text-white border-white/10 shadow-lg'
                  : 'bg-white text-[#0a0a0a] border-black/5 shadow-sm'
              }`}
            >
              <div>
                {/* Step Number & Eyebrow */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className={`font-mono text-2xl font-light ${
                      isBlack ? 'text-white' : 'text-[#0a0a0a]'
                    }`}
                  >
                    {step.step}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md ${
                      isBlack ? 'bg-white/10 text-gray-300' : 'bg-black/5 text-[#6b6b6b]'
                    }`}
                  >
                    PHASE {idx + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-4">
                  {step.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isBlack ? 'text-gray-300' : 'text-[#6b6b6b]'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              <div
                className={`pt-6 mt-8 border-t text-xs font-mono ${
                  isBlack ? 'border-white/10 text-gray-400' : 'border-black/5 text-[#6b6b6b]'
                }`}
              >
                Zero-surprises milestone tracking
              </div>
            </div>
          );
        })}
      </div>

      {/* Assurance Box */}
      <div className="bg-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-14 border border-black/5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#6b6b6b] block mb-2">
            RIGOROUS STANDARDS
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-[#0a0a0a] mb-2">
            Weekly async updates. Direct engineer access.
          </h3>
          <p className="text-sm text-[#6b6b6b]">
            No account manager intermediaries or delayed communication. You speak directly with the architects writing your code.
          </p>
        </div>

        <div className="shrink-0">
          <CircleCTA label="HIRE US NOW" to="/contact" />
        </div>
      </div>
    </div>
  );
};
