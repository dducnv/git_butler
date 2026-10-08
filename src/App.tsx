import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SLIDES_METADATA } from './data/slidesData';
import { useStageScale } from './hooks/useStageScale';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

// Slide components
import { Slide1Hero } from './components/slides/Slide1Hero';
import { Slide2ContextSwitch } from './components/slides/Slide2ContextSwitch';
import { Slide3WhatMakesDifferent } from './components/slides/Slide3WhatMakesDifferent';
import { Slide4ParallelVsStacked } from './components/slides/Slide4ParallelVsStacked';
import { Slide5LiveDemo } from './components/slides/Slide5LiveDemo';
import { Slide6AIAgents } from './components/slides/Slide6AIAgents';
import { Slide7Tradeoffs } from './components/slides/Slide7Tradeoffs';
import { Slide8Takeaways } from './components/slides/Slide8Takeaways';

// Layout & Modals
import { HeaderControls } from './components/layout/HeaderControls';
import { FooterProgress } from './components/layout/FooterProgress';
import { PresenterNotesModal } from './components/layout/PresenterNotesModal';
import { KeyboardShortcutsModal } from './components/layout/KeyboardShortcutsModal';

const SLIDE_COMPONENTS = [
  Slide1Hero,
  Slide2ContextSwitch,
  Slide3WhatMakesDifferent,
  Slide4ParallelVsStacked,
  Slide5LiveDemo,
  Slide6AIAgents,
  Slide7Tradeoffs,
  Slide8Takeaways,
];

export function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    const n = Number(new URLSearchParams(window.location.search).get('slide'));
    return n >= 1 && n <= SLIDES_METADATA.length ? n - 1 : 0;
  });

  const [direction, setDirection] = useState<1 | -1>(1);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scale = useStageScale();

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev < SLIDES_METADATA.length - 1) {
        setDirection(1);
        return prev + 1;
      }
      return prev;
    });
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev > 0) {
        setDirection(-1);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < SLIDES_METADATA.length) {
      setDirection(index > currentSlideIndex ? 1 : -1);
      setCurrentSlideIndex(index);
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
            <SlideComp />
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
              <CurrentSlideComponent />
            </motion.div>
          </AnimatePresence>
        </main>

        <FooterProgress
          currentSlideIndex={currentSlideIndex}
          totalSlides={SLIDES_METADATA.length}
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
