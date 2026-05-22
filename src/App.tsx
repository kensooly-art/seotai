import React, { useState, useEffect } from 'react';
import SeotaiLogo from './components/SeotaiLogo';
import ToursList from './components/ToursList';
import BoardSection from './components/BoardSection';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
// @ts-ignore
import welcomeKoreaBg from './assets/images/welcome_korea_bg_1779413697756.png';
// @ts-ignore
import seoulVipTour from './assets/images/seoul_vip_tour_1779418790355.png';
// @ts-ignore
import busanYachtTour from './assets/images/busan_yacht_tour_1779418807751.png';
// @ts-ignore
import jejuWellness from './assets/images/jeju_wellness_1779418824879.png';
// @ts-ignore
import cheongdamSkincare from './assets/images/cheongdam_skincare_1779418839370.png';
import { TourPackage, BoardArticle, BookingInquiry, NavigationItem, FooterConfig, ThemeConfig } from './types';
import { 
  Compass, ClipboardList, Globe2, Sparkles, Award, ShieldCheck, 
  Map, PhoneCall, ChevronRight, Menu, X, Check, Laptop, HeartHandshake, Eye
} from 'lucide-react';

// --- INITIAL SAMPLE (SEED) DATA ---
const INITIAL_TOURS: TourPackage[] = [
  {
    id: "TOUR-301",
    titleKo: "서울-인천 핵심 K-컬처 프리미엄 의전 투어 3일",
    titleEn: "Seoul-Incheon Crucial K-Culture VIP Protocol Tour 3D",
    summaryKo: "최고급 스프린터 리무진 의전, 프리미엄 5성급 한옥 호텔, 한식 미식 파인다이닝 코스 기획 투어입니다.",
    summaryEn: "Luxury Mercedes Sprinter protocol chauffeur, 5-star premier Hanok hotel, and custom high-end royal K-cuisine fine dining.",
    descriptionKo: "서태국제여행사 직영 차량 및 공인 의전 가이드 배정 특가 상품입니다.\n\n[1일차] 인천공항 VIP 전담 영접 및 하이 리무진 의전 이송, 청와대 및 도심 한옥마을 단독 프라이빗 투어.\n[2일차] 성수동 K-컬처 테라피 체험, 경복궁 비공개 야간 관람 및 삼청동 국가빈객 급 만찬.\n[3일차] 웰니스 아로마 도심 스파 및 김포/인천공항 안전 수속 환송 서비스.",
    descriptionEn: "Exquisite program by Seotai direct vehicle operating rates with licensed guides.\n\n[Day 1] Incheon Airport Private VIP protocol gate greeting and transfers, exclusive Blue House & Hanok Village premium walkthrough.\n[Day 2] Sungsoo K-trend private therapy, Gyeongbokgung palace night guided viewing & gourmet dynamic feast.\n[Day 3] Healing boutique body spa treatment and professional airport departure escorting.",
    priceAmount: 1850000,
    priceCurrency: "KRW",
    durationDays: 3,
    durationNights: 2,
    imageUrl: seoulVipTour,
    tourTags: ["Seoul", "VIP_Protocol", "Luxury_Dining"],
    isHot: true,
    transportType: "Mercedes Sprinter VIP"
  },
  {
    id: "TOUR-302",
    titleKo: "경주-부산 천년 역사와 해변 마스터 웰니스 투어 4일",
    titleEn: "Gyeongju-Busan Thousand-Year Heritage & Coastal Wellness 4D",
    summaryKo: "KTX 비즈니스 환승 지원, 유네스코 역사 유적 독점 문화 해설, 해운대 럭셔리 요트 전세 및 힐링 리조트 포함 상품.",
    summaryEn: "KTX executive support, private UNESCO historical expert commentary, Haeundae charter yacht, and supreme private coastal resort stay.",
    descriptionKo: "한국의 정수인 천년고도 경주와 화려한 미항 부산을 가장 품격 있게 순회합니다.\n\n[1일차] 신라 유적 국보급 문화재 가이드 단독 의전, 석굴암 및 첨성대 일각 감상.\n[2일차] 부산 해운대 전용 럭셔리 요트 대여 선상 샴페인 석양 크양 체험.\n[3일차] 송정 해먹 웰니스 요가 수련 및 자갈치 바다 특미 기행.\n[4일차] 부산 하이프 라이프 스타일 몰 투어 및 리무진 배송으로 컴백 귀국.",
    descriptionEn: "A high-end historical and maritime exploration centering pristine Korea.\n\n[Day 1] Gyeongju private expert escort, exclusive stargazing & historic fortress VIP walk.\n[Day 2] Charter yacht sunset ocean sailing with fine champagne, coastal hotel checking.\n[Day 3] Sunrise private yoga therapy session, Busan local premier culinary tours.\n[Day 4] Luxury lifestyle boutique walkthroughs and direct express limousine return.",
    priceAmount: 2200000,
    priceCurrency: "KRW",
    durationDays: 4,
    durationNights: 3,
    imageUrl: busanYachtTour,
    tourTags: ["Gyeongju", "Busan", "Heritage_Yacht"],
    isHot: false,
    transportType: "VVIP Solati Limo"
  },
  {
    id: "TOUR-303",
    titleKo: "제주 오감 힐링 감성 자연 충전 VIP 투어 3일",
    titleEn: "Jeju Island Scenic Healing & Gastronomy Recharge VIP 3D",
    summaryKo: "한라산 프라이빗 등산 연계 코스, 프리미엄 다원 티 클래스 단독 영접 및 해안가 전독 빌라 럭셔리 힐링 여행 상품.",
    summaryEn: "Private Hallasan trail trekking, exclusive green tea boutique class, and premium oceanfront pool villa experience.",
    descriptionKo: "복잡한 관광지 루트가 아닌 제주의 숨겨진 비경และ 휴양을 탐닉하는 아일랜드 VIP 기획 리트릿.\n\n[1일차] 제주공항 메르세데스 단프 기사 단독 에스코트, 애월 해안 도로 전세 드라이브 및 로컬 퓨전 해녀 런치.\n[2일차] 유기농 프리미엄 녹차 밭 프라이빗 티 스파 클래스, 서귀포 뷰풀 빌라 프라이빗 바비큐 디너.\n[3일차] 한라산 숲길 삼림욕 전담 숲 치유 가이드 동행 코스 및 시티 복귀 환송.",
    descriptionEn: "An eco-luxury private retreat uncovering hidden islands of Jeju.\n\n[Day 1] Ocean drive with dedicated Sprinter vehicle, local gourmet fusion lunch.\n[Day 2] Tea tasting masterclass, premium pool villa relaxation and customized private barbecue feast.\n[Day 3] Hallasan forest therapeutic therapy with dynamic guide, airport departure.",
    priceAmount: 1450000,
    priceCurrency: "KRW",
    durationDays: 3,
    durationNights: 2,
    imageUrl: jejuWellness,
    tourTags: ["Jeju_Island", "Wellness", "Nature_PoolVilla"],
    isHot: true,
    transportType: "Hyundai Solati Limo"
  },
  {
    id: "TOUR-304",
    titleKo: "K-뷰티 & 안티에이징 메디컬 케어 럭셔리 투어 4일",
    titleEn: "K-Beauty & Anti-Aging Medical Care Luxury Tour 4D",
    summaryKo: "청담동 대표 메디컬 피부 솔루션, 프리미엄 웰레스 헤드 스파, 리프팅 안티에이징 및 VVIP 리무진 의전 결합 패키지.",
    summaryEn: "Cheongdam premier medical skincare clinic, dynamic anti-aging facials, premium head-spa, and VVIP luxury transfers.",
    descriptionKo: "국제 규격의 정식 전문 메디컬 파트너와 함께하는 고품격 스킨 레쥬베네이션 및 메디뷰티 전문 케어 프로그램입니다.\n\n[1일차] 인천공항 최고급 에스코트 영접 및 청담동 프리미엄 뷰티 디렉팅 개인 맞춤 1:1 컨설팅.\n[2일차] 최고 권위 대표 명의의 정밀 진단 시스템, 개인 스킨 리바이탈 트리트먼트 및 안티에이징 미세 케어.\n[3일차] 5성급 웰니스 아로마 헤드 스파 테라피 코스, 한강 선상 고품격 프라이빗 요트 다과 감상.\n[4일차] 회복 촉진 스페셜 영양 케어 전단 처방전 교부 및 리무진 영접을 통한 공항 안심 출발 서비스.",
    descriptionEn: "A high-end dynamic medical synergy plan combining Cheongdam's elite clinics and 5-star spa wellness.\n\n[Day 1] Airport pickup via luxury van, personal beauty coordinator consulting, premium spa treatment.\n[Day 2] Advanced dermatological diagnostic and custom skin refinement/lifting treatments in Cheongdam.\n[Day 3] Specialized hotel inner-beauty nutrition program and private Han River yacht meditation therapy.\n[Day 4] Medical post-care followup, express departure protocol and direct premium VIP drop-off.",
    priceAmount: 3900000,
    priceCurrency: "KRW",
    durationDays: 4,
    durationNights: 3,
    imageUrl: cheongdamSkincare,
    tourTags: ["K-Beauty", "Medical_Care", "Cheongdam_Luxury"],
    isHot: true,
    transportType: "Mercedes Sprinter VIP"
  }
];

