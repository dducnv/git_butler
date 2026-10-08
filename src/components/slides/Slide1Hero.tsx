import React from 'react';
import { HeroGraph } from '../git/HeroGraph';

export const Slide1Hero: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[140px]">
      <div className="grid grid-cols-12 gap-12 items-center">
        {/* Left: Headline & Subtitle */}
        <div className="col-span-6 space-y-6">
          <div className="text-[20px] font-mono font-semibold tracking-wider text-gitbutler-orange uppercase">
            Tech Sharing
          </div>

          <h1 className="text-[88px] font-bold tracking-[-0.04em] leading-[1.0] text-ink-primary">
            GitButler
            <span className="block text-[48px] font-normal tracking-tight text-ink-secondary mt-3">
              Rethinking Git Workflow
            </span>
          </h1>

          <p className="text-[28px] leading-relaxed text-ink-secondary max-w-[620px]">
            Quản lý nhiều nhánh song song trong một thư mục làm việc mà không cần stash hoặc switch branch liên tục.
          </p>

          <div className="pt-2 flex items-center gap-6 text-[18px] font-mono text-ink-muted">
            <span>Web</span>
            <span>•</span>
            <span>Backend</span>
            <span>•</span>
            <span>Flutter</span>
          </div>
        </div>

        {/* Right: Clean Animated Git Graph */}
        <div className="col-span-6 bg-canvas-surface rounded-[32px] border border-canvas-border p-8 shadow-2xl">
          <div className="text-[16px] font-mono text-ink-muted mb-4">
            Parallel Virtual Branches
          </div>
          <HeroGraph />
        </div>
      </div>
    </div>
  );
};
