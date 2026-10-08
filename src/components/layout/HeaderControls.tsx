import React from 'react';
import { Maximize2, Minimize2, StickyNote, HelpCircle } from 'lucide-react';
import { SLIDES_METADATA } from '../../data/slidesData';

interface HeaderControlsProps {
  currentSlideIndex: number;
  totalSlides: number;
  onSelectSlide: (index: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onToggleNotes: () => void;
  onToggleHelp: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  currentSlideIndex,
  onSelectSlide,
  isFullscreen,
  onToggleFullscreen,
  onToggleNotes,
  onToggleHelp,
}) => {
  return (
    <header className="screen-only absolute top-6 left-12 right-12 flex items-center justify-between text-xs font-mono select-none z-30 pointer-events-auto">
      {/* Left: Clean Brand & Slide Jumper */}
      <div className="flex items-center gap-4">
        <span className="text-[15px] font-bold tracking-tight text-ink-primary">
          GitButler
        </span>

        <span className="text-canvas-border">/</span>

        <select
          value={currentSlideIndex}
          onChange={(e) => onSelectSlide(Number(e.target.value))}
          className="bg-canvas-surface/80 backdrop-blur border border-canvas-border text-ink-secondary hover:text-ink-primary rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-gitbutler-orange transition-colors cursor-pointer"
        >
          {SLIDES_METADATA.map((s, idx) => (
            <option key={s.id} value={idx}>
              {s.number}. {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Right: Notes, Help, Fullscreen (No Timers) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleNotes}
          title="Presenter Notes (Phím N hoặc P)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-surface/80 backdrop-blur hover:bg-canvas-subtle border border-canvas-border text-ink-secondary hover:text-ink-primary transition-colors"
        >
          <StickyNote size={13} className="text-gitbutler-coral" />
          <span>Notes</span>
          <kbd className="text-[10px] bg-canvas-dark px-1 rounded text-ink-muted border border-canvas-border">N</kbd>
        </button>

        <button
          onClick={onToggleHelp}
          title="Phím tắt điều hướng (Phím ?)"
          className="p-1.5 rounded-lg bg-canvas-surface/80 backdrop-blur hover:bg-canvas-subtle border border-canvas-border text-ink-secondary hover:text-ink-primary transition-colors"
        >
          <HelpCircle size={14} />
        </button>

        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Thoát toàn màn hình (Phím F)' : 'Bật toàn màn hình (Phím F)'}
          className="p-1.5 rounded-lg bg-canvas-surface/80 backdrop-blur hover:bg-canvas-subtle border border-canvas-border text-ink-secondary hover:text-ink-primary transition-colors"
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </header>
  );
};
