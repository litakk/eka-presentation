import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Cpu, Database, Network, Shield } from 'lucide-react';
import { SlideTheme, TechIconName } from '../../data/slides';

/**
 * TechIcon — Renders one of the 6 Computer Science / IT Lucide icons:
 * cpu, code, database, shield, brain, network
 */
export const TechIcon: React.FC<{ name: TechIconName; className?: string }> = ({
  name,
  className = 'h-4 w-4',
}) => {
  switch (name) {
    case 'cpu':
      return <Cpu className={className} />;
    case 'code':
      return <Code className={className} />;
    case 'database':
      return <Database className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'network':
      return <Network className={className} />;
  }
};

/**
 * SplitText — Stop-motion / paper-cut word reveal with slight rotation overshoot
 * and optional terminal blinking cursor `_`.
 */
interface SplitTextProps {
  text: string;
  as?: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: 'words' | 'chars';
  showCursor?: boolean;
  reducedMotion?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
  mode = 'words',
  showCursor = true,
  reducedMotion = false,
}) => {
  if (reducedMotion) {
    return (
      <span className={className}>
        {text}
        {showCursor && (
          <span className="ml-1 inline-block font-mono text-tomato">_</span>
        )}
      </span>
    );
  }

  const parts = mode === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`inline-flex flex-wrap items-baseline ${className}`} aria-label={text}>
      {parts.map((part, idx) => (
        <motion.span
          key={`${part}-${idx}`}
          initial={{ opacity: 0, y: 14, rotate: idx % 2 === 0 ? -2.5 : 2.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 20,
            delay: delay + idx * stagger,
          }}
          className="inline-block will-change-transform"
          aria-hidden="true"
        >
          {part}
          {mode === 'words' && idx < parts.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1] }}
          transition={{
            duration: 1.0,
            repeat: Infinity,
            delay: delay + parts.length * stagger,
          }}
          aria-hidden="true"
          className="ml-1 inline-block font-mono font-bold text-tomato select-none"
        >
          _
        </motion.span>
      )}
    </span>
  );
};

