import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { ExternalLink, HelpCircle } from 'lucide-react';

const takeaways = [
  ['Tư duy theo Branch Lanes thay vì Stash', 'Viết code trước, gán các thay đổi vào từng nhánh ảo độc lập sau.'],
  ['Độc lập dùng Parallel, Phụ thuộc dùng Stacked', 'Stacked branches giúp chia nhỏ tính năng lớn thành chuỗi PR gọn gàng để review.'],
  ['GitButler bổ trợ quy trình, không thay thế Git', 'Cam kết tương thích Git chuẩn; sử dụng Git Worktree khi cần cách ly hoàn toàn runtime.'],
];

const links = [
  ['Overview Docs', 'https://docs.gitbutler.com/overview'],
  ['Parallel Branches', 'https://docs.gitbutler.com/features/branch-management/virtual-branches'],
  ['Stacked Branches', 'https://docs.gitbutler.com/features/branch-management/stacked-branches'],
  ['AI Agents Setup', 'https://docs.gitbutler.com/ai-agents/getting-started'],
  ['CLI Cheat Sheet', 'https://docs.gitbutler.com/cli/cheat'],
];

export const Slide8Takeaways: React.FC = () => {
  return (
    <SlideFrame
      eyebrow="Tổng Kết & Thảo Luận"
      title="Takeaways & Q&A"
      subtitle="Ba điểm cốt lõi, đề xuất thử nghiệm thực tế và chủ đề thảo luận cùng team."
    >
      <div className="grid grid-cols-12 gap-8 items-stretch">
        {/* Left: 3 Core Takeaways */}
        <div className="col-span-7 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {takeaways.map(([title, desc], i) => (
              <div key={title} className="p-6 rounded-[24px] bg-canvas-surface border border-canvas-border flex gap-5 items-start">
                <span className="w-10 h-10 rounded-full bg-gitbutler-orange text-white font-bold text-[18px] flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <div className="text-[22px] font-bold text-ink-primary">{title}</div>
                  <div className="text-[17px] text-ink-secondary mt-1 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl border border-gitbutler-green/30 bg-gitbutler-green/5 text-[16px] text-ink-secondary">
            <strong className="text-gitbutler-green font-semibold">Khuyến nghị áp dụng:</strong> Thử nghiệm 2–3 ngày trên một repository demo hoặc dự án cá nhân để làm quen với thao tác trước khi triển khai vào dự án chính.
          </div>
        </div>

        {/* Right: Question & Links */}
        <div className="col-span-5 flex flex-col justify-between space-y-4">
          <div className="p-8 rounded-[28px] border border-gitbutler-orange/40 bg-canvas-surface flex-1 flex flex-col justify-center space-y-3">
            <div className="flex items-center gap-2 text-[16px] font-mono font-bold text-gitbutler-coral uppercase tracking-wider">
              <HelpCircle size={18} /> Chủ đề thảo luận
            </div>
            <p className="text-[24px] text-ink-primary font-medium leading-relaxed">
              Những tác vụ nào trong quy trình hiện tại đòi hỏi phải chuyển nhánh thường xuyên nhất — và việc áp dụng Virtual Branches hoặc Stacked PRs có giúp tối ưu thời gian review không?
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-canvas-border bg-canvas-surface space-y-2">
            <div className="text-[14px] font-mono text-ink-muted uppercase">Tài liệu chính thức (docs.gitbutler.com)</div>
            <div className="grid grid-cols-2 gap-2">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-canvas-subtle hover:bg-canvas-border text-[14px] font-mono text-gitbutler-coral transition-colors"
                >
                  <span className="truncate">{label}</span>
                  <ExternalLink size={13} className="shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};
