import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { AlertTriangle } from 'lucide-react';

const rows: Array<[string, string, string, string]> = [
  ['Số nhánh hoạt động đồng thời', '1 branch / thư mục', 'Nhiều branch / 1 thư mục', 'Nhiều branch, mỗi nhánh 1 thư mục'],
  ['Cơ chế chuyển đổi', 'git stash + checkout', 'Apply / Unapply', 'Chuyển thư mục (cd)'],
  ['Chạy 2 app / server song song', 'Không', 'Hạn chế (chung runtime)', 'Tốt (tách biệt hoàn toàn)'],
  ['Dung lượng ổ đĩa', 'Thấp (1 bản clone)', 'Thấp (1 bản clone)', 'Cao (nhân bản thư mục & node_modules)'],
  ['Trường hợp phù hợp', 'Quy trình tuyến tính đơn giản', 'Phát triển đa nhiệm hàng ngày', 'Chạy test suite nặng, tách môi trường'],
];

export const Slide7Tradeoffs: React.FC = () => {
  return (
    <SlideFrame
      eyebrow="Đánh Giá Khách Quan"
      title="Git vs GitButler vs Git Worktree"
      subtitle="Mỗi công cụ phục vụ một nhu cầu kỹ thuật cụ thể; không có giải pháp thay thế hoàn toàn."
    >
      <div className="space-y-6">
        {/* Comparison table */}
        <div className="rounded-[24px] border border-canvas-border overflow-hidden bg-canvas-surface shadow-xl">
          <table className="w-full text-[17px]">
            <thead>
              <tr className="bg-canvas-subtle text-left border-b border-canvas-border">
                <th className="p-4 font-mono font-medium text-ink-muted w-[26%]">Tiêu chí</th>
                <th className="p-4 font-bold text-ink-primary w-[24%]">Conventional Git</th>
                <th className="p-4 font-bold text-gitbutler-coral w-[25%]">GitButler</th>
                <th className="p-4 font-bold text-gitbutler-teal w-[25%]">Git Worktree</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, git, butler, worktree], idx) => (
                <tr key={label} className={`border-t border-canvas-border ${idx % 2 === 0 ? 'bg-canvas-surface' : 'bg-canvas-dark/40'}`}>
                  <td className="p-4 font-semibold text-ink-secondary">{label}</td>
                  <td className="p-4 text-ink-primary">{git}</td>
                  <td className="p-4 text-ink-primary font-medium">{butler}</td>
                  <td className="p-4 text-ink-primary">{worktree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Technical caveats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-canvas-surface border border-amber-500/30 flex gap-4">
            <AlertTriangle size={24} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[16px] text-ink-secondary leading-relaxed">
              <strong className="text-ink-primary block mb-1">Xung đột code vẫn có thể xảy ra:</strong>
              GitButler không triệt tiêu merge conflicts. Khi hai nhánh sửa cùng một dòng code, xung đột vẫn phát sinh và cần xử lý thủ công.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-canvas-surface border border-amber-500/30 flex gap-4">
            <AlertTriangle size={24} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[16px] text-ink-secondary leading-relaxed">
              <strong className="text-ink-primary block mb-1">Giới hạn của Shared Working Directory:</strong>
              Do các nhánh dùng chung file hệ thống, việc thay đổi cấu hình phụ thuộc (như package.json hoặc DB schema) có thể ảnh hưởng runtime của app.
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};
