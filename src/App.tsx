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
  Map, PhoneCall, ChevronRight, Menu, X, Check, Laptop, HeartHandshake, Eye,
  Activity, Heart, Stethoscope
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

const MEDICAL_PROGRAMS = [
  {
    nameKo: "소화기 정밀 안심 검진 (Digestive System Precision)",
    nameEn: "Digestive System Precision Examination",
    duration: "2 Days & 1 Night",
    room: "Single VIP Hospital Room Included (1인 전용 병동 포함)",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    detailsKo: "위, 식도, 십이지장 궤양, 위암 등 정밀 안심 위 조영 촬영 및 수면 위내시경 진단 패키지.",
    detailsEn: "Gastroscopy (Sleep type, sedation), comprehensive stomach, esophagus, duodenal ulcer, and stomach cancer screening."
  },
  {
    nameKo: "심장 정밀 진단 패키지 A (Heart Precision A)",
    nameEn: "Heart Precision Examination A",
    duration: "2 Days & 1 Night",
    room: "Single VIP Hospital Room Included (1인 전용 병동 포함)",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    detailsKo: "심장초음파, 경동맥초음파, 심혈관 석회화도 CT 촬영 등으로 허혈성 심혈관 질환 위험 조기 규격 예측.",
    detailsEn: "Echocardiogram, Carotid ultrasound, Calcium scoring CT. Evaluate cardiovascular disease risk factor and atherosclerosis."
  },
  {
    nameKo: "심장 정밀 진단 패키지 B (Heart Precision B)",
    nameEn: "Heart Precision Examination B",
    duration: "2 Days & 1 Night",
    room: "Single VIP Hospital Room Included (1인 전용 병동 포함)",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    detailsKo: "심장 조영 CT 및 심혈관 조영술 연계. 비침습적 관상동맥 협착 및 심장 기능 정밀 판독 프로그램.",
    detailsEn: "Cardiac CT Angiography. Non-invasive evaluation of heart & coronary artery stenosis and cardiac function."
  },
  {
    nameKo: "뇌 정밀 신경 패키지 (Brain Precision)",
    nameEn: "Brain Precision Examination",
    duration: "2 Days & 1 Night",
    room: "Single VIP Hospital Room Included (1인 전용 병동 포함)",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    detailsKo: "뇌 MRI 및 경동맥 초음파 포함. 뇌종양, 뇌경색, 뇌출혈, 알츠하이머 위험 요인의 조기 신경 정밀 진단.",
    detailsEn: "Brain MRI, Carotid ultrasound. Diagnose/prevent brain tumor, cerebral hemorrhage, and carotid arterial diseases."
  },
  {
    nameKo: "암 정밀 올인원 패키지 (Cancer/Oncology Precision)",
    nameEn: "Cancer Precision Examination",
    duration: "2 Days & 1 Night",
    room: "Single VIP Hospital Room Included (1인 전용 병동 포함)",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    detailsKo: "수면 위/대장 내시경 검사, 복부 정밀 MRI, 핵심 종양 마커 진단으로 인체 필수 암 완벽 스크리닝.",
    detailsEn: "Brain MRI, Gastroscopy, Sleep endoscopy, multi-screening for key oncology pathways & tumor marker checks."
  }
];