const INITIAL_ARTICLES: BoardArticle[] = [
  {
    id: "POST-801",
    titleKo: "서태국제여행사 공인 랜드 오퍼레이팅 보증 및 정식 등록 공지",
    titleEn: "Seotai Travel Official Land Operator Registration and Gurantees Notice",
    contentKo: "안녕하십니까. 서태국제여행사입니다.\n저희 서태국제여행사는 관계 법정 등록 요건을 완벽히 수임한 최정예 종합 랜드 오퍼레이터 사업자입니다. 차량 기사 단독 보유 수임 및 최정예 다국어 가이드 배치가 상시 가동 중이오니 안심하시고 프리미엄 B2B 및 VIP 상담 견적을 문의하시기 바랍니다.",
    contentEn: "Greetings from Seotai Travel.\nWe are a fully registered dynamic Korea Land Operator fulfilling standard corporate guidelines. We directly operate private limousine buses and assign vetted multilingual guides for standard agency packages and customized VIP events.",
    category: "Notice",
    author: "기획처 오피스",
    createdAt: "2026-05-20",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "POST-802",
    titleKo: "여름 시즌 대비 프리미엄 리무진 벤 직영 증차 완료 안내",
    titleEn: "Premium Solati & Sprinters fleet expanded for Tourism Peak Seasons",
    contentKo: "성황리에 예약 중인 6-8월 VIP 인바운드 수요 폭증에 적극 부응하고자, 서태국제여행사는 럭셔리 스프린터 기사 동행 벤을 5대 추가 직영 발주 및 배치가 마감 완료되었음을 알려드립니다. 한층 더 여유롭고 기원 가득한 이동 의전을 파트너 랜드 특가 혜택으로 누리십시오.",
    contentEn: "To accommodate extreme VIP requests throughout high seasons, we are excited to expand our direct fleet with 5 additional high-end Sprinter Vans. All vehicles feature premium seating, dynamic climate controls, and professional English/Chinese speaking operators.",
    category: "Promo",
    author: "차량운영총괄",
    createdAt: "2026-05-18",
    imageUrl: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "POST-803",
    titleKo: "글로벌 비즈니스 내빈을 위한 핵심 VIP 전통 의전 매뉴얼 공유",
    titleEn: "VIP Royal Protocol Manual for International Corporate Guests",
    contentKo: "타 랜드사와 차별화되는 서태만의 의전 가이드 수칙입니다.\n\n1. 다국어 VIP 마스터 에이전트 동승\n2. 특급 호텔 게이트 웰컴 배송 가이드 연계\n3. 선호 식품 및 한글 가이드 비공개 선호 사항 사전 수집 시스템 밀착 전담.\n당사는 최상위 고객의 편안함을 위해 모든 디테일을 사전 점검 조율합니다.",
    contentEn: "Our unique royal protocol highlights:\n\n1. Dedicated multilingual luxury agent assigned standard.\n2. In-car customized amenities tailored per client preferences.\n3. Custom nutritional meal options curated by high-end dieticians.\nWe inspect every dynamic component on your behalf.",
    category: "Guide",
    author: "교육총괄부",
    createdAt: "2026-05-15",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
  }
];