/**
 * AnimatedCounter — Airport Split-Flap Departure Board Number Roller
 * Numbers roll through characters like a mechanical airport departure board.
 */
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
  splitFlap?: boolean;
  reducedMotion?: boolean;
  onComplete?: () => void;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 950,
  delay = 120,
  className = '',
  splitFlap = false,
  reducedMotion = false,
  onComplete,
}) => {
  const [display, setDisplay] = useState<string>(
    reducedMotion ? value.toFixed(decimals) : (0).toFixed(decimals)
  );

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    let rafId = 0;
    let startTime: number | null = null;
    const timeoutId = window.setTimeout(() => {
      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Stepped mechanical split-flap feel (12 discrete steps)
        const stepped = Math.floor(progress * 14) / 14;
        const current = progress === 1 ? value : value * stepped;
        setDisplay(current.toFixed(decimals));

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplay(value.toFixed(decimals));
          onComplete?.();
        }
      };
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [value, decimals, duration, delay, reducedMotion, onComplete]);

  const fullText = `${prefix}${display}${suffix}`;

  if (splitFlap) {
    return (
      <span className={`inline-flex items-center gap-0.5 font-mono tabular-nums ${className}`}>
        {fullText.split('').map((ch, i) => (
          <span
            key={i}
            className="inline-flex items-center justify-center border border-ink bg-ink px-1.5 py-0.5 text-paper shadow-[2px_2px_0px_#C9472B] relative"
          >
            <span className="relative z-10">{ch}</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-paper/25"
            />
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {fullText}
    </span>
  );
};

/**
 * TiltSpotlightCard — Redesigned as an Editorial Paper / Boarding-Pass Card:
 * Sharp corners, 2px solid #1B1B18 ink border, hard offset shadow, optional masking tape
 * piece on top, optional code-comment header bar, flat colors only (no glassmorphism or blur).
 */
interface TiltSpotlightCardProps {
  children: React.ReactNode;
  theme: SlideTheme;
  className?: string;
  codeTitle?: string;
  highlight?: boolean;
  showTape?: boolean;
  reducedMotion?: boolean;
}

export const TiltSpotlightCard: React.FC<TiltSpotlightCardProps> = ({
  children,
  theme,
  className = '',
  codeTitle,
  highlight = false,
  showTape = false,
}) => {
  const isDark = theme === 'dark';

  const baseStyles = isDark
    ? highlight
      ? 'bg-cream text-ink border-2 border-ink shadow-[7px_7px_0px_#C9472B]'
      : 'bg-paper text-ink border-2 border-ink shadow-[5px_5px_0px_#E0A526]'
    : highlight
    ? 'bg-cream text-ink border-2 border-ink shadow-[7px_7px_0px_#C9472B]'
    : 'bg-cream text-ink border-2 border-ink shadow-ink';

  return (
    <div
      className={`relative flex flex-col transition-transform duration-150 hover:-translate-y-0.5 ${baseStyles} ${className}`}
    >
      {/* Masking tape piece at top-center */}
      {showTape && (
        <div
          aria-hidden="true"
          className="tape-strip pointer-events-none absolute -top-2.5 left-1/2 z-20 h-5 w-20 -translate-x-1/2 -rotate-2"
        />
      )}

      {/* Editorial / Code-comment header strip */}
      {codeTitle && (
        <div
          className={`flex items-center justify-between border-b-2 border-ink px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider ${
            highlight
              ? 'bg-tomato text-paper'
              : 'bg-mustard/35 text-ink'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 border border-ink bg-tomato" />
            <span className="inline-block h-2 w-2 border border-ink bg-mustard" />
            <span className="inline-block h-2 w-2 border border-ink bg-olive" />
          </span>
          <span className="truncate">{codeTitle}</span>
        </div>
      )}

      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
};

/**
 * PassportStamp — Rubber-stamp badge ("APPROVED", "BEST CHOICE", "FINE", etc.)
 */
export const PassportStamp: React.FC<{
  text: string;
  variant?: 'tomato' | 'olive' | 'mustard' | 'ink';
  rotate?: number;
  className?: string;
}> = ({ text, variant = 'tomato', rotate = -5, className = '' }) => {
  const colorMap = {
    tomato: 'border-tomato text-tomato bg-tomato/10',
    olive: 'border-olive text-olive bg-olive/10',
    mustard: 'border-ink text-ink bg-mustard',
    ink: 'border-ink text-ink bg-paper',
  };

  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`inline-flex items-center gap-1.5 border-2 border-double px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-widest select-none ${colorMap[variant]} ${className}`}
    >
      <span>★</span>
      <span>{text}</span>
      <span>★</span>
    </div>
  );
};

/**
 * BarcodeStrip — Generates a crisp deterministic SVG barcode from a program/flight code string
 */
export const BarcodeStrip: React.FC<{
  code: string;
  className?: string;
  vertical?: boolean;
}> = ({ code, className = '', vertical = false }) => {
  const bars: number[] = [];
  for (let i = 0; i < code.length; i++) {
    const charCode = code.charCodeAt(i);
    bars.push((charCode % 3) + 1);
    bars.push(((charCode >> 2) % 2) + 1);
  }

  let xCursor = 0;
  return (
    <div
      className={`inline-flex flex-col items-center select-none ${
        vertical ? 'rotate-90 origin-center' : ''
      } ${className}`}
      aria-label={`Boarding pass barcode ${code}`}
    >
      <svg
        viewBox="0 0 180 32"
        className="h-7 w-full max-w-[180px] fill-ink"
        preserveAspectRatio="none"
      >
        {bars.map((w, idx) => {
          const barX = xCursor;
          const gap = (idx % 2) + 1.2;
          xCursor += w * 2 + gap;
          if (barX > 175) return null;
          return (
            <rect
              key={idx}
              x={barX}
              y="0"
              width={w * 1.6}
              height="32"
            />
          );
        })}
      </svg>
      <span className="mt-0.5 font-mono text-[9px] font-bold tracking-widest text-ink uppercase">
        {code}
      </span>
    </div>
  );
};

/**
 * HandwrittenNote — Editorial callout with a hand-drawn ink arrow
 */
export const HandwrittenNote: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => (
  <div className={`inline-flex items-center gap-1.5 font-serif italic text-sm font-bold text-tomato ${className}`}>
    <svg
      viewBox="0 0 36 20"
      className="h-4 w-7 shrink-0 stroke-tomato fill-none"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 14 C 12 2, 22 4, 32 10" />
      <path d="M26 5 L 33 10 L 25 15" />
    </svg>
    <span>{text}</span>
  </div>
);

/**
 * MagneticButton — Editorial button with hard offset shadow & active press snap
 */
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`border-2 border-ink shadow-ink transition-transform active:translate-x-0.5 active:translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * CursorGlow — Disabled in editorial redesign (no glowing blobs per specification)
 */
export const CursorGlow: React.FC<{ theme: SlideTheme; disabled?: boolean }> = () => null;
