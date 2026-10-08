
export interface SlideData {
  id: number;
  number: string; // '01', '02', etc.
  title: string;
  subtitle: string;
  targetDurationSec: number; // Duration in seconds
  speakerNotes: {
    durationNote: string;
    scriptVi: string;
    keyPoints: string[];
    transitionVi: string;
  };
}

export interface SimulationHunk {
  id: string;
  file: string;
  lineRange: string;
  codeSnippet: string;
  desc: string;
  category: 'web-login' | 'flutter-validation' | 'shared';
  assignedLane: 'unstaged' | 'lane-login' | 'lane-validation';
}

export interface SimulationBranch {
  id: 'lane-login' | 'lane-validation';
  name: string;
  color: string;
  isApplied: boolean;
  commits: Array<{
    id: string;
    message: string;
    timestamp: string;
    hunkIds: string[];
  }>;
}
