import React from 'react';
import { AlertTriangle, Check, Undo2, X } from 'lucide-react';
import { SlideFrame } from '../layout/SlideFrame';
import { BASE_BRANCH, FIX } from '../../data/demoScenario';

const Cell: React.FC<{ children: React.ReactNode; result: string; ok: boolean }> = ({ children, result, ok }) => (
  <div className="rounded-[24px] bg-canvas-surface border border-canvas-border p-6 flex flex-col">
    <div className="flex-1">{children}</div>
    <div className={`mt-4 flex items-start gap-2.5 text-[20px] ${ok ? 'text-gitbutler-green' : 'text-gitbutler-red'}`}>
      {ok ? <Check size={22} className="shrink-0 mt-0.5" /> : <X size={22} className="shrink-0 mt-0.5" />}
      {result}
    </div>
  </div>
);

const Terminal: React.FC<{ lines: Array<[string, string?]> }> = ({ lines }) => (
  <div className="rounded-2xl bg-[#0a0b0d] px-5 py-4 font-mono text-[16px] leading-[1.75]">
    {lines.map(([text, cls], i) => (
      <div key={i} className={cls ?? 'text-ink-primary'}>
        {text}
      </div>
    ))}
  </div>
);

const Row: React.FC<{ text: string; tag?: React.ReactNode; dim?: boolean }> = ({ text, tag, dim }) => (
  <div className={`flex items-center gap-3 rounded-xl bg-canvas-subtle px-4 py-2.5 text-[18px] ${dim ? 'text-ink-muted' : 'text-ink-primary'}`}>
    {text}
    {tag && <span className="ml-auto">{tag}</span>}
  </div>
);

export const SafetySlide: React.FC = () => {
  return (
    <SlideFrame eyebrow="An toàn khi thao tác" title="Conflict và hoàn tác">
      <div className="grid grid-cols-[200px_1fr_1fr] gap-x-8 gap-y-6 items-stretch">
        <span />
        <div className="text-[24px] font-semibold text-ink-primary">Git</div>
        <div className="text-[24px] font-semibold text-gitbutler-coral">GitButler</div>

        {/* Conflict */}
        <div className="pt-6 text-[24px] text-ink-secondary">Conflict khi cập nhật nhánh</div>
        <Cell ok={false} result="Rebase dừng giữa chừng, phải xử lý ngay.">
          <Terminal
            lines={[
              [`$ git rebase origin/${BASE_BRANCH}`],
              ['CONFLICT (content): Merge conflict in', 'text-gitbutler-red'],
              ['  lib/.../leaderboard_screen.dart', 'text-gitbutler-red'],
              ['hint: ... then run "git rebase --continue"', 'text-ink-muted'],
            ]}
          />
        </Cell>
        <Cell ok result="Cập nhật hoàn tất; xử lý sau bằng Edit mode.">
          <div className="space-y-2">
            <Row text="feat: hiệu ứng bục xếp hạng" tag={<Check size={18} className="text-gitbutler-green" />} />
            <Row
              text="feat: bục xếp hạng"
              tag={
                <span className="flex items-center gap-1.5 text-[16px] text-gitbutler-amber">
                  <AlertTriangle size={16} /> conflicted
                </span>
              }
            />
            <Row text="feat: màn hình bảng xếp hạng" tag={<Check size={18} className="text-gitbutler-green" />} />
          </div>
        </Cell>

        {/* Undo */}
        <div className="pt-6 text-[24px] text-ink-secondary">Hoàn tác thao tác sai</div>
        <Cell ok={false} result="Chỉ khôi phục commit; thay đổi chưa commit bị mất.">
          <Terminal lines={[['$ git reflog'], ['$ git reset --hard HEAD@{3}']]} />
        </Cell>
        <Cell ok result="Snapshot trước mỗi thao tác, gồm cả thay đổi chưa commit.">
          <div className="space-y-2">
            <Row text={`Chuyển commit sang ${FIX.name}`} dim />
            <Row
              text={'Gộp commit "sửa chính tả"'}
              tag={
                <span className="flex items-center gap-1.5 text-[16px] text-ink-secondary">
                  <Undo2 size={15} /> Khôi phục
                </span>
              }
            />
          </div>
        </Cell>
      </div>
    </SlideFrame>
  );
};
