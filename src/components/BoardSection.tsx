import React, { useState } from 'react';
import { BoardArticle } from '../types';
import { Search, Calendar, User, Tag, ChevronRight, MessageSquare, AlertCircle } from 'lucide-react';

interface BoardSectionProps {
  articles: BoardArticle[];
  lang: 'ko' | 'en';
}

export default function BoardSection({ articles, lang }: BoardSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<BoardArticle | null>(null);

  const categories = [
    { value: 'All', labelKo: '전체보기', labelEn: 'All Posts' },
    { value: 'Notice', labelKo: '공지사항', labelEn: 'Notice' },
    { value: 'Guide', labelKo: '여행가이드', labelEn: 'Travel Guide' },
    { value: 'Review', labelKo: '고객생생후기', labelEn: 'Reviews' },
    { value: 'Promo', labelKo: '특별이벤트', labelEn: 'Promotions' }
  ];

  const categoryColors: Record<string, string> = {
    Notice: 'bg-red-50 text-red-600 border-red-100',
    Guide: 'bg-emerald-50 text-[#CBAF00] border-emerald-100',
    Review: 'bg-purple-50 text-[#761A7E] border-purple-100',
    Promo: 'bg-amber-50 text-amber-600 border-amber-100',
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'Notice': return lang === 'ko' ? '공지' : 'Notice';
      case 'Guide': return lang === 'ko' ? '가이드' : 'Guide';
      case 'Review': return lang === 'ko' ? '후기' : 'Review';
      case 'Promo': return lang === 'ko' ? '기획' : 'Promo';
      default: return category;
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const title = lang === 'ko' ? article.titleKo : article.titleEn;
    const content = lang === 'ko' ? article.contentKo : article.contentEn;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div id="board-interactive-container" className="space-y-8 text-neutral-800">
      {/* Search & Category Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
        {/* Horizontal Category Toggle */}
        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setSelectedArticle(null); // Clear active detail view
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-[#761A7E] text-white shadow-md'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
              }`}
            >
              {lang === 'ko' ? cat.labelKo : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3.5 text-neutral-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ko' ? '게시글 제목이나 내용 검색...' : 'Search articles or insights...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50"
          />
        </div>
      </div>

      {/* Main Board Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Board entries listing */}
        <div className={`${selectedArticle ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-4`}>
          {filteredArticles.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-neutral-100 shadow-sm flex flex-col items-center">
              <AlertCircle className="w-12 h-12 text-neutral-300 mb-4" />
              <p className="text-neutral-500 font-medium text-lg">
                {lang === 'ko' ? '등록된 게시글이 없거나 검색 결과가 없습니다.' : 'No articles found matching the criteria.'}
              </p>
              <p className="text-sm text-neutral-400 mt-1">
                {lang === 'ko' ? '관리자 대시보드에서 새로운 최신 글을 작성해 보세요.' : 'Create fresh guidelines / notices in the Admin Dashboard.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`bg-white p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    selectedArticle?.id === article.id
                      ? 'border-[#761A7E] ring-2 ring-purple-100 shadow-md transform translate-x-1'
                      : 'border-neutral-100 hover:border-[#761A7E]/40 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColors[article.category] || 'bg-neutral-50 text-neutral-600'}`}>
                        {getCategoryLabel(article.category)}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">#{article.id}</span>
                    </div>

                    <h4 className="font-bold text-neutral-900 line-clamp-1 group-hover:text-[#761A7E]">
                      {lang === 'ko' ? article.titleKo : article.titleEn}
                    </h4>

                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {lang === 'ko' ? article.contentKo : article.contentEn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-50 text-[11px] text-neutral-400">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 font-medium">
                        <User className="w-3 h-3" /> {article.author}
                      </span>
                      <span className="text-neutral-200">|</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {formatDate(article.createdAt)}
                      </span>
                    </div>
                    <span className="text-[#761A7E] font-bold flex items-center gap-0.5 hover:underline">
                      {lang === 'ko' ? '상세보기' : 'Read'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Article Details panel */}
        {selectedArticle && (
          <div className="lg:col-span-6 bg-white rounded-xl border border-neutral-100 shadow-lg p-6 lg:p-8 space-y-6 self-start animate-fade-in">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryColors[selectedArticle.category]}`}>
                  {getCategoryLabel(selectedArticle.category)}
                </span>
                <h3 className="text-xl lg:text-2xl font-extrabold text-neutral-900 leading-tight">
                  {lang === 'ko' ? selectedArticle.titleKo : selectedArticle.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 px-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-lg text-xs font-semibold"
              >
                닫기 ✕
              </button>
            </div>

            {/* Meta info strip */}
            <div className="flex items-center gap-4 text-xs text-neutral-500 bg-neutral-50 p-3 rounded-lg">
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#761A7E]" />
                <span className="font-medium text-neutral-700">{selectedArticle.author}</span>
              </div>
              <span className="text-neutral-300">|</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#761A7E]" />
                <span>{formatDate(selectedArticle.createdAt)}</span>
              </div>
            </div>

            {/* Image banner inside details if exists */}
            {selectedArticle.imageUrl && (
              <div className="relative aspect-[16/9] bg-neutral-100 rounded-xl overflow-hidden shadow-inner">
                <img
                  src={selectedArticle.imageUrl}
                  alt="Post Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Main content body */}
            <div className="text-neutral-700 text-sm md:text-base leading-relaxed whitespace-pre-line border-t border-neutral-100 pt-6">
              {lang === 'ko' ? selectedArticle.contentKo : selectedArticle.contentEn}
            </div>

            {/* Operator Signature Block */}
            <div className="mt-8 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{lang === 'ko' ? '발행부서' : 'Department'}</p>
                <p className="text-sm font-bold text-[#761A7E]">{lang === 'ko' ? '서태국제여행사 기획총괄부' : 'Seotai Travel Operations Inbound'}</p>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono text-right">
                ID: {selectedArticle.id}<br />
                SEO Status: Indexed OK
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
