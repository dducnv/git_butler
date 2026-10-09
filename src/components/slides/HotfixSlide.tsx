import React from 'react';
import { SlideFrame } from '../layout/SlideFrame';
import { HotfixCompare } from '../demo/HotfixCompare';
import { BASE_BRANCH, FEATURE, FIX_FILE } from '../../data/demoScenario';

export const HotfixSlide: React.FC = () => {
  return (
    <SlideFrame
      eyebrow="Tình huống thực tế · abc-app"
      title="Sửa lỗi gấp khi đang làm tính năng"
      subtitle={`Đang làm ${FEATURE.name}; bản ${BASE_BRANCH} cần sửa ${FIX_FILE.file} trước khi build.`}
    >
      <HotfixCompare />
    </SlideFrame>
  );
};
