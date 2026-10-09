import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { AgentsDemo } from '../demo/AgentsDemo';

const notes = [
  ['Git', 'Mỗi agent cần một git worktree riêng: thêm thư mục, cài lại dependencies, tự quản lý nhánh.'],
  ['GitButler', 'Hooks của Claude Code báo mỗi lần sửa file; thay đổi của từng phiên vào nhánh riêng và được commit tự động.'],
  ['Giới hạn', 'Mỗi phiên gắn với một nhánh. Thay đổi của agent vẫn qua Pull Request, CI và code review.'],
];

export const AgentsSlide: React.FC = () => {
  return (
    <SlideFrame eyebrow="AI coding agents" title="Nhiều AI agent trong một thư mục">
      <AgentsDemo />
      <div className="mt-8 grid grid-cols-3 gap-6">
        {notes.map(([title, desc]) => (
          <div key={title} className="rounded-[24px] bg-canvas-surface border border-canvas-border p-6">
            <div className="text-[22px] font-semibold text-ink-primary">{title}</div>
            <p className="mt-1 text-[19px] text-ink-secondary leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
};
