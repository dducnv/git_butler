import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SLIDES_METADATA } from './data/slidesData';
import { SlideProps } from './types/presentation';
import { useStageScale } from './hooks/useStageScale';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

// Slide components (order defines the deck; must match SLIDES_METADATA)
import { AgendaSlide } from './components/slides/AgendaSlide';
import { HeroSlide } from './components/slides/HeroSlide';
import { OriginSlide } from './components/slides/OriginSlide';
import { HotfixSlide } from './components/slides/HotfixSlide';
import { StackedSlide } from './components/slides/StackedSlide';
import { HistoryEditSlide } from './components/slides/HistoryEditSlide';
import { SafetySlide } from './components/slides/SafetySlide';
import { AgentsSlide } from './components/slides/AgentsSlide';
import { LiveDemoSlide } from './components/slides/LiveDemoSlide';
import { CompareSlide } from './components/slides/CompareSlide';
import { ClosingSlide } from './components/slides/ClosingSlide';

// Layout & Modals
import { HeaderControls } from './components/layout/HeaderControls';
import { FooterProgress } from './components/layout/FooterProgress';
import { PresenterNotesModal } from './components/layout/PresenterNotesModal';
import { KeyboardShortcutsModal } from './components/layout/KeyboardShortcutsModal';

const SLIDE_COMPONENTS: React.FC<SlideProps>[] = [
  AgendaSlide,
  HeroSlide,
  OriginSlide,
  HotfixSlide,
  StackedSlide,
  HistoryEditSlide,
  SafetySlide,
  AgentsSlide,
  LiveDemoSlide,
  CompareSlide,
  ClosingSlide,
];

export function App() {
  // Slide numbers start at 00, so ?slide=N maps directly to index N.
  const [pos, setPos] = useState(() => {
    const n = Number(new URLSearchParams(window.location.search).get('slide'));
    const index = Number.isInteger(n) && n >= 0 && n < SLIDES_METADATA.length ? n : 0;
    return { index, step: 0 };
  });
  const currentSlideIndex = pos.index;

  const [direction, setDirection] = useState<1 | -1>(1);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scale = useStageScale();

  // Navigation handlers: build steps within a slide come before moving to the next slide.
  const goToNext = useCallback(() => {
    setPos((p) => {
      if (p.step < (SLIDES_METADATA[p.index].steps ?? 0)) return { ...p, step: p.step + 1 };
      if (p.index < SLIDES_METADATA.length - 1) {
        setDirection(1);
        return { index: p.index + 1, step: 0 };
      }
      return p;
    });
  }, []);

  const goToPrev = useCallback(() => {
    setPos((p) => {
      if (p.step > 0) return { ...p, step: p.step - 1 };
      if (p.index > 0) {
        setDirection(-1);
        // Going back lands on the previous slide fully built.
        return { index: p.index - 1, step: SLIDES_METADATA[p.index - 1].steps ?? 0 };
      }
      return p;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < SLIDES_METADATA.length) {
      setDirection(index > currentSlideIndex ? 1 : -1);
      setPos({ index, step: 0 });
    }
  }, [currentSlideIndex]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useKeyboardNavigation({
    next: goToNext,
    prev: goToPrev,
    goTo: goToSlide,
    total: SLIDES_METADATA.length,
    toggleNotes: () => setIsNotesOpen((v) => !v),
    toggleHelp: () => setIsHelpOpen((v) => !v),
    toggleFullscreen,
    closeOverlays: () => {
      setIsNotesOpen(false);
      setIsHelpOpen(false);
    },
  });

  const CurrentSlideComponent = SLIDE_COMPONENTS[currentSlideIndex];
  const currentSlideData = SLIDES_METADATA[currentSlideIndex];
  const nextSlideData = SLIDES_METADATA[currentSlideIndex + 1];

  return (
    <div className="relative w-screen h-screen bg-[#0e0f11] overflow-hidden select-none">
      {/* Print / PDF view */}
      <div className="hidden print:block">
        {SLIDE_COMPONENTS.map((SlideComp, idx) => (
          <div key={idx} className="print-slide">
            <SlideComp step={SLIDES_METADATA[idx].steps ?? 0} onNext={() => {}} />
          </div>
        ))}
      </div>

      {/* Screen Presentation Stage (Scaled 1920x1080) */}
      <div
        className="stage shadow-2xl screen-only"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <HeaderControls
          currentSlideIndex={currentSlideIndex}
          totalSlides={SLIDES_METADATA.length}
          onSelectSlide={goToSlide}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          onToggleNotes={() => setIsNotesOpen(true)}
          onToggleHelp={() => setIsHelpOpen(true)}
        />

        <main className="w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlideIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <CurrentSlideComponent step={pos.step} onNext={goToNext} />
            </motion.div>
          </AnimatePresence>
        </main>

        <FooterProgress
          currentSlideIndex={currentSlideIndex}
          totalSlides={SLIDES_METADATA.length}
          atStart={pos.index === 0 && pos.step === 0}
          onPrev={goToPrev}
          onNext={goToNext}
          onSelectSlide={goToSlide}
        />
      </div>

      {/* Presenter Notes Modal */}
      <PresenterNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        slide={currentSlideData}
        nextSlide={nextSlideData}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}

export default App;