const INITIAL_INQUIRIES: BookingInquiry[] = [
  {
    id: "INQ-4821",
    clientName: "싱가포르 VIP 법인 단체 바이어 (MR. LOO COHN)",
    contactEmail: "loo.cohn@singapore-trade.org",
    contactPhone: "+65-9012-3456",
    preferredDate: "2026-06-15",
    daysCount: 4,
    paxCount: 12,
    destination: "Seoul-Jeju Heritage package",
    additionalRequests: "필요 사항: 대형 고급 스프린터 버스 대절, 정식 영어 가이드 자격 전담 동행, 미슐랭 디너 2회 포함, VIP 통역 가이드 및 리무진 영접 원함.",
    status: "Pending",
    createdAt: "2026-05-21T14:32:00Z",
    adminNotes: "스프린터 1대 가동 가능성 타진 완료. 영어가이드 소피아 예약 대기 배정"
  },
  {
    id: "INQ-4822",
    clientName: "엠버서더 인터내셔널 한국 분원 의원팀",
    contactEmail: "dr.kim@ambs-korea.com",
    contactPhone: "010-8271-9382",
    preferredDate: "2026-07-02",
    daysCount: 3,
    paxCount: 4,
    destination: "경주 국보 VIP 골프 문화 기행",
    additionalRequests: "의전 필요: 골프 코스 티오프 예약 3회, 채식 식사 위주 식당 가이드 연계 바람. 무릎이 조금 불편하셔서 계단 코스 생략 요청.",
    status: "Contacted",
    createdAt: "2026-05-21T09:12:00Z",
    adminNotes: "경주 블루원 밸리 골프 예약 대기 전송 완료."
  }
];

