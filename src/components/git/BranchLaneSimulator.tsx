import React, { useState } from 'react';

type Lane = 'unassigned' | 'login' | 'flutter';

const CHANGES = [
  { id: 'web', file: 'LoginForm.tsx', label: 'Web login UI' },
  { id: 'flutter', file: 'auth_validator.dart', label: 'Flutter validation' },
] as const;

const LANES = [
  { id: 'login' as const, name: 'feature/login-ui', color: '#ff5533', message: 'feat: login UI' },
  { id: 'flutter' as const, name: 'fix/flutter-validation', color: '#2ec4b6', message: 'fix: email validation' },
];

/** Illustrative simulation of GitButler branch lanes (not the real app). */
export const BranchLaneSimulator: React.FC = () => {
  const [assigned, setAssigned] = useState<Record<string, Lane>>({ web: 'unassigned', flutter: 'unassigned' });
  const [committed, setCommitted] = useState<Record<string, boolean>>({});
  const [applied, setApplied] = useState<Record<string, boolean>>({ login: true, flutter: true });

  const reset = () => {
    setAssigned({ web: 'unassigned', flutter: 'unassigned' });
    setCommitted({});
    setApplied({ login: true, flutter: true });
  };

  const unassigned = CHANGES.filter((c) => assigned[c.id] === 'unassigned');

  return (
    <div className="rounded-[28px] bg-canvas-surface p-8 h-full flex flex-col">
      <div className="flex items-center justify-between text-[17px]">
        <span className="text-ink-muted">Mô phỏng minh hoạ — không phải ứng dụng GitButler thật</span>
        <button onClick={reset} className="text-ink-muted hover:text-ink-primary">↺ Reset</button>
      </div>

      {/* Unassigned */}
      <div className="mt-5">
        <div className="text-[17px] font-mono text-ink-muted mb-3">Unassigned changes</div>
        <div className="min-h-[72px] flex gap-3">
          {unassigned.length === 0 && <div className="text-[18px] text-ink-muted self-center">Không còn thay đổi chưa gán</div>}
          {unassigned.map((c) => (
            <div key={c.id} className="flex-1 flex items-center justify-between rounded-2xl bg-canvas-subtle px-5 py-3">
              <span className="font-mono text-[18px] text-ink-primary">{c.file}</span>
              <div className="flex gap-2">
                {LANES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setAssigned((a) => ({ ...a, [c.id]: l.id }))}
                    className="px-3 py-1.5 rounded-full text-[15px] font-mono border transition-colors hover:bg-white/5"
                    style={{ borderColor: l.color, color: l.color }}
                  >
                    → {l.id === 'login' ? 'login-ui' : 'flutter'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lanes */}
      <div className="mt-6 grid grid-cols-2 gap-5 flex-1 min-h-0">
        {LANES.map((lane) => {
          const items = CHANGES.filter((c) => assigned[c.id] === lane.id);
          const isApplied = applied[lane.id];
          const isCommitted = committed[lane.id];
          return (
            <div key={lane.id} className="rounded-2xl border border-canvas-border p-5 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5 font-mono text-[17px] text-ink-primary">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: lane.color }} />
                  {lane.name}
                </span>
                <button
                  onClick={() => setApplied((a) => ({ ...a, [lane.id]: !a[lane.id] }))}
                  className={`px-3 py-1 rounded-full text-[14px] font-mono transition-colors ${
                    isApplied ? 'bg-gitbutler-green/15 text-gitbutler-green' : 'bg-canvas-subtle text-ink-muted'
                  }`}
                >
                  {isApplied ? 'applied' : 'unapplied'}
                </button>
              </div>

              <div className="flex-1 mt-4 text-[17px]" style={{ opacity: isApplied ? 1 : 0.35 }}>
                {items.length === 0 && !isCommitted && <div className="text-ink-muted">Chưa có thay đổi</div>}
                {items.map((c) => (
                  <div key={c.id} className="font-mono text-ink-primary">
                    {isCommitted ? (
                      <span className="text-ink-secondary">● {lane.message}</span>
                    ) : (
                      <>
                        {c.file} <span className="text-ink-muted">· {c.label}</span>
                      </>
                    )}
                  </div>
                ))}
                {!isApplied && (
                  <div className="mt-2 text-ink-muted">Thay đổi đã được gỡ khỏi working directory</div>
                )}
              </div>

              <button
                disabled={items.length === 0 || isCommitted || !isApplied}
                onClick={() => setCommitted((c) => ({ ...c, [lane.id]: true }))}
                className="mt-3 py-2.5 rounded-full text-[16px] font-medium text-white disabled:opacity-25 transition-opacity"
                style={{ background: lane.color }}
              >
                {isCommitted ? 'Đã commit' : 'Commit'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
