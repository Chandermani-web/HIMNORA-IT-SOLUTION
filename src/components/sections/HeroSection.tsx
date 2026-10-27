import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { AGENCY_INFO, SERVICES } from '../../data/agencyData';
import { CircleCTA } from '../ui/CircleCTA';
import { gsap, ScrollTrigger, SplitText } from '../../animations/register';
import { ScrambleText } from '../../animations/ScrambleText';
import { MarqueeLoop } from '../../animations/MarqueeLoop';
import { useMagnetic } from '../../animations/useMagnetic';
import { onAppReady, live } from '../../animations/store';
import { prefersReducedMotion } from '../../animations/useReducedMotion';

const PROXIMITY_RADIUS = 140;

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLSpanElement>(null);

  useMagnetic(ctaRef, 0.3, 90);

  const techItems = useMemo(() => {
    const all = SERVICES.flatMap((s) => s.techStack);
    return Array.from(new Set(all)).slice(0, 14);
  }, []);

  useLayoutEffect(() => {
    const h1 = h1Ref.current;
    if (!h1 || prefersReducedMotion()) return;

    let started = false;
    let intro: gsap.core.Timeline | null = null;
    let chars: HTMLElement[] = [];
    let teardownProximity: (() => void) | null = null;
    let teardownWave: (() => void) | null = null;

    const ctx = gsap.context(() => {
      gsap.set([h1, subRef.current, ctaRef.current], { autoAlpha: 0 });

      // ---------- proximity (desktop pointers only) ----------
      const setupProximity = () => {
        teardownProximity?.();
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const items = chars.map((el) => ({
          el,
          light: el.dataset.light === '1',
          cx: 0,
          cy: 0,
          qy: gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' }),
          qs: gsap.quickTo(el, 'scale', { duration: 0.55, ease: 'power3.out' }),
          qw: gsap.quickTo(el, '--w', { duration: 0.55, ease: 'power3.out' }),
        }));

        const measure = () => {
          items.forEach((it) => {
            const r = it.el.getBoundingClientRect();
            it.cx = r.left + r.width / 2 + window.scrollX;
            it.cy = r.top + r.height / 2 + window.scrollY;
          });
        };
        measure();
        const onResize = () => measure();
        window.addEventListener('resize', onResize);

        let wasNear = false;
        const tick = () => {
          const px = live.pointer.px + window.scrollX;
          const py = live.pointer.py + window.scrollY;
          const box = h1.getBoundingClientRect();
          const near =
            live.pointer.px > box.left - 160 &&
            live.pointer.px < box.right + 160 &&
            live.pointer.py > box.top - 160 &&
            live.pointer.py < box.bottom + 160;
          if (!near && !wasNear) return;
          wasNear = near;
          for (const it of items) {
            const d = near ? Math.hypot(px - it.cx, py - it.cy) : Infinity;
            const inf = Math.pow(Math.max(0, 1 - d / PROXIMITY_RADIUS), 1.5);
            it.qy(-8 * inf);
            it.qs(1 + 0.04 * inf);
            if (it.light) it.qw(200 + 200 * inf);
          }
        };
        gsap.ticker.add(tick);

        teardownProximity = () => {
          gsap.ticker.remove(tick);
          window.removeEventListener('resize', onResize);
          teardownProximity = null;
        };
      };

      // ---------- idle wave across the bold words (stays black) ----------
      const setupWave = () => {
        teardownWave?.();
        const bold = chars.filter((c) => c.dataset.light === '0');
        if (!bold.length) return;
        const wave = gsap
          .timeline({ repeat: -1, repeatDelay: 6, paused: true })
          .to(bold, { opacity: 0.55, duration: 0.35, ease: 'sine.inOut', stagger: 0.04, yoyo: true, repeat: 1 });
        const st = ScrollTrigger.create({
          trigger: h1,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? wave.play() : wave.pause()),
        });
        teardownWave = () => {
          st.kill();
          wave.kill();
          gsap.set(bold, { clearProps: 'opacity' });
          teardownWave = null;
        };
      };

      // ---------- headline split + intro ----------
      SplitText.create(h1, {
        type: 'lines,words,chars',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        charsClass: 'hero-char',
        onSplit: (self) => {
          chars = self.chars as HTMLElement[];

          // tag each char as bold or light, lock widths so weight animation never reflows lines
          chars.forEach((c) => {
            const light = !!c.closest('[data-weight="light"]');
            c.dataset.light = light ? '1' : '0';
            c.style.setProperty('--w', light ? '400' : '800');
            c.style.width = '';
          });
          chars.forEach((c) => {
            c.style.width = `${c.getBoundingClientRect().width}px`;
          });
          chars.forEach((c) => c.style.setProperty('--w', c.dataset.light === '1' ? '200' : '800'));

          teardownProximity?.();
          teardownWave?.();

          const boldChars = chars.filter((c) => c.dataset.light === '0');
          const lightChars = chars.filter((c) => c.dataset.light === '1');

          // one shared random order so rise + weight-fill stay in sync
          const order = gsap.utils.shuffle(chars.map((_, i) => i));
          const delayOf = new Map<Element, number>();
          order.forEach((idx, rank) => delayOf.set(chars[idx], rank * 0.018));
          const delay = (_i: number, el: Element) => delayOf.get(el) ?? 0;

          const tl = gsap.timeline({
            onComplete: () => {
              gsap.set(chars, { clearProps: 'transform,opacity,filter' });
              setupProximity();
              setupWave();
            },
          });

          tl.set(h1, { autoAlpha: 1 }, 0)
            .from(
              chars,
              {
                yPercent: 120,
                rotationX: -80,
                skewY: 8,
                transformPerspective: 700,
                transformOrigin: '0% 50% -40',
                duration: 1.3,
                ease: 'himnora',
                delay,
              },
              0
            )
            .fromTo(boldChars, { '--w': 200 }, { '--w': 800, duration: 1.3, ease: 'himnora', delay }, 0)
            .from(lightChars, { opacity: 0, filter: 'blur(12px)', duration: 1.3, ease: 'himnora', delay }, 0)
            .fromTo(
              subRef.current,
              { autoAlpha: 0, y: 24, filter: 'blur(10px)' },
              { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'himnora', clearProps: 'filter' },
              '>-0.5'
            )
            .fromTo(
              ctaRef.current,
              { autoAlpha: 0, scale: 0 },
              { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.7)' },
              '<0.1'
            );

          if (!started) tl.pause(0);
          intro = tl;
          return tl;
        },
      });

      const off = onAppReady(() => {
        started = true;
        intro?.play();
      });

      // scroll cue: a line that draws downward, repeatedly
      if (cueRef.current) {
        gsap.fromTo(
          cueRef.current,
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 1.4, ease: 'power3.inOut', repeat: -1, repeatDelay: 0.6 }
        );
      }

      return () => off();
    }, sectionRef);

    return () => {
      teardownProximity?.();
      teardownWave?.();
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full" data-no-reveal>
      <section
        ref={sectionRef}
        className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24"
      >
        {/* Top Eyebrow */}
        <div className="flex items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#6b6b6b]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <ScrambleText text="AVAILABLE FOR SELECT Q2/Q3 COMMISSIONS" />
          </div>
          <span className="hidden sm:flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#6b6b6b]">
            Scroll
            <span className="block w-px h-12 bg-black/10 overflow-hidden" aria-hidden="true">
              <span ref={cueRef} className="block w-px h-12 bg-[#0a0a0a]" />
            </span>
          </span>
        </div>

        {/* Oversized headline (bold / extralight / bold, always black) */}
        <h1
          ref={h1Ref}
          aria-label={AGENCY_INFO.tagline}
          className="headline-editorial tracking-tight text-[#0a0a0a] max-w-5xl lg:max-w-[62%]"
        >
          <span data-weight="bold" className="font-extrabold">WE CRAFT</span>{' '}
          <span data-weight="light" className="font-extralight">DIGITAL EXPERIENCES THAT DEFINE</span>{' '}
          <span data-weight="bold" className="font-extrabold">BRANDS &amp; ACCELERATE GROWTH</span>
        </h1>

        {/* One-line subtext and CTA */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <p ref={subRef} className="text-base sm:text-lg text-[#6b6b6b] max-w-2xl font-normal leading-relaxed">
            {AGENCY_INFO.subtext}
          </p>

          <div ref={ctaRef} className="shrink-0">
            <CircleCTA label="HIRE US NOW" to="/contact" />
          </div>
        </div>
      </section>

      {/* Tech marquee */}
      <div className="w-full border-y border-black/10 py-5 bg-white/40 backdrop-blur-sm">
        <MarqueeLoop
          items={techItems}
          itemClassName="text-xl sm:text-3xl font-extralight tracking-tight uppercase text-[#0a0a0a]"
        />
      </div>
    </div>
  );
};
