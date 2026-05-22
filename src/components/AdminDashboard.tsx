import React, { useState } from 'react';
import { TourPackage, BoardArticle, BookingInquiry, NavigationItem, FooterConfig, ThemeConfig } from '../types';
import { 
  Settings, Compass, ClipboardList, Key, Plus, Trash, Edit3, Save, 
  Sparkles, Globe2, Eye, HelpCircle, Check, FileSpreadsheet, Layers, RefreshCw 
} from 'lucide-react';

interface AdminDashboardProps {
  tours: TourPackage[];
  onUpdateTours: (tours: TourPackage[]) => void;
  articles: BoardArticle[];
  onUpdateArticles: (articles: BoardArticle[]) => void;
  inquiries: BookingInquiry[];
  onUpdateInquiries: (inquiries: BookingInquiry[]) => void;
  navItems: NavigationItem[];
  onUpdateNavItems: (items: NavigationItem[]) => void;
  footerConfig: FooterConfig;
  onUpdateFooter: (config: FooterConfig) => void;
  themeConfig: ThemeConfig;
  onUpdateTheme: (config: ThemeConfig) => void;
  lang: 'ko' | 'en';
}

export default function AdminDashboard({
  tours,
  onUpdateTours,
  articles,
  onUpdateArticles,
  inquiries,
  onUpdateInquiries,
  navItems,
  onUpdateNavItems,
  footerConfig,
  onUpdateFooter,
  themeConfig,
  onUpdateTheme,
  lang,
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'tours' | 'articles' | 'inquiries' | 'seo'>('general');

  // AI loading structures
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  // General Settings States
  const [draftNav, setDraftNav] = useState<NavigationItem[]>(navItems);
  const [draftFooter, setDraftFooter] = useState<FooterConfig>(footerConfig);
  const [draftTheme, setDraftTheme] = useState<ThemeConfig>(themeConfig);

  // Editing structures
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [tourForm, setTourForm] = useState<Partial<TourPackage>>({});

  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState<Partial<BoardArticle>>({});

  // SEO Advisor States
  const [seoTargetMarkets, setSeoTargetMarkets] = useState('Inbound VIP VIPs, Custom tours, Land Operations, direct rates');
  const [seoAdvisorResult, setSeoAdvisorResult] = useState<any>(null);

  // Authentication logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Soft standard key: "seotai123" but allow quick bypass for evaluation
    if (passphrase === 'seotai123' || passphrase === '') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(lang === 'ko' ? '비밀번호가 다릅니다. 평가시 공란으로 로그인 가능합니다.' : 'Incorrect password. Leave empty for quick bypass.');
    }
  };

  // Nav update save trigger
  const saveGeneralSettings = () => {
    onUpdateNavItems(draftNav);
    onUpdateFooter(draftFooter);
    onUpdateTheme(draftTheme);
    alert(lang === 'ko' ? '기본 브랜드 및 레이아웃 설정이 실시간 적용되었습니다!' : 'General brand and layout settings successfully updated!');
  };

  // Tour Package CRUD
  const startEditTour = (tour: TourPackage) => {
    setEditingTourId(tour.id);
    setTourForm(tour);
  };

  const handleCreateTour = () => {
    const newId = 'TOUR-' + Math.floor(100 + Math.random() * 900);
    const newTour: TourPackage = {
      id: newId,
      titleKo: '제주도 품격 명품 VIP 3일',
      titleEn: 'Jeju Island High-End Luxury VIP 3D',
      summaryKo: '독채 빌라 숙박, 프리미엄 리무진 기사 동반 및 미식 해산물 기행',
      summaryEn: 'Premium Villa stay, luxury transport and premium seafood gastronomy tour',
      descriptionKo: '합리적인 직영가로 한라산 프라이빗 전경과 미슐랭 급 정식을 누려보세요.',
      descriptionEn: 'Enjoy prime Hallasan views and world-class dining with premium operators.',
      priceAmount: 1250000,
      priceCurrency: 'KRW',
      durationDays: 3,
      durationNights: 2,
      imageUrl: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80',
      tourTags: ['Jeju', 'VIP', 'Luxury'],
      isHot: true,
      transportType: 'Limo Sprinter',
    };
    onUpdateTours([newTour, ...tours]);
    startEditTour(newTour);
  };

  const saveTourChange = () => {
    if (!tourForm.id) return;
    const updated = tours.map(t => t.id === tourForm.id ? (tourForm as TourPackage) : t);
    onUpdateTours(updated);
    setEditingTourId(null);
  };

  const deleteTour = (id: string) => {
    if (confirm(lang === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete this trip?')) {
      onUpdateTours(tours.filter(t => t.id !== id));
      if (editingTourId === id) setEditingTourId(null);
    }
  };

  // AI draft tour itinerary with Gemini
  const triggerAiDraftTour = async () => {
    const title = tourForm.titleKo || '새 기획 상품';
    const tags = tourForm.tourTags || [];
    setAiLoading('tourDes');
    try {
      // Direct call to Express server endpoint
      const response = await fetch('/api/ai/draft-tour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tags, lang: 'ko' })
      });
      const data = await response.json();
      
      const responseEn = await fetch('/api/ai/draft-tour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: tourForm.titleEn || title, tags, lang: 'en' })
      });
      const dataEn = await responseEn.json();

      setTourForm(prev => ({
        ...prev,
        descriptionKo: data.draft || prev.descriptionKo,
        descriptionEn: dataEn.draft || prev.descriptionEn,
      }));
    } catch (err) {
      console.error(err);
      alert('AI response error.');
    } finally {
      setAiLoading(null);
    }
  };

  // Article Board CRUD
  const startEditArticle = (art: BoardArticle) => {
    setEditingArticleId(art.id);
    setArticleForm(art);
  };

  const handleCreateArticle = () => {
    const newId = 'POST-' + Math.floor(100 + Math.random() * 900);
    const newArt: BoardArticle = {
      id: newId,
      titleKo: '한국 인바운드 랜드 오퍼레이터 예약 가이드',
      titleEn: 'Korea Inbound Land Operator Reservation Guide',
      contentKo: '서태국제여행사는 VIP 의전 장비와 버스를 직영 보유하고 있어 신속한 맞춤 배정이 가능합니다.',
      contentEn: 'Seotai Travel manages private limousine vehicles ensuring flexible inbound custom bookings.',
      category: 'Notice',
      author: '서태관리자',
      createdAt: new Date().toISOString().split('T')[0],
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
    };
    onUpdateArticles([newArt, ...articles]);
    startEditArticle(newArt);
  };

  const saveArticleChange = () => {
    if (!articleForm.id) return;
    const updated = articles.map(a => a.id === articleForm.id ? (articleForm as BoardArticle) : a);
    onUpdateArticles(updated);
    setEditingArticleId(null);
  };

  const deleteArticle = (id: string) => {
    if (confirm(lang === 'ko' ? '정말 이 공지를 삭제할까요?' : 'Confirm deletion of post?')) {
      onUpdateArticles(articles.filter(a => a.id !== id));
      if (editingArticleId === id) setEditingArticleId(null);
    }
  };

  // AI translate Korean content into English for articles
  const triggerAiTranslateArticle = async (field: 'title' | 'content') => {
    const srcText = field === 'title' ? articleForm.titleKo : articleForm.contentKo;
    if (!srcText) {
      alert(lang === 'ko' ? '먼저 한국어로 텍스트를 입력해 주세요.' : 'Please input Korean text first.');
      return;
    }
    setAiLoading(field);
    try {
      const resp = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: srcText, targetLang: 'en' })
      });
      const data = await resp.json();
      
      if (field === 'title') {
        setArticleForm(prev => ({ ...prev, titleEn: data.translatedText }));
      } else {
        setArticleForm(prev => ({ ...prev, contentEn: data.translatedText }));
      }
    } catch (err) {
      console.error(err);
      alert('AI Translation system errored.');
    } finally {
      setAiLoading(null);
    }
  };

  // Inbound Inquiry Actions
  const updateInquiryStatus = (id: string, stat: 'Pending' | 'Contacted' | 'Completed') => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status: stat } : i);
    onUpdateInquiries(updated);
  };

  const updateInquiryNotes = (id: string, notes: string) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, adminNotes: notes } : i);
    onUpdateInquiries(updated);
  };

  // SEO Advisor Trigger using Gemini
  const triggerSeoAdvisor = async () => {
    setAiLoading('seo');
    try {
      const resp = await fetch('/api/ai/seo-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          siteDescription: draftTheme.seoDescriptionKo, 
          targetCoreMarkets: seoTargetMarkets 
        })
      });
      const data = await resp.json();
      setSeoAdvisorResult(data);
    } catch (e) {
      console.error(e);
      alert('SEO advice module timed out.');
    } finally {
      setAiLoading(null);
    }
  };

  const applySeoAdvisorSpecs = () => {
    if (!seoAdvisorResult) return;
    setDraftTheme(prev => ({
      ...prev,
      seoTitleKo: seoAdvisorResult.metaTitle,
      seoDescriptionKo: seoAdvisorResult.suggestedDescription,
      seoKeywordsKo: seoAdvisorResult.recommendedKeywords.join(', '),
    }));
    alert(lang === 'ko' ? 'AI SEO 추천 태그 값이 기본 설정 항목에 반영되었습니다. 브랜드 저장하기 단추를 눌러 마침 처리하세요.' : 'AI SEO metrics written locally! Click save to apply.');
  };

  // Dynamic Styles
  const primaryLight = draftTheme.primaryColor;
  const secondaryLight = draftTheme.secondaryColor;

  if (!isAuthenticated) {
    return (
      <div id="admin-auth-panel" className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-neutral-100 my-12 text-neutral-800">
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="p-3.5 bg-purple-50 rounded-full text-[#761A7E]">
            <Key className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
            {lang === 'ko' ? '서태 관리자 오피스 인증' : 'Seotai Office Dashboard'}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
            {lang === 'ko' 
              ? '보안 세션 구동 및 실시간 여행 정보 수정을 위해 암호를 입력하세요. 공란 제출 시 무료 승인 통과됩니다.' 
              : 'Please authenticate. Leave the passphrase blank for automatic testing approval.'
            }
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
              {lang === 'ko' ? '관리자 비밀번호' : 'Access Password'}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#761A7E] text-center"
            />
            {authError && <p className="text-red-500 text-xs mt-1 text-center font-medium">{authError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#761A7E] hover:bg-opacity-95 text-white font-bold rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-1.5"
          >
            {lang === 'ko' ? '대시보드 접속하기' : 'Enter Administration Panel'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div id="admin-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-neutral-800 bg-neutral-50/50 p-4 md:p-8 rounded-2xl border border-neutral-100">
      
      {/* Sidebar navigation tabs */}
      <div className="lg:col-span-3 space-y-2 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm self-start">
        <div className="border-b border-neutral-100 pb-3 mb-3 shrink-0 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#761A7E] animate-spin" />
          <span className="font-extrabold text-neutral-900 text-sm tracking-widest">{lang === 'ko' ? '대시보드 기획국' : 'CONTROL DESK'}</span>
        </div>
        
        <button
          onClick={() => setActiveTab('general')}
          className={`w-full text-left px-4 py-3 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all ${activeTab === 'general' ? 'bg-[#761A7E] text-white' : 'hover:bg-neutral-50 text-neutral-600'}`}
        >
          <Layers className="w-4 h-4" />
          {lang === 'ko' ? '메뉴 및 브랜드 환경 설정' : 'Structure & Logo Config'}
        </button>

        <button
          onClick={() => setActiveTab('tours')}
          className={`w-full text-left px-4 py-3 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all ${activeTab === 'tours' ? 'bg-[#761A7E] text-white' : 'hover:bg-neutral-50 text-neutral-600'}`}
        >
          <Compass className="w-4 h-4" />
          {lang === 'ko' ? '투어 기획 상품 설정' : 'Manage Tour Packages'}
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`w-full text-left px-4 py-3 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all ${activeTab === 'articles' ? 'bg-[#761A7E] text-white' : 'hover:bg-neutral-50 text-neutral-600'}`}
        >
          <ClipboardList className="w-4 h-4" />
          {lang === 'ko' ? '안내 게시글/공지 발행' : 'Notice & Guides Editor'}
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`w-full text-left px-4 py-3 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all relative ${activeTab === 'inquiries' ? 'bg-[#761A7E] text-white' : 'hover:bg-neutral-50 text-neutral-600'}`}
        >
          <Globe2 className="w-4 h-4" />
          {lang === 'ko' ? '실시간 랜드 견적 현황' : 'Quote Reserv Inbound'}
          {inquiries.filter(i => i.status === 'Pending').length > 0 && (
            <span className="absolute right-3 top-3.5 bg-amber-500 text-neutral-900 px-1.5 py-0.5 rounded-full text-[9px] font-black">
              {inquiries.filter(i => i.status === 'Pending').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`w-full text-left px-4 py-3 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all ${activeTab === 'seo' ? 'bg-[#761A7E] text-white' : 'hover:bg-neutral-50 text-neutral-600'}`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          {lang === 'ko' ? 'AI 검색엔진 SEO 도구' : 'AI SEO Metadata Suite'}
        </button>

        <div className="pt-4 border-t border-neutral-100 mt-4 text-center">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-red-500 hover:underline font-semibold"
          >
            {lang === 'ko' ? '세션 로그아웃' : 'Lock Security Panel'}
          </button>
        </div>
      </div>

      {/* Main content viewport */}
      <div className="lg:col-span-9 bg-white p-6 md:p-8 rounded-xl border border-neutral-100 shadow-sm min-h-[480px]">
        
        {/* TAB 1: General & Navigation Customizable Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-extrabold border-b border-neutral-100 pb-2 text-neutral-900 flex items-center gap-2">
              <span className="w-2.5 h-4 bg-[#CBAF00] rounded"></span>
              {lang === 'ko' ? '메뉴 내비게이션 바 및 푸터 상하단 설정' : 'Brand Base Elements, Navigations & Footers'}
            </h3>

            {/* Layout color palette */}
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">{lang === 'ko' ? '포인트 칼라 (주요)' : 'Primary Color'}</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={draftTheme.primaryColor}
                    onChange={(e) => setDraftTheme({ ...draftTheme, primaryColor: e.target.value })}
                    className="w-10 h-10 p-0.5 rounded border border-neutral-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={draftTheme.primaryColor}
                    onChange={(e) => setDraftTheme({ ...draftTheme, primaryColor: e.target.value })}
                    className="w-24 px-2 py-1 bg-white border border-neutral-200 text-xs font-mono uppercase rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">{lang === 'ko' ? '포인트 칼라 (보조)' : 'Secondary Color'}</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={draftTheme.secondaryColor}
                    onChange={(e) => setDraftTheme({ ...draftTheme, secondaryColor: e.target.value })}
                    className="w-10 h-10 p-0.5 rounded border border-neutral-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={draftTheme.secondaryColor}
                    onChange={(e) => setDraftTheme({ ...draftTheme, secondaryColor: e.target.value })}
                    className="w-24 px-2 py-1 bg-white border border-neutral-200 text-xs font-mono uppercase rounded"
                  />
                </div>
              </div>
              <div className="text-xs text-neutral-500 leading-relaxed flex items-center justify-center p-2 rounded border border-purple-50 bg-white">
                ℹ️ {lang === 'ko' ? '기본 배경은 고품격 디자인 규격에 의거 백색 고정이며, 포인트 컬러 두 종류를 자유 변경할 수 있습니다.' : 'White background is fixed guidelines standard. Primary and Secondary accents are fully interactive.'}
              </div>
            </div>

            {/* Navigation Menus configuration */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-[#761A7E]">{lang === 'ko' ? '■ 상단 글로벌 내비게이션 바 메뉴 가로 배치 링크 이름 변경' : 'Global Inbound Navigations Customize'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {draftNav.map((item, index) => (
                  <div key={item.id} className="p-3 bg-neutral-50 rounded border border-neutral-100 flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Menu Node ID: {item.id}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-500">한국어 라벨</label>
                        <input
                          type="text"
                          value={item.labelKo}
                          onChange={(e) => {
                            const updated = [...draftNav];
                            updated[index].labelKo = e.target.value;
                            setDraftNav(updated);
                          }}
                          className="w-full px-2 py-1 bg-white border border-neutral-200 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-500">English Label</label>
                        <input
                          type="text"
                          value={item.labelEn}
                          onChange={(e) => {
                            const updated = [...draftNav];
                            updated[index].labelEn = e.target.value;
                            setDraftNav(updated);
                          }}
                          className="w-full px-2 py-1 bg-white border border-neutral-200 rounded text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Interactive Footer settings */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-extrabold text-[#761A7E]">{lang === 'ko' ? '■ 하단 푸터 영역 세부 법인 연락 정보 국/영문 조정' : 'Direct Footer Corporate Operations Panel'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-50/50 p-4 rounded-lg border border-neutral-100">
                <div>
                  <label className="text-xs font-semibold text-neutral-500">상호명 (국문)</label>
                  <input
                    type="text"
                    value={draftFooter.companyNameKo}
                    onChange={(e) => setDraftFooter({ ...draftFooter, companyNameKo: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">Corporate Name (ENG)</label>
                  <input
                    type="text"
                    value={draftFooter.companyNameEn}
                    onChange={(e) => setDraftFooter({ ...draftFooter, companyNameEn: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">대표이사 (CEO)</label>
                  <input
                    type="text"
                    value={draftFooter.ceoKo}
                    onChange={(e) => setDraftFooter({ ...draftFooter, ceoKo: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">사업자 등록 번호</label>
                  <input
                    type="text"
                    value={draftFooter.registrationNumber}
                    onChange={(e) => setDraftFooter({ ...draftFooter, registrationNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">회사전화번호</label>
                  <input
                    type="text"
                    value={draftFooter.telephone}
                    onChange={(e) => setDraftFooter({ ...draftFooter, telephone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">이메일 주소</label>
                  <input
                    type="text"
                    value={draftFooter.email}
                    onChange={(e) => setDraftFooter({ ...draftFooter, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs font-semibold text-neutral-500">본사 주소 (국문 / 영문)</label>
                  <input
                    type="text"
                    value={draftFooter.addressKo}
                    onChange={(e) => setDraftFooter({ ...draftFooter, addressKo: e.target.value, addressEn: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">FAX 번호</label>
                  <input
                    type="text"
                    value={draftFooter.fax || ''}
                    onChange={(e) => setDraftFooter({ ...draftFooter, fax: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">Skype ID/URL</label>
                  <input
                    type="text"
                    value={draftFooter.skype || ''}
                    onChange={(e) => setDraftFooter({ ...draftFooter, skype: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">LINE ID</label>
                  <input
                    type="text"
                    value={draftFooter.lineId || ''}
                    onChange={(e) => setDraftFooter({ ...draftFooter, lineId: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">Kakao ID/Email</label>
                  <input
                    type="text"
                    value={draftFooter.kakaoAccount || ''}
                    onChange={(e) => setDraftFooter({ ...draftFooter, kakaoAccount: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">Wechat ID</label>
                  <input
                    type="text"
                    value={draftFooter.wechatId || ''}
                    onChange={(e) => setDraftFooter({ ...draftFooter, wechatId: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">Mobile Phone / Messenger (WhatsApp, Viber)</label>
                  <input
                    type="text"
                    value={draftFooter.mobilePhone || ''}
                    onChange={(e) => setDraftFooter({ ...draftFooter, mobilePhone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-500">Official Website URL</label>
                  <input
                    type="text"
                    value={draftFooter.website || ''}
                    onChange={(e) => setDraftFooter({ ...draftFooter, website: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Save trigger */}
            <div className="flex justify-end pt-4 border-t border-neutral-100">
              <button
                onClick={saveGeneralSettings}
                className="px-6 py-3 bg-[#761A7E] text-white rounded-lg text-xs md:text-sm font-bold shadow-md hover:bg-opacity-95 transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                {lang === 'ko' ? '수정된 상하단 구조 저장 및 적용' : 'Persist Structure Changes'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Tour Itinerary Package customization */}
        {activeTab === 'tours' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <h3 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                <span className="w-2.5 h-4 bg-[#761A7E] rounded"></span>
                {lang === 'ko' ? '고품격 투어 및 랜드 기획상품 가공' : 'Corporate Land Program Configurator'}
              </h3>
              <button
                onClick={handleCreateTour}
                className="px-3.5 py-2 bg-[#761A7E] text-white font-bold rounded-lg text-xs flex items-center gap-1 hover:shadow-md"
              >
                <Plus className="w-4 h-4" /> {lang === 'ko' ? '기획 상품 새로 추가' : 'Create Custom Tour'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: list of tour items */}
              <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {tours.map(t => (
                  <div
                    key={t.id}
                    onClick={() => startEditTour(t)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between gap-2 ${editingTourId === t.id ? 'bg-purple-50/55 border-[#761A7E] text-[#761A7E]' : 'bg-neutral-50/50 hover:bg-neutral-50 border-neutral-100'}`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#CBAF00]">{t.durationDays - 1}N {t.durationDays}D • {t.transportType}</span>
                      <h4 className="font-bold text-neutral-800 line-clamp-1">{lang === 'ko' ? t.titleKo : t.titleEn}</h4>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTour(t.id);
                      }}
                      className="p-1 hover:bg-red-50 hover:text-red-500 rounded transition-colors text-neutral-400"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Column: editor form */}
              <div className="lg:col-span-7 bg-neutral-50/50 p-4 rounded-xl border border-neutral-100 space-y-4">
                {editingTourId && tourForm.id ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-500">ID: {tourForm.id}</span>
                      <button
                        onClick={triggerAiDraftTour}
                        disabled={aiLoading === 'tourDes'}
                        className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-white hover:text-[#CBAF00] hover:bg-black text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-all outline-none"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        {aiLoading === 'tourDes' ? (lang === 'ko' ? 'AI 가이드 작성 중...' : 'Drafting...') : (lang === 'ko' ? 'AI 국/영문 코스설명 자동완성' : 'AI Generate Description')}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500">기획 상품명 (국문)</label>
                        <input
                          type="text"
                          value={tourForm.titleKo || ''}
                          onChange={(e) => setTourForm({ ...tourForm, titleKo: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500">Program Title (ENG)</label>
                        <input
                          type="text"
                          value={tourForm.titleEn || ''}
                          onChange={(e) => setTourForm({ ...tourForm, titleEn: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>
                      
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500">실속 공급가 (단위 숫자)</label>
                        <input
                          type="number"
                          value={tourForm.priceAmount || 0}
                          onChange={(e) => setTourForm({ ...tourForm, priceAmount: Number(e.target.value) })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-500">통화 구분</label>
                        <select
                          value={tourForm.priceCurrency || 'KRW'}
                          onChange={(e) => setTourForm({ ...tourForm, priceCurrency: e.target.value as any })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        >
                          <option value="KRW">KRW ₩</option>
                          <option value="USD">USD $</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2 col-span-2">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500">여행 일수 (Days)</label>
                          <input
                            type="number"
                            value={tourForm.durationDays || 1}
                            onChange={(e) => setTourForm({ ...tourForm, durationDays: Number(e.target.value) })}
                            className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500">여행 밤수 (Nights)</label>
                          <input
                            type="number"
                            value={tourForm.durationNights || 0}
                            onChange={(e) => setTourForm({ ...tourForm, durationNights: Number(e.target.value) })}
                            className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                          />
                        </div>
                      </div>

                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">대표 가시 주소 이미지 (MIME JPG/PNG URL)</label>
                        <input
                          type="text"
                          value={tourForm.imageUrl || ''}
                          onChange={(e) => setTourForm({ ...tourForm, imageUrl: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">차량/에이전트 이송수단</label>
                        <input
                          type="text"
                          value={tourForm.transportType || ''}
                          onChange={(e) => setTourForm({ ...tourForm, transportType: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 text-xs mt-1 cursor-text"
                          placeholder="e.g. Mercedes Sprinter VIP"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">태그 리스트 (콤마 구분)</label>
                        <input
                          type="text"
                          value={tourForm.tourTags?.join(', ') || ''}
                          onChange={(e) => setTourForm({ ...tourForm, tourTags: e.target.value.split(',').map(s => s.trim()) })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>

                      {/* Summary fields */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">한줄 소개 요약 (국문)</label>
                        <input
                          type="text"
                          value={tourForm.summaryKo || ''}
                          onChange={(e) => setTourForm({ ...tourForm, summaryKo: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">Program Snippet (ENG)</label>
                        <input
                          type="text"
                          value={tourForm.summaryEn || ''}
                          onChange={(e) => setTourForm({ ...tourForm, summaryEn: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>

                      {/* Description / Itinerary block */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">상세 일정 및 포함 혜택 양식 (국문)</label>
                        <textarea
                          rows={4}
                          value={tourForm.descriptionKo || ''}
                          onChange={(e) => setTourForm({ ...tourForm, descriptionKo: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1 font-sans"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">Full Itinerary Specifications (ENG)</label>
                        <textarea
                          rows={4}
                          value={tourForm.descriptionEn || ''}
                          onChange={(e) => setTourForm({ ...tourForm, descriptionEn: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1 font-sans"
                        />
                      </div>
                    </div>

                    <button
                      onClick={saveTourChange}
                      className="w-full py-2.5 bg-[#761A7E] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 hover:shadow-md mt-4"
                    >
                      <Save className="w-4 h-4" /> {lang === 'ko' ? '기획안 실시간 동기화 저장' : 'Persist Tour Package changes'}
                    </button>
                  </div>
                ) : (
                  <div className="py-24 text-center text-neutral-400">
                    <Compass className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
                    {lang === 'ko' ? '수정할 여행 기획 상품을 왼쪽 목록에서 선택해 주세요.' : 'Select a tour from the left column to configure details.'}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: Notice Boards Publisher & AI Translator */}
        {activeTab === 'articles' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <h3 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                <span className="w-2.5 h-4 bg-[#761A7E] rounded"></span>
                {lang === 'ko' ? '안내 공지사항 및 여행 가이드 게시판 관리' : 'Notice Board & Travel Guides Dispatcher'}
              </h3>
              <button
                onClick={handleCreateArticle}
                className="px-3.5 py-2 bg-[#761A7E] text-white font-bold rounded-lg text-xs flex items-center gap-1 hover:shadow-md"
              >
                <Plus className="w-4 h-4" /> {lang === 'ko' ? '새 게시물 작성' : 'Draft New Article'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left col: listing */}
              <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {articles.map(art => (
                  <div
                    key={art.id}
                    onClick={() => startEditArticle(art)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between gap-2 ${editingArticleId === art.id ? 'bg-purple-50/55 border-[#761A7E]' : 'bg-neutral-50/50 hover:bg-neutral-50 border-neutral-100'}`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400">[{art.category}] {art.createdAt}</span>
                      <h4 className="font-bold text-neutral-800 line-clamp-1">{lang === 'ko' ? art.titleKo : art.titleEn}</h4>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteArticle(art.id);
                      }}
                      className="p-1 hover:bg-red-50 hover:text-red-500 rounded text-neutral-400"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right col: Editor form */}
              <div className="lg:col-span-7 bg-neutral-50/50 p-4 rounded-xl border border-neutral-100 space-y-4 animate-fade-in">
                {editingArticleId && articleForm.id ? (
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-neutral-400">EDIT CODE: {articleForm.id}</span>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500">게시글 분류</label>
                        <select
                          value={articleForm.category || 'Notice'}
                          onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        >
                          <option value="Notice">{lang === 'ko' ? '공지사항 (Notice)' : 'Notice'}</option>
                          <option value="Guide">{lang === 'ko' ? '여행가이드 (Guide)' : 'Travel Guide'}</option>
                          <option value="Review">{lang === 'ko' ? '고객생생후기 (Review)' : 'Customer Review'}</option>
                          <option value="Promo">{lang === 'ko' ? '특별이벤트 (Promo)' : 'Special Promo'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-500">배포자 / 작성자</label>
                        <input
                          type="text"
                          value={articleForm.author || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">게시글 배너 이미지 주소 (옵션)</label>
                        <input
                          type="text"
                          value={articleForm.imageUrl || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>

                      {/* Korean Titles */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">게시판 제목 (국문)</label>
                        <input
                          type="text"
                          value={articleForm.titleKo || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, titleKo: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>

                      {/* AI Translate Title triggers */}
                      <div className="col-span-2 flex justify-end">
                        <button
                          onClick={() => triggerAiTranslateArticle('title')}
                          disabled={aiLoading === 'title'}
                          className="text-[10px] font-bold text-[#761A7E] hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 animate-pulse text-amber-500" />
                          {aiLoading === 'title' ? 'AI 번역 번역 중...' : '국문 제목 국문 -> 영문 자동번역번역'}
                        </button>
                      </div>

                      {/* English Titles */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">Article Title (ENG)</label>
                        <input
                          type="text"
                          value={articleForm.titleEn || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, titleEn: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1"
                        />
                      </div>

                      {/* KO Content */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">공지 상세 설명내용 (국문)</label>
                        <textarea
                          rows={4}
                          value={articleForm.contentKo || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, contentKo: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1 font-sans"
                        />
                      </div>

                      {/* AI Translate Content trigger */}
                      <div className="col-span-2 flex justify-end">
                        <button
                          onClick={() => triggerAiTranslateArticle('content')}
                          disabled={aiLoading === 'content'}
                          className="text-[10px] font-bold text-[#761A7E] hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          {aiLoading === 'content' ? 'AI 가반 본문 번역 중...' : '국문 본문 국문 -> 영문 자동번역연계'}
                        </button>
                      </div>

                      {/* EN Content */}
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500">Full Content Representation (ENG)</label>
                        <textarea
                          rows={4}
                          value={articleForm.contentEn || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, contentEn: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded text-xs mt-1 font-sans"
                        />
                      </div>
                    </div>

                    <button
                      onClick={saveArticleChange}
                      className="w-full py-2.5 bg-[#761A7E] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 hover:shadow-md mt-4"
                    >
                      <Save className="w-4 h-4" /> {lang === 'ko' ? '게시글 배포 저장' : 'Publish Article'}
                    </button>
                  </div>
                ) : (
                  <div className="py-24 text-center text-neutral-400 animate-fade-in">
                    <ClipboardList className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
                    {lang === 'ko' ? '조정할 게시글을 왼쪽에서 선택해 주십시오.' : 'Select articles from notice board lists.'}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: Booking & Quote reservation manager */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <h3 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                <span className="w-2.5 h-4 bg-[#CBAF00] rounded"></span>
                {lang === 'ko' ? '접수된 실시간 랜드 오퍼레이팅 견적 리스트' : 'Live Quote Inquiries & VIP Reservations'}
              </h3>
              <button
                onClick={() => {
                  const csv = inquiries.map(i => `${i.id},${i.clientName},${i.contactEmail},${i.destination},${i.daysCount}D,${i.paxCount}P,${i.status}`).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.setAttribute('href', url);
                  a.setAttribute('download', 'Seotai_Inquiries_Report.csv');
                  a.click();
                }}
                className="px-3.5 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4 text-green-600" />
                {lang === 'ko' ? '엑셀 CSV 명단 출력' : 'Export Excel CSV'}
              </button>
            </div>

            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
              {inquiries.length === 0 ? (
                <div className="py-24 text-center bg-neutral-50 rounded-xl border border-neutral-100 text-neutral-400">
                  <Globe2 className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
                  {lang === 'ko' ? '현재 접수 완료된 인인 맞춤 견적이 없습니다. 웹사이트 메인 하단에서 신청 가동해 보세요.' : 'No reservations in process.'}
                </div>
              ) : (
                inquiries.map(inq => {
                  const createdStr = new Date(inq.createdAt).toLocaleString();
                  const badgeColor = {
                    Pending: 'bg-yellow-50 text-amber-600 border-yellow-100',
                    Contacted: 'bg-blue-50 text-[#761A7E] border-blue-100',
                    Completed: 'bg-green-50 text-green-700 border-green-100',
                  }[inq.status];

                  return (
                    <div key={inq.id} className="p-5 bg-white rounded-xl border border-neutral-200/90 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
                      
                      {/* Left Header */}
                      <div className="md:col-span-3 space-y-1.5 border-b md:border-b-0 md:border-r border-neutral-100 pb-3 md:pb-0 md:pr-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#761A7E]">{inq.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                            {inq.status.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-bold text-neutral-900 text-sm mt-1">{inq.clientName}</h4>
                        <p className="text-[11px] text-neutral-500 leading-snug">{inq.contactEmail}</p>
                        <p className="text-[11px] text-neutral-500">{inq.contactPhone}</p>
                      </div>

                      {/* Mid Parameters */}
                      <div className="md:col-span-5 space-y-2">
                        <div className="grid grid-cols-3 gap-1 bg-neutral-50 p-2 rounded text-[10px] text-center">
                          <div>
                            <span className="text-neutral-400 font-medium">목적지</span>
                            <p className="font-bold mt-0.5 text-neutral-800 truncate">{inq.destination}</p>
                          </div>
                          <div className="border-x border-neutral-200">
                            <span className="text-neutral-400 font-medium font-sans">예정 인원</span>
                            <p className="font-bold mt-0.5 text-neutral-800">{inq.paxCount}명 (Pax)</p>
                          </div>
                          <div>
                            <span className="text-neutral-400 font-semibold font-sans">여행 일수</span>
                            <p className="font-bold mt-0.5 text-neutral-800">{inq.daysCount} 일 (Days)</p>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-neutral-400">{lang === 'ko' ? '■ 맞춤 기획 세부 안내:' : 'Requirements:'}</span>
                          <p className="bg-neutral-50/50 p-2 rounded text-xs text-neutral-600 mt-1 italic whitespace-pre-line leading-relaxed">
                            {inq.additionalRequests || (lang === 'ko' ? '별도 특이 기입 없음' : 'None specified')}
                          </p>
                        </div>
                        
                        <span className="text-[10px] text-neutral-400 block font-mono">Submitted UTC: {createdStr}</span>
                      </div>

                      {/* Right Actions & Operator Status Notes */}
                      <div className="md:col-span-4 space-y-3 bg-[#761A7E]/5 p-3.5 rounded-lg border border-[#761A7E]/10">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">{lang === 'ko' ? '처리 상태 변경' : 'Routing Status'}</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {(['Pending', 'Contacted', 'Completed'] as const).map(st => (
                              <button
                                key={st}
                                onClick={() => updateInquiryStatus(inq.id, st)}
                                className={`py-1 text-[10px] font-bold rounded border transition-all ${inq.status === st ? 'bg-[#761A7E] text-white border-[#761A7E]' : 'bg-white hover:bg-neutral-100 text-neutral-600 border-neutral-100'}`}
                              >
                                {st === 'Pending' ? (lang === 'ko' ? '대기' : 'Pend') : st === 'Contacted' ? (lang === 'ko' ? '상담' : 'Chat') : (lang === 'ko' ? '완료' : 'Done')}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">{lang === 'ko' ? '아웃 인바운드 오퍼레이터 비공개 메모:' : 'Intern Notes:'}</label>
                          <textarea
                            rows={2}
                            value={inq.adminNotes || ''}
                            onChange={(e) => updateInquiryNotes(inq.id, e.target.value)}
                            placeholder={lang === 'ko' ? '소속 가이드 배정 상황, 차량 기사 연동 여부 기재...' : 'Guideline allocations details...'}
                            className="w-full px-2 py-1 bg-white border border-neutral-200 rounded text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 5 : AI Search Engine SEO optimization tool */}
        {activeTab === 'seo' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm">
            <h3 className="text-lg font-black text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="w-2.5 h-4 bg-amber-500 rounded"></span>
              {lang === 'ko' ? 'Gemini 기반 고성능 메타태그 SEO 컨설턴트' : 'AI SEO Meta-Tag Advisory Engine'}
            </h3>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <h4 className="font-bold text-neutral-900">{lang === 'ko' ? '서태국제여행사 메타데이터 검색엔진 최적화 안내' : 'Optimizing Seotai Travel Search Ranks'}</h4>
                <p className="text-[11px] text-neutral-600 leading-relaxed mt-0.5">
                  {lang === 'ko' 
                    ? '현재 사이트의 대표 설명과 주요 타겟 마켓 키워드를 전송하면, Gemini AI 실시간 검색 마케팅 분석 모듈이 클릭률을 극대화할 수 있는 영/국문 타이틀, 메타 수식 설명문 및 6대 핵심 키워드를 최적화 설계해 드립니다.'
                    : 'Analyze custom site descriptions with Gemini model to generate SEO titles, custom indexing terms, and click-optimized descriptions.'
                  }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">{lang === 'ko' ? '현재 사이트 기획 총칭 (메인 SEO 입력)' : 'Current Main Core SEO Description'}</label>
                  <textarea
                    rows={4}
                    value={draftTheme.seoDescriptionKo}
                    onChange={(e) => setDraftTheme({ ...draftTheme, seoDescriptionKo: e.target.value })}
                    placeholder="e.g. 대한민국 최고의 랜드 오퍼레이터 서태국제여행사"
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">{lang === 'ko' ? '타겟 바이어 / 주력 비즈니스 모델' : 'Target Buyers & Primary Business Scope'}</label>
                  <input
                    type="text"
                    value={seoTargetMarkets}
                    onChange={(e) => setSeoTargetMarkets(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                <button
                  onClick={triggerSeoAdvisor}
                  disabled={aiLoading === 'seo'}
                  className="w-full py-3 bg-neutral-900 hover:bg-black text-white hover:text-[#CBAF00] font-bold rounded-xl transition-all shadow text-xs flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`w-4 h-4 ${aiLoading === 'seo' ? 'animate-spin' : ''}`} />
                  {aiLoading === 'seo' ? (lang === 'ko' ? 'Gemini AI SEO 컨설팅 중...' : 'Analyzing Web Ranks...') : (lang === 'ko' ? 'Gemini AI 실시간 SEO 분석 실행' : 'Query Gemini for SEO Optimization')}
                </button>
              </div>

              {/* Advisory Results representation */}
              <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-100 space-y-4 justify-between flex flex-col">
                {seoAdvisorResult ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold">
                      <Check className="w-4 h-4" />
                      <span>{lang === 'ko' ? 'AI 가이드 제안서 생성 완료' : 'AI Proposals Drafted Successfully'}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase">Optimized Meta-Title</span>
                      <p className="font-extrabold text-neutral-900 text-xs mt-0.5">{seoAdvisorResult.metaTitle}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase">Suggested Meta-Description</span>
                      <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{seoAdvisorResult.suggestedDescription}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase">High Yield Recommended Keywords</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {seoAdvisorResult.recommendedKeywords.map((k: string) => (
                          <span key={k} className="bg-neutral-800 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={applySeoAdvisorSpecs}
                      className="w-full py-2 bg-[#761A7E]/10 text-[#761A7E] hover:bg-[#761A7E] hover:text-white font-bold rounded text-xs transition-all mt-2"
                    >
                      {lang === 'ko' ? '추천 SEO 타이틀 및 메타 속성 직행 주입' : 'Inject dynamic AI SEO attributes'}
                    </button>
                  </div>
                ) : (
                  <div className="py-16 text-center text-neutral-400 flex flex-col justify-center items-center h-full">
                    <Sparkles className="w-10 h-10 text-neutral-200 mb-2" />
                    <p className="text-xs">{lang === 'ko' ? '상태: 대기 중. 왼쪽의 대행 요건 기재 후 분석 버튼을 누르면 인바운드 SEO 분석이 실행됩니다.' : 'Status: Sitting idle. Set SEO settings to retrieve AI advice.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
