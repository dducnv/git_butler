/**
 * One scenario reused by every slide so the story stays consistent.
 * Based on the Flutter project abc-app: a new leaderboard UI is in progress
 * when a question-image bug on dev must be hotfixed before the app build.
 */
export const BASE_BRANCH = 'dev';

export const FEATURE = {
  name: 'feat/leaderboard_v2',
  color: '#ff5533',
};

export const FIX = {
  name: 'fix/question_image',
  color: '#2ec4b6',
  file: 'lib/components/question/image_widget.dart',
  commit: 'fix(image): ảnh câu hỏi dạng link',
  pr: '#1316',
};

export const FEATURE_FILES = [
  { id: 'screen', file: 'leaderboard_screen.dart', diff: '+214 −38' },
  { id: 'podium', file: 'podium_position.dart', diff: '+96' },
  { id: 'painter', file: 'board_border_painter.dart', diff: '+57 −12' },
];

export const FIX_FILE = { id: 'image', file: 'image_widget.dart', diff: '+1 −1' };

export const FIX_DIFF = {
  removed: "src: '$gcs/$name'",
  added: "src: name.isUrl ? name : '$gcs/$name'",
};
