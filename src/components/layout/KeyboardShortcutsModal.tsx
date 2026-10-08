import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '→ / Space / PageDown', desc: 'Chuyển sang slide tiếp theo' },
    { key: '← / PageUp', desc: 'Quay lại slide trước đó' },
    { key: 'Home / End', desc: 'Về slide đầu tiên / Đến slide cuối cùng' },
    { key: '1 - 8', desc: 'Nhảy trực tiếp đến Slide tương ứng' },
    { key: 'N / P', desc: 'Bật / Tắt Presenter Notes (Lời thoại người thuyết trình)' },
    { key: 'F', desc: 'Bật / Tắt chế độ toàn màn hình (Fullscreen Presentation)' },
    { key: '?', desc: 'Mở bảng phím tắt này' },
    { key: 'Esc', desc: 'Đóng cửa sổ phụ hoặc thoát toàn màn hình' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-canvas-surface border border-canvas-border rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-5 py-4 bg-[#10141a] border-b border-canvas-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-ink-primary font-bold font-sans">
            <Keyboard size={18} className="text-gitbutler-orange" />
            <span>Phím Tắt Điều Khiển Presentation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-ink-muted hover:text-ink-primary hover:bg-canvas-subtle"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-2.5 font-mono text-xs">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded bg-canvas-dark border border-canvas-border/80"
            >
              <kbd className="px-2 py-0.5 rounded bg-canvas-subtle text-gitbutler-coral font-bold border border-canvas-border shadow-xs">
                {sc.key}
              </kbd>
              <span className="text-ink-secondary text-right font-sans text-xs">{sc.desc}</span>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 bg-[#10141a] border-t border-canvas-border flex items-center justify-between text-xs font-mono text-ink-muted">
          <span>Tương thích mọi thiết bị trình chiếu / remote clicker</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-canvas-subtle hover:bg-canvas-border text-ink-primary font-medium"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
