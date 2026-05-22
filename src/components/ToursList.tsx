import React, { useState } from 'react';
import { TourPackage } from '../types';
import { Search, MapPin, DollarSign, Calendar, SlidersHorizontal, Eye, Flame, Award, Tag } from 'lucide-react';

interface ToursListProps {
  tours: TourPackage[];
  lang: 'ko' | 'en';
  onBookClick: (destination: string) => void;
  currencyRate?: number; // 1 USD = 1350 KRW (example proxy)
}

export default function ToursList({ tours, lang, onBookClick, currencyRate = 1350 }: ToursListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(5000000); // Max KRW
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Extract all distinct tags from tours
  const allTags = ['All', ...Array.from(new Set(tours.flatMap(t => t.tourTags)))];

  const filteredTours = tours.filter(tour => {
    const title = lang === 'ko' ? tour.titleKo : tour.titleEn;
    const summary = lang === 'ko' ? tour.summaryKo : tour.summaryEn;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = tour.priceAmount <= maxPrice;
    const matchesTag = selectedTag === 'All' || tour.tourTags.includes(selectedTag);

    return matchesSearch && matchesPrice && matchesTag;
  });

  const formatPrice = (amount: number, currency: 'KRW' | 'USD') => {
    if (currency === 'KRW') {
      return `₩${amount.toLocaleString('ko-KR')}`;
    } else {
      return `$${amount.toLocaleString('en-US')}`;
    }
  };

  return (
    <div id="tours-section-main" className="space-y-8 text-neutral-800">
      
      {/* Search and Quick Filters bar */}
      <div className="bg-white rounded-xl border border-neutral-100 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 text-neutral-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ko' ? '기획 상품명 또는 핵심 도시 검색...' : 'Search luxury tours or destinations...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50"
            />
          </div>

          <div className="flex gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-neutral-200 rounded-lg text-sm font-semibold hover:bg-neutral-50 transition-all text-neutral-600"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {lang === 'ko' ? '세부 필터' : 'Filters'}
            </button>
          </div>
        </div>

        {/* Collapsible Filter Detail Drawer */}
        {(showFilters || selectedTag !== 'All') && (
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-xs md:text-sm">
            {/* Tag Badges filter */}
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                {lang === 'ko' ? '테마 카테고리' : 'Theme Categories'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      selectedTag === tag
                        ? 'bg-[#761A7E] text-white border-[#761A7E]'
                        : 'bg-white hover:bg-neutral-100 text-neutral-600 border-neutral-100'
                    }`}
                  >
                    {tag === 'All' ? (lang === 'ko' ? '전체' : 'All') : tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  {lang === 'ko' ? '최대 예산 가격대' : 'Budget Maximum Price'}
                </label>
                <span className="font-mono bg-purple-50 text-[#761A7E] px-2 py-0.5 rounded text-xs font-bold">
                  {formatPrice(maxPrice, 'KRW')}
                </span>
              </div>
              <input
                type="range"
                min="300000"
                max="5000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#761A7E] cursor-ew-resize"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>₩300,000</span>
                <span>₩5,000,000</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredTours.map((tour) => {
          const title = lang === 'ko' ? tour.titleKo : tour.titleEn;
          const summary = lang === 'ko' ? tour.summaryKo : tour.summaryEn;

          return (
            <div
              key={tour.id}
              className="group bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-purple-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Cover Image & Badges */}
              <div className="relative aspect-[4/4] bg-neutral-100 overflow-hidden">
                <img
                  src={tour.imageUrl || 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=600&q=80'}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hot Tag or VIP Land badge */}
                <div className="absolute top-3 left-3 z-10 flex gap-1 text-[9px] font-bold tracking-widest uppercase">
                  {tour.isHot && (
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5 fill-white" /> HOT
                    </span>
                  )}
                  <span className="bg-neutral-900/80 backdrop-blur-sm text-[#CBAF00] px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                    <Award className="w-2.5 h-2.5 text-[#CBAF00]" /> DIRECT
                  </span>
                </div>

                {/* Duration Tag overlay */}
                <div className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-neutral-800 shadow-md flex items-center gap-0.5">
                  <Calendar className="w-3 h-3 text-[#761A7E]" />
                  {tour.durationDays - 1 === 0 ? (
                    <span>{tour.durationDays}{lang === 'ko' ? '일 정성' : ' Days'}</span>
                  ) : (
                    <span>{tour.durationNights}{lang === 'ko' ? '박 ' : 'N '} {tour.durationDays}{lang === 'ko' ? '일' : 'D'}</span>
                  )}
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1">
                    {tour.tourTags.map(tg => (
                      <span key={tg} className="text-[9px] uppercase tracking-wider font-extrabold text-[#761A7E] bg-purple-50 px-1.5 py-0.5 rounded">
                        #{tg}
                      </span>
                    ))}
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-neutral-400 border border-neutral-100 px-1.5 py-0.5 rounded">
                      {tour.transportType}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 leading-snug group-hover:text-[#761A7E] transition-colors min-h-[2.5rem] sm:min-h-[3rem] flex items-start">
                    {title}
                  </h3>

                  {/* Description summary */}
                  <p className="text-xs text-neutral-500 leading-relaxed min-h-[3rem] mt-1">
                    {summary}
                  </p>
                </div>

                {/* Pricing and view detail button row */}
                <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-neutral-400 font-semibold tracking-wider uppercase">
                      {lang === 'ko' ? '랜드 실속 공급가' : 'Land Provider Net Rate'}
                    </span>
                    <span className="text-sm font-black text-[#761A7E]">
                      {lang === 'ko' ? '별도 문의' : 'Inquire Separately'}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-medium mt-0.5 max-w-[130px] sm:max-w-none leading-tight">
                      {lang === 'ko' ? '인원 및 일정에 따라 변경' : 'Varies by pax/schedule'}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTour(tour)}
                    className="px-2.5 py-1.5 bg-[#761A7E]/5 group-hover:bg-[#761A7E] text-[#761A7E] group-hover:text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-0.5 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {lang === 'ko' ? '상세' : 'Details'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTours.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-neutral-100 flex flex-col items-center">
            <SlidersHorizontal className="w-12 h-12 text-neutral-200 mb-4" />
            <p className="text-neutral-500 font-medium text-lg">
              {lang === 'ko' ? '조건에 부합하는 여행 상품이 없습니다.' : 'No matched luxury tour packages.'}
            </p>
            <p className="text-sm text-neutral-400 mt-1">
              {lang === 'ko' ? '검색어 또는 예산 범위를 수정해 보십시오.' : 'Adjust search tags or range slider.'}
            </p>
          </div>
        )}
      </div>

      {/* Tour Detail Modal Dialog */}
      {selectedTour && (
        <div id="tour-detail-modal" className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-100 flex flex-col">
            
            {/* Modal Hero Banner */}
            <div className="relative aspect-[21/9] bg-neutral-200 shrink-0">
              <img
                src={selectedTour.imageUrl}
                alt={lang === 'ko' ? selectedTour.titleKo : selectedTour.titleEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <button
                onClick={() => setSelectedTour(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all border border-white/20"
              >
                ✕
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-[#CBAF00] text-black font-extrabold px-2 py-0.5 rounded tracking-wide font-sans">
                    {selectedTour.transportType.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-neutral-200">
                    ID: {selectedTour.id}
                  </span>
                </div>
                <h3 className="text-xl md:text-3xl font-extrabold tracking-tight">
                  {lang === 'ko' ? selectedTour.titleKo : selectedTour.titleEn}
                </h3>
              </div>
            </div>

            {/* Modal Body Info Panel */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              
              {/* Quick Specs strip */}
              <div className="grid grid-cols-3 gap-2 bg-neutral-50 p-4 rounded-xl border border-neutral-100 text-center text-xs">
                <div>
                  <p className="text-neutral-400 font-semibold mb-0.5 uppercase tracking-wider">{lang === 'ko' ? '여정 일정' : 'Duration'}</p>
                  <p className="font-bold text-neutral-800 text-sm">
                    {selectedTour.durationNights}{lang === 'ko' ? '박' : 'N'} {selectedTour.durationDays}{lang === 'ko' ? '일' : 'D'}
                  </p>
                </div>
                <div className="border-x border-neutral-200">
                  <p className="text-neutral-400 font-semibold mb-0.5 uppercase tracking-wider">{lang === 'ko' ? '이동 방법' : 'Transport'}</p>
                  <p className="font-bold text-neutral-800 text-sm">{selectedTour.transportType}</p>
                </div>
                <div>
                  <p className="text-neutral-400 font-semibold mb-0.5 uppercase tracking-wider">{lang === 'ko' ? '공급 단가' : 'Quote Value'}</p>
                  <p className="font-black text-[#761A7E] text-xs sm:text-sm">
                    {lang === 'ko' ? '별도 문의' : 'Inquire Separately'}
                  </p>
                  <p className="text-[9px] text-neutral-500 font-medium mt-0.5 whitespace-nowrap">
                    {lang === 'ko' ? '인원 및 일정에 따라 변경' : 'Varies by pax & schedule'}
                  </p>
                </div>
              </div>

              {/* Tour Tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-bold text-neutral-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> {lang === 'ko' ? '기획 태그:' : 'Tour Tags:'}
                </span>
                {selectedTour.tourTags.map(tg => (
                  <span key={tg} className="bg-purple-50 text-[#761A7E] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-purple-100">
                    #{tg}
                  </span>
                ))}
              </div>

              {/* Itinerary Description */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-4 bg-[#761A7E] rounded inline-block"></span>
                  {lang === 'ko' ? '기획 설계 및 주요 혜택' : 'Proposed Scheme & Benefits'}
                </h4>
                <p className="text-xs md:text-sm text-neutral-500 italic">
                  "{lang === 'ko' ? selectedTour.summaryKo : selectedTour.summaryEn}"
                </p>
                
                <div className="text-neutral-700 text-xs md:text-sm leading-relaxed whitespace-pre-line bg-neutral-50/50 p-4 md:p-6 rounded-xl border border-neutral-100">
                  {lang === 'ko' ? selectedTour.descriptionKo : selectedTour.descriptionEn}
                </div>
              </div>

              {/* Footnote terms */}
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 text-[11px] text-neutral-600 leading-relaxed">
                📢 {lang === 'ko' 
                  ? '서태국제여행사는 랜드 주관 사업자 직영으로 운영되어 무의미한 유통 마진을 완전 배제합니다. 본 요금표는 기준 공시 가격이며, 최종 승객 인원 및 의전 사양에 따라 단가는 한층 더 하향 맞춤 조율이 가능합니다.'
                  : 'Seotai Travel operates as a direct Korea Land Operator without unnecessary middle agency fees. The rates above are reference indices and are customizable downward depending on bulk passenger counts or custom transport requests.'
                }
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setSelectedTour(null)}
                  className="w-1/3 py-3 border border-neutral-200 text-neutral-600 font-bold rounded-xl text-xs sm:text-sm hover:bg-neutral-50 transition-all"
                >
                  {lang === 'ko' ? '뒤로 가기' : 'Go Back'}
                </button>
                <button
                  onClick={() => {
                    onBookClick(lang === 'ko' ? selectedTour.titleKo : selectedTour.titleEn);
                    setSelectedTour(null);
                  }}
                  className="w-2/3 py-3 bg-[#761A7E] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md hover:bg-opacity-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  {lang === 'ko' ? '이 투어로 랜드 대행 신청' : 'Select tour for Quote Inquiry'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
