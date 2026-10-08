import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';

export const Slide2ContextSwitch: React.FC = () => {
  return (
    <SlideFrame
      eyebrow="Bối Cảnh Kỹ Thuật"
      title="Giới hạn của luồng làm việc đơn nhánh"
      subtitle="Git truyền thống gắn mỗi thư mục làm việc với một branch duy nhất tại một thời điểm."
    >
      <div className="grid grid-cols-12 gap-8 items-stretch">
        {/* Left: Traditional multi-task sequence */}
        <div className="col-span-7 bg-canvas-surface rounded-[28px] border border-canvas-border p-8 flex flex-col justify-between">
          <div className="text-[18px] font-mono text-ink-muted uppercase tracking-wider mb-4">
            Quy trình truyền thống khi phát sinh tác vụ song song
          </div>

          <div className="space-y-3 font-mono text-[19px]">
            <div className="flex items-center justify-between p-4 rounded-xl bg-canvas-subtle">
              <span className="text-ink-secondary">1. Tác vụ chính dở dang:</span>
              <span className="text-ink-primary font-semibold">Web Login UI</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-canvas-subtle">
              <span className="text-ink-secondary">2. Cất tạm trạng thái:</span>
              <span className="text-gitbutler-coral font-semibold">git stash</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-canvas-subtle">
              <span className="text-ink-secondary">3. Chuyển nhánh xử lý lỗi:</span>
              <span className="text-gitbutler-teal font-semibold">git checkout hotfix-api</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-canvas-subtle">
              <span className="text-ink-secondary">4. Quay lại nhánh ban đầu:</span>
              <span className="text-gitbutler-coral font-semibold">git stash pop</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200">
              <span>5. Rủi ro xung đột:</span>
              <span className="font-semibold">Merge conflict khi pop stash</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-canvas-border text-[16px] text-ink-muted">
            HEAD chỉ trỏ tới một commit duy nhất trên một branch.
          </div>
        </div>

        {/* Right: Technical impacts */}
        <div className="col-span-5 flex flex-col justify-between space-y-4">
          <div className="p-7 rounded-[28px] bg-canvas-surface border border-canvas-border flex-1 flex flex-col justify-center space-y-2">
            <div className="text-[22px] font-bold text-ink-primary">
              Mất ngữ cảnh công việc
            </div>
            <p className="text-[17px] text-ink-secondary leading-relaxed">
              Mỗi lần đổi nhánh đòi hỏi lập trình viên phải ghi nhớ hoặc phục hồi trạng thái làm việc dở dang, làm gián đoạn tiến độ.
            </p>
          </div>

          <div className="p-7 rounded-[28px] bg-canvas-surface border border-canvas-border flex-1 flex flex-col justify-center space-y-2">
            <div className="text-[22px] font-bold text-ink-primary">
              Bắt buộc phân nhánh trước khi viết code
            </div>
            <p className="text-[17px] text-ink-secondary leading-relaxed">
              Các thay đổi nhỏ (như validation fix hoặc refactor) phát sinh trong lúc code thường bị gom chung vào branch chính vì ngại tạo nhánh mới.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-canvas-subtle border border-canvas-border text-[15px] text-ink-muted">
            Git không bị lỗi thời; vấn đề nằm ở việc thiếu cơ chế quản lý nhiều nhánh đồng thời trên cùng một workspace.
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};
