
export interface SlideData {
  id: number;
  number: string; // '00', '01', etc.; equals the slide's index in the deck
  title: string;
  subtitle: string;
  targetDurationSec: number; // Duration in seconds
  steps?: number; // Build steps revealed one by one before advancing to the next slide
  speakerNotes: {
    durationNote: string;
    scriptVi: string;
    keyPoints: string[];
    transitionVi: string;
  };
}

/** Props every slide component receives. Slides without build steps ignore them. */
export interface SlideProps {
  step: number;
  onNext: () => void;
}
