import React from 'react';
import { motion } from 'framer-motion';

// Hero animated multi-lane git tree SVG
export const HeroGitGraphSvg: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 680 340"
        className="w-full max-h-[300px] select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#30363d" />
            <stop offset="100%" stopColor="#58a6ff" />
          </linearGradient>
          <linearGradient id="branch1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#58a6ff" />
            <stop offset="100%" stopColor="#ff5533" />
          </linearGradient>
          <linearGradient id="branch2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#58a6ff" />
            <stop offset="100%" stopColor="#22B2B1" />
          </linearGradient>
          <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Target branch / main baseline */}
        <line x1="40" y1="170" x2="620" y2="170" stroke="url(#mainGrad)" strokeWidth="3" strokeDasharray="4 2" opacity="0.6" />
        <text x="40" y="150" fill="#8b949e" fontSize="12" fontFamily="monospace" fontWeight="600">origin/main (Target)</text>

        {/* Virtual Branch 1: UI Feature (Orange) */}
        <motion.path
          d="M 180 170 C 230 170, 250 80, 310 80 L 520 80"
          stroke="url(#branch1Grad)"
          strokeWidth="3.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <text x="320" y="65" fill="#ff7e61" fontSize="12" fontFamily="monospace" fontWeight="700">
          lane: feature/login-ui [Applied]
        </text>

        {/* Virtual Branch 2: API Fix (Teal) */}
        <motion.path
          d="M 260 170 C 310 170, 330 260, 390 260 L 560 260"
          stroke="url(#branch2Grad)"
          strokeWidth="3.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />
        <text x="400" y="285" fill="#22B2B1" fontSize="12" fontFamily="monospace" fontWeight="700">
          lane: fix/flutter-validation [Applied]
        </text>

        {/* Mainline commits */}
        <circle cx="100" cy="170" r="7" fill="#161b22" stroke="#58a6ff" strokeWidth="3" />
        <text x="100" y="195" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="monospace">c1a2f</text>

        <circle cx="180" cy="170" r="7" fill="#161b22" stroke="#58a6ff" strokeWidth="3" />
        <text x="180" y="195" fill="#8b949e" fontSize="10" textAnchor="middle" fontFamily="monospace">base</text>

        {/* Feature Commits on Lane 1 */}
        <motion.circle
          cx="340"
          cy="80"
          r="8"
          fill="#ff5533"
          stroke="#fff"
          strokeWidth="2"
          filter="url(#glowOrange)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4, delay: 1 }}
        />
        <text x="340" y="105" fill="#f0f6fc" fontSize="11" textAnchor="middle" fontFamily="monospace">c39f (UI)</text>

        <motion.circle
          cx="460"
          cy="80"
          r="8"
          fill="#ff5533"
          stroke="#fff"
          strokeWidth="2"
          filter="url(#glowOrange)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4, delay: 1.3 }}
        />
        <text x="460" y="105" fill="#f0f6fc" fontSize="11" textAnchor="middle" fontFamily="monospace">d72e (Styles)</text>

        {/* Bugfix Commits on Lane 2 */}
        <motion.circle
          cx="420"
          cy="260"
          r="8"
          fill="#22B2B1"
          stroke="#fff"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4, delay: 1.2 }}
        />
        <text x="420" y="240" fill="#f0f6fc" fontSize="11" textAnchor="middle" fontFamily="monospace">a8b1 (Validate)</text>

        {/* Shared Workspace Indicator box */}
        <rect
          x="280"
          y="40"
          width="320"
          height="250"
          rx="10"
          fill="#ff5533"
          fillOpacity="0.04"
          stroke="#ff5533"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="590" y="55" fill="#ff7e61" fontSize="10" textAnchor="end" fontFamily="monospace">
          1 Shared Working Directory
        </text>
      </svg>
    </div>
  );
};

