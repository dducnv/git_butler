import { useEffect } from 'react';

interface KeyboardHandlers {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  total: number;
  toggleNotes: () => void;
  toggleHelp: () => void;
  toggleFullscreen: () => void;
  closeOverlays: () => void;
}

/** Global presentation shortcuts. Ignored while typing in form fields. */
export function useKeyboardNavigation(h: KeyboardHandlers) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key;
      if (key === 'ArrowRight' || key === ' ' || key === 'PageDown') {
        e.preventDefault();
        h.next();
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        e.preventDefault();
        h.prev();
      } else if (key === 'Home') {
        h.goTo(0);
      } else if (key === 'End') {
        h.goTo(h.total - 1);
      } else if (/^[0-9]$/.test(key) && Number(key) < h.total) {
        // Slide numbers start at 00, so the digit is the slide index.
        h.goTo(Number(key));
      } else if (key === 'n' || key === 'N' || key === 'p' || key === 'P') {
        h.toggleNotes();
      } else if (key === 'f' || key === 'F') {
        h.toggleFullscreen();
      } else if (key === '?') {
        h.toggleHelp();
      } else if (key === 'Escape') {
        h.closeOverlays();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [h]);
}
