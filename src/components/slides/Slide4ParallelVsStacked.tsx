import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { ParallelDiagram, StackedDiagram } from '../git/BranchDiagrams';

export const Slide4ParallelVsStacked: React.FC = () => {
  return (
    <SlideFrame
      eyebrow="So Sánh Kỹ Thuật"
      title="Parallel vs Stacked Branches"
      subtitle="Hai mô hình tổ chức nhánh song song hoặc phụ thuộc theo thứ tự."
    >
      <div className="grid grid-cols-2 gap-10 items-stretch">
        {/* Left: Parallel */}
        <div className="p-8 rounded-[28px] bg-canvas-surface border border-canvas-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-canvas-border">
              <span className="text-[26px] font-bold text-ink-primary">1. Parallel Branches</span>
              <span className="text-[15px] font-mono px-3 py-1 rounded-full bg-gitbutler-orange/15 text-gitbutler-coral font-medium">
                Độc lập
              </span>
            </div>

            <div className="my-6">
              <ParallelDiagram active={true} />
            </div>

            <div className="space-y-3 text-[17px] text-ink-secondary">
              <p>
                <strong className="text-ink-primary">Mối quan hệ:</strong> Các nhánh cùng xuất phát từ Target Branch (origin/main) và không phụ thuộc lẫn nhau.
              </p>
              <p>
                <strong className="text-ink-primary">Thứ tự tích hợp:</strong> Tùy ý. Nhánh nào hoàn thành trước có thể merge trước.
              </p>
              <p>
                <strong className="text-ink-primary">Ứng dụng:</strong> Đồng thời phát triển UI và sửa lỗi API độc lập.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-canvas-border font-mono text-[16px] text-ink-muted">
            Lệnh CLI: <code className="text-gitbutler-coral">but branch new &lt;name&gt;</code>
          </div>
        </div>

        {/* Right: Stacked */}
        <div className="p-8 rounded-[28px] bg-canvas-surface border border-canvas-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-canvas-border">
              <span className="text-[26px] font-bold text-ink-primary">2. Stacked Branches</span>
              <span className="text-[15px] font-mono px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 font-medium">
                Phụ thuộc tuần tự
              </span>
            </div>

            <div className="my-6">
              <StackedDiagram active={true} />
            </div>

            <div className="space-y-3 text-[17px] text-ink-secondary">
              <p>
                <strong className="text-ink-primary">Mối quan hệ:</strong> Nhánh trên kế thừa thay đổi từ nhánh dưới trong cùng một chuỗi tính năng.
              </p>
              <p>
                <strong className="text-ink-primary">Chuỗi Pull Requests:</strong> Mỗi PR chỉ hiển thị diff đối chiếu với PR phía dưới, giúp review tập trung.
              </p>
              <p>
                <strong className="text-ink-primary">Đồng bộ tự động:</strong> Thay đổi ở nhánh dưới sẽ tự động kích hoạt rebase các nhánh phía trên.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-canvas-border font-mono text-[16px] text-ink-muted">
            Tạo Stack PR: <code className="text-purple-300">but pr new &lt;branch&gt; -t</code>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};
