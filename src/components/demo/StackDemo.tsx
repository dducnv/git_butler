import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, GitBranch, GitPullRequest, MessageSquare, Play, RotateCcw } from 'lucide-react';
import { BASE_BRANCH } from '../../data/demoScenario';

/** 0 files stack up · 1 reviewer asks to change the API file · 2 result with Git · 3 result with GitButler */
type Step = 0 | 1 | 2 | 3;

const STEPS = ['Mỗi nhánh thêm 1 file', 'Reviewer góp ý PR API', 'Kết quả với Git', 'Kết quả với GitButler'];

const FILES = [
  { id: 'services', name: 'leaderboard_services.dart', short: 'services', color: '#2ec4b6' },
  { id: 'provider', name: 'leaderboard_provider.dart', short: 'provider', color: '#a78bfa' },
  { id: 'screen', name: 'leaderboard_screen.dart', short: 'screen', color: '#ff7a5c' },
];

const BRANCHES = [
  { name: 'feat/leaderboard_api', target: BASE_BRANCH, lines: 180 },
  { name: 'feat/leaderboard_provider', target: 'nhánh API', lines: 260 },
  { name: 'feat/leaderboard_ui', target: 'nhánh Provider', lines: 800 },
];

type CopyState = 'new' | 'inherited' | 'changed' | 'stale' | 'synced';

const STATE_TEXT: Partial<Record<CopyState, string>> = {
  stale: 'text-gitbutler-amber',
  changed: 'text-gitbutler-green',
  synced: 'text-gitbutler-green',
};

const FileCard: React.FC<{ file: (typeof FILES)[number]; state: CopyState; version?: string }> = ({ file, state, version }) => {
  const borderColor =
    state === 'stale' ? '#ffb340' : state === 'changed' || state === 'synced' ? '#34c759' : state === 'new' ? file.color : 'transparent';
  return (
    <motion.div
      animate={{ opacity: state === 'inherited' ? 0.4 : 1, scale: state === 'synced' ? [1, 1.04, 1] : 1, borderColor }}
      transition={{ duration: 0.45 }}
      className="flex items-center gap-3 rounded-xl bg-canvas-subtle border-2 px-4 py-2.5"
    >
      <span className="w-2.5 h-7 rounded-full shrink-0" style={{ background: file.color }} />
      <span className="font-mono text-[17px] text-ink-primary">{file.name}</span>
      {version && (
        <span className={`ml-auto flex items-center gap-1 font-mono text-[15px] ${STATE_TEXT[state] ?? 'text-ink-muted'}`}>
          {state === 'stale' && <AlertTriangle size={14} />}
          {state === 'synced' && <Check size={14} />}
          {version}
        </span>
      )}
    </motion.div>
  );
};

/** Slide 4: stacked branches shown as files that accumulate; each PR reviews only the new file. */
export const StackDemo: React.FC = () => {
  const [step, setStep] = useState<Step>(0);

  // State of the API file (services) inside each branch.
  const servicesCopy = (branchIndex: number): { state: CopyState; version: string } => {
    if (branchIndex === 0) return { state: step >= 1 ? 'changed' : 'new', version: step >= 1 ? 'v2' : 'v1' };
    if (step === 2) return { state: 'stale', version: 'v1 bản cũ' };
    if (step === 3) return { state: 'synced', version: 'v2' };
    return { state: 'inherited', version: 'v1' };
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[18px] transition-colors ${
                step === i
                  ? 'bg-gitbutler-orange text-white'
                  : step > i
                  ? 'bg-gitbutler-green/15 text-gitbutler-green'
                  : 'bg-canvas-surface text-ink-muted'
              }`}
            >
              <span className="font-mono">{i + 1}</span> {label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 text-[18px]">
          <button
            onClick={() => setStep((s) => (s < 3 ? ((s + 1) as Step) : s))}
            disabled={step === 3}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-canvas-surface border border-canvas-border text-ink-primary hover:bg-canvas-subtle disabled:opacity-30"
          >
            <Play size={16} /> Bước tiếp
          </button>
          <button onClick={() => setStep(0)} className="flex items-center gap-2 text-ink-muted hover:text-ink-primary">
            <RotateCcw size={16} /> Làm lại
          </button>
        </div>
      </div>

      {/* Staircase: each branch holds the files below it plus one new file */}
      <div className="grid grid-cols-3 gap-6 items-end">
        {BRANCHES.map((b, bi) => {
          const newFile = FILES[bi];
          return (
            <div key={b.name} className="rounded-[24px] bg-canvas-surface border border-canvas-border p-5 flex flex-col">
              <div className="flex items-center gap-2 font-mono text-[17px]" style={{ color: newFile.color }}>
                <GitBranch size={17} /> {b.name}
              </div>
              <div className="mt-4 flex flex-col-reverse gap-2.5">
                {FILES.slice(0, bi + 1).map((f, fi) => {
                  if (f.id === 'services') {
                    const c = servicesCopy(bi);
                    return <FileCard key={f.id} file={f} state={c.state} version={step >= 1 ? c.version : undefined} />;
                  }
                  return <FileCard key={f.id} file={f} state={fi === bi ? 'new' : 'inherited'} />;
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-canvas-border flex items-center gap-2 text-[17px] text-ink-secondary">
                <GitPullRequest size={17} className="shrink-0" />
                PR → {b.target}: chỉ
                <span className="font-mono" style={{ color: newFile.color }}>
                  {newFile.short}
                </span>
                <span className="ml-auto font-mono text-[15px] text-ink-muted">{b.lines} dòng</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Narration for the current step */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[100px] rounded-[20px] bg-canvas-surface border border-canvas-border px-6 py-4 text-[21px]"
      >
        {step === 0 && (
          <p className="text-ink-primary">
            Nhánh sau chứa đủ file của nhánh trước và thêm 1 file mới. Mỗi PR chỉ so với nhánh ngay bên dưới, nên reviewer chỉ
            đọc <span className="text-gitbutler-coral">file mới</span>.
          </p>
        )}
        {step === 1 && (
          <p className="flex items-center gap-3 text-ink-primary">
            <MessageSquare size={22} className="text-gitbutler-coral shrink-0" />
            Reviewer góp ý PR API: đổi tên trường <span className="font-mono">score</span> thành{' '}
            <span className="font-mono">points</span>. Sau khi sửa, services lên v2.
          </p>
        )}
        {step === 2 && (
          <div className="space-y-1.5">
            <p className="flex items-center gap-2 text-gitbutler-amber">
              <AlertTriangle size={22} className="shrink-0" /> Git: hai nhánh phía trên vẫn giữ services bản cũ. Phải tự cập nhật
              từng nhánh:
            </p>
            <p className="font-mono text-[16px] text-ink-secondary">
              git checkout + git rebase (Provider) · git checkout + git rebase (UI) · git push --force (2 nhánh)
            </p>
          </div>
        )}
        {step === 3 && (
          <p className="flex items-center gap-2 text-gitbutler-green">
            <Check size={22} className="shrink-0" /> GitButler: hai nhánh phía trên tự nhận services v2. Không cần lệnh.
          </p>
        )}
      </motion.div>
    </div>
  );
};
