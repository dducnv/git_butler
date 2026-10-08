import React from 'react';

const mono = 'JetBrains Mono, monospace';

interface DiagramProps {
  active: boolean;
}

/** Two independent branches, both based on main. */
export const ParallelDiagram: React.FC<DiagramProps> = ({ active }) => (
  <svg viewBox="0 0 640 200" className="w-full transition-opacity duration-300" style={{ opacity: active ? 1 : 0.45 }} fill="none">
    <line x1="20" y1="170" x2="620" y2="170" stroke="#3a3b40" strokeWidth="3" />
    <circle cx="60" cy="170" r="7" fill="#6e6e73" />
    <circle cx="130" cy="170" r="7" fill="#6e6e73" />
    <text x="20" y="196" fill="#6e6e73" fontSize="15" fontFamily={mono}>main</text>

    <path d="M 130 170 C 190 170, 190 40, 250 40 L 600 40" stroke="#ff5533" strokeWidth="3" />
    <circle cx="330" cy="40" r="7" fill="#ff5533" />
    <circle cx="450" cy="40" r="7" fill="#ff5533" />
    <text x="600" y="26" textAnchor="end" fill="#ff7a5c" fontSize="15" fontFamily={mono}>login-ui → main</text>

    <path d="M 130 170 C 190 170, 190 105, 250 105 L 600 105" stroke="#ff7a5c" strokeWidth="3" strokeOpacity="0.7" />
    <circle cx="390" cy="105" r="7" fill="#ff7a5c" />
    <text x="600" y="91" textAnchor="end" fill="#ff7a5c" fontSize="15" fontFamily={mono}>api-fix → main</text>
  </svg>
);

/** Three dependent branches; each PR targets the branch below it. */
export const StackedDiagram: React.FC<DiagramProps> = ({ active }) => (
  <svg viewBox="0 0 640 200" className="w-full transition-opacity duration-300" style={{ opacity: active ? 1 : 0.45 }} fill="none">
    <line x1="20" y1="170" x2="620" y2="170" stroke="#3a3b40" strokeWidth="3" />
    <circle cx="60" cy="170" r="7" fill="#6e6e73" />
    <text x="20" y="196" fill="#6e6e73" fontSize="15" fontFamily={mono}>main</text>

    <path d="M 60 170 C 110 170, 110 125, 160 125 L 260 125" stroke="#a78bfa" strokeWidth="3" />
    <circle cx="220" cy="125" r="7" fill="#a78bfa" />
    <text x="160" y="152" fill="#a78bfa" fontSize="15" fontFamily={mono}>db → main</text>

    <path d="M 260 125 C 310 125, 310 80, 360 80 L 450 80" stroke="#a78bfa" strokeWidth="3" />
    <circle cx="410" cy="80" r="7" fill="#a78bfa" />
    <text x="360" y="107" fill="#a78bfa" fontSize="15" fontFamily={mono}>api → db</text>

    <path d="M 450 80 C 500 80, 500 35, 550 35 L 620 35" stroke="#a78bfa" strokeWidth="3" />
    <circle cx="590" cy="35" r="7" fill="#a78bfa" />
    <text x="620" y="20" textAnchor="end" fill="#a78bfa" fontSize="15" fontFamily={mono}>ui → api</text>
  </svg>
);