const BEAUTY_COURSES = [
  {
    nameKo: "베이직 동안 쁘띠 케어 (Basic Course)",
    nameEn: "Basic Wellness Course",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    scheduleKo: [
      "1일차: 침샘/사각턱 보톡스 + 슈링크 300샷 + 인모드 FX (얼굴 윤곽 축소 시술)",
      "2일차: 리쥬란 힐러 2cc + 플래토어 보습 주사 8cc + 고농도 비타민 수액 테라피"
    ],
    scheduleEn: [
      "Day 1: Jaw/Salivary Botox + Shurink 300shots + Inmode FX lifting",
      "Day 2: Rejuran Healer 2cc + Plator injection 8cc + Premium Vitamin IV block"
    ],
    badgeKo: "기본 탄력 & 주름 개선",
    badgeEn: "Elasticity & Fine Wrinkles"
  },
  {
    nameKo: "프리미엄 동안 케어 (Premium Course)",
    nameEn: "Premium Youth Course",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    scheduleKo: [
      "1일차: 리프테라 리프팅 + 울쎄라 300샷 + 리니어펌 500샷 + 올리지오 300샷 타이트닝",
      "2일차: 포텐자 레이저 시술 + 엑소좀 아기주사 (세포 재생) + 아쿠아필 딥클렌징 + 비타민 앰플 케어"
    ],
    scheduleEn: [
      "Day 1: Liftera 1site + Ulthera 300shots + Linearfirm 500shots + Oligio 300shots",
      "Day 2: Potenza technique + Exosome skin cell booster + Aqua peel clean + Vitamin Care"
    ],
    badgeKo: "강력 추천 시그니처",
    badgeEn: "Highly Recommended Signature"
  },
  {
    nameKo: "럭셔리 V라인 안티에이징 (Luxury Course)",
    nameEn: "Luxury Anti-Aging Course",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    scheduleKo: [
      "1일차: 리프테라 + 울쎄라 300샷 + 써마지 FLX 300샷 (콜라겐 원천 재생) + 리니어펌 500샷 토탈 리프팅",
      "2일차: 포텐자 + 프리미엄 엑소좀 진피 주입 + 나노 PCL 전밀 아이 주름 케어 + 명품 멀티 비타민 IV 영양 수액"
    ],
    scheduleEn: [
      "Day 1: Liftera 1site + Ulthera 300shots + Thermage FLX 300shots + Linearfirm 500shots",
      "Day 2: Potenza + Exosome regeneration + Nano PCL youth eye injection + High potency Vitamin IV"
    ],
    badgeKo: "최상위 토탈 하이엔드",
    badgeEn: "Elite Total High-End"
  },
  {
    nameKo: "바디 슬리밍 타이트 라인 (Body Line Course)",
    nameEn: "Body Contouring Course",
    priceKo: "비용 : 별도문의",
    priceEn: "Price: Upon Request",
    scheduleKo: [
      "집중 전담 케어: 바디 타이트닝 보톡스 100유닛 + GPC 특수 지방분해 주사 + 울트라S 고주파 지방 연소 900샷"
    ],
    scheduleEn: [
      "Intensive Escorted Care: Body Botox 100units + GPC fat dissolving injection + Ultra S 900shots"
    ],
    badgeKo: "체형 및 라인 교정",
    badgeEn: "Safe Silhouette Sculpture"
  }
];

