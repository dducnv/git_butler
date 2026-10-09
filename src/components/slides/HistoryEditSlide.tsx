import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { HistoryEditDemo } from '../demo/HistoryEditDemo';

export const HistoryEditSlide: React.FC = () => {
  return (
    <SlideFrame eyebrow="Chỉnh sửa lịch sử commit" title="Sửa, gộp, chuyển commit bằng kéo thả">
      <HistoryEditDemo />
    </SlideFrame>
  );
};
