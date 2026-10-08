import { SlideData } from '../types/presentation';

export const SLIDES_METADATA: SlideData[] = [
  {
    id: 1,
    number: '01',
    title: 'GitButler: Rethinking Git Workflow',
    subtitle: 'Mô hình làm việc đa nhánh song song (Parallel Virtual Branches) trong cùng một workspace',
    targetDurationSec: 45,
    speakerNotes: {
      durationNote: '45 giây',
      scriptVi: `Xin chào mọi người! Đã bao giờ các bạn đang code dở một tính năng UI phức tạp, bỗng dưng nhận được tin nhắn gấp: "Anh ơi, fix giúp em con bug hotfix trên API này ngay"? 

Và thế là quy trình quen thuộc diễn ra: git stash, git checkout hotfix, sửa lỗi, test, commit, push, rồi quay lại git checkout feature, git stash pop... để rồi nhận lại đống conflict hoặc mất đà tập trung (mental context). 

Hôm nay, mình muốn chia sẻ với team về GitButler — một công cụ tư duy lại cách chúng ta tương tác với Git, cho phép quản lý nhiều nhánh song song ngay trong cùng một thư mục làm việc mà không cần stash hay switch liên tục.`,
      keyPoints: [
        'Vấn đề phổ biến: context switching gây đứt gãy mạch tư duy của lập trình viên.',
        'Mục tiêu buổi chia sẻ: Giới thiệu tư duy Virtual Branches & Stacked Branches của GitButler.',
        'Thời lượng: 15 phút gồm lý thuyết cốt lõi, so sánh trực quan và live simulation.',
      ],
      transitionVi: 'Để hiểu tại sao GitButler ra đời, trước hết hãy cùng nhìn thẳng vào cái giá thực sự của việc "nhảy nhánh" trong Git truyền thống.',
    },
  },
  {
    id: 2,
    number: '02',
    title: 'The Context Switching Problem',
    subtitle: 'Nỗi đau khi xoay sở giữa Feature UI, API Bugfix và Data Validation trong Git truyền thống',
    targetDurationSec: 90,
    speakerNotes: {
      durationNote: '90 giây (1.5 phút)',
      scriptVi: `Hãy cùng nhìn vào một kịch bản rất đời thường trong team chúng ta: Bạn đang làm Login UI cho Web. Đột nhiên cần fix gấp một logic trong API client, đồng thời tiện tay sửa luôn một regex validation bên Flutter/Mobile.

Trong vanilla Git, tại một thời điểm HEAD chỉ trỏ vào duy nhất một commit trên một branch. Mỗi lần muốn chuyển việc, bạn phải git stash, nhớ lại stash@{0} là gì, hoặc tạo commit tạm 'WIP' rồi checkout nhánh khác.

Điều này gây ra 3 vấn đề lớn:
Thứ nhất, mất đà tư duy: mỗi lần quay lại ta phải tự hỏi "mình đang code đến đâu", "stash nào của task nào".
Thứ hai, nguy cơ stash collision hoặc quên commit rác khiến lịch sử git lộn xộn.
Thứ ba, vanilla Git buộc bạn phải phân loại công việc TRƯỚC KHI viết code. Nhưng thực tế sáng tạo của lập trình viên là: chúng ta thường phát hiện ra bug hoặc nảy ra ý tưởng cải tiến trong lúc đang code dở tính năng khác.

Cần làm rõ: Git không hề hỏng. Git được thiết kế từ năm 2005 cho mô hình Linux kernel với snapshot tuyến tính rất xuất sắc. Nhưng công cụ tương tác ở tầng workflow của chúng ta có thể được nâng cấp thông minh hơn.`,
      keyPoints: [
        'Vanilla Git HEAD chỉ có thể active 1 branch duy nhất tại một thời điểm.',
        'Thói quen git stash / commit tạm (WIP) làm loãng commit history và dễ mất code.',
        'Chi phí nhận thức (cognitive load) cao khi phải dọn dẹp working directory liên tục.',
        'Khẳng định: Git không lỗi thời, nhưng workflow tầng trên cần linh hoạt hơn.',
      ],
      transitionVi: 'Vậy GitButler đã giải quyết bài toán này như thế nào mà không làm đảo lộn Git repository bên dưới?',
    },
  },
  {
    id: 3,
    number: '03',
    title: 'What Makes GitButler Different?',
    subtitle: 'Virtual Branches: Một thư mục làm việc, nhiều nhánh song song độc lập',
    targetDurationSec: 90,
    speakerNotes: {
      durationNote: '90 giây (1.5 phút)',
      scriptVi: `Điểm đột phá nhất của GitButler chính là khái niệm "Virtual Branches" (Nhánh ảo).

Thay vì bạn phải checkout branch A hay branch B, GitButler coi Working Directory của bạn là một bảng Kanban chứa nhiều "Branch Lanes" song song.
Mọi thay đổi chưa commit xuất hiện ở khu vực Unstaged. Tại đây, bạn có toàn quyền gắp (drag & drop) từng file, hoặc thậm chí từng Hunk (khối code khác biệt) vào các nhánh ảo riêng biệt.

Cơ chế hoạt động bên dưới rất thú vị:
Khi bạn bấm commit trên nhánh "ui-login", GitButler sẽ tính toán trạng thái cây thư mục giả định NHƯ THỂ chỉ có những thay đổi của nhánh đó tồn tại trên nền Target Branch (ví dụ origin/main). Sau đó tạo ra commit Git chuẩn 100%.
Khi bạn push lên GitHub hoặc GitLab, đồng nghiệp của bạn thấy một PR sạch sẽ tuyệt đối, không hề lẫn lộn code của các nhánh khác đang dở dang trên máy bạn.

Đặc biệt, bạn không "switch" nhánh mà là "Apply" hoặc "Unapply" nhánh. Bấm unapply, nhánh đó được cất đi an toàn; bấm apply, nó lại hiện diện vào working directory.`,
      keyPoints: [
        'Single Workspace: Không cần nhiều bản clone hay checkout qua lại.',
        'Hunk-level Assignment: Phân bổ từng đoạn code độc lập vào các nhánh riêng biệt.',
        'Virtual Branch Lanes: Giao diện dạng cột trực quan tương tự Kanban board.',
        'Git-native compatibility: Commit sinh ra là Git commit chuẩn mực, tương thích tuyệt đối với GitHub/GitLab.',
      ],
      transitionVi: 'Nhưng công việc không phải lúc nào cũng độc lập. Điều gì xảy ra khi nhánh này phụ thuộc vào kết quả của nhánh trước? Đó là lúc ta cần phân biệt Parallel Branches và Stacked Branches.',
    },
  },
  {
    id: 4,
    number: '04',
    title: 'Parallel vs Stacked Branches',
    subtitle: 'Phân định rõ: Nhánh song song độc lập vs Chuỗi nhánh phụ thuộc (Stacked PRs)',
    targetDurationSec: 90,
    speakerNotes: {
      durationNote: '90 giây (1.5 phút)',
      scriptVi: `Rất nhiều bạn ban đầu hay nhầm lẫn giữa Parallel Branches và Stacked Branches. Hãy cùng làm rõ sự khác biệt mấu chốt này.

Bên trái: PARALLEL BRANCHES (Nhánh song song độc lập).
Đây là các nhánh cùng mọc ra từ một Target Branch chung (ví dụ origin/main). Chúng hoàn toàn không phụ thuộc lẫn nhau. Ví dụ: nhánh 'login-ui' và nhánh 'api-bugfix'. Bạn có thể commit, push và merge nhánh nào trước cũng được. Nếu nhánh bugfix được merge vào main, GitButler tự động rebase nhánh còn lại lên base mới.

Bên phải: STACKED BRANCHES (Nhánh xếp chồng).
Đây là kỹ thuật chia nhỏ một tính năng lớn thành nhiều Pull Request tuần tự có phụ thuộc: Nhánh 1: Core Database Migration -> Nhánh 2: API Endpoints (dựa trên DB) -> Nhánh 3: Frontend UI (dựa trên API).
Trong Git truyền thống, quản lý stacked branches là cực hình: mỗi khi sửa 1 commit ở nhánh 1, bạn phải rebase thủ công nhánh 2 và nhánh 3.
Còn với GitButler, bạn chỉ cần dùng lệnh "but move branch-ui --above branch-api" hoặc kéo thả. GitButler tự động cập nhật base của từng PR trên GitHub và giữ cho cả stack đồng bộ! Reviewer chỉ cần duyệt từng PR nhỏ 100-200 dòng cực kỳ nhàn nhã.`,
      keyPoints: [
        'Parallel: Nhánh độc lập, chung base, merge nhánh này không ảnh hưởng nhánh kia.',
        'Stacked: Nhánh phụ thuộc theo thứ tự (Bottom -> Top), review từng phần nhỏ.',
        'Stacked PRs giúp tăng tốc độ Code Review từ team và giảm rủi ro đại hồng thủy merge conflicts.',
        'GitButler tự động xử lý rebase cascading khi tầng dưới thay đổi.',
      ],
      transitionVi: 'Lý thuyết nghe rất hấp dẫn. Bây giờ hãy đến với phần Demo trực tiếp để xem cách một lập trình viên thao tác hàng ngày.',
    },
  },
  {
    id: 5,
    number: '05',
    title: 'Live Demo & Interactive Simulation',
    subtitle: 'Thực nghiệm: Tạo đồng thời Web Login UI & Flutter Validation, commit và apply/unapply',
    targetDurationSec: 300,
    speakerNotes: {
      durationNote: '5 phút (300 giây)',
      scriptVi: `Bây giờ chúng ta sẽ đi vào phần Demo thực tế trong 5 phút. 
Khởi động: mở GitButler Desktop (hoặc terminal với but CLI) trên một repo demo đã chạy 'but setup'.
Bước 1 (~1 phút): Sửa 2 chỗ độc lập — LoginForm.tsx (Web UI) và auth_validator.dart (Flutter). Chạy 'but status' / 'but diff' để thấy cả hai nằm ở Unstaged.
Bước 2 (~1 phút): Tạo 2 nhánh song song: 'but branch new feature/login-ui' và 'but branch new fix/flutter-validation'.
Bước 3 (~1.5 phút): Gán từng thay đổi vào đúng nhánh và commit riêng: 'but commit -b feature/login-ui -m "..." [change-id]' (Desktop thì kéo thả vào lane rồi bấm Commit).
Bước 4 (~1 phút): 'but unapply fix/flutter-validation' — file Flutter trở về như cũ trong editor; 'but apply fix/flutter-validation' — thay đổi quay lại. Không cần git stash.
Bước 5 (~0.5 phút): 'but status' hoặc 'but show' để xem mỗi nhánh chỉ chứa đúng một thay đổi.

Nếu không chạy được app thật: dùng bảng mô phỏng trên slide — bấm Gán → Tạo Commit → bật/tắt Applied. Nhớ nói rõ đây chỉ là mô phỏng minh hoạ, không phải ứng dụng thật.`,
      keyPoints: [
        'Kịch bản 2 tính năng cùng lúc: Web Login UI & Flutter Input Validation.',
        'Thao tác gắp hunk: Gán diff vào đúng branch lane tương ứng.',
        'Thao tác Commit độc lập: Sinh ra 2 commit tách biệt sạch sẽ.',
        'Thao tác Apply / Unapply: Tạm ẩn hoặc kích hoạt nhánh mà không mất trạng thái.',
        'Lưu ý: Đây là interactive simulation mô phỏng cơ chế làm việc của GitButler.',
      ],
      transitionVi: 'Không chỉ hỗ trợ con người, GitButler còn có một vũ khí bí mật dành cho kỷ nguyên lập trình với AI: but CLI và AI Coding Agents.',
    },
  },
  {
    id: 6,
    number: '06',
    title: 'GitButler + AI Coding Agents',
    subtitle: 'Tự động hóa quản lý nhánh cho Claude Code, Codex, Cursor qua `but agent setup`',
    targetDurationSec: 90,
    speakerNotes: {
      durationNote: '90 giây (1.5 phút)',
      scriptVi: `Một trong những xu hướng bùng nổ gần đây là lập trình với các AI Coding Agents như Claude Code, Cursor, OpenAI Codex hay Devin.

Vấn đề khi cho AI agent chạy trong repository là: agent thường dùng 'git checkout', 'git add .', 'git commit' theo kiểu gom hết, dễ trộn thay đổi của nó với code ta đang viết dở.
GitButler đã giải quyết bài toán này cực kỳ thông minh thông qua bộ CLI 'but' và câu lệnh:
$ but agent setup

Wizard này cài GitButler skill cho agent (Codex, Claude Code, Cursor, Copilot...) và ghi hướng dẫn workflow vào repo; trước khi ghi nó hiển thị rõ sẽ ghi gì. Nhờ đó agent học cách:
1. Tạo một virtual branch riêng cho nhiệm vụ của nó.
2. Dùng 'but commit -b [branch] [change-id]' để chỉ commit đúng những file nó vừa sửa.
3. Nếu agent cần sửa nhiều tác vụ song song, nó tạo các nhánh song song mà không đụng chạm tới code dở dang của lập trình viên.

Và CỰC KỲ QUAN TRỌNG: AI agent KHÔNG HỀ bypass code review hay repository permissions. Mọi commit do agent tạo ra vẫn phải qua Pull Request, CI/CD pipeline và sự kiểm duyệt nghiêm ngặt của team như bình thường.`,
      keyPoints: [
        'Lệnh `but agent setup` cài đặt policy hướng dẫn AI agent tuân thủ quy tắc quản lý nhánh.',
        'Hỗ trợ Claude Code, OpenAI Codex, Cursor, Copilot, Windsurf...',
        'Agent chỉ thao tác trên virtual branch được phân công, tránh làm bẩn workspace của dev.',
        'Nguyên tắc bảo mật: AI Agent không vượt quyền (bypass) branch protection hay review rules.',
      ],
      transitionVi: 'Mọi công cụ đều có hai mặt của nó. Vậy đâu là những hạn chế và đánh đổi mà anh em cần biết trước khi quyết định dùng GitButler?',
    },
  },
  {
    id: 7,
    number: '07',
    title: 'Trade-offs: GitButler vs Git vs Worktree',
    subtitle: 'Đánh giá kỹ thuật khách quan: Giới hạn runtime, xung đột code và bài toán lựa chọn',
    targetDurationSec: 90,
    speakerNotes: {
      durationNote: '90 giây (1.5 phút)',
      scriptVi: `Là kỹ sư, chúng ta không chọn công cụ vì sự hào nhoáng mà vì tính phù hợp kỹ thuật. GitButler có những đánh đổi rất rõ ràng mà anh em cần nắm:

Thứ nhất: GitButler KHÔNG LOẠI BỎ Merge Conflicts! Nếu hai nhánh ảo cùng chỉnh sửa chung một dòng code, conflict vẫn xảy ra. Điểm khác biệt là GitButler hiển thị conflict theo từng commit và cho phép resolve trực quan hơn.

Thứ hai: Giới hạn của Shared Working Directory. 
Vì các nhánh song song cùng nằm trong một folder, nếu nhánh A thêm package vào package.json hoặc đổi schema Database, mà nhánh B chưa có, thì dev server hay app Flutter có thể bị crash khi chạy đồng thời. 
Trong trường hợp cần chạy đồng thời 2 server (ví dụ backend port 8000 và port 8001) hoặc chạy test suite nặng tốn thời gian, GIT WORKTREE vẫn là lựa chọn số 1 vì nó cách ly hoàn toàn thư mục và node_modules.

Thứ ba: GitButler không thay thế Git. Nó hoạt động như một lớp trừu tượng phía trên Git. Nếu bạn chạy các lệnh checkout/switch truyền thống ở terminal bên ngoài, GitButler sẽ tạm dừng và yêu cầu đồng bộ.`,
      keyPoints: [
        'Không triệt tiêu conflict: Sửa trùng dòng vẫn sinh conflict như thường lệ.',
        'Hạn chế Shared Working Directory: Xung đột build dependencies hoặc schema database giữa 2 nhánh.',
        'So sánh với Git Worktree: Worktree tốn dung lượng đĩa hơn nhưng cách ly runtime 100%.',
        'Kết luận: GitButler tuyệt vời cho workflow hàng ngày, Worktree tối ưu cho long-running jobs/isolated servers.',
      ],
      transitionVi: 'Cuối cùng, hãy cùng đọng lại 3 điểm cốt lõi nhất và bước vào phần thảo luận Q&A.',
    },
  },
  {
    id: 8,
    number: '08',
    title: 'Takeaways & Q&A',
    subtitle: '3 bài học cô đọng, lộ trình pilot thử nghiệm và thảo luận cùng team',
    targetDurationSec: 105,
    speakerNotes: {
      durationNote: '105 giây (1.75 phút)',
      scriptVi: `Để đọng lại sau 15 phút hôm nay, mình muốn gửi tới anh em 3 Key Takeaways:

1. Think in Lanes, Not Stashes: Chuyển tư duy từ việc cất đồ (stash) sang việc tổ chức các luồng công việc song song (branch lanes).
2. Stacked PRs for Sanity: Hãy dùng stacked branches để chia nhỏ các Pull Request phức tạp. Reviewer sẽ cảm ơn bạn vì một PR 100 dòng dễ đọc hơn một PR 1,500 dòng rất nhiều!
3. Tool for Context, Not Replacement: GitButler bổ trợ cho Git, không thay thế Git nền tảng.

Lời khuyên hành động: Đừng vội áp dụng ngay vào repository monolithic production vào sáng thứ Hai. Hãy thử nghiệm nhỏ (pilot) trên một dự án side project hoặc repo demo của cá nhân trong 2-3 ngày, cài đặt but CLI qua docs.gitbutler.com để quen với tư duy mới.

Và câu hỏi mở mình muốn dành cho cả team:
"Việc gì trong quy trình hiện tại khiến mình phải chuyển nhánh nhiều nhất — và nó có nên là một branch riêng ngay từ đầu không?"
Xin cảm ơn mọi người và mời anh em đặt câu hỏi!`,
      keyPoints: [
        'Takeaway 1: Giải phóng áp lực context switching bằng Virtual Branches.',
        'Takeaway 2: Nâng cao văn hóa review với Stacked Pull Requests tinh gọn.',
        'Takeaway 3: Giữ an toàn cho workspace khi kết hợp cùng AI Coding Agents.',
        'Đề xuất: Pilot thử nghiệm trên repo demo trước khi dùng cho production.',
        'Câu hỏi gợi mở thảo luận nhóm về tối ưu hóa quy trình hiện tại.',
      ],
      transitionVi: 'Cảm ơn mọi người đã chú ý lắng nghe! Bây giờ chúng ta cùng thảo luận.',
    },
  },
];
