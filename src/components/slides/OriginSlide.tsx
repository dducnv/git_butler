import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SlideFrame } from '../layout/SlideFrame';

const rows: Array<[string, string]> = [
  ['Một thư mục làm việc tương ứng một nhánh', 'Nhiều việc song song, thường xuyên bị ngắt quãng'],
  ['Chọn nhánh trước khi viết code', 'Viết code trước, phân loại thay đổi sau'],
  ['Lịch sử commit hiếm khi chỉnh sửa', 'Chỉnh sửa, gộp, tách commit trước khi review'],
  ['Một người sửa code trong một repository', 'Lập trình viên và AI agent cùng sửa code'],
];

export const OriginSlide: React.FC = () => {
  return (
    <SlideFrame eyebrow="Bối cảnh" title="Vì sao GitButler ra đời">
      <div className="rounded-[28px] bg-canvas-surface border border-canvas-border overflow-hidden">
        <div className="grid grid-cols-[1fr_80px_1fr] px-10 py-5 text-[20px] text-ink-muted border-b border-canvas-border">
          <span>Giả định khi Git ra đời (2005)</span>
          <span />
          <span className="text-gitbutler-coral">Cách làm việc hiện nay</span>
        </div>
        {rows.map(([then, now]) => (
          <div key={then} className="grid grid-cols-[1fr_80px_1fr] items-center px-10 py-5 text-[28px] border-t border-canvas-border first:border-t-0">
            <span className="text-ink-secondary">{then}</span>
            <ArrowRight size={28} className="text-ink-muted" />
            <span className="text-ink-primary">{now}</span>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[26px] text-ink-primary">
        <span className="text-gitbutler-coral">Ý tưởng cốt lõi:</span> một thư mục làm việc, nhiều nhánh cùng được apply; thay
        đổi được gán vào nhánh sau khi viết.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-8 text-[20px] text-ink-secondary">
        <p>
          <span className="text-ink-primary">GitButler</span> do Scott Chacon, đồng sáng lập GitHub và tác giả{' '}
          <em>Pro Git</em>, đồng sáng lập. Dữ liệu vẫn là Git; thay đổi nằm ở cách làm việc với Git.
        </p>
        <p>
          <span className="text-ink-primary">Cùng hướng tiếp cận:</span> Sapling (Meta), Jujutsu, Graphite.
        </p>
      </div>
    </SlideFrame>
  );
};
