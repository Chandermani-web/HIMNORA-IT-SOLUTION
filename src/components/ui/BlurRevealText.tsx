import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export const BlurRevealText: React.FC<BlurRevealTextProps> = ({
  text,
  className = '',
  delay = 0.1,
  highlightWords = [],
  highlightClass = 'text-[#0a0a0a] font-medium',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const words = text.split(' ');

  return (
    <div ref={ref} className={`leading-relaxed ${className}`}>
      {words.map((word, index) => {
        const isHighlight = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
            animate={
              isInView
                ? { opacity: 1, filter: 'blur(0px)', y: 0 }
                : { opacity: 0, filter: 'blur(8px)', y: 8 }
            }
            transition={{
              duration: 0.6,
              delay: delay + index * 0.02,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block mr-[0.28em] last:mr-0 ${
              isHighlight ? highlightClass : ''
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};
