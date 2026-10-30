import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
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
 * SplitText — Adapted from React Bits (DavidHDev/react-bits, MIT License)
 * Enhanced with terminal-style typing reveal & blinking cursor for CS/IT aesthetic.
 */
interface SplitTextProps {
  text: string;
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
  stagger = 0.032,
  mode = 'words',
  showCursor = true,
  reducedMotion = false,
}) => {
  if (reducedMotion) {
    return (
      <span className={className}>
        {text}
        {showCursor && (
          <span className="ml-1 inline-block font-mono text-eu-yellow animate-pulse">
            _
          </span>
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
          initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.42,
            delay: delay + idx * stagger,
            ease: [0.22, 1, 0.36, 1],
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
            duration: 1.1,
            repeat: Infinity,
            delay: delay + parts.length * stagger,
          }}
          aria-hidden="true"
          className="ml-1 inline-block font-mono font-bold text-eu-yellow select-none"
        >
          _
        </motion.span>
      )}
    </span>
  );
};

/**
 * AnimatedCounter — Adapted from Magic UI NumberTicker (magicuidesign/magicui, MIT License)
 * Uses JetBrains Mono (`font-mono`) for crisp tech numbers.
 */
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
  reducedMotion?: boolean;
  onComplete?: () => void;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1150,
  delay = 140,
  className = '',
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
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = value * eased;
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

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

/**
 * TiltSpotlightCard — Adapted from Magic UI MagicCard + React Bits TiltedCard (MIT License)
 * Enhanced with optional code-snippet top header bar (`codeTitle`) for CS/IT aesthetic.
 */
interface TiltSpotlightCardProps {
  children: React.ReactNode;
  theme: SlideTheme;
  className?: string;
  codeTitle?: string;
  highlight?: boolean;
  reducedMotion?: boolean;
  tiltMax?: number;
}

export const TiltSpotlightCard: React.FC<TiltSpotlightCardProps> = ({
  children,
  theme,
  className = '',
  codeTitle,
  highlight = false,
  reducedMotion = false,
  tiltMax = 4.5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 24 };
  const rotateX = useSpring(useTransform(normY, [-0.5, 0.5], [tiltMax, -tiltMax]), springConfig);
  const rotateY = useSpring(useTransform(normX, [-0.5, 0.5], [-tiltMax, tiltMax]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    normX.set(x / rect.width - 0.5);
    normY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    normX.set(0);
    normY.set(0);
  };

  const isDark = theme === 'dark';

  const baseStyles = isDark
    ? highlight
      ? 'bg-eu-blue/90 border-2 border-eu-yellow shadow-[0_0_40px_rgba(255,204,0,0.28)] text-eu-light'
      : 'bg-eu-blue/68 border border-eu-sky/25 shadow-[0_16px_40px_rgba(6,26,68,0.48)] text-eu-light'
    : highlight
    ? 'bg-white border-2 border-eu-blue shadow-[0_16px_40px_rgba(11,42,107,0.18)] text-eu-navy'
    : 'bg-white/90 border border-eu-blue/15 shadow-[0_12px_32px_rgba(11,42,107,0.08)] text-eu-navy';

  const spotlightColor = isDark
    ? 'rgba(255, 204, 0, 0.14)'
    : 'rgba(11, 42, 107, 0.08)';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        reducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }
      }
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-md transition-colors duration-300 ${baseStyles} ${className}`}
    >
      {/* Glare / Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Code-snippet header bar if codeTitle is passed */}
      {codeTitle && (
        <div
          className={`relative z-10 flex items-center justify-between border-b px-3.5 py-1.5 font-mono text-[11px] ${
            isDark
              ? 'border-eu-sky/15 bg-eu-navy/70 text-eu-sky/90'
              : 'border-eu-blue/10 bg-eu-sky/30 text-eu-blue'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-eu-yellow" />
            <span className="h-2 w-2 rounded-full bg-eu-sky/60" />
            <span className="h-2 w-2 rounded-full bg-eu-sky/30" />
          </span>
          <span className="font-semibold tracking-tight">{codeTitle}</span>
        </div>
      )}

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

/**
 * MagneticButton — Adapted from React Bits Magnet (MIT License)
 */
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.25,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPos({ x: dx, y: dy });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.5 }}
      className={className}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
};

/**
 * CursorGlow — Subtle ambient glow following the pointer
 */
export const CursorGlow: React.FC<{ theme: SlideTheme; disabled?: boolean }> = ({
  theme,
  disabled = false,
}) => {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const smoothX = useSpring(x, { stiffness: 180, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 180, damping: 28 });

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [disabled, x, y]);

  if (disabled) return null;

  const isDark = theme === 'dark';

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl print:hidden"
      style={{
        x: smoothX,
        y: smoothY,
        background: isDark
          ? 'radial-gradient(circle, rgba(255,204,0,0.10) 0%, rgba(191,215,255,0.04) 50%, transparent 75%)'
          : 'radial-gradient(circle, rgba(11,42,107,0.07) 0%, rgba(255,204,0,0.08) 50%, transparent 75%)',
      }}
    />
  );
};
