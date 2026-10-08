import React from 'react';
import { X, MessageSquare, ListChecks, ArrowRight, Lightbulb } from 'lucide-react';
import { SlideData } from '../../types/presentation';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  slide: SlideData;
  nextSlide?: SlideData;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  slide,
  nextSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6">
      <div className="bg-canvas-surface border border-canvas-border rounded-[24px] w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-canvas-dark border-b border-canvas-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-gitbutler-orange/20 text-gitbutler-coral font-mono font-bold flex items-center justify-center text-xs">
              {slide.number}
            </span>
            <h3 className="text-base font-bold text-ink-primary font-sans">
              Presenter Notes: {slide.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-ink-muted hover:text-ink-primary hover:bg-canvas-subtle transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Speaking Script */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-gitbutler-orange tracking-wider">
              <MessageSquare size={14} />
              Nội dung gợi ý trình bày
            </div>
            <div className="p-4 rounded-xl bg-canvas-dark border border-canvas-border text-ink-primary leading-relaxed whitespace-pre-line font-sans text-[15px]">
              {slide.speakerNotes.scriptVi}
            </div>
          </div>

          {/* Key talking points */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-gitbutler-teal tracking-wider">
              <ListChecks size={14} />
              Ý chính cần truyền tải
            </div>
            <ul className="space-y-2 p-4 rounded-xl bg-canvas-dark border border-canvas-border text-sm text-ink-secondary">
              {slide.speakerNotes.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-gitbutler-teal font-bold shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Transition Sentence */}
          <div className="p-4 rounded-xl border border-gitbutler-orange/30 bg-gitbutler-orange/5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gitbutler-coral">
              <Lightbulb size={14} />
              Ý chuyển tiếp
            </div>
            <p className="text-sm text-ink-primary italic">
              "{slide.speakerNotes.transitionVi}"
            </p>
          </div>

          {/* Next Slide Preview */}
          {nextSlide && (
            <div className="pt-2 border-t border-canvas-border flex items-center justify-between text-xs font-mono text-ink-muted">
              <span>Slide tiếp theo:</span>
              <span className="text-ink-primary font-medium flex items-center gap-1.5">
                {nextSlide.number}. {nextSlide.title}
                <ArrowRight size={13} className="text-gitbutler-orange" />
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-canvas-dark border-t border-canvas-border flex items-center justify-between text-xs font-mono text-ink-muted">
          <span>Phím tắt: <kbd className="bg-canvas-subtle px-1.5 py-0.5 rounded text-ink-primary border border-canvas-border">N</kbd> hoặc <kbd className="bg-canvas-subtle px-1.5 py-0.5 rounded text-ink-primary border border-canvas-border">Esc</kbd></span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-canvas-subtle hover:bg-canvas-border text-ink-primary font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
