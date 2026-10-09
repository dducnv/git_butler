import React, { useEffect, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { GitBranch, GitPullRequest, RotateCcw } from 'lucide-react';
import { BASE_BRANCH, FEATURE, FEATURE_FILES, FIX, FIX_FILE } from '../../data/demoScenario';

const GIT_LINES = [
  'git stash -u',
  `git checkout ${BASE_BRANCH}`,
  'git pull',
  `git checkout -b ${FIX.name}`,
  `git checkout stash@{0} -- ${FIX.file}`,
  `git commit -m "${FIX.commit}"`,
  `git push -u origin ${FIX.name}`,
  `# GitHub: tạo PR vào ${BASE_BRANCH}`,
  `git checkout ${FEATURE.name}`,
  'git stash pop',
];

const STEPS = [`Tạo nhánh ${FIX.name}`, `Kéo ${FIX_FILE.file} sang nhánh mới`, 'Commit', `Tạo PR vào ${BASE_BRANCH}`];

const ease = [0.22, 1, 0.36, 1] as const;

const Chip: React.FC<{ file: string; layoutId?: string; highlight?: boolean }> = ({ file, layoutId, highlight }) => (
  <motion.div
    layoutId={layoutId}
    transition={{ duration: 0.6, ease }}
    className={`rounded-xl bg-canvas-subtle px-3.5 py-2 font-mono text-[16px] text-ink-primary ${
      highlight ? 'ring-1 ring-gitbutler-teal/70' : ''
    }`}
  >
    {file}
  </motion.div>
);

/** Slide 3: the hotfix scenario, plain Git and GitButler side by side, auto-played. */
export const HotfixCompare: React.FC = () => {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const [step, setStep] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce) return;
    setStep(0);
    const timers = [1, 2, 3, 4].map((s) => setTimeout(() => setStep(s), 600 + s * 1100));
    return () => timers.forEach(clearTimeout);
  }, [run, reduce]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-10 items-stretch">
        {/* Git */}
        <div className="h-[470px] rounded-[28px] bg-canvas-surface border border-canvas-border p-7 flex flex-col">
          <div className="flex items-baseline justify-between">
            <span className="text-[26px] font-semibold text-ink-primary">Git</span>
            <span className="text-[19px] text-gitbutler-red">9 lệnh · chuyển nhánh 2 lần</span>
          </div>
          <div className="mt-4 flex-1 rounded-2xl bg-[#0a0b0d] px-5 py-4 font-mono text-[16.5px] leading-[1.75]">
            {GIT_LINES.map((l, i) => {
              const comment = l.startsWith('#');
              return (
                <motion.div
                  key={`${run}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.3 + i * 0.4 }}
                  className={comment ? 'text-ink-muted italic' : 'text-ink-primary'}
                >
                  {!comment && <span className="text-ink-muted mr-2">$</span>}
                  {l}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* GitButler */}
        <div className="h-[470px] rounded-[28px] bg-canvas-surface border border-gitbutler-orange/40 p-7 flex flex-col">
          <div className="flex items-baseline justify-between">
            <span className="text-[26px] font-semibold text-gitbutler-coral">GitButler</span>
            <span className="text-[19px] text-gitbutler-green">4 thao tác · không chuyển nhánh</span>
          </div>

          <LayoutGroup>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-canvas-border p-4 space-y-2 min-h-[200px]">
                <div className="flex items-center gap-2 font-mono text-[16px]" style={{ color: FEATURE.color }}>
                  <GitBranch size={16} /> {FEATURE.name}
                </div>
                {FEATURE_FILES.map((f) => (
                  <Chip key={f.id} file={f.file} />
                ))}
                {step < 2 && <Chip file={FIX_FILE.file} layoutId={FIX_FILE.id} highlight />}
              </div>

              <motion.div
                animate={{ opacity: step >= 1 ? 1 : 0.25 }}
                className="rounded-2xl border border-dashed p-4 space-y-2"
                style={{ borderColor: `${FIX.color}88` }}
              >
                <div className="flex items-center gap-2 font-mono text-[16px]" style={{ color: FIX.color }}>
                  <GitBranch size={16} /> {FIX.name}
                </div>
                {step >= 2 && step < 3 && <Chip file={FIX_FILE.file} layoutId={FIX_FILE.id} highlight />}
                {step >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-1 py-2 font-mono text-[15px] text-ink-secondary"
                  >
                    <span className="w-3 h-3 rounded-full border-[3px] shrink-0" style={{ borderColor: FIX.color }} />
                    {FIX.commit}
                  </motion.div>
                )}
                {step >= 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 rounded-xl bg-gitbutler-green/15 text-gitbutler-green px-3 py-2 text-[16px]"
                  >
                    <GitPullRequest size={16} /> PR {FIX.pr} → {BASE_BRANCH}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </LayoutGroup>

          <ol className="mt-auto space-y-1.5 text-[19px]">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={`flex gap-3 transition-colors ${step > i ? 'text-ink-primary' : 'text-ink-muted'}`}
              >
                <span className="font-mono text-gitbutler-orange">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[19px]">
        <span className="text-ink-secondary">
          Bản sửa lỗi nằm chung file với code tính năng: Git cần <span className="font-mono">git add -p</span>; GitButler kéo riêng từng hunk.
        </span>
        <button
          onClick={() => setRun((r) => r + 1)}
          className="flex items-center gap-2 text-ink-muted hover:text-ink-primary transition-colors"
        >
          <RotateCcw size={16} /> Chạy lại
        </button>
      </div>
    </div>
  );
};
