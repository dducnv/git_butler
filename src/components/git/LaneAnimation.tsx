import React, { useEffect, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';

type Lane = 'unassigned' | 'login' | 'flutter';

const CHANGES: Array<{ id: string; file: string; diff: string; target: Lane }> = [
  { id: 'c1', file: 'LoginForm.tsx', diff: '+24 −3', target: 'login' },
  { id: 'c2', file: 'auth_validator.dart', diff: '+12 −1', target: 'flutter' },
  { id: 'c3', file: 'login.css', diff: '+8', target: 'login' },
];

const LANES: Array<{ id: Lane; name: string; color: string; commit?: string }> = [
  { id: 'unassigned', name: 'Unassigned changes', color: '#6e6e73' },
  { id: 'login', name: 'feature/login-ui', color: '#ff5533', commit: 'a1f3c9  feat: login UI' },
  { id: 'flutter', name: 'fix/flutter-validation', color: '#2ec4b6', commit: '7be210  fix: email validation' },
];

/**
 * Slide 3 animation. Deterministic sequence:
 * 0 → all changes unassigned, 1 → assigned to lanes, 2 → each lane commits.
 */
export const LaneAnimation: React.FC = () => {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 2 : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) return;
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [run, reduce]);

  const laneOf = (c: (typeof CHANGES)[number]): Lane => (step === 0 ? 'unassigned' : c.target);

  return (
    <div>
      <LayoutGroup>
        <div className="grid grid-cols-3 gap-8">
          {LANES.map((lane) => (
            <div key={lane.id} className="h-[400px] rounded-[28px] bg-canvas-surface p-8 flex flex-col">
              <div className="flex items-center gap-3 font-mono text-[20px] text-ink-primary">
                <span className="w-3 h-3 rounded-full" style={{ background: lane.color }} />
                {lane.name}
              </div>

              <div className="mt-6 flex-1 space-y-3">
                {CHANGES.filter((c) => laneOf(c) === lane.id).map((c) => (
                  <motion.div
                    key={c.id}
                    layoutId={c.id}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-between rounded-2xl bg-canvas-subtle px-5 py-4 font-mono text-[19px]"
                    style={{ opacity: step === 2 ? 0.45 : 1 }}
                  >
                    <span className="text-ink-primary">{c.file}</span>
                    <span className="text-gitbutler-green">{c.diff}</span>
                  </motion.div>
                ))}
              </div>

              {lane.commit && (
                <motion.div
                  initial={false}
                  animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : 8 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 font-mono text-[18px] text-ink-secondary"
                >
                  <span className="w-3.5 h-3.5 rounded-full border-[3px]" style={{ borderColor: lane.color }} />
                  {lane.commit}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </LayoutGroup>

      <button
        onClick={() => setRun((r) => r + 1)}
        className="mt-6 text-[18px] text-ink-muted hover:text-ink-primary transition-colors"
      >
        ↺ Chạy lại
      </button>
    </div>
  );
};
