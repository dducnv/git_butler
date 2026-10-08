import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { BranchLaneSimulator } from '../git/BranchLaneSimulator';

export const Slide5LiveDemo: React.FC = () => {
  return (
    <SlideFrame
      eyebrow="Thực Nghiệm Thực Tế"
      title="Quy trình làm việc trên GitButler"
      subtitle="Kịch bản: Phát triển Web Login UI song song với Flutter Validation trong cùng một workspace."
    >
      <div className="grid grid-cols-12 gap-8 items-stretch h-[560px]">
        {/* Left: Agenda steps */}
        <div className="col-span-4 p-8 rounded-[28px] bg-canvas-surface border border-canvas-border flex flex-col justify-between">
          <div>
            <div className="text-[18px] font-mono font-semibold text-ink-muted uppercase tracking-wider mb-6">
              Các bước thực hiện
            </div>

            <ol className="space-y-4 text-[18px] text-ink-secondary">
              <li className="flex items-start gap-3">
                <span className="font-mono font-bold text-gitbutler-orange">1.</span>
                <span>Tạo thay đổi ở 2 file: <code className="text-ink-primary font-mono text-[16px]">LoginForm.tsx</code> và <code className="text-ink-primary font-mono text-[16px]">auth_validator.dart</code>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono font-bold text-gitbutler-orange">2.</span>
                <span>Tạo 2 virtual branches: <code className="text-gitbutler-coral font-mono text-[16px]">feature/login-ui</code> và <code className="text-gitbutler-teal font-mono text-[16px]">fix/flutter-validation</code>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono font-bold text-gitbutler-orange">3.</span>
                <span>Gán từng thay đổi vào đúng branch lane tương ứng.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono font-bold text-gitbutler-orange">4.</span>
                <span>Commit độc lập cho từng nhánh mà không bị lẫn code.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono font-bold text-gitbutler-orange">5.</span>
                <span>Thử nghiệm <strong className="text-ink-primary">Apply / Unapply</strong> để ẩn hoặc hiện nhánh.</span>
              </li>
            </ol>
          </div>

          <div className="p-4 rounded-2xl bg-canvas-subtle border border-canvas-border text-[15px] text-ink-muted font-mono">
            CLI tương đương: <code className="text-gitbutler-coral">but branch new</code> &amp; <code className="text-gitbutler-coral">but commit -b</code>
          </div>
        </div>

        {/* Right: Branch Lane Simulator */}
        <div className="col-span-8 h-full">
          <BranchLaneSimulator />
        </div>
      </div>
    </SlideFrame>
  );
};
