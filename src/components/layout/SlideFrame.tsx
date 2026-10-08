import React from 'react';

interface SlideFrameProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

/** Shared slide layout: small eyebrow, large headline, optional subtitle, content area. */
export const SlideFrame: React.FC<SlideFrameProps> = ({ eyebrow, title, subtitle, children }) => (
  <section className="w-full h-full flex flex-col px-[140px] pt-[110px] pb-[100px]">
    <header className="shrink-0">
      {eyebrow && <p className="text-[24px] font-semibold text-gitbutler-orange mb-4">{eyebrow}</p>}
      <h2 className="text-[80px] font-semibold tracking-[-0.035em] leading-[1.05] text-ink-primary">{title}</h2>
      {subtitle && <p className="mt-6 text-[32px] leading-snug text-ink-secondary max-w-[1400px]">{subtitle}</p>}
    </header>
    <div className="flex-1 min-h-0 mt-16 flex flex-col justify-center">{children}</div>
  </section>
);
