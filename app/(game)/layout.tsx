'use client';

import React from 'react';
import { PageTransition } from '@/components/ui/page-transition';
import { AnimatedLayout } from '@/components/ui/animated-layout';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatedLayout>
      <PageTransition>
        {children}
      </PageTransition>
    </AnimatedLayout>
  );
}
