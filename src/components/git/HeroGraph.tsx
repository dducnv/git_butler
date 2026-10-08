import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

/** Slide 1: target branch with two parallel branches drawn in sequence. */
export const HeroGraph: React.FC = () => (
  <svg viewBox="0 0 1100 250" className="w-full" fill="none" aria-label="Hai branch song song tách ra từ main">
    {/* main */}
    <line x1="40" y1="125" x2="1060" y2="125" stroke="#3a3b40" strokeWidth="4" strokeLinecap="round" />
    {[120, 260, 380].map((x) => (
      <circle key={x} cx={x} cy="125" r="9" fill="#0e0f11" stroke="#6e6e73" strokeWidth="4" />
    ))}
    <text x="1060" y="160" textAnchor="end" fill="#6e6e73" fontSize="20" fontFamily="JetBrains Mono, monospace">main</text>

    {/* feature/login-ui */}
    <motion.path
      d="M 260 125 C 330 125, 330 35, 410 35 L 1000 35"
      stroke="#ff5533" strokeWidth="4" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease }}
    />
    {[540, 720, 900].map((x, i) => (
      <motion.circle key={x} cx={x} cy="35" r="9" fill="#ff5533"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.8 + i * 0.2, duration: 0.3 }} />
    ))}
    <motion.text x="1000" y="20" textAnchor="end" fill="#ff7a5c" fontSize="20" fontFamily="JetBrains Mono, monospace"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
      feature/login-ui
    </motion.text>

    {/* fix/flutter-validation */}
    <motion.path
      d="M 380 125 C 450 125, 450 215, 530 215 L 1000 215"
      stroke="#2ec4b6" strokeWidth="4" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease }}
    />
    {[660, 860].map((x, i) => (
      <motion.circle key={x} cx={x} cy="215" r="9" fill="#2ec4b6"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.2 + i * 0.2, duration: 0.3 }} />
    ))}
    <motion.text x="1000" y="246" textAnchor="end" fill="#2ec4b6" fontSize="20" fontFamily="JetBrains Mono, monospace"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
      fix/flutter-validation
    </motion.text>
  </svg>
);
