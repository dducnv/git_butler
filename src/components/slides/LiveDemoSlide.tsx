import React from 'react';
import { MonitorPlay } from 'lucide-react';
import { SlideFrame } from '../layout/SlideFrame';
import { BASE_BRANCH, FEATURE, FIX, FIX_FILE } from '../../data/demoScenario';

const steps = [
  ['Sửa lỗi gấp', `Kéo ${FIX_FILE.file} từ ${FEATURE.name} sang ${FIX.name}, commit, tạo PR vào ${BASE_BRANCH}`],
  ['Tách theo hunk', 'Kéo riêng đoạn sửa lỗi trong một file có cả code tính năng'],
  ['Sửa lịch sử commit', 'Gộp commit, chuyển commit sang nhánh khác'],
  ['Hoàn tác', 'Khôi phục một thao tác từ lịch sử thao tác'],
];

export const LiveDemoSlide: React.FC = () => {
  return (
    <SlideFrame eyebrow="Demo" title="Demo trên ứng dụng thật">
      <div className="grid grid-cols-12 gap-10 items-stretch">
        <div className="col-span-8 space-y-4">
          {steps.map(([title, desc], i) => (
            <div key={title} className="flex items-start gap-6 rounded-[24px] bg-canvas-surface border border-canvas-border px-7 py-5">
              <span className="w-11 h-11 rounded-full bg-gitbutler-orange text-white font-bold text-[20px] flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div>
                <div className="text-[26px] font-semibold text-ink-primary">{title}</div>
                <div className="mt-1 text-[20px] text-ink-secondary">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-4 rounded-[28px] border-2 border-dashed border-canvas-border flex flex-col items-center justify-center gap-5 text-center px-8">
          <MonitorPlay size={72} className="text-gitbutler-coral" />
          <div className="text-[24px] text-ink-primary">GitButler Desktop</div>
          <div className="text-[19px] text-ink-muted">
            Repository: abc-app
            <br />
            Target branch: origin/{BASE_BRANCH}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};
