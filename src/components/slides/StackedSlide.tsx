import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { StackDemo } from '../demo/StackDemo';

export const StackedSlide: React.FC = () => {
  return (
    <SlideFrame eyebrow="Stacked branches" title="Chia Pull Request lớn thành chuỗi nhỏ">
      <StackDemo />
    </SlideFrame>
  );
};
