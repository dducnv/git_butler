import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SLIDES_METADATA } from '../../data/slidesData';

interface FooterProgressProps {
  currentSlideIndex: number;
  totalSlides: number;
  atStart: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
}

export const FooterProgress: React.FC<FooterProgressProps> = ({
  currentSlideIndex,
  totalSlides,
  atStart,
  onPrev,
  onNext,
  onSelectSlide,
}) => {
  const currentSlide = SLIDES_METADATA[currentSlideIndex];

  return (
    <footer className="screen-only absolute bottom-6 left-12 right-12 flex items-center justify-between text-xs font-mono select-none z-30 pointer-events-auto">
      {/* Left: Slide indicator */}
      <div className="font-medium text-ink-muted">
        <span className="text-ink-primary font-bold">{currentSlide.number}</span> / {SLIDES_METADATA[totalSlides - 1].number}
      </div>

      {/* Middle: 8 minimal dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentSlideIndex;
          const isPassed = idx < currentSlideIndex;

          return (
            <button
              key={idx}
              onClick={() => onSelectSlide(idx)}
              title={`Slide ${idx + 1}: ${SLIDES_METADATA[idx]?.title}`}
              className={`h-1.5 rounded-full transition-all ${
                isActive
                  ? 'w-8 bg-gitbutler-orange'
                  : isPassed
                  ? 'w-3 bg-ink-muted/50 hover:bg-ink-secondary'
                  : 'w-2 bg-canvas-border hover:bg-ink-muted'
              }`}
            />
          );
        })}
      </div>

      {/* Right: Prev / Next */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={atStart}
          className="p-1.5 rounded-lg bg-canvas-surface/80 backdrop-blur hover:bg-canvas-subtle border border-canvas-border text-ink-secondary hover:text-ink-primary disabled:opacity-20 disabled:pointer-events-none transition-colors"
          title="Slide trước (←)"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={onNext}
          disabled={currentSlideIndex === totalSlides - 1}
          className="p-1.5 rounded-lg bg-canvas-surface/80 backdrop-blur hover:bg-canvas-subtle border border-canvas-border text-ink-secondary hover:text-ink-primary disabled:opacity-20 disabled:pointer-events-none transition-colors"
          title="Slide sau (→ hoặc Space)"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </footer>
  );
};
