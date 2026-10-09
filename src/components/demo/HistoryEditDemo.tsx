import React, { useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Check, GitBranch, GripVertical, RotateCcw } from 'lucide-react';
import { FEATURE, FIX } from '../../data/demoScenario';

type LaneId = 'feature' | 'fix';
type Action = 'amend' | 'squash' | 'move';

interface Commit {
  id: string;
  sha: string;
  message: string;
  badges: string[];
}

type Payload = { kind: 'change' } | { kind: 'commit'; id: string; from: LaneId };

const LANE_META: Record<LaneId, { name: string; color: string }> = {
  feature: { name: FEATURE.name, color: FEATURE.color },
  fix: { name: FIX.name, color: FIX.color },
};

const initialLanes = (): Record<LaneId, Commit[]> => ({
  feature: [
    { id: 'c4', sha: '9e1b7d', message: 'fix(image): ảnh null', badges: [] },
    { id: 'c3', sha: '51ac02', message: 'sửa chính tả', badges: [] },
    { id: 'c2', sha: '7d3f20', message: 'feat: bục xếp hạng', badges: [] },
    { id: 'c1', sha: 'a18c55', message: 'feat: màn hình bảng xếp hạng', badges: [] },
  ],
  fix: [{ id: 'f1', sha: 'c5d2e9', message: FIX.commit, badges: [] }],
});

const GUIDE: Array<{ id: Action; text: React.ReactNode; git: string }> = [
  {
    id: 'amend',
    text: <>Kéo <b>podium_position.dart</b> (chưa commit) thả vào commit "bục xếp hạng"</>,
    git: 'git commit --fixup + rebase --autosquash',
  },
  {
    id: 'squash',
    text: <>Kéo commit "sửa chính tả" thả lên commit "màn hình bảng xếp hạng"</>,
    git: 'git rebase -i, đổi pick thành squash',
  },
  {
    id: 'move',
    text: <>Kéo commit "ảnh null" thả sang nhánh {FIX.name}</>,
    git: 'git cherry-pick + rebase -i xoá commit cũ',
  },
];

// Rewritten commits get a new hash; derive one deterministically for the prototype.
const rehash = (sha: string) => sha.split('').reverse().join('');

const ease = [0.22, 1, 0.36, 1] as const;

