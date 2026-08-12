export type Language = 'en' | 'vi' | 'ja' | 'zh';

export const translations = {
  en: {
    hero: {
      title: "BATTLE IN STYLE",
      subtitle: "BLAZING SUMMER EVENT 2026",
      date: "09.08 - 31.08.2026",
      ctaText: "JOIN THE CAMPAIGN",
      backgroundImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000"
    },
    articles: [
      {
        id: "article-1",
        title: "New Update",
        summary: "OB41 update details with exciting weapon and map changes.",
        image: "/booyah.png",
        date: "10.08.2026"
      },
      {
        id: "article-2",
        title: "Summer Event",
        summary: "Join the summer event series now to receive thousands of valuable rewards.",
        image: "/booyah.png",
        date: "12.08.2026"
      },
      {
        id: "article-3",
        title: "eSports Tournament",
        summary: "Watch the biggest eSports tournament of the year with a total prize pool of up to 5 billion VND.",
        image: "/booyah.png",
        date: "15.08.2026"
      }
    ],
    schedule: {
      title: "EVENT SCHEDULE",
      events: [
        {
          id: "event-1",
          date: "09.08.2026",
          name: "Login Rewards",
          description: "Log in now to receive diamond royale vouchers and limited costume crates."
        },
        {
          id: "event-2",
          date: "15.08.2026",
          name: "Survival Run",
          description: "Complete 5 ranked matches to receive a cool Summer costume."
        },
        {
          id: "event-3",
          date: "22.08.2026",
          name: "Clash Squad Tournament",
          description: "Challenge millions of other players, get top 1 and secure the Booyah!"
        }
      ]
    },
    footer: {
      text: "© 2026 Copyright by uhhhm",
      links: [
        {
          title: "Terms",
          content: "These are the terms of service when participating in the event. Players must comply with all rules of the organizers to ensure fairness and transparency throughout the event."
        },
        {
          title: "Privacy",
          content: "Players' personal information will be kept strictly confidential and used solely for the purpose of awarding prizes. We pledge not to share data with third parties in any form."
        },
        {
          title: "Community",
          content: "Join our community on social media platforms to never miss any new announcements about the event as well as opportunities to receive other exciting gifts."
        }
      ]
    },
    ui: {
      nav: { home: "Home", schedule: "Schedule", chat: "Chat Room" },
      chat: {
        title: "Global Communication Channel",
        subtitle: "Anonymous Network",
        placeholder: "Type a message...",
        send: "Send",
        connecting: "Establishing secure connection...",
        identity: "Encrypted Identity:",
        empty: "No messages in this sector yet. Be the first."
      },
      notice: { title: "Notice", message: "The logo overlapping the menu is intentional, it's a feature, not a bug! 😉", button: "Understood" },
      footer: { info: "Website Info", version: "Version 1.0.0", dev1: "An exclusive product designed with a premium", dev2: "Glassmorphism", dev3: "interface.", dev4: "Developed by programmer" },
      events: { viewDetails: "View Details" },
      notfound: { title: "Page Not Found", desc: "The space you are looking for has vanished or does not exist in the system.", back: "Return to reality" },
      loading: ["Initializing space...", "Synchronizing servers...", "Decoding interface...", "System ready."],
      settings: { 
        title: "Settings", 
        webAnim: "Web Animations", animDesc: "GSAP & Framer Motion", 
        snow: "Snowfall", snowDesc: "Winter atmosphere", 
        rain: "Rainfall", rainDesc: "Cyberpunk vibes", 
        petal: "Sakura Petals", petalDesc: "Spring elegance",
        letters: "Falling Letters", lettersDesc: "Matrix style",
        tilt: "3D Tilt", tiltDesc: "Interactive perspective",
        fourD: "4D Dimension", fourDDesc: "Time & space effect",
        warning: "Combine effects at your own risk",
        language: "Language", langDesc: "Display language"
      }
    }
  },
  vi: {
    hero: {
      title: "BATTLE IN STYLE",
      subtitle: "SỰ KIỆN MÙA HÈ RỰC LỬA 2026",
      date: "09.08 - 31.08.2026",
      ctaText: "THAM GIA CHIẾN DỊCH",
      backgroundImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000"
    },
    articles: [
      {
        id: "article-1",
        title: "Bản Cập Nhật Mới",
        summary: "Chi tiết bản cập nhật OB41 với nhiều thay đổi hấp dẫn về vũ khí và bản đồ.",
        image: "/booyah.png",
        date: "10.08.2026"
      },
      {
        id: "article-2",
        title: "Sự Kiện Mùa Hè",
        summary: "Tham gia ngay chuỗi sự kiện mùa hè để nhận hàng ngàn phần quà giá trị.",
        image: "/booyah.png",
        date: "12.08.2026"
      },
      {
        id: "article-3",
        title: "Giải Đấu Thể Thao Điện Tử",
        summary: "Theo dõi giải đấu eSports lớn nhất năm với tổng giải thưởng lên tới 5 tỷ VNĐ.",
        image: "/booyah.png",
        date: "15.08.2026"
      }
    ],
    schedule: {
      title: "LỊCH SỰ KIỆN",
      events: [
        {
          id: "event-1",
          date: "09.08.2026",
          name: "Đăng Nhập Nhận Quà",
          description: "Đăng nhập ngay để nhận vé quay kim cương và hòm trang phục giới hạn."
        },
        {
          id: "event-2",
          date: "15.08.2026",
          name: "Chạy Bo Sinh Tồn",
          description: "Hoàn thành 5 trận đấu xếp hạng để nhận trang phục Mùa Hè cực ngầu."
        },
        {
          id: "event-3",
          date: "22.08.2026",
          name: "Giải Đấu Tử Chiến",
          description: "Thách đấu cùng hàng triệu người chơi khác, giành top 1 và lấy Booyah!"
        }
      ]
    },
    footer: {
      text: "© 2026 Bản quyền thuộc về uhhhm",
      links: [
        {
          title: "Điều khoản",
          content: "Đây là các điều khoản dịch vụ khi tham gia sự kiện. Người chơi phải tuân thủ mọi quy định của ban tổ chức để đảm bảo tính công bằng và minh bạch trong suốt quá trình diễn ra sự kiện."
        },
        {
          title: "Bảo mật",
          content: "Thông tin cá nhân của người chơi sẽ được bảo mật tuyệt đối và chỉ được sử dụng cho mục đích trao giải. Chúng tôi cam kết không chia sẻ dữ liệu với bên thứ ba dưới mọi hình thức."
        },
        {
          title: "Cộng đồng",
          content: "Tham gia vào cộng đồng của chúng tôi trên các nền tảng mạng xã hội để không bỏ lỡ bất kỳ thông báo mới nào về sự kiện cũng như các cơ hội nhận quà hấp dẫn khác."
        }
      ]
    },
    ui: {
      nav: { home: "Trang Chủ", schedule: "Lịch Trình", chat: "Phòng Chat" },
      chat: {
        title: "Kênh Giao Tiếp Toàn Cầu",
        subtitle: "Mạng Lưới Ẩn Danh",
        placeholder: "Nhập tin nhắn...",
        send: "Gửi",
        connecting: "Đang thiết lập kết nối...",
        identity: "Định danh:",
        empty: "Chưa có tin nhắn nào. Hãy là người đầu tiên."
      },
      notice: { title: "Thông báo", message: "Logo tràn ra khỏi thanh menu là do mình cố tình làm vậy, đó là tính năng không phải lỗi nha! 😉", button: "Đã hiểu" },
      footer: { info: "Thông Tin Website", version: "Phiên Bản 1.0.0", dev1: "Một sản phẩm được thiết kế độc quyền với giao diện", dev2: "Glassmorphism", dev3: "cao cấp.", dev4: "Phát triển bởi lập trình viên" },
      events: { viewDetails: "Xem Chi Tiết" },
      notfound: { title: "Không Tìm Thấy Trang", desc: "Không gian bạn đang tìm kiếm đã bị biến mất hoặc không tồn tại trong hệ thống.", back: "Trở về thực tại" },
      loading: ["Khởi tạo không gian...", "Đồng bộ máy chủ...", "Giải mã giao diện...", "Hệ thống sẵn sàng."],
      settings: { 
        title: "Cài đặt", 
        webAnim: "Hiệu ứng Web", animDesc: "GSAP & Framer Motion", 
        snow: "Tuyết Rơi", snowDesc: "Không khí mùa đông", 
        rain: "Mưa Rơi", rainDesc: "Phong cách Cyberpunk", 
        petal: "Hoa Anh Đào", petalDesc: "Mùa xuân mộng mơ",
        letters: "Chữ Cái Rơi", lettersDesc: "Phong cách ma trận",
        tilt: "Hiệu Ứng 3D", tiltDesc: "Góc nhìn tương tác",
        fourD: "Không Gian 4D", fourDDesc: "Thời gian & Chiều sâu",
        warning: "Bật nhiều hiệu ứng có thể gây nặng máy",
        language: "Ngôn Ngữ", langDesc: "Ngôn ngữ hiển thị"
      }
    }
  },
  ja: {
    hero: {
      title: "BATTLE IN STYLE",
      subtitle: "灼熱の夏イベント 2026",
      date: "09.08 - 31.08.2026",
      ctaText: "キャンペーンに参加",
      backgroundImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000"
    },
    articles: [
      {
        id: "article-1",
        title: "新アップデート",
        summary: "OB41アップデートの武器とマップの変更点の詳細。",
        image: "/booyah.png",
        date: "10.08.2026"
      },
      {
        id: "article-2",
        title: "サマーイベント",
        summary: "夏のイベントに参加して、たくさんの貴重な報酬を手に入れよう。",
        image: "/booyah.png",
        date: "12.08.2026"
      },
      {
        id: "article-3",
        title: "eスポーツトーナメント",
        summary: "賞金総額50億VNDの今年最大のeスポーツトーナメントを観戦しよう。",
        image: "/booyah.png",
        date: "15.08.2026"
      }
    ],
    schedule: {
      title: "イベントスケジュール",
      events: [
        {
          id: "event-1",
          date: "09.08.2026",
          name: "ログイン報酬",
          description: "今すぐログインして、限定衣装のクレートを手に入れよう。"
        },
        {
          id: "event-2",
          date: "15.08.2026",
          name: "サバイバルラン",
          description: "ランクマッチを5回完了して、クールな夏の衣装を手に入れよう。"
        },
        {
          id: "event-3",
          date: "22.08.2026",
          name: "クラッシュスクワッド トーナメント",
          description: "何百万人ものプレイヤーと競い合い、トップ1になってBooyahを確保しろ！"
        }
      ]
    },
    footer: {
      text: "© 2026 著作権は uhhhm に帰属します",
      links: [
        {
          title: "利用規約",
          content: "イベント参加時のサービス利用規約です。イベント中の公平性と透明性を確保するため、主催者のすべての規則を遵守する必要があります。"
        },
        {
          title: "プライバシー",
          content: "個人情報は厳重に保管され、賞品授与の目的にのみ使用されます。第三者とデータを共有することはありません。"
        },
        {
          title: "コミュニティ",
          content: "SNSでコミュニティに参加して、イベントのお知らせやその他の豪華賞品を獲得するチャンスを見逃さないようにしましょう。"
        }
      ]
    },
    ui: {
      nav: { home: "ホーム", schedule: "スケジュール", chat: "チャットルーム" },
      chat: {
        title: "グローバル通信チャンネル",
        subtitle: "匿名ネットワーク",
        placeholder: "メッセージを入力...",
        send: "送信",
        connecting: "安全な接続を確立中...",
        identity: "暗号化されたID:",
        empty: "まだメッセージはありません。最初のメッセージを送信してください。"
      },
      notice: { title: "お知らせ", message: "ロゴがメニューに重なっているのは意図的です。バグではなく仕様です！😉", button: "了解" },
      footer: { info: "ウェブサイト情報", version: "バージョン 1.0.0", dev1: "プレミアムな", dev2: "Glassmorphism", dev3: "インターフェイスでデザインされた専用製品。", dev4: "開発者：" },
      events: { viewDetails: "詳細を見る" },
      notfound: { title: "ページが見つかりません", desc: "お探しの空間は消滅したか、システムに存在しません。", back: "現実に戻る" },
      loading: ["空間を初期化しています...", "サーバーを同期中...", "インターフェースをデコード中...", "システムの準備が完了しました。"],
      settings: { 
        title: "設定", 
        webAnim: "ウェブアニメーション", animDesc: "GSAP & Framer Motion", 
        snow: "降雪", snowDesc: "冬の雰囲気", 
        rain: "降雨", rainDesc: "サイバーパンクの雰囲気", 
        petal: "桜の花びら", petalDesc: "春の優雅さ",
        letters: "文字の落下", lettersDesc: "マトリックス風",
        tilt: "3D チルト", tiltDesc: "インタラクティブな視点",
        fourD: "4D 次元", fourDDesc: "時間と空間",
        warning: "効果の組み合わせは自己責任でお願いします",
        language: "言語", langDesc: "表示言語"
      }
    }
  },
  zh: {
    hero: {
      title: "BATTLE IN STYLE",
      subtitle: "2026 烈焰夏日活动",
      date: "09.08 - 31.08.2026",
      ctaText: "加入战役",
      backgroundImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000"
    },
    articles: [
      {
        id: "article-1",
        title: "最新更新",
        summary: "OB41更新详情，包括激动人心的武器和地图修改。",
        image: "/booyah.png",
        date: "10.08.2026"
      },
      {
        id: "article-2",
        title: "夏日活动",
        summary: "立即加入夏日活动系列，领取数千份珍贵奖励。",
        image: "/booyah.png",
        date: "12.08.2026"
      },
      {
        id: "article-3",
        title: "电竞锦标赛",
        summary: "观看年度最大的电子竞技锦标赛，总奖金高达50亿越南盾。",
        image: "/booyah.png",
        date: "15.08.2026"
      }
    ],
    schedule: {
      title: "活动日程",
      events: [
        {
          id: "event-1",
          date: "09.08.2026",
          name: "登录奖励",
          description: "立即登录领取钻石夺宝券和限定服装宝箱。"
        },
        {
          id: "event-2",
          date: "15.08.2026",
          name: "生存跑酷",
          description: "完成5场排位赛即可获得炫酷的夏日服装。"
        },
        {
          id: "event-3",
          date: "22.08.2026",
          name: "团队突击锦标赛",
          description: "挑战数百万其他玩家，夺得第一并确保胜利 (Booyah)！"
        }
      ]
    },
    footer: {
      text: "© 2026 版权所有 uhhhm",
      links: [
        {
          title: "服务条款",
          content: "这是参加活动时的服务条款。玩家必须遵守组织者的所有规定，以确保活动的公平和透明。"
        },
        {
          title: "隐私政策",
          content: "玩家的个人信息将被严格保密，仅用于颁发奖品的目的。我们承诺绝不以任何形式与第三方分享数据。"
        },
        {
          title: "社区",
          content: "在社交媒体平台上加入我们的社区，绝不错过任何有关活动的新公告以及获得其他激动人心的礼物的机会。"
        }
      ]
    },
    ui: {
      nav: { home: "主页", schedule: "日程", chat: "聊天室" },
      chat: {
        title: "全球通讯频道",
        subtitle: "匿名网络",
        placeholder: "输入消息...",
        send: "发送",
        connecting: "正在建立安全连接...",
        identity: "加密身份:",
        empty: "暂无消息。成为第一个发送消息的人。"
      },
      notice: { title: "通知", message: "标志与菜单重叠是故意的，这是一个特性，不是漏洞！😉", button: "知道了" },
      footer: { info: "网站信息", version: "版本 1.0.0", dev1: "采用高级", dev2: "Glassmorphism", dev3: "界面设计的独家产品。", dev4: "开发者：" },
      events: { viewDetails: "查看详情" },
      notfound: { title: "找不到页面", desc: "您正在寻找的空间已经消失或在系统中不存在。", back: "回归现实" },
      loading: ["正在初始化空间...", "正在同步服务器...", "正在解码界面...", "系统准备就绪。"],
      settings: { 
        title: "设置", 
        webAnim: "网页动画", animDesc: "GSAP & Framer Motion", 
        snow: "降雪", snowDesc: "冬季气氛", 
        rain: "降雨", rainDesc: "赛博朋克氛围", 
        petal: "樱花花瓣", petalDesc: "春季优雅",
        letters: "字母飘落", lettersDesc: "黑客帝国风格",
        tilt: "3D 倾斜", tiltDesc: "交互式视角",
        fourD: "4D 维度", fourDDesc: "时间与空间",
        warning: "效果组合风险自负",
        language: "语言", langDesc: "显示语言"
      }
    }
  }
};