// Side by side Parallel vs Stacked diagrams
export const ParallelVsStackedSvg: React.FC<{ activeMode: 'parallel' | 'stacked' }> = ({ activeMode }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      {activeMode === 'parallel' ? (
        <svg viewBox="0 0 540 240" className="w-full max-h-[220px]" fill="none">
          {/* Base */}
          <line x1="30" y1="120" x2="510" y2="120" stroke="#30363d" strokeWidth="3" />
          <text x="30" y="105" fill="#8b949e" fontSize="11" fontFamily="monospace">main</text>

          {/* Branch A: Login UI */}
          <path d="M 120 120 C 160 120, 180 50, 220 50 L 460 50" stroke="#ff5533" strokeWidth="3" />
          <text x="230" y="38" fill="#ff7e61" fontSize="11" fontFamily="monospace" fontWeight="600">
            Parallel A: login-ui (Independent PR #101)
          </text>
          <circle cx="260" cy="50" r="7" fill="#ff5533" stroke="#fff" strokeWidth="1.5" />
          <circle cx="370" cy="50" r="7" fill="#ff5533" stroke="#fff" strokeWidth="1.5" />

          {/* Branch B: Validation */}
          <path d="M 120 120 C 160 120, 180 190, 220 190 L 460 190" stroke="#22B2B1" strokeWidth="3" />
          <text x="230" y="212" fill="#22B2B1" fontSize="11" fontFamily="monospace" fontWeight="600">
            Parallel B: fix-validation (Independent PR #102)
          </text>
          <circle cx="280" cy="190" r="7" fill="#22B2B1" stroke="#fff" strokeWidth="1.5" />
          <circle cx="390" cy="190" r="7" fill="#22B2B1" stroke="#fff" strokeWidth="1.5" />

          {/* Base commits */}
          <circle cx="60" cy="120" r="6" fill="#58a6ff" />
          <circle cx="120" cy="120" r="6" fill="#58a6ff" />

          {/* Independence badge */}
          <rect x="270" y="102" width="180" height="34" rx="6" fill="#161b22" stroke="#30363d" />
          <text x="360" y="124" fill="#8b949e" fontSize="11" textAnchor="middle" fontFamily="sans-serif">
            Merge độc lập, không phụ thuộc
          </text>
        </svg>
      ) : (
        <svg viewBox="0 0 540 240" className="w-full max-h-[220px]" fill="none">
          {/* Mainline */}
          <line x1="30" y1="180" x2="510" y2="180" stroke="#30363d" strokeWidth="3" />
          <text x="30" y="165" fill="#8b949e" fontSize="11" fontFamily="monospace">main (Target)</text>

          {/* Stack 1: DB Migration (Base PR) */}
          <path d="M 100 180 C 130 180, 150 120, 180 120 L 320 120" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="210" cy="120" r="7" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
          <text x="220" y="105" fill="#3b82f6" fontSize="11" fontFamily="monospace" fontWeight="600">
            Stack 1: db-migration (PR #201 ➔ main)
          </text>

          {/* Stack 2: API Endpoints (Depends on Stack 1) */}
          <path d="M 280 120 C 310 120, 330 60, 360 60 L 500 60" stroke="#ff5533" strokeWidth="3" />
          <circle cx="400" cy="60" r="7" fill="#ff5533" stroke="#fff" strokeWidth="1.5" />
          <text x="360" y="45" fill="#ff7e61" fontSize="11" fontFamily="monospace" fontWeight="600">
            Stack 2: api-endpoints (PR #202 ➔ PR #201)
          </text>

          {/* Dependency arrow */}
          <path d="M 390 75 L 300 115" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
          <text x="375" y="100" fill="#f59e0b" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            Phụ thuộc (Stacked)
          </text>

          <circle cx="60" cy="180" r="6" fill="#58a6ff" />
          <circle cx="100" cy="180" r="6" fill="#58a6ff" />

          {/* Auto Rebase badge */}
          <rect x="180" y="200" width="280" height="30" rx="6" fill="#161b22" stroke="#30363d" />
          <text x="320" y="220" fill="#e6edf3" fontSize="11" textAnchor="middle" fontFamily="sans-serif">
            GitButler tự động rebase cascading khi tầng dưới đổi
          </text>
        </svg>
      )}
    </div>
  );
};