/** Slide 5: prototype of GitButler's drag-and-drop history editing (amend, squash, move). */
export const HistoryEditDemo: React.FC = () => {
  const [lanes, setLanes] = useState(initialLanes);
  const [uncommitted, setUncommitted] = useState(true);
  const [done, setDone] = useState<Record<Action, boolean>>({ amend: false, squash: false, move: false });
  const [over, setOver] = useState<string | null>(null);
  const drag = useRef<Payload | null>(null);

  const reset = () => {
    setLanes(initialLanes());
    setUncommitted(true);
    setDone({ amend: false, squash: false, move: false });
  };

  const laneOf = (commitId: string): LaneId | undefined =>
    (Object.keys(lanes) as LaneId[]).find((l) => lanes[l].some((c) => c.id === commitId));

  const canDropOnCommit = (targetId: string) => {
    const p = drag.current;
    if (!p) return false;
    if (p.kind === 'change') return laneOf(targetId) === 'feature';
    return p.id !== targetId && p.from === laneOf(targetId);
  };

  const canDropOnLane = (lane: LaneId) => {
    const p = drag.current;
    return p?.kind === 'commit' && p.from !== lane;
  };

  const dropOnCommit = (targetId: string) => {
    const p = drag.current;
    if (!p || !canDropOnCommit(targetId)) return;
    const lane = laneOf(targetId)!;
    if (p.kind === 'change') {
      setUncommitted(false);
      setLanes((ls) => ({
        ...ls,
        [lane]: ls[lane].map((c) => (c.id === targetId ? { ...c, sha: rehash(c.sha), badges: [...c.badges, '+1 file'] } : c)),
      }));
      setDone((d) => ({ ...d, amend: true }));
    } else {
      setLanes((ls) => ({
        ...ls,
        [lane]: ls[lane]
          .filter((c) => c.id !== p.id)
          .map((c) => (c.id === targetId ? { ...c, sha: rehash(c.sha), badges: [...c.badges, 'đã gộp'] } : c)),
      }));
      setDone((d) => ({ ...d, squash: true }));
    }
  };

  const dropOnLane = (lane: LaneId) => {
    const p = drag.current;
    if (!p || p.kind !== 'commit' || !canDropOnLane(lane)) return;
    setLanes((ls) => {
      const moved = ls[p.from].find((c) => c.id === p.id)!;
      return {
        ...ls,
        [p.from]: ls[p.from].filter((c) => c.id !== p.id),
        [lane]: [{ ...moved, sha: rehash(moved.sha) }, ...ls[lane]],
      };
    });
    setDone((d) => ({ ...d, move: true }));
  };

  const dropHandlers = (key: string, canDrop: () => boolean, onDrop: () => void) => ({
    onDragOver: (e: React.DragEvent) => {
      if (!canDrop()) return;
      e.preventDefault();
      e.stopPropagation();
      setOver(key);
    },
    onDragLeave: () => setOver((o) => (o === key ? null : o)),
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOver(null);
      onDrop();
      drag.current = null;
    },
  });

  const dragHandlers = (payload: Payload) => ({
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      drag.current = payload;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', payload.kind);
    },
    onDragEnd: () => {
      drag.current = null;
      setOver(null);
    },
  });

  return (
    <LayoutGroup>
      <div className="grid grid-cols-12 gap-8">
        {/* Lanes */}
        <div className="col-span-8 grid grid-cols-2 gap-6">
          {(Object.keys(LANE_META) as LaneId[]).map((lane) => {
            const meta = LANE_META[lane];
            const laneKey = `lane-${lane}`;
            return (
              <div
                key={lane}
                {...dropHandlers(laneKey, () => canDropOnLane(lane), () => dropOnLane(lane))}
                className={`min-h-[520px] rounded-[28px] bg-canvas-surface p-6 space-y-3 border-2 transition-colors ${
                  over === laneKey ? 'border-dashed bg-white/[0.02]' : 'border-transparent'
                }`}
                style={over === laneKey ? { borderColor: meta.color } : undefined}
              >
                <div className="flex items-center gap-2.5 font-mono text-[19px] pb-2" style={{ color: meta.color }}>
                  <GitBranch size={19} /> {meta.name}
                </div>

                <AnimatePresence mode="popLayout">
                  {lane === 'feature' && uncommitted && (
                    <motion.div
                      key="uncommitted"
                      layout
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <div
                        {...dragHandlers({ kind: 'change' })}
                        className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-canvas-border px-4 py-3 font-mono text-[17px] text-ink-secondary cursor-grab active:cursor-grabbing hover:border-ink-muted"
                      >
                        <GripVertical size={18} className="text-ink-muted shrink-0" />
                        chưa commit · podium_position.dart <span className="text-gitbutler-green">+4</span>
                      </div>
                    </motion.div>
                  )}

                  {lanes[lane].map((c) => {
                    const key = `commit-${c.id}`;
                    return (
                      <motion.div
                        key={c.id}
                        layoutId={c.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        <div
                          {...dragHandlers({ kind: 'commit', id: c.id, from: lane })}
                          {...dropHandlers(key, () => canDropOnCommit(c.id), () => dropOnCommit(c.id))}
                          className={`group flex items-center gap-3 rounded-2xl bg-canvas-subtle px-4 py-3.5 border-2 cursor-grab active:cursor-grabbing transition-colors ${
                            over === key ? 'border-gitbutler-green' : 'border-transparent hover:border-canvas-border'
                          }`}
                        >
                          <GripVertical size={18} className="text-ink-muted shrink-0 opacity-40 group-hover:opacity-100" />
                          <span className="w-3.5 h-3.5 rounded-full border-[3px] shrink-0" style={{ borderColor: meta.color }} />
                          <span className="text-[19px] text-ink-primary">{c.message}</span>
                          {c.badges.map((b, bi) => (
                            <span
                              key={`${b}-${bi}`}
                              className="text-[15px] px-2 py-0.5 rounded-full bg-gitbutler-green/15 text-gitbutler-green whitespace-nowrap"
                            >
                              {b}
                            </span>
                          ))}
                          <span className="ml-auto font-mono text-[15px] text-ink-muted">{c.sha}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Guide */}
        <div className="col-span-4 space-y-4">
          <div className="text-[18px] text-ink-muted">Thử kéo thả</div>
          {GUIDE.map((g, i) => (
            <div
              key={g.id}
              className={`rounded-[24px] bg-canvas-surface border p-5 transition-colors ${
                done[g.id] ? 'border-gitbutler-green/50' : 'border-canvas-border'
              }`}
            >
              <div className="flex items-start gap-3 text-[19px] text-ink-primary">
                {done[g.id] ? (
                  <Check size={22} className="text-gitbutler-green shrink-0 mt-0.5" />
                ) : (
                  <span className="font-mono text-gitbutler-orange w-[22px] text-center shrink-0">{i + 1}</span>
                )}
                <span className="[&_b]:font-mono [&_b]:font-normal">{g.text}</span>
              </div>
              <div className="mt-2 pl-[34px] font-mono text-[15px] text-ink-muted">Git: {g.git}</div>
            </div>
          ))}
          <button onClick={reset} className="flex items-center gap-2 text-[18px] text-ink-muted hover:text-ink-primary">
            <RotateCcw size={18} /> Làm lại
          </button>
        </div>
      </div>
    </LayoutGroup>
  );
};