const DEFAULT_NAV: NavigationItem[] = [
  { id: "hero", labelKo: "홈", labelEn: "Home", sectionId: "hero" },
  { id: "intro", labelKo: "소개", labelEn: "About", sectionId: "intro" },
  { id: "tours", labelKo: "상품기획", labelEn: "Products", sectionId: "tours" },
  { id: "booking", labelKo: "예약문의", labelEn: "Inquiry", sectionId: "booking" }
];

const DEFAULT_FOOTER: FooterConfig = {
  companyNameKo: "Korea Office",
  companyNameEn: "Korea Office",
  ceoKo: "Line ID : palaphonkim, Kakao Account : ksh5313@msn.com, Wechat ID : palaphonkim",
  ceoEn: "Line ID : palaphonkim, Kakao Account : ksh5313@msn.com, Wechat ID : palaphonkim",
  registrationNumber: "Mobile Phone Number:  +82-10-8943-5311 (Whatsapp, Viber)",
  addressKo: "18, World Cup buk-ro 23-gil, Mapo-gu, Seoul, Korea",
  addressEn: "18, World Cup buk-ro 23-gil, Mapo-gu, Seoul, Korea",
  telephone: "Tel: +82-2-333-7654",
  fax: "Fax: +82-2-3337654",
  email: "Email : korea2@seotaitravel.com",
  socialFacebook: "https://facebook.com/seotaitravel",
  socialInstagram: "https://instagram.com/seotaitravel",
  socialTwitter: "https://twitter.com/seotaitravel",
  skype: "Skype: sunbesttour_kr@hotmail.com",
  lineId: "palaphonkim",
  kakaoAccount: "ksh5313@msn.com",
  wechatId: "palaphonkim",
  mobilePhone: " +82-10-8943-5311 (Whatsapp, Viber)",
  website: "www.seotaitravel.com"
};

const DEFAULT_THEME: ThemeConfig = {
  primaryColor: "#761A7E",  // Purple
  secondaryColor: "#CBAF00", // Gold
  backgroundColor: "#FFFFFF",
  headingFont: "Inter",
  bodyFont: "Inter",
  seoTitleKo: "서태국제여행사 | Korea Leading Land Operator & Inbound VIP Custom Travel Expert",
  seoTitleEn: "Seotai Travel | Korea Inbound VIP Direct Land Operator",
  seoDescriptionKo: "대한민국 최고 수준의 랜드 오퍼레이터로서, 비즈니스 출장, VIP 의전, 국/영문 맞춤 기획 리무진 요어 등에 이르기까지 서태국제여행사가 완벽하게 전담 견적 및 조율합니다.",
  seoDescriptionEn: "As South Korea's premier direct land operator, Seotai Travel operates custom VIP protocol shuttle tours, elite business travels and bespoke inbound itineraries.",
  seoKeywordsKo: "서태국제여행사, 한국 랜드사, 랜드 오퍼레이터, Korea Land Operator, VIP 의전 투어, 인바운드 버스 대절",
  seoKeywordsEn: "Seotai Travel, Korea Land Operator, Inbound VIP Protocol, Luxury Tour Korea, Custom Travel Planner"
};

