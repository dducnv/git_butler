import React from 'react';
import { motion } from 'framer-motion';
import { BASE_BRANCH, FEATURE, FIX } from '../../data/demoScenario';

const ease = [0.22, 1, 0.36, 1] as const;
const mono = 'JetBrains Mono, monospace';

/** Slide 1: feature keeps going while a small fix branches off dev and merges back. */
export const HeroGraph: React.FC = () => (
  <svg viewBox="0 0 1100 280" className="w-full" fill="none" aria-label="Nhánh fix tách ra và merge lại vào dev trong khi feature vẫn tiếp tục">
    {/* dev */}
    <line x1="40" y1="140" x2="1060" y2="140" stroke="#3a3b40" strokeWidth="4" strokeLinecap="round" />
    {[120, 260].map((x) => (
      <circle key={x} cx={x} cy="140" r="9" fill="#0e0f11" stroke="#6e6e73" strokeWidth="4" />
    ))}
    <text x="40" y="180" fill="#6e6e73" fontSize="20" fontFamily={mono}>{BASE_BRANCH}</text>

    {/* feature branch: long-running */}
    <motion.path
      d="M 260 140 C 330 140, 330 40, 410 40 L 1020 40"
      stroke={FEATURE.color} strokeWidth="4" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.4, ease }}
    />
    {[520, 700, 880].map((x, i) => (
      <motion.circle key={x} cx={x} cy="40" r="9" fill={FEATURE.color}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.9 + i * 0.25, duration: 0.3 }} />
    ))}
    <motion.text x="1020" y="22" textAnchor="end" fill="#ff7a5c" fontSize="20" fontFamily={mono}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
      {FEATURE.name} · đang phát triển
    </motion.text>

    {/* fix branch: out and back into dev */}
    <motion.path
      d="M 260 140 C 340 140, 340 230, 420 230 L 560 230 C 640 230, 640 140, 720 140"
      stroke={FIX.color} strokeWidth="4" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 1.4, ease }}
    />
    <motion.circle cx="490" cy="230" r="9" fill={FIX.color}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, duration: 0.3 }} />
    <motion.text x="490" y="262" textAnchor="middle" fill={FIX.color} fontSize="20" fontFamily={mono}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
      {FIX.name}
    </motion.text>

    {/* merged into dev */}
    <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.6, duration: 0.35 }} style={{ transformOrigin: '720px 140px' }}>
      <circle cx="720" cy="140" r="12" fill={FIX.color} />
      <text x="745" y="180" fill="#a1a1a6" fontSize="18" fontFamily={mono}>PR {FIX.pr} → {BASE_BRANCH}</text>
    </motion.g>
  </svg>
);
