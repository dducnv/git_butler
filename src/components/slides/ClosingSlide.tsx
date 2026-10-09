import React from 'react';
import { AlertTriangle, Check, ExternalLink } from 'lucide-react';
import { SlideFrame } from '../layout/SlideFrame';
import { BASE_BRANCH } from '../../data/demoScenario';

const fits = [
  'Thường xuyên làm nhiều việc song song',
  'Pull Request lớn, review chậm',
  'Thường chỉnh sửa commit trước khi review',
  'Dùng AI agent sửa code trong repository',
];

const notes = [
  'Conflict vẫn xảy ra khi hai nhánh sửa cùng dòng',
  'Các nhánh dùng chung một thư mục; chạy hai phiên bản song song cần git worktree',
  'Không chuyển nhánh bằng git checkout bên ngoài GitButler',
  `Cấu hình target branch origin/${BASE_BRANCH} cho mỗi repository`,
];

const links = [
  ['Tổng quan', 'https://docs.gitbutler.com/overview'],
  ['Virtual Branches', 'https://docs.gitbutler.com/features/branch-management/virtual-branches'],
  ['Stacked Branches', 'https://docs.gitbutler.com/features/branch-management/stacked-branches'],
  ['AI Agents', 'https://docs.gitbutler.com/ai-agents/overview'],
];

const List: React.FC<{ title: string; items: string[]; positive: boolean }> = ({ title, items, positive }) => (
  <div className={`rounded-[28px] bg-canvas-surface p-8 border ${positive ? 'border-gitbutler-green/40' : 'border-canvas-border'}`}>
    <div className={`text-[26px] font-semibold ${positive ? 'text-gitbutler-green' : 'text-gitbutler-amber'}`}>{title}</div>
    <ul className="mt-5 space-y-4">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3.5 text-[22px] text-ink-primary">
          {positive ? (
            <Check size={24} className="text-gitbutler-green shrink-0 mt-1" />
          ) : (
            <AlertTriangle size={22} className="text-gitbutler-amber shrink-0 mt-1" />
          )}
          {t}
        </li>
      ))}
    </ul>
  </div>
);

export const ClosingSlide: React.FC = () => {
  return (
    <SlideFrame eyebrow="Tổng kết" title="Phạm vi áp dụng và thảo luận">
      <div className="grid grid-cols-2 gap-10 items-stretch">
        <List title="Phù hợp khi" items={fits} positive />
        <List title="Lưu ý" items={notes} positive={false} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-8">
        <p className="text-[22px] text-ink-secondary">
          <span className="text-ink-primary">Áp dụng thử:</span> bản sao abc-app, bắt đầu với tình huống sửa lỗi gấp.
        </p>
        <div className="flex gap-3">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-canvas-subtle hover:bg-canvas-border text-[17px] font-mono text-gitbutler-coral transition-colors"
            >
              {label}
              <ExternalLink size={15} />
            </a>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
};
