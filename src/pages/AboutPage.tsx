import React from 'react';
import { AGENCY_INFO, TESTIMONIALS } from '../data/agencyData';
import { IMAGES } from '../data/images';
import { SectionHeader } from '../components/ui/SectionHeader';
import { SmartImage } from '../components/ui/SmartImage';
import { CircleCTA } from '../components/ui/CircleCTA';
import { CountUp } from '../components/ui/CountUp';
import { Star, ShieldCheck, Zap, Sparkles, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { stats } = AGENCY_INFO;

  const coreValues = [
    {
      icon: Zap,
      title: 'Obsessive Performance',
      description:
        'We refuse to deploy bloated bundles or sluggish interfaces. Sub-second response times and green Core Web Vitals are our baseline.',
    },
    {
      icon: Sparkles,
      title: 'Editorial Aesthetics',
      description:
        'We blend clean geometric typography, generous whitespace, and purposeful micro-interactions that elevate brand authority.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Technical Debt',
      description:
        'Clean TypeScript codebases, modular component architecture, and automated tests ensure your platform scales seamlessly for years.',
    },
    {
      icon: Award,
      title: 'Complete IP Ownership',
      description:
        '100% of code, design systems, and intellectual property are handed over upon delivery with zero vendor lock-in.',
    },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-4xl mb-16">
        <SectionHeader
          eyebrow="ABOUT COMPANY"
          title="We architect digital platforms where rigorous engineering meets high-editorial design."
          subtitle="Himnora IT Solution is an independent digital studio founded on the belief that software should be beautiful, instantaneous, and economically transformative."
        />
        <div className="pt-4">
          <CircleCTA label="WORK WITH US" to="/contact" />
        </div>
      </div>

      {/* 16:9 Team Photo */}
      <div className="mb-20 rounded-[24px] sm:rounded-[36px] overflow-hidden border border-black/5 shadow-md">
        <SmartImage
          src={IMAGES.aboutTeam.src}
          alt={IMAGES.aboutTeam.alt}
          className="w-full object-cover max-h-[580px]"
          aspectRatio="16/9"
          priority={true}
        />
        <div className="bg-white p-4 sm:p-6 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#6b6b6b]">
          <span>HIMNORA IT SOLUTION &bull; PRODUCT TEAM</span>
          <span>CYBER CITY INNOVATION HUB</span>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
        <div className="lg:col-span-5">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#6b6b6b] block mb-4">
            OUR PHILOSOPHY
          </span>
          <h2 className="headline-sub font-light text-[#0a0a0a] tracking-tight">
            Rejecting average. Building category leaders.
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#6b6b6b] leading-relaxed">
          <p>
            The digital landscape is saturated with generic WordPress themes, slow bloated plugins, and template designs that look indistinguishable from one another. At Himnora IT Solution, we take the exact opposite approach.
          </p>
          <p>
            We view web engineering as precision craft. Every line of TypeScript is written with purpose; every component is tuned for sub-second interactions; and every design system is customized to convey unparalleled institutional prestige.
          </p>
          <p>
            From high-growth tech ventures to established enterprises across India, North America, and Europe, our partners trust us to build the digital infrastructure that powers their next decade of growth.
          </p>
        </div>
      </div>

      {/* Stats Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm text-center editorial-card">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b6b6b] block mb-2">
            Completed Projects
          </span>
          <div className="text-4xl sm:text-5xl font-light text-[#0a0a0a]">
            <CountUp end={stats.projectsCompleted} suffix="" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm text-center editorial-card">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b6b6b] block mb-2">
            Visionary Clients
          </span>
          <div className="text-4xl sm:text-5xl font-light text-[#0a0a0a]">
            <CountUp end={stats.clientsServed} suffix="" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm text-center editorial-card">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b6b6b] block mb-2">
            Client Satisfaction
          </span>
          <div className="text-4xl sm:text-5xl font-light text-[#0a0a0a]">
            <CountUp end={stats.satisfactionRate} suffix="%" />
          </div>
        </div>

        <div className="bg-[#0a0a0a] text-white rounded-[24px] p-8 border border-white/5 shadow-sm text-center editorial-card">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2">
            Average Rating
          </span>
          <div className="text-4xl sm:text-5xl font-light text-white">
            <CountUp end={stats.ratingScore} suffix="/5" decimals={1} />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-24">
        <div className="mb-12">
          <SectionHeader
            eyebrow="ENGINEERING ETHOS"
            title="The principles that guide our everyday execution."
            className="mb-0"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm editorial-card"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] text-white flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-light text-[#0a0a0a] mb-2">{val.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-24">
        <div className="mb-12">
          <SectionHeader
            eyebrow="CLIENT VOICES"
            title="Trusted by industry leaders across the globe."
            className="mb-0"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm flex flex-col justify-between editorial-card"
            >
              <div>
                <div className="flex items-center gap-1 text-[#ff6a00] mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ff6a00] text-[#ff6a00]" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#0a0a0a] font-light leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-black/5">
                <div className="font-semibold text-xs text-[#0a0a0a]">{t.author}</div>
                <div className="text-xs text-[#6b6b6b]">{t.role}, {t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action card */}
      <div className="bg-[#0a0a0a] text-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-14 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 block mb-2">
            START YOUR JOURNEY
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-white">
            Ready to experience the Himnora difference?
          </h3>
        </div>
        <div className="shrink-0">
          <CircleCTA label="HIRE US NOW" to="/contact" variant="light" />
        </div>
      </div>
    </div>
  );
};
