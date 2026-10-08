import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { LaneAnimation } from '../git/LaneAnimation';

export const Slide3WhatMakesDifferent: React.FC = () => {
  return (
    <SlideFrame
      eyebrow="Kiến Trúc Cốt Lõi"
      title="Cơ chế Virtual Branches"
      subtitle="Quản lý nhiều nhánh song song trong cùng một thư mục thông qua các branch lane độc lập."
    >
      <div className="space-y-6">
        <LaneAnimation />

        <div className="grid grid-cols-3 gap-8 pt-4">
          <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border">
            <div className="text-[20px] font-bold text-ink-primary mb-1">
              Phân loại theo từng Hunk
            </div>
            <p className="text-[16px] text-ink-secondary leading-relaxed">
              Các đoạn code khác nhau trong cùng một file có thể gán độc lập vào các branch lane riêng biệt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border">
            <div className="text-[20px] font-bold text-ink-primary mb-1">
              Commit độc lập trên Target Branch
            </div>
            <p className="text-[16px] text-ink-secondary leading-relaxed">
              GitButler tính toán cây thư mục giả định để tạo commit Git chuẩn mực trên nền branch đích (origin/main).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border">
            <div className="text-[20px] font-bold text-ink-primary mb-1">
              Apply & Unapply
            </div>
            <p className="text-[16px] text-ink-secondary leading-relaxed">
              Bật hoặc tắt sự hiện diện của nhánh trong thư mục làm việc mà không làm thay đổi trạng thái Git phía dưới.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};
