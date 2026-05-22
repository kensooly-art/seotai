export interface TourPackage {
  id: string;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  descriptionKo: string;
  descriptionEn: string;
  priceAmount: number;
  priceCurrency: 'KRW' | 'USD';
  durationDays: number;
  durationNights: number;
  imageUrl: string;
  tourTags: string[];
  isHot: boolean;
  transportType: string;
}

export interface BoardArticle {
  id: string;
  titleKo: string;
  titleEn: string;
  contentKo: string;
  contentEn: string;
  category: 'Notice' | 'Guide' | 'Review' | 'Promo';
  author: string;
  createdAt: string;
  imageUrl?: string;
}

export interface BookingInquiry {
  id: string;
  clientName: string;
  contactEmail: string;
  contactPhone: string;
  preferredDate: string;
  daysCount: number;
  paxCount: number;
  destination: string;
  additionalRequests: string;
  status: 'Pending' | 'Contacted' | 'Completed';
  createdAt: string;
  adminNotes?: string;
}

export interface NavigationItem {
  id: string;
  labelKo: string;
  labelEn: string;
  sectionId: string; // e.g., 'home', 'tours', 'board', 'booking'
}

export interface FooterConfig {
  companyNameKo: string;
  companyNameEn: string;
  addressKo: string;
  addressEn: string;
  ceoKo: string;
  ceoEn: string;
  registrationNumber: string;
  telephone: string;
  fax: string;
  email: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTwitter: string;
  skype?: string;
  lineId?: string;
  kakaoAccount?: string;
  wechatId?: string;
  mobilePhone?: string;
  website?: string;
}

export interface ThemeConfig {
  primaryColor: string; // Default #761A7E
  secondaryColor: string; // Default #CBAF00
  backgroundColor: string; // Default #FFFFFF
  headingFont: 'Space Grotesk' | 'Playfair Display' | 'Outfit' | 'Inter';
  bodyFont: 'Inter' | 'JetBrains Mono' | 'system-ui';
  seoTitleKo: string;
  seoTitleEn: string;
  seoDescriptionKo: string;
  seoDescriptionEn: string;
  seoKeywordsKo: string;
  seoKeywordsEn: string;
}