export default function App() {
  // Localization toggle State
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Core Data in localStorage with State Fallbacks
  const [tours, setTours] = useState<TourPackage[]>(() => {
    const cached = localStorage.getItem('seotai_tours');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as TourPackage[];
        if (parsed.length < 4 || !parsed.some(t => t.id === "TOUR-304")) {
          return INITIAL_TOURS;
        }
        return parsed.map(t => {
          const original = INITIAL_TOURS.find(it => it.id === t.id);
          if (original) {
            return { ...t, imageUrl: original.imageUrl };
          }
          return t;
        });
      } catch (e) {
        return INITIAL_TOURS;
      }
    }
    return INITIAL_TOURS;
  });

  const [articles, setArticles] = useState<BoardArticle[]>(() => {
    const cached = localStorage.getItem('seotai_articles');
    return cached ? JSON.parse(cached) : INITIAL_ARTICLES;
  });

  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    const cached = localStorage.getItem('seotai_inquiries');
    return cached ? JSON.parse(cached) : INITIAL_INQUIRIES;
  });

  const [navItems, setNavItems] = useState<NavigationItem[]>(() => {
    const cached = localStorage.getItem('seotai_nav');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as NavigationItem[];
        if (
          parsed.length !== DEFAULT_NAV.length || 
          !parsed.some(item => item.labelEn === "About") ||
          parsed.some(item => item.labelKo.includes("("))
        ) {
          return DEFAULT_NAV;
        }
        return parsed;
      } catch (e) {
        return DEFAULT_NAV;
      }
    }
    return DEFAULT_NAV;
  });

  const [footer, setFooter] = useState<FooterConfig>(() => {
    const cached = localStorage.getItem('seotai_footer');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as FooterConfig;
        if (
          parsed.companyNameKo === "(주) 서태국제여행사" ||
          parsed.telephone?.includes("1234") ||
          !parsed.skype
        ) {
          return DEFAULT_FOOTER;
        }
        return parsed;
      } catch (e) {
        return DEFAULT_FOOTER;
      }
    }
    return DEFAULT_FOOTER;
  });

  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const cached = localStorage.getItem('seotai_theme');
    return cached ? JSON.parse(cached) : DEFAULT_THEME;
  });

  // State synchronization with localStorage
  useEffect(() => {
    localStorage.setItem('seotai_tours', JSON.stringify(tours));
  }, [tours]);

  useEffect(() => {
    localStorage.setItem('seotai_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('seotai_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('seotai_nav', JSON.stringify(navItems));
  }, [navItems]);

  useEffect(() => {
    localStorage.setItem('seotai_footer', JSON.stringify(footer));
  }, [footer]);

  useEffect(() => {
    localStorage.setItem('seotai_theme', JSON.stringify(theme));
  }, [theme]);

  // Handle Client Inquiry Submission from booking forms
  const handleAddNewInquiry = (newInq: BookingInquiry) => {
    setInquiries(prev => [newInq, ...prev]);
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  // Quick book action from tour package details modal click: pre-fills inquiry form destination
  const handleQuickBook = (destinationTitle: string) => {
    scrollToSection('booking');
    const destInput = document.querySelector('input[placeholder*="예:"]') as HTMLInputElement;
    if (destInput) {
      destInput.value = destinationTitle;
      destInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const menuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div id="seotai-app-root" className="min-h-screen bg-white font-sans selection:bg-purple-100 antialiased flex flex-col">
      
      {/* 1. TOP HEADER SECTION (Navigation Bar) */}
      <header id="seotai-global-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Brand Brand Area */}
          <div onClick={() => scrollToSection('hero')} className="cursor-pointer">
            <SeotaiLogo 
              primaryColor={theme.primaryColor} 
              secondaryColor={theme.secondaryColor} 
              size="md" 
            />
          </div>

          {/* Desktop Navigation Links (Fully Configurable) */}
          <nav className="hidden xl:flex items-center gap-6 font-semibold text-xs md:text-sm text-neutral-600">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="transition-all relative py-1 uppercase tracking-wide duration-200 cursor-pointer text-neutral-600"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.primaryColor;
                  const line = e.currentTarget.querySelector('.nav-underline') as HTMLSpanElement;
                  if (line) line.style.width = '100%';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#4b5563'; // text-neutral-600
                  const line = e.currentTarget.querySelector('.nav-underline') as HTMLSpanElement;
                  if (line) line.style.width = '0%';
                }}
              >
                {lang === 'ko' ? item.labelKo : item.labelEn}
                <span 
                  className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300"
                  style={{ backgroundColor: theme.secondaryColor }}
                ></span>
              </button>
            ))}
          </nav>

          {/* Controls Area (Language toggle & Admin Secret Button) */}
          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-[11px] md:text-xs font-black tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              <span className="transition-colors duration-200 text-neutral-800" style={{ color: theme.primaryColor }}>
                {lang === 'ko' ? 'English' : '한국어'}
              </span>
            </button>


            {/* Mobile menu trigger */}
            <button
              onClick={menuToggle}
              className="xl:hidden p-2 text-neutral-600 hover:text-neutral-900 border border-neutral-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu drawers */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-neutral-100 p-4 space-y-2 animate-fade-in flex flex-col text-left">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left py-2.5 px-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-sm font-semibold text-neutral-700"
              >
                {lang === 'ko' ? item.labelKo : item.labelEn}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 2. DYNAMIC HERO SECTION WITH EMBOSS SLOGANS */}
      <section 
        id="hero" 
        className="relative bg-white overflow-hidden py-16 md:py-32 flex flex-col justify-center items-center text-center shrink-0 border-b border-neutral-100"
        style={{ minHeight: '440px' }}
      >
        {/* Ambient bright travel/lake background image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-50 brightness-105" style={{ backgroundImage: `url(${welcomeKoreaBg})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/50"></div>

        {/* Brand visual banner element */}
        <div className="relative max-w-5xl mx-auto px-4 space-y-6 z-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-neutral-900 tracking-tight leading-tight uppercase font-sans">
            {lang === 'ko' ? '차별화된 신임과 공급가로' : 'Trustworthy Partnership,'}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})` }}>
              {lang === 'ko' ? '파트너의 가치를 완결합니다' : 'Supreme Land Operations'}
            </span>
          </h1>

          <p className="text-sm md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            {lang === 'ko'
              ? '서태국제여행사는 VIP 정식 의전, 고품격 버스 수배 자격, 기업 인바운드 투어 기획 능력을 완비한 직영 랜드 파트너입니다. 유통 수수료를 과감히 배제한 정량 공급 단가를 지원합니다.'
              : 'Direct assets ownership driving premier vehicle protocol services, customized itineraries and competitive partnership rates without middle-agency markup.'
            }
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center pt-4">
            <button
              onClick={() => scrollToSection('booking')}
              className="px-8 py-3.5 text-white font-extrabold rounded-lg hover:shadow-lg transition-all text-xs sm:text-sm uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: theme.primaryColor, borderColor: theme.primaryColor }}
            >
              {lang === 'ko' ? '실시간 랜드 견적 신청' : 'Request Land Quote Now'}
            </button>
            <button
              onClick={() => scrollToSection('tours')}
              className="px-8 py-3.5 bg-neutral-100/90 hover:bg-neutral-200/90 text-neutral-800 font-bold rounded-lg transition-all text-xs sm:text-sm uppercase tracking-wider border border-neutral-300/60 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {lang === 'ko' ? '추천 기획안 둘러보기' : 'Explore Custom Plans'}
            </button>
          </div>
        </div>
      </section>

      {/* 3. CO-LAB VALUES BANNER (Intro) */}
      <section id="intro" className="py-12 bg-neutral-50/50 border-b border-neutral-100 py-16 shrink-0 text-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#761A7E]" style={{ color: theme.primaryColor }}>
              {lang === 'ko' ? '왜 서태국제여행사인가?' : 'The Seotai Advantage'}
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
              {lang === 'ko' 
                ? '가장 검증되고 탄탄한 자산을 소유한 한국 정식 랜드 오퍼레이터' 
                : 'Pristine service delivery driven by direct asset oversight.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Value card 1 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm transition-all hover:shadow-md hover:border-purple-100 space-y-4">
              <div className="p-3 bg-purple-50 text-[#761A7E] rounded-md inline-block" style={{ color: theme.primaryColor, backgroundColor: `${theme.primaryColor}10` }}>
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-lg">{lang === 'ko' ? '직영 자산과 단가 최적화' : 'Direct Asset Network'}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {lang === 'ko'
                  ? '무의미한 랜드 총괄 딜러 마크업을 과감히 폐지하고 직접 연동된 가이드 및 벤 수배로 수임 수수료를 30% 이상 경감합니다.'
                  : 'By completely cutting middle-agency channels, we supply raw rates for premium shuttle vans, translation units, and group events.'
                }
              </p>
            </div>

            {/* Value card 2 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm transition-all hover:shadow-md hover:border-purple-100 space-y-4">
              <div className="p-3 bg-purple-50 text-[#761A7E] rounded-md inline-block" style={{ color: theme.primaryColor, backgroundColor: `${theme.primaryColor}10` }}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-lg">{lang === 'ko' ? '정부 인가 의전 자격 수임' : 'Certified Vouching'}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {lang === 'ko'
                  ? '외교 빈객 의전 가이드 수칙을 완벽히 이행하며 안전 사고 책임 공제 및 정부 허가 종합 보증보험 가입으로 철저한 안전을 전담합니다.'
                  : 'Fully compliant with national security protocols. Our team holds extensive insurance, guaranteeing client protection.'
                }
              </p>
            </div>

            {/* Value card 3 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm transition-all hover:shadow-md hover:border-purple-100 space-y-4">
              <div className="p-3 bg-purple-50 text-[#761A7E] rounded-md inline-block" style={{ color: theme.primaryColor, backgroundColor: `${theme.primaryColor}10` }}>
                <Map className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-lg">{lang === 'ko' ? '다국어 소통 마스터즈' : 'Multilingual Masters'}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {lang === 'ko'
                  ? '영어, 중국어, 광둥어, 태국어 전문 통역진을 가동하여 아시아 주요 인바운드 바이어 소통 리스크를 완벽 제로화로 다룹니다.'
                  : 'Experienced native-standard linguists ensure barrier-free communications, facilitating smooth transactions.'
                }
              </p>
            </div>

            {/* Value card 4 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm transition-all hover:shadow-md hover:border-purple-100 space-y-4">
              <div className="p-3 bg-purple-50 text-[#761A7E] rounded-md inline-block" style={{ color: theme.primaryColor, backgroundColor: `${theme.primaryColor}10` }}>
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-lg">{lang === 'ko' ? '24시간 무정체 즉답 시스템' : '24/7 Operations Desk'}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {lang === 'ko'
                  ? '메신저 혹은 웹 포털을 통해 접수된 건은 파트너 기획 가이드라인과 융합되어 즉시 전산 가동 및 단가 확정을 지원합니다.'
                  : 'Realtime quote analysis. Re-allocations, dining limit changes, or emergency routing updates are resolved within minutes.'
                }
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. RECOMMEND TOURS SECTION */}
      <section id="tours" className="py-20 bg-white shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{lang === 'ko' ? '서태 주관 명품 기획전' : 'Bespoke Inbound Itineraries'}</span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight">
                {lang === 'ko' ? '서태 명품 특화 연동 패키지' : 'Bespoke Tour Formulator'}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md block text-left">
              {lang === 'ko'
                ? '가장 대중적이고 바이어 만족도가 극대화됐던 보증 기획 코스 라인업입니다. 관리자 대시보드에서 실시간 일정 편집과 단가 변경이 용이합니다.'
                : 'Our pre-approved standard templates. Admins can alter descriptions, price currencies, and metadata instantly in the controls desk.'
              }
            </p>
          </div>

          {/* Standard custom tours render */}
          <ToursList 
            tours={tours} 
            lang={lang} 
            onBookClick={handleQuickBook} 
          />

        </div>
      </section>

      {/* 5. TRAVEL BOARD SECTION */}
      <section id="board" className="py-20 bg-neutral-50/50 border-t border-b border-neutral-100 shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{lang === 'ko' ? '서태 미디어 인사이트' : 'Dispatch Center'}</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {lang === 'ko' ? '공지사항 및 프리미엄 여행 정보 가이드' : 'Corporate Notices & Guidelines'}
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              {lang === 'ko' 
                ? '랜드 운영 규격, 정부 시책 안내, 최신 기획 요금 변동 소식을 빠르고 객관적으로 전달합니다.' 
                : 'Direct and transparent disclosures concerning Korea land systems and corporate peak incentives.'
              }
            </p>
          </div>

          <BoardSection 
            articles={articles} 
            lang={lang} 
          />

        </div>
      </section>

      {/* 6. BOOKING INQUIRY FORMS */}
      <section id="booking" className="py-20 bg-white shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <BookingForm 
            onNewInquirySubmitted={handleAddNewInquiry} 
            lang={lang} 
          />
        </div>
      </section>

      {/* 7. ADMIN DASHBOARD DESK MOUNT */}
      {showAdmin && (
        <section id="admin" className="py-16 bg-neutral-900 border-t-4 shrink-0 text-white scroll-mt-20" style={{ borderColor: theme.secondaryColor }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
            <div className="flex justify-between items-center text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">{lang === 'ko' ? '종합 제어소' : 'ADMIN CONTROL CENTER'}</span>
                <h2 className="text-2xl md:text-3xl font-black text-white">{lang === 'ko' ? '서태국제여행사 오피스 클라이언트' : 'Seotai Travel Office Desk'}</h2>
              </div>
              <button
                onClick={() => setShowAdmin(false)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-lg transition-all"
              >
                닫기 ✕
              </button>
            </div>

            <AdminDashboard
              tours={tours}
              onUpdateTours={setTours}
              articles={articles}
              onUpdateArticles={setArticles}
              inquiries={inquiries}
              onUpdateInquiries={setInquiries}
              navItems={navItems}
              onUpdateNavItems={setNavItems}
              footerConfig={footer}
              onUpdateFooter={setFooter}
              themeConfig={theme}
              onUpdateTheme={setTheme}
              lang={lang}
            />
          </div>
        </section>
      )}

      {/* 8. FOOTER CORPORATE MATTERS */}
      <footer id="seotai-global-footer" className="bg-neutral-950 text-neutral-400 py-16 px-4 md:px-8 border-t border-neutral-900 shrink-0 text-left text-xs md:text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo brand and short intro */}
          <div className="md:col-span-4 space-y-6">
            <SeotaiLogo 
              primaryColor="#FFFFFF" 
              secondaryColor={theme.secondaryColor} 
              size="md" 
              sloganText="LEADING KOREA LAND OPERATOR"
              subSloganText="(株) 瑞泰國際旅行社"
            />
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              {lang === 'ko'
                ? '서태국제여행사는 VIP 정밀 의전 수배, 소규모 비즈니스 대절 및 고품격 투어 가이드 자격을 충실히 수임하여 공급 가치를 정직하게 전담합니다.'
                : 'Direct and transparent fleet and elite guides connectivity in the Korean inbound marketplace.'
              }
            </p>
          </div>

          {/* Quick links footer shortcuts */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-extrabold text-white text-sm tracking-widest uppercase border-l-2 pl-2" style={{ borderColor: theme.secondaryColor }}>
              {lang === 'ko' ? '메뉴 단축 안내' : 'Quick Sitemap'}
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {navItems.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className="transition-colors cursor-pointer text-neutral-400"
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.secondaryColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a3a3a3'}
                  >
                    • {lang === 'ko' ? item.labelKo : item.labelEn}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => {
                    setShowAdmin(!showAdmin);
                    if (!showAdmin) {
                      setTimeout(() => {
                        const adminEl = document.getElementById('admin');
                        if (adminEl) {
                          adminEl.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                  className="transition-colors cursor-pointer text-neutral-400 text-left w-full"
                  onMouseEnter={(e) => e.currentTarget.style.color = theme.secondaryColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#a3a3a3'}
                  style={{ color: showAdmin ? theme.secondaryColor : undefined }}
                >
                  • {lang === 'ko' ? '관리자 대시보드 (오피스)' : 'Admin Dashboard'}
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate specifications */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <h4 className="font-extrabold text-white text-sm tracking-widest uppercase border-l-2 pl-2" style={{ borderColor: theme.secondaryColor }}>
              {lang === 'ko' ? '회사 정보 (Korea Office)' : 'Korea Office Details'}
            </h4>
            
            <div className="space-y-2 text-neutral-400 text-xs font-sans leading-relaxed">
              <div className="text-sm font-black text-white flex items-center gap-1.5">
                <span>{lang === 'ko' ? footer.companyNameKo : footer.companyNameEn}</span>
              </div>
              <p className="text-neutral-300 font-medium">
                {lang === 'ko' ? footer.addressKo : footer.addressEn}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1.5 mt-2 border-t border-neutral-900 text-neutral-400">
                <p>
                  <span className="font-semibold text-neutral-500">Tel:</span> {footer.telephone.replace("Tel: ", "").replace("대표전화: ", "")}
                </p>
                <p>
                  <span className="font-semibold text-neutral-500">Fax:</span> {footer.fax?.replace("Fax: ", "").replace("FAX: ", "")}
                </p>
                {footer.skype && (
                  <p className="sm:col-span-2">
                    <span className="font-semibold text-neutral-500">Skype:</span> <span className="text-neutral-300">{footer.skype.replace("Skype: ", "")}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-neutral-900 mt-2 space-y-1.5">
                <div className="bg-neutral-900/50 p-2 rounded-lg border border-neutral-800/60 leading-relaxed text-[11px] space-y-1">
                  <p className="font-semibold text-[#CBAF00] uppercase tracking-wider">Instant Messenger IDs:</p>
                  <p className="text-neutral-400">
                    <span className="font-semibold text-neutral-300">Line ID:</span> {footer.lineId || "palaphonkim"}
                    <span className="mx-1.5 text-neutral-800">|</span> 
                    <span className="font-semibold text-neutral-300">Kakao:</span> {footer.kakaoAccount || "ksh5313@msn.com"}
                    <span className="mx-1.5 text-neutral-800">|</span> 
                    <span className="font-semibold text-neutral-300">Wechat ID:</span> {footer.wechatId || "palaphonkim"}
                  </p>
                  <p className="text-neutral-400 pt-1 border-t border-neutral-900">
                    <span className="font-semibold text-neutral-300">Mobile Phone:</span> {footer.mobilePhone?.replace("Mobile Phone Number:", "") || " +82-10-8943-5311 (Whatsapp, Viber)"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 pt-1 text-[11px]">
                  <p>
                    <span className="font-semibold text-neutral-500">Website:</span>{" "}
                    <a href={`http://${footer.website || "www.seotaitravel.com"}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-neutral-200">
                      {footer.website || "www.seotaitravel.com"}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-500">Email:</span>{" "}
                    <span className="text-neutral-200">{footer.email.replace("Email : ", "").replace("Email: ", "").replace("이메일: ", "")}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-600 font-mono">
          <p>© {new Date().getFullYear()} Seotai Travel. All Inbound Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#hero" className="hover:underline">{lang === 'ko' ? '이용 약관' : 'Terms of Service'}</a>
            <span>|</span>
            <a href="#hero" className="hover:underline">{lang === 'ko' ? '개인정보 처리방침' : 'Privacy Statement'}</a>
            <span>|</span>
            <button
              onClick={() => {
                setShowAdmin(!showAdmin);
                if (!showAdmin) {
                  setTimeout(() => {
                    const adminEl = document.getElementById('admin');
                    if (adminEl) {
                      adminEl.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                  }, 100);
                }
              }}
              className="hover:underline cursor-pointer text-neutral-500 hover:text-neutral-300 transition-colors"
              style={{ color: showAdmin ? theme.secondaryColor : undefined }}
            >
              {lang === 'ko' ? '관리자 대시보드' : 'Admin Dashboard'}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
