import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';

const rows: Array<[string, string, string]> = [
  ['Sửa lỗi gấp khi đang làm tính năng', '9 lệnh: stash, checkout, stash pop', '4 thao tác, không chuyển nhánh'],
  ['Tách thay đổi trong cùng một file', 'git add -p, xác nhận từng hunk', 'Kéo thả từng hunk'],
  ['Chuỗi Pull Request phụ thuộc', 'Rebase thủ công từng nhánh', 'Tự động rebase các nhánh phía trên'],
  ['Sửa, gộp, chuyển commit', 'git rebase -i, git cherry-pick', 'Kéo thả commit'],
  ['Conflict khi cập nhật', 'Rebase dừng, phải xử lý ngay', 'Cập nhật hoàn tất, commit được đánh dấu'],
  ['Hoàn tác thao tác', 'reflog, chỉ áp dụng cho commit', 'Snapshot gồm cả thay đổi chưa commit'],
  ['Nhiều AI agent cùng lúc', 'Mỗi agent một worktree', 'Mỗi phiên một nhánh, chung thư mục'],
];

export const CompareSlide: React.FC = () => {
  return (
    <SlideFrame eyebrow="Đánh giá" title="So sánh tổng hợp">
      <div className="rounded-[28px] bg-canvas-surface border border-canvas-border overflow-hidden">
        <table className="w-full text-[22px]">
          <thead>
            <tr className="text-left text-[20px]">
              <th className="px-7 py-5 w-[32%] font-medium text-ink-muted">Tình huống</th>
              <th className="px-7 py-5 w-[32%] font-medium text-ink-muted">Git</th>
              <th className="px-7 py-5 w-[36%] font-medium text-gitbutler-coral">GitButler</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, git, butler]) => (
              <tr key={label} className="border-t border-canvas-border">
                <td className="px-7 py-4 text-ink-primary">{label}</td>
                <td className="px-7 py-4 text-ink-secondary">{git}</td>
                <td className="px-7 py-4 text-ink-primary">{butler}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideFrame>
  );
};
