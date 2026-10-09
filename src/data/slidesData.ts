import { SlideData } from '../types/presentation';

export const SLIDES_METADATA: SlideData[] = [
  {
    id: 0,
    number: '00',
    title: 'Nội dung trình bày',
    subtitle: 'Bốn phần: bối cảnh, lợi ích so với Git, demo, đánh giá',
    targetDurationSec: 30,
    steps: 4,
    speakerNotes: {
      durationNote: '30 giây',
      scriptVi: `Ban đầu slide chỉ có tiêu đề. Mỗi lần nhấn (click, mũi tên phải hoặc Space) hiện thêm một mục:

1. Vì sao GitButler ra đời: giả định của Git và cách làm việc hiện nay.
2. Lợi ích so với Git: năm tình huống, mỗi tình huống một slide so sánh trực tiếp.
3. Demo trên ứng dụng thật: GitButler Desktop với project abc-app.
4. Đánh giá: so sánh tổng hợp, phạm vi áp dụng và thảo luận.

Sau khi hiện đủ bốn mục, nhấn thêm một lần để sang slide tiêu đề.`,
      keyPoints: ['Bối cảnh', 'Lợi ích so với Git', 'Demo trên ứng dụng thật', 'Đánh giá và thảo luận'],
      transitionVi: 'Bắt đầu với GitButler.',
    },
  },
  {
    id: 1,
    number: '01',
    title: 'GitButler: Quản lý nhiều nhánh song song trong một thư mục làm việc',
    subtitle: 'Tách bản sửa lỗi khỏi nhánh tính năng và tạo Pull Request riêng, không cần chuyển nhánh',
    targetDurationSec: 40,
    speakerNotes: {
      durationNote: '40 giây',
      scriptVi: `Nội dung gồm ba phần: lý do GitButler ra đời; các lợi ích chính so với Git, minh hoạ trên project abc-app; demo trên ứng dụng thật và đánh giá phạm vi áp dụng.`,
      keyPoints: [
        'Ví dụ xuyên suốt: project Flutter abc-app.',
        'Cấu trúc: bối cảnh, lợi ích so với Git, demo, đánh giá.',
      ],
      transitionVi: 'Trước hết là lý do GitButler ra đời.',
    },
  },
  {
    id: 2,
    number: '02',
    title: 'Vì sao GitButler ra đời',
    subtitle: 'Giả định của Git năm 2005 so với cách làm việc hiện nay',
    targetDurationSec: 90,
    speakerNotes: {
      durationNote: '90 giây',
      scriptVi: `Git ra đời năm 2005 cho dự án Linux kernel. Dữ liệu của Git (commit, cây thư mục, lịch sử) được thiết kế rất tốt và vẫn là nền tảng hiện nay. Tuy nhiên, cách làm việc mà Git giả định đã khác nhiều so với thực tế:

1. Một thư mục làm việc tương ứng một nhánh, trong khi hiện nay một người thường làm nhiều việc song song.
2. Git yêu cầu chọn nhánh trước khi viết code; thực tế thường viết code trước rồi mới rõ thay đổi thuộc việc nào.
3. Lịch sử commit được coi là ít khi sửa; hiện nay việc chỉnh, gộp, tách commit trước khi review là bình thường.
4. Một người sửa code trong một repository; hiện nay có thêm AI agent cùng sửa code.

GitButler do Scott Chacon, đồng sáng lập GitHub và tác giả Pro Git, đồng sáng lập. Công cụ giữ nguyên dữ liệu Git và thay đổi lớp làm việc phía trên. Ý tưởng cốt lõi: một thư mục làm việc, nhiều nhánh cùng được apply; mỗi thay đổi được gán vào một nhánh sau khi viết, và mỗi nhánh tạo commit Git chuẩn của riêng nó. Các công cụ cùng hướng: Sapling của Meta, Jujutsu, Graphite.`,
      keyPoints: [
        'Dữ liệu Git giữ nguyên; thay đổi nằm ở cách làm việc.',
        'Bốn giả định cũ: một nhánh, chọn nhánh trước, ít sửa lịch sử, một người viết code.',
        'Ý tưởng cốt lõi: một thư mục, nhiều nhánh được apply.',
        'Xu hướng chung: Sapling, Jujutsu, Graphite.',
      ],
      transitionVi: 'Lợi ích đầu tiên, minh hoạ bằng một tình huống thường gặp trên abc-app.',
    },
  },
  {
    id: 3,
    number: '03',
    title: 'Sửa lỗi gấp khi đang làm tính năng',
    subtitle: 'Git và GitButler trên cùng tình huống abc-app',
    targetDurationSec: 120,
    speakerNotes: {
      durationNote: '2 phút',
      scriptVi: `Tình huống: đang làm feat/leaderboard_v2 (giao diện bảng xếp hạng mới, nhiều thay đổi chưa commit). Bản dev cần build 4.9.0 nhưng ảnh câu hỏi dạng link không hiển thị. Lỗi được sửa một dòng trong image_widget.dart ngay trên nhánh hiện tại. Yêu cầu: đưa riêng bản sửa lỗi vào dev qua Pull Request.

Bên trái, Git: stash toàn bộ thay đổi, chuyển sang dev, tạo nhánh fix/question_image, lấy riêng file từ stash, commit, push, tạo PR, quay lại nhánh tính năng và stash pop. Tổng cộng 9 lệnh, chuyển nhánh 2 lần, có rủi ro nhầm stash và conflict khi stash pop.

Bên phải, GitButler: tạo nhánh fix/question_image, kéo image_widget.dart sang, commit, tạo PR. 4 thao tác, không chuyển nhánh; code tính năng vẫn nằm nguyên trong editor.

Nếu bản sửa lỗi nằm chung file với code tính năng: Git cần git add -p để chọn từng hunk; GitButler kéo riêng từng hunk. Phần này sẽ thao tác trực tiếp trong phần demo.`,
      keyPoints: [
        'Git: 9 lệnh, chuyển nhánh 2 lần, phải stash.',
        'GitButler: 4 thao tác, không chuyển nhánh.',
        'Chung file: git add -p so với kéo thả hunk.',
      ],
      transitionVi: 'Lợi ích tiếp theo dành cho tính năng lớn như chính giao diện bảng xếp hạng này.',
    },
  },
  {
    id: 4,
    number: '04',
    title: 'Chia Pull Request lớn thành chuỗi nhỏ',
    subtitle: 'Stacked branches: mỗi nhánh thêm một file trên nhánh trước; mỗi PR chỉ chứa file mới',
    targetDurationSec: 75,
    speakerNotes: {
      durationNote: '75 giây',
      scriptVi: `Giao diện bảng xếp hạng mới nếu gửi một lần là một Pull Request khoảng 1.240 dòng, khó review. Cách chia: ba nhánh xếp chồng, mỗi nhánh thêm một phần.

Bước 1, nhìn ba cột như bậc thang:
- Nhánh API có leaderboard_services.dart.
- Nhánh Provider có services (mờ, vì đã có từ nhánh dưới) và thêm leaderboard_provider.dart.
- Nhánh UI có cả hai file trên và thêm leaderboard_screen.dart.
Nhánh sau phải chứa code của nhánh trước vì provider gọi services, screen gọi provider. Mỗi PR chỉ so với nhánh ngay bên dưới, nên chỉ hiển thị file mới: reviewer đọc 180, 260 rồi 800 dòng, từng phần một. Ví dụ đời thường: gửi sếp tài liệu 3 chương, mỗi lần gửi bản đầy đủ nhưng ghi chú chỉ cần đọc chương mới.

Bước 2: reviewer góp ý PR API (đổi tên trường score thành points). Sửa xong, services trong nhánh API lên v2.

Bước 3, với Git: bản services nằm trong nhánh Provider và nhánh UI vẫn là v1 (viền vàng). Phải tự checkout và rebase từng nhánh, rồi force push.

Bước 4, với GitButler: hai bản đó tự chuyển sang v2 (viền xanh). Không cần lệnh.

Câu chốt: tách để PR dễ review và merge sớm từng phần; GitButler lo việc đồng bộ các nhánh phía trên.`,
      keyPoints: [
        'Nhánh sau chứa file của nhánh trước và thêm 1 file mới.',
        'Mỗi PR chỉ hiển thị file mới so với nhánh bên dưới.',
        'Git: sửa nhánh dưới phải tự rebase các nhánh trên.',
        'GitButler: các nhánh trên tự cập nhật.',
      ],
      transitionVi: 'Bên trong mỗi nhánh, lịch sử commit cũng chỉnh sửa được trực tiếp.',
    },
  },
  {
    id: 5,
    number: '05',
    title: 'Sửa, gộp, chuyển commit bằng kéo thả',
    subtitle: 'Chỉnh sửa lịch sử commit không cần git rebase -i',
    targetDurationSec: 75,
    speakerNotes: {
      durationNote: '75 giây',
      scriptVi: `Ba thao tác chỉnh sửa lịch sử thường gặp trước khi gửi review:

1. Amend vào commit cũ: một thay đổi nhỏ của podium_position.dart bị sót, cần đưa vào commit "feat: bục xếp hạng". Git: git commit --fixup và git rebase -i --autosquash. GitButler: kéo thay đổi vào commit.
2. Gộp commit: commit "sửa chính tả" nên gộp vào commit trước. Git: git rebase -i, đổi pick thành squash. GitButler: kéo commit này lên commit kia.
3. Chuyển commit sang nhánh khác: commit "fix(image): ảnh null" bị tạo nhầm trên nhánh tính năng. Git: git cherry-pick sang nhánh đúng và rebase -i để xoá ở nhánh cũ. GitButler: kéo commit sang nhánh fix/question_image.

Trên slide là prototype kéo thả: kéo file chưa commit vào commit, kéo commit lên commit khác, kéo commit sang nhánh khác. Cột bên phải tự đánh dấu khi hoàn thành từng thao tác.`,
      keyPoints: [
        'Amend, squash, move commit bằng kéo thả.',
        'Không cần git rebase -i hay cherry-pick.',
        'Thao tác trên CLI tương ứng: but amend, but squash, but move.',
      ],
      transitionVi: 'Chỉnh sửa lịch sử và cập nhật nhánh đều có thể gây conflict. Cách GitButler xử lý conflict khác với Git.',
    },
  },
  {
    id: 6,
    number: '06',
    title: 'Conflict và hoàn tác',
    subtitle: 'Git dừng giữa chừng và chỉ khôi phục commit; GitButler đánh dấu conflict và lưu snapshot',
    targetDurationSec: 90,
    speakerNotes: {
      durationNote: '90 giây',
      scriptVi: `Hàng trên, conflict khi cập nhật nhánh từ origin/dev:
Với Git, rebase dừng tại commit gây conflict; phải xử lý, git add, git rebase --continue trước khi làm việc khác.
Với GitButler, quá trình cập nhật luôn hoàn tất. Commit có conflict được đánh dấu "conflicted"; xử lý sau bằng Edit mode, các commit phía sau tự rebase lại. Cách tiếp cận này tương tự Jujutsu.

Hàng dưới, hoàn tác thao tác sai:
Với Git, git reflog chỉ ghi vị trí HEAD; khôi phục bằng git reset --hard làm mất thay đổi chưa commit.
Với GitButler, trước mỗi thao tác có một snapshot gồm trạng thái nhánh và thay đổi chưa commit. Khôi phục từ lịch sử thao tác, hoặc but undo trên CLI.`,
      keyPoints: [
        'Conflict: Git dừng rebase; GitButler hoàn tất và đánh dấu commit.',
        'Hoàn tác: reflog chỉ cho commit; GitButler có snapshot gồm thay đổi chưa commit.',
      ],
      transitionVi: 'Lợi ích cuối cùng, và là hướng GitButler đang tập trung phát triển: làm việc với AI agent.',
    },
  },
  {
    id: 7,
    number: '07',
    title: 'Nhiều AI agent trong một thư mục',
    subtitle: 'Mỗi phiên agent được gán vào một nhánh riêng',
    targetDurationSec: 75,
    speakerNotes: {
      durationNote: '75 giây',
      scriptVi: `Khi nhiều AI agent (ví dụ nhiều phiên Claude Code) cùng sửa code trong một repository, thay đổi của các phiên dễ bị trộn với nhau và với code của lập trình viên. Cách phổ biến hiện nay là tạo một git worktree cho mỗi agent.

GitButler tích hợp với Claude Code qua hooks. Mỗi lần agent sửa file và khi phiên kết thúc, Claude Code báo cho GitButler. GitButler gán thay đổi của phiên vào một nhánh riêng và tự tạo commit. Agents Tab trong GitButler cho phép chạy các phiên Claude Code gắn với từng nhánh.

Giới hạn: mỗi phiên gắn với một nhánh, nên một phiên tạo ra thay đổi thuộc nhiều việc khác nhau sẽ không tự tách được. Thay đổi của agent vẫn phải qua Pull Request, CI và code review.`,
      keyPoints: [
        'Nhiều phiên agent trong cùng thư mục, mỗi phiên một nhánh.',
        'Tích hợp qua hooks của Claude Code; Agents Tab trong GitButler.',
        'Giới hạn: một phiên, một nhánh. Vẫn qua review.',
      ],
      transitionVi: 'Tiếp theo là demo trên ứng dụng thật.',
    },
  },
  {
    id: 8,
    number: '08',
    title: 'Demo trên ứng dụng thật',
    subtitle: 'Thao tác trực tiếp trên GitButler Desktop với abc-app',
    targetDurationSec: 300,
    speakerNotes: {
      durationNote: '5 phút',
      scriptVi: `Chuẩn bị trước: bản sao abc-app; target branch là origin/dev; nhánh feat/leaderboard_v2 có thay đổi chưa commit ở leaderboard_screen.dart, podium_position.dart, board_border_painter.dart và image_widget.dart (gồm cả đoạn sửa lỗi ảnh câu hỏi).

1. Sửa lỗi gấp (khoảng 2 phút): tạo nhánh fix/question_image, kéo image_widget.dart sang, commit "fix(image): ảnh câu hỏi dạng link", push và tạo Pull Request vào dev. Nhấn mạnh: không có checkout hay stash, file giao diện mới vẫn mở trong editor.
2. Tách theo hunk (khoảng 1 phút): mở một file có cả code tính năng và đoạn sửa lỗi, kéo riêng hunk sửa lỗi sang nhánh fix.
3. Sửa lịch sử commit (khoảng 1 phút): kéo một commit lên commit khác để gộp; kéo một commit sang nhánh khác.
4. Hoàn tác (khoảng 1 phút): mở lịch sử thao tác, khôi phục trạng thái trước thao tác gộp commit.

Nếu ứng dụng thật gặp sự cố, quay lại slide 3 và slide 5 để minh hoạ bằng mô phỏng.`,
      keyPoints: [
        'Sửa lỗi gấp: tạo nhánh, kéo file, commit, PR.',
        'Tách hunk trong cùng file.',
        'Gộp và chuyển commit.',
        'Khôi phục từ lịch sử thao tác.',
      ],
      transitionVi: 'Sau phần demo, tổng hợp lại các khác biệt.',
    },
  },
  {
    id: 9,
    number: '09',
    title: 'So sánh tổng hợp',
    subtitle: 'Git và GitButler trên bảy tình huống',
    targetDurationSec: 60,
    speakerNotes: {
      durationNote: '60 giây',
      scriptVi: `Bảng tổng hợp bảy tình huống đã trình bày và demo. Điểm chung: các thao tác Git yêu cầu chuỗi lệnh hoặc chế độ tương tác (stash, rebase -i, add -p, cherry-pick), trong khi GitButler thực hiện bằng thao tác trực tiếp trên nhánh và commit.

Kết quả cuối cùng trên GitHub là như nhau: commit và Pull Request chuẩn.`,
      keyPoints: [
        'Bảy tình huống, cùng kết quả Git chuẩn.',
        'Khác biệt nằm ở số thao tác và rủi ro trong quá trình.',
      ],
      transitionVi: 'Phạm vi áp dụng và các lưu ý.',
    },
  },
  {
    id: 10,
    number: '10',
    title: 'Phạm vi áp dụng và thảo luận',
    subtitle: 'Khi nào nên dùng, các lưu ý và bước áp dụng thử',
    targetDurationSec: 90,
    speakerNotes: {
      durationNote: '90 giây',
      scriptVi: `GitButler phù hợp khi team thường xuyên làm nhiều việc song song, có Pull Request lớn và review chậm, thường chỉnh sửa commit trước khi review, hoặc dùng AI agent sửa code trong repository. Với quy trình tuyến tính, mỗi thời điểm một việc, Git là đủ.

Lưu ý:
1. Conflict vẫn xảy ra khi hai nhánh sửa cùng một dòng.
2. Các nhánh dùng chung một thư mục làm việc; khi cần chạy hai phiên bản ứng dụng song song, dùng git worktree.
3. Không chuyển nhánh bằng git checkout bên ngoài trong lúc GitButler quản lý workspace.
4. Cấu hình target branch origin/dev cho mỗi repository.

Đề xuất áp dụng thử trên bản sao abc-app, bắt đầu với tình huống sửa lỗi gấp. Mời đặt câu hỏi.`,
      keyPoints: [
        'Phù hợp: đa nhiệm, PR lớn, sửa lịch sử thường xuyên, AI agent.',
        'Lưu ý: conflict, thư mục dùng chung, không checkout bên ngoài.',
        'Áp dụng thử trên bản sao abc-app.',
      ],
      transitionVi: 'Phần hỏi đáp.',
    },
  },
];
