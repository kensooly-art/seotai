import React, { useState } from 'react';
import { BookingInquiry } from '../types';
import { Calendar, Users, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface BookingFormProps {
  onNewInquirySubmitted: (inquiry: BookingInquiry) => void;
  lang: 'ko' | 'en';
}

export default function BookingForm({ onNewInquirySubmitted, lang }: BookingFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    contactEmail: '',
    contactPhone: '',
    preferredDate: '',
    daysCount: 3,
    paxCount: 2,
    destination: 'Seoul / Gyeonggi',
    additionalRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = {
    title: lang === 'ko' ? 'VIP 맞춤 투어 및 랜드 견적 문의' : 'Custom VIP Tour & Land Quote Inquiry',
    subtitle: lang === 'ko' 
      ? '직영 랜드 오퍼레이터의 차별화된 가격과 기획력을 경험하세요. 전문가가 24시간 내 답변드립니다.' 
      : 'Experience the premium planning of a direct Korea Land Operator. We respond within 24 hours.',
    name: lang === 'ko' ? '성함 / 담당자명' : 'Full Name / Contact Person',
    email: lang === 'ko' ? '이메일 주소' : 'Email Address',
    phone: lang === 'ko' ? '연락처 (전화번호)' : 'Phone Number',
    date: lang === 'ko' ? '희망 여정 시작일' : 'Preferred Start Date',
    duration: lang === 'ko' ? '여행 기간 (일)' : 'Duration (Days)',
    pax: lang === 'ko' ? '예상 인원수 (명)' : 'No. of Travelers (Pax)',
    destinationLabel: lang === 'ko' ? '희망 지역 / 목적지' : 'Target Destination / Area',
    notes: lang === 'ko' 
      ? '상세 요구사항 (의전 필요 여부, 객실 등급, 특정 가이드, 식사 사양 등)' 
      : 'Special Requirements (VIP protocol, hotel standard, language guide, menu limits, etc.)',
    submit: lang === 'ko' ? '맞춤 견적 신청하기' : 'Request Land Operation Quote',
    successTitle: lang === 'ko' ? '견적 문의가 정상 접수되었습니다!' : 'Inquiry Successfully Received!',
    successSub: lang === 'ko' 
      ? '서태국제여행사 오퍼레이터가 신속히 검토 후 연락드리겠습니다. 감사합니다.'
      : 'Our direct operators will review and reach out to you within brief moments. Thank you.',
    reqField: lang === 'ko' ? '필수 입력 항목입니다.' : 'This field is required.',
    invalidEmail: lang === 'ko' ? '올바른 이메일 주소를 입력해 주세요.' : 'Please enter a valid email.',
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.clientName.trim()) newErrors.clientName = t.reqField;
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = t.reqField;
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = t.invalidEmail;
    }
    if (!formData.contactPhone.trim()) newErrors.contactPhone = t.reqField;
    if (!formData.preferredDate) newErrors.preferredDate = t.reqField;
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newInquiry: BookingInquiry = {
      id: 'INQ-' + Math.floor(100000 + Math.random() * 900000),
      clientName: formData.clientName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      preferredDate: formData.preferredDate,
      daysCount: Number(formData.daysCount),
      paxCount: Number(formData.paxCount),
      destination: formData.destination,
      additionalRequests: formData.additionalRequests,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      adminNotes: '',
    };

    onNewInquirySubmitted(newInquiry);
    setSubmitted(true);
    setErrors({});
    
    // Clear form
    setFormData({
      clientName: '',
      contactEmail: '',
      contactPhone: '',
      preferredDate: '',
      daysCount: 3,
      paxCount: 2,
      destination: 'Seoul / Gyeonggi',
      additionalRequests: '',
    });
  };

  if (submitted) {
    return (
      <div id="booking-success-wrap" className="bg-white p-8 rounded-2xl shadow-xl border border-neutral-100 flex flex-col items-center text-center max-w-2xl mx-auto py-16">
        <div id="success-icon-badge" className="p-4 bg-purple-50 rounded-full text-[#761A7E] mb-6">
          <CheckCircle className="w-16 h-16" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-3">{t.successTitle}</h3>
        <p className="text-neutral-600 mb-8 max-w-md">{t.successSub}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-[#761A7E] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-95 transition-all"
        >
          {lang === 'ko' ? '새로운 문의 기재' : 'Submit Another Inquiry'}
        </button>
      </div>
    );
  }

  return (
    <div id="booking-form-section-container" className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden text-neutral-800">
      <div className="p-6 md:p-10 bg-gradient-to-br from-[#761A7E]/5 to-white border-b border-purple-50">
        <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#CBAF00] rounded-full inline-block"></span>
          {t.title}
        </h3>
        <p className="text-sm md:text-base text-neutral-600 mt-2 max-w-2xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Name */}
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">{t.name} *</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.clientName ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:ring-purple-200'} focus:outline-none focus:ring-4 focus:border-[#761A7E] transition-all bg-neutral-50/50`}
              placeholder={lang === 'ko' ? '예: 홍길동 과장' : 'e.g. John Doe, Manager'}
            />
            {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
          </div>

          {/* Destination */}
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">{t.destinationLabel}</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 text-neutral-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50"
                placeholder={lang === 'ko' ? '예: 서울-제주 기획, 강원 인바운드' : 'e.g. Seoul-Jeju VIP custom'}
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">{t.email} *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-neutral-400 w-5 h-5 pointer-events-none" />
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.contactEmail ? 'border-red-500' : 'border-neutral-200'} focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50`}
                placeholder="operator@company.com"
              />
            </div>
            {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">{t.phone} *</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 text-neutral-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.contactPhone ? 'border-red-500' : 'border-neutral-200'} focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50`}
                placeholder="+82-10-1234-5678"
              />
            </div>
            {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">{t.date} *</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 text-neutral-400 w-5 h-5 pointer-events-none" />
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.preferredDate ? 'border-red-500' : 'border-neutral-200'} focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50`}
              />
            </div>
            {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
          </div>

          {/* Quick Stats: Duration and Pax */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">{t.duration}</label>
              <input
                type="number"
                min="1"
                max="90"
                value={formData.daysCount}
                onChange={(e) => setFormData({ ...formData, daysCount: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">{t.pax}</label>
              <div className="relative">
                <Users className="absolute left-3 top-3.5 text-neutral-400 w-4 h-4 pointer-events-none" />
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.paxCount}
                  onChange={(e) => setFormData({ ...formData, paxCount: Number(e.target.value) })}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Instructions */}
        <div>
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">{t.notes}</label>
          <textarea
            rows={4}
            value={formData.additionalRequests}
            onChange={(e) => setFormData({ ...formData, additionalRequests: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#761A7E] transition-all bg-neutral-50/50"
            placeholder={
              lang === 'ko' 
              ? '영어가능 리무진 버스 필요, 비건 뷔페 지정 탑방, 골프 18홀 포함 등 구체적으로 적어주실수록 상세 견적이 수월합니다.'
              : 'VIP English-speaking protocol chauffeur bus, specific dietary restrictions, luxury golf options...'
            }
          ></textarea>
        </div>

        {/* Dynamic Operator Advice Banner */}
        <div id="booking-inquiry-hint" className="p-4 rounded-xl bg-purple-50/30 border border-purple-100 flex items-start gap-3">
          <span className="text-[#CBAF00] text-lg font-bold">💡</span>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {lang === 'ko'
              ? '본 시스템은 실시간 DB 연동 견적 시스템으로 구동 중입니다. 제출된 모든 요청 사항은 즉시 관리자 오피스 클라이언트 및 랜드 담당자에 전송되어 신속하고 합리적인 패키지 가격 조율을 실행합니다.'
              : 'Our land operator management systems are interconnected. Submitting this quote instantly routes details to travel planners in charge of inbound customized events.'
            }
          </p>
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 bg-[#761A7E] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-opacity-95 transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <Send className="w-5 h-5" />
            {t.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