export default function App() {
  // Localization toggle State
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [aboutTab, setAboutTab] = useState<'why' | 'medical' | 'beauty'>('why');
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

      {/* 3. CO-LAB VALUES & BROCHURE SERVICES (Intro) */}
      <section id="intro" className="py-16 bg-neutral-50/50 border-b border-neutral-100 shrink-0 text-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#761A7E]" style={{ color: theme.primaryColor }}>
              {lang === 'ko' ? '서태국제여행사 소개' : 'About Seotai Travel'}
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ko' 
                ? '한국 내 유일무이한 인바운드 명품 의전부터 의료, 뷰티 협약 패키지까지 직접 조율하는 정식 랜드사입니다. 아래 탭에서 자세한 제공 내역을 확인하세요.' 
                : 'South Korea\'s premium certified direct land operator managing custom VIP protocols, oncology medicine, and elite cosmetics programs.'
              }
            </p>

            {/* Tab Navigation Switcher - Color coded with elegant distinct outlines and subtle colored backgrounds for maximum visual impact */}
            <div className="flex flex-wrap justify-center gap-3 pt-6 pb-2">
              <button
                onClick={() => setAboutTab('why')}
                className={`px-6 py-3 text-xs md:text-sm font-black rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2.5 shadow-sm transform active:scale-95 ${
                  aboutTab === 'why'
                    ? 'bg-purple-100 border-[#761A7E] text-[#761A7E] ring-2 ring-purple-200'
                    : 'bg-white/80 border-neutral-200 text-neutral-600 hover:bg-purple-50/50 hover:border-purple-300 hover:text-[#761A7E]'
                }`}
                style={{
                  borderColor: aboutTab === 'why' ? theme.primaryColor : undefined,
                  color: aboutTab === 'why' ? theme.primaryColor : undefined,
                  backgroundColor: aboutTab === 'why' ? `${theme.primaryColor}15` : undefined
                }}
              >
                <Award className={`w-4 h-4 md:w-5 md:h-5 ${aboutTab === 'why' ? 'text-[#761A7E]' : 'text-neutral-400 group-hover:text-[#761A7E]'}`} style={{ color: aboutTab === 'why' ? theme.primaryColor : undefined }} />
                {lang === 'ko' ? '회사소개 및 강점' : 'About & Strengths'}
              </button>

              <button
                onClick={() => setAboutTab('medical')}
                className={`px-6 py-3 text-xs md:text-sm font-black rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2.5 shadow-sm transform active:scale-95 ${
                  aboutTab === 'medical'
                    ? 'bg-teal-100 border-teal-600 text-teal-800 ring-2 ring-teal-200'
                    : 'bg-white/80 border-neutral-200 text-neutral-600 hover:bg-teal-50/50 hover:border-teal-300 hover:text-teal-700'
                }`}
              >
                <Stethoscope className={`w-4 h-4 md:w-5 md:h-5 ${aboutTab === 'medical' ? 'text-teal-600' : 'text-neutral-400'}`} />
                {lang === 'ko' ? 'K-메디컬 건강검진 패키지' : 'K-Medical Checkups'}
              </button>

              <button
                onClick={() => setAboutTab('beauty')}
                className={`px-6 py-3 text-xs md:text-sm font-black rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2.5 shadow-sm transform active:scale-95 ${
                  aboutTab === 'beauty'
                    ? 'bg-pink-100 border-pink-600 text-pink-800 ring-2 ring-pink-200'
                    : 'bg-white/80 border-neutral-200 text-neutral-600 hover:bg-pink-50/50 hover:border-pink-300 hover:text-pink-700'
                }`}
              >
                <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${aboutTab === 'beauty' ? 'text-pink-600' : 'text-neutral-400'}`} />
                {lang === 'ko' ? 'K-뷰티 전담 피부/미용 시술' : 'K-Beauty & Cosmetics'}
              </button>
            </div>
          </div>

          {/* Tab 1: WHY SEOTAI */}
          {aboutTab === 'why' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fadeIn">
              {/* Value card 1 */}
              <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm transition-all hover:shadow-md hover:border-purple-100 space-y-4">
                <div className="p-3 bg-purple-50 text-[#761A7E] rounded-md inline-block" style={{ color: theme.primaryColor, backgroundColor: `${theme.primaryColor}10` }}>
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-neutral-900 text-lg">{lang === 'ko' ? '직영 자산과 단가 최적화' : 'Direct Asset Network'}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed text-left">
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
                <p className="text-xs text-neutral-500 leading-relaxed text-left">
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
                <p className="text-xs text-neutral-500 leading-relaxed text-left">
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
                <p className="text-xs text-neutral-500 leading-relaxed text-left">
                  {lang === 'ko'
                    ? '메신저 혹은 웹 포털을 통해 접수된 건은 파트너 기획 가이드라인과 융합되어 즉시 전산 가동 및 단가 확정을 지원합니다.'
                    : 'Realtime quote analysis. Re-allocations, dining limit changes, or emergency routing updates are resolved within minutes.'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: MEDICAL PROGRAMS */}
          {aboutTab === 'medical' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Highlight Partner Banner */}
              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-left">
                  <span className="px-3 py-1 text-[10px] md:text-xs font-bold text-[#761A7E] rounded-full inline-block" style={{ color: theme.primaryColor, backgroundColor: `${theme.primaryColor}10` }}>
                    {lang === 'ko' ? '서태 정전 협력 MOU 독점가' : 'Official Partner Co-Lab Exclusive Direct Rates'}
                  </span>
                  <h3 className="text-lg md:text-xl font-black text-[#761A7E]" style={{ color: theme.primaryColor }}>
                    {lang === 'ko' ? 'KOREA MEDICAL 종합 정밀 안전 검진 센터' : 'Korea Premier Medical Precision Diagnostics'}
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-3xl leading-relaxed">
                    {lang === 'ko'
                      ? '서태국제여행사는 보건복지부 인가 정식 외국인 의료 관광 유치기관으로서 더 자인병원(THE JAIN HOSPITAL), 디자인병원 등 주요 거점 권역 병원을 통해 한국 최고 수준의 정밀 종합 검진 패키지를 독점 연계 제공합니다.'
                      : 'Seotai is a federally authorized medical tourism operator. We partner directly with premium centers including THE JAIN HOSPITAL, ensuring fully escorted executive screening.'
                    }
                  </p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100/60 text-center md:text-right shrink-0 min-w-[200px] w-full md:w-auto">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block tracking-wider">{lang === 'ko' ? '서태 패키지 혜택' : 'Seotai Exclusive Bonus'}</span>
                  <span className="text-xs md:text-sm font-bold text-neutral-800 block mt-1">{lang === 'ko' ? '왕복 공항 리무진 픽업 무상 제공' : 'Roundtrip Luxury Limousine Included'}</span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">{lang === 'ko' ? '인천/김포공항 <> 서울 숙소' : 'Incheon Airport <> Seoul Hotel Escorting'}</span>
                </div>
              </div>

              {/* Programs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MEDICAL_PROGRAMS.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between text-left">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <span className="px-2.5 py-0.5 bg-neutral-100 text-[10px] text-neutral-600 font-bold rounded-md block">
                          {lang === 'ko' ? item.duration : '2 Days & 1 Night'}
                        </span>
                        <span className="text-sm font-black text-rose-600">
                          {lang === 'ko' ? item.priceKo : item.priceEn}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-neutral-800 text-base md:text-lg tracking-tight min-h-[44px]">
                        {lang === 'ko' ? item.nameKo : item.nameEn}
                      </h4>
                      <div className="text-[10px] text-neutral-400 font-bold font-mono">
                        {lang === 'ko' ? item.room : item.room}
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed pt-2 border-t border-neutral-50 min-h-[60px]">
                        {lang === 'ko' ? item.detailsKo : item.detailsEn}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleQuickBook(`Medical Inquiry - ${lang === 'ko' ? item.nameKo : item.nameEn}`)}
                      className="w-full mt-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer border-0"
                    >
                      {lang === 'ko' ? '실시간 검진 문의' : 'Inquire Booking'}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: BEAUTY SPECIALIST */}
          {aboutTab === 'beauty' && (
            <div className="space-y-8 animate-fadeIn text-left">
              {/* Highlight Partner Banner */}
              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 bg-yellow-50 text-xs font-bold text-[#CBAF00] rounded-full border border-yellow-200 inline-block" style={{ color: theme.secondaryColor, backgroundColor: `${theme.secondaryColor}10` }}>
                    {lang === 'ko' ? '한국 NO.1 피부과 프랜차이즈 연동' : 'Premium K-Beauty Medical Aesthetics Partnership'}
                  </span>
                  <h3 className="text-base md:text-xl font-black text-[#761A7E]" style={{ color: theme.primaryColor }}>
                    {lang === 'ko' ? 'K-BEAUTY 프리미엄 동안 피부 정량 클리닉' : 'VIP K-Beauty Custom Skin & Body Programs'}
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-3xl leading-relaxed">
                    {lang === 'ko'
                      ? '바이오페이스 클리닉(BIOFACE CLINIC) 6대 대형 네트워크 정밀 연공 계약. 불법 복제 팁/약재 사용을 일절 거부하고 정량, 정품 승인 원칙을 고수합니다. 개인 맞춤 쁘띠 성형부터 피부 안티에이징 기술까지 실시간 연동해 드립니다.'
                      : 'Cooperating directly with BIOFACE CLINIC major offline medical beauty frameworks. High-performance micro-current, pure exosome boosters, and certified wrinkle therapies with direct guide assistance.'
                    }
                  </p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100/60 text-center md:text-right shrink-0 min-w-[200px] w-full md:w-auto">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block tracking-wider">{lang === 'ko' ? '서태 단독 에스코트 프로모션' : 'Seotai Direct Care'}</span>
                  <span className="text-xs md:text-sm font-bold text-[#761A7E] block mt-1" style={{ color: theme.primaryColor }}>{lang === 'ko' ? '리무진 이송 + 전담 통역 코디 연동' : 'VIP Limousine + Dedicated Bilingual Guide'}</span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">{lang === 'ko' ? '시술 중 소통 및 불찰 전면 예방' : 'Zero Communication Risk Guarantee'}</span>
                </div>
              </div>

              {/* Anatomy target guidelines from bioface */}
              <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-2 border-r border-neutral-100 pr-4">
                  <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">{lang === 'ko' ? '침샘 보톡스 집중 수술 부위' : 'Certified Salivary Gland Target'}</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed md:block hidden">
                    {lang === 'ko'
                      ? '과도하게 팽창된 귀밑샘, 턱밑샘 침샘을 조절하고 이중턱 양끝을 타이트하게 연동시켜 슬림하고 세련된 페이스라인 윤곽을 연출 조율합니다.'
                      : 'Precisely shrinks salivary gland volumes resulting in instant double chin contouring.'
                    }
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { titleKo: "귀밑 침샘", titleEn: "Sub-ear Salivary Gland", descKo: "턱 밑 양끝 외측을 줄여 턱선 복원", descEn: "Slimming from jaw muscle to back of ear" },
                    { titleKo: "턱밑 침샘", titleEn: "Under-ear Salivary Gland", descKo: "이중턱 라인의 볼록한 부위 처짐 해결", descEn: "Resolve lateral double chin swell" },
                    { titleKo: "저작근 사각턱", titleEn: "Jaw Muscle (Square Jaw)", descKo: "과도한 턱 근육 대칭 축소 슬리밍", descEn: "Jaw muscle slimming & contour" },
                    { titleKo: "심부볼 파괴", titleEn: "Deep Cheek Fat Reduction", descKo: "볼살 제거 및 리프팅 연동 윤곽 확보", descEn: "Slimming cheeks & contour injection effect" },
                    { titleKo: "이중턱 V-라인", titleEn: "Double Chin V-Line", descKo: "처진 연부 조직 수렴 탄력 최고 보강", descEn: "Lifting double chin elasticity" },
                    { titleKo: "종합 전문 레이저", titleEn: "Specialized Laser Treatment", descKo: "토닝, 클라리티, 제네시스, 피코듀오", descEn: "Pico, Potenza, Exosome skin barrier glow" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-neutral-50/50 p-2.5 rounded-lg border border-neutral-100 space-y-1">
                      <span className="text-xs font-extrabold text-[#761A7E] block" style={{ color: theme.primaryColor }}>
                        {lang === 'ko' ? item.titleKo : item.titleEn}
                      </span>
                      <span className="text-[10px] text-neutral-500 block leading-tight">
                        {lang === 'ko' ? item.descKo : item.descEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beauty Packages Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {BEAUTY_COURSES.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <span className="px-2 py-0.5 bg-yellow-50 text-[10px] text-[#CBAF00] font-bold rounded" style={{ color: theme.secondaryColor, backgroundColor: `${theme.secondaryColor}15` }}>
                          {lang === 'ko' ? item.badgeKo : item.badgeEn}
                        </span>
                        <span className="text-xs md:text-sm font-black text-rose-600">
                          {lang === 'ko' ? item.priceKo : item.priceEn}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-neutral-800 text-sm md:text-base tracking-tight min-h-[40px]">
                        {lang === 'ko' ? item.nameKo : item.nameEn}
                      </h4>
                      
                      <div className="space-y-3 pt-2 border-t border-neutral-50 text-xs text-neutral-500 leading-relaxed">
                        {(lang === 'ko' ? item.scheduleKo : item.scheduleEn).map((day, dIdx) => (
                          <div key={dIdx} className="flex gap-1.5 items-start text-[11px] leading-relaxed">
                            <span className="text-[#CBAF00] font-bold shrink-0" style={{ color: theme.secondaryColor }}>✓</span>
                            <span>{day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleQuickBook(`K-Beauty Inquiry - ${lang === 'ko' ? item.nameKo : item.nameEn}`)}
                      className="w-full mt-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer border-0"
                    >
                      {lang === 'ko' ? '정밀 패키지 상담' : 'Consult Schedule'}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
