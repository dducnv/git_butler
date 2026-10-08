import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { CodeBlock } from '../common/CodeBlock';
import { ShieldCheck } from 'lucide-react';

export const Slide6AIAgents: React.FC = () => {
  const commands = `# Khởi tạo cấu hình agent trong repository
but agent setup

# Agent thao tác thông qua but thay vì git checkout/stash bừa bãi
but branch new fix-memory-leak
but commit -b fix-memory-leak -m "fix: memory leak"
but pr new fix-memory-leak -t`;

  return (
    <SlideFrame
      eyebrow="Tích Hợp Tự Động Hoá"
      title="GitButler + AI Coding Agents"
      subtitle="Định hướng quy trình quản lý nhánh và commit cho Claude Code, Codex, Cursor qua lệnh but agent setup."
    >
      <div className="grid grid-cols-12 gap-8 items-center">
        {/* Left: CLI commands */}
        <div className="col-span-6">
          <CodeBlock code={commands} filename="terminal" />
        </div>

        {/* Right: Technical benefits & security */}
        <div className="col-span-6 space-y-5">
          <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border space-y-1.5">
            <div className="text-[20px] font-bold text-ink-primary">
              Phân luồng nhánh độc lập
            </div>
            <p className="text-[16px] text-ink-secondary leading-relaxed">
              Agent thao tác trên virtual branch riêng biệt, không đè lên các file đang được lập trình viên chỉnh sửa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border space-y-1.5">
            <div className="text-[20px] font-bold text-ink-primary">
              Commit chính xác theo Hunk
            </div>
            <p className="text-[16px] text-ink-secondary leading-relaxed">
              Chỉ commit các đoạn code liên quan trực tiếp đến nhiệm vụ được giao, tránh tình trạng <code className="font-mono text-gitbutler-coral">git add .</code> toàn bộ thư mục.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-gitbutler-orange/30 bg-gitbutler-orange/5 flex items-start gap-4">
            <ShieldCheck size={26} className="text-gitbutler-coral shrink-0 mt-0.5" />
            <div className="text-[15px] text-ink-secondary leading-relaxed">
              <strong className="text-ink-primary">Nguyên tắc quản trị:</strong> Cấu hình agent chỉ hướng dẫn hành vi, không thay thế phân quyền. Mọi thay đổi do AI tạo ra vẫn phải tuân thủ Branch Protection Rules và trải qua Code Review.
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};
