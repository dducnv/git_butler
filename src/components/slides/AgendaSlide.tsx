import React from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { SlideProps } from '../../types/presentation';

export const AGENDA = [
  { title: 'Vì sao GitButler ra đời', detail: 'Giả định của Git và cách làm việc hiện nay', slides: '02' },
  {
    title: 'Lợi ích so với Git',
    detail: 'Sửa lỗi gấp · Stacked PR · Sửa lịch sử commit · Conflict và hoàn tác · AI agent',
    slides: '03 – 07',
  },
  { title: 'Demo trên ứng dụng thật', detail: 'GitButler Desktop với project abc-app', slides: '08' },
  { title: 'Đánh giá', detail: 'So sánh tổng hợp · Phạm vi áp dụng · Thảo luận', slides: '09 – 10' },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Slide 00: agenda. Starts with the title only; each step (click, →, Space) reveals one item. */
export const AgendaSlide: React.FC<SlideProps> = ({ step, onNext }) => {
  return (
    <section onClick={onNext} className="w-full h-full flex flex-col justify-center px-[140px] cursor-pointer">
      <LayoutGroup>
        <motion.div layout transition={{ duration: 0.5, ease }}>
          <p className="text-[24px] font-semibold text-gitbutler-orange mb-4">GitButler · Tech Sharing</p>
          <h2 className="text-[96px] font-semibold tracking-[-0.035em] leading-[1.05] text-ink-primary">Nội dung trình bày</h2>
        </motion.div>

        <motion.ol layout className="mt-14 space-y-5" transition={{ duration: 0.5, ease }}>
          <AnimatePresence initial={false}>
            {AGENDA.slice(0, step).map((item, i) => (
              <motion.li
                key={item.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-8 rounded-[24px] bg-canvas-surface border border-canvas-border px-9 py-6"
              >
                <span className="font-mono text-[44px] font-semibold text-gitbutler-orange w-[72px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="text-[34px] font-semibold text-ink-primary">{item.title}</div>
                  <div className="mt-1 text-[22px] text-ink-secondary">{item.detail}</div>
                </div>
                <span className="font-mono text-[18px] text-ink-muted">slide {item.slides}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ol>
      </LayoutGroup>
    </section>
  );
};
