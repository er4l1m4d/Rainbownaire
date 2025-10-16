'use client';

import { ReactNode } from 'react';

/**
 * HydrationSafeWrapper - A wrapper component that suppresses hydration warnings
 *
 * This component should be used to wrap any content that might be affected by:
 * - Third-party libraries that dynamically add attributes (like RainbowKit)
 * - Browser extensions that modify DOM elements
 * - Dynamic content that might differ between server and client
 *
 * Usage:
 * ```tsx
 * <HydrationSafeWrapper>
 *   <YourComponent />
 * </HydrationSafeWrapper>
 * ```
 */
export function HydrationSafeWrapper({ children }: { children: ReactNode }) {
  return <div suppressHydrationWarning>{children}</div>;
}

/**
 * HydrationSafeContainer - A container component with hydration safety
 *
 * Use this for layout containers and major sections of your application.
 */
export function HydrationSafeContainer({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={className} suppressHydrationWarning {...props}>
      {children}
    </div>
  );
}
