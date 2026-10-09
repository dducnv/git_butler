import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, GitBranch, RotateCcw, User } from 'lucide-react';
import { FEATURE } from '../../data/demoScenario';

const ROWS = [
  {
    source: 'Lập trình viên',
    task: 'Giao diện bảng xếp hạng',
    agent: false,
    branch: FEATURE.name,
    color: FEATURE.color,
    files: 'leaderboard_screen.dart',
    commit: null,
  },
  {
    source: 'Claude Code · phiên 1',
    task: 'Sửa lỗi đồng bộ flashcard',
    agent: true,
    branch: 'fix/flashcard_sync',
    color: '#2ec4b6',
    files: 'flashcard_provider.dart',
    commit: 'fix: đồng bộ flashcard',
  },
  {
    source: 'Claude Code · phiên 2',
    task: 'Viết test cho leaderboard_provider',
    agent: true,
    branch: 'test/leaderboard_provider',
    color: '#a78bfa',
    files: 'leaderboard_provider_test.dart',
    commit: 'test: leaderboard_provider',
  },
];

/** Slide 12: several writers in one workspace, each routed to its own branch. */
export const AgentsDemo: React.FC = () => {
  const [run, setRun] = useState(0);

  return (
    <div className="space-y-4" key={run}>
      {ROWS.map((r, i) => (
        <div key={r.branch} className="grid grid-cols-[360px_1fr_620px] items-center gap-6">
          {/* Source */}
          <div className="rounded-2xl bg-canvas-surface border border-canvas-border px-6 py-4">
            <div className="flex items-center gap-3 text-[21px] text-ink-primary">
              {r.agent ? <Bot size={22} style={{ color: r.color }} /> : <User size={22} style={{ color: r.color }} />}
              {r.source}
            </div>
            <div className="mt-1 text-[17px] text-ink-muted">{r.task}</div>
          </div>

          {/* Flow */}
          <div className="relative h-[3px] rounded-full bg-canvas-border">
            <motion.span
              className="absolute -top-[5px] w-3.5 h-3.5 rounded-full"
              style={{ background: r.color }}
              initial={{ left: '0%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 1.4, delay: i * 0.4, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
            />
          </div>

          {/* Branch */}
          <div className="rounded-2xl bg-canvas-surface border-2 px-6 py-4" style={{ borderColor: `${r.color}66` }}>
            <div className="flex items-center gap-3 font-mono text-[20px]" style={{ color: r.color }}>
              <GitBranch size={20} /> {r.branch}
            </div>
            <div className="mt-1 flex items-center justify-between font-mono text-[16px]">
              <span className="text-ink-secondary">{r.files}</span>
              {r.commit ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 + i * 0.6 }}
                  className="text-ink-muted"
                >
                  ● {r.commit}
                </motion.span>
              ) : (
                <span className="text-ink-muted">đang viết</span>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="pt-2 flex items-center justify-between">
        <div className="text-[20px] text-ink-muted">Cùng một thư mục abc-app/ · không cần worktree</div>
        <button
          onClick={() => setRun((n) => n + 1)}
          className="flex items-center gap-2 text-[18px] text-ink-muted hover:text-ink-primary"
        >
          <RotateCcw size={16} /> Chạy lại
        </button>
      </div>
    </div>
  );
};
