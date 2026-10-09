import React from 'react';
import { HeroGraph } from '../git/HeroGraph';

export const HeroSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[140px]">
      <div className="grid grid-cols-12 gap-12 items-center">
        <div className="col-span-5 space-y-8">
          <div className="text-[20px] font-mono font-semibold tracking-wider text-gitbutler-orange uppercase">
            Tech Sharing
          </div>

          <h1 className="text-[96px] font-bold tracking-[-0.04em] leading-[1.0] text-ink-primary">
            GitButler
            <span className="block mt-5 text-[48px] font-semibold tracking-[-0.02em] leading-[1.15]">
              Quản lý nhiều nhánh song song trong một thư mục làm việc
            </span>
          </h1>

          <p className="text-[28px] leading-snug text-ink-secondary">
            Tách bản sửa lỗi khỏi nhánh tính năng đang phát triển và tạo Pull Request riêng, không cần chuyển nhánh.
          </p>
        </div>

        <div className="col-span-7 bg-canvas-surface rounded-[32px] border border-canvas-border p-10 shadow-2xl">
          <HeroGraph />
        </div>
      </div>
    </div>
  );
};
