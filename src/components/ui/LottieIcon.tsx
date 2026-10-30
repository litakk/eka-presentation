import React from 'react';
import LottieModule from 'lottie-react';

// Resolve ESM/CJS default interop cleanly across Vite dev, Rollup build, and SSR
const LottieComponent =
  (LottieModule as unknown as { default?: React.ComponentType<Record<string, unknown>> }).default ||
  (LottieModule as unknown as React.ComponentType<Record<string, unknown>>);

interface LottieIconProps {
  animationData: Record<string, unknown>;
  loop?: boolean;
  autoplay?: boolean;
  size?: number;
  className?: string;
}

export const LottieIcon: React.FC<LottieIconProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  size = 44,
  className = '',
}) => {
  if (typeof window === 'undefined') {
    return <span style={{ width: size, height: size }} className={`inline-block ${className}`} />;
  }

  return (
    <LottieComponent
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{ width: size, height: size }}
      className={className}
    />
  );
};

