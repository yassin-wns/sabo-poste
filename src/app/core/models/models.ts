export type LangCode = 'fr' | 'ar' | 'en';

export interface MultilingualText {
  fr: string;
  ar: string;
  en: string;
}

export interface MultilingualList {
  fr: string[];
  ar: string[];
  en: string[];
}

export interface Category {
  id: string;
  name: MultilingualText;
  description: MultilingualText;
  icon: string;
  count?: number;
}

export interface PostalService {
  id: string;
  categoryId: string;
  title: MultilingualText;
  summary: MultilingualText;
  description: MultilingualText;
  icon: string;
  requirements: MultilingualList;
  steps: MultilingualList;
  deliveryTime: MultilingualText;
  featured: boolean;
  isPopular?: boolean;
}

export interface AgencyScheduleItem {
  morning: string;
  afternoon: string;
  status: 'open' | 'half-day' | 'closed';
}

export interface AgencySchedule {
  monday: AgencyScheduleItem;
  tuesday: AgencyScheduleItem;
  wednesday: AgencyScheduleItem;
  thursday: AgencyScheduleItem;
  friday: AgencyScheduleItem;
  saturday: AgencyScheduleItem;
  sunday: AgencyScheduleItem;
}

export interface Agency {
  id: string;
  name: MultilingualText;
  postalCode: string;
  governorate: MultilingualText;
  delegation: MultilingualText;
  address: MultilingualText;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  schedule: AgencySchedule;
  features: MultilingualText[];
  activeCounters: number;
  supervisor: string;
}

export type MessageStatus = 'pending' | 'reviewed' | 'replied';

export interface ContactMessage {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  message: string;
  status: MessageStatus;
  adminNote?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: MultilingualText;
  category: string;
  author: string;
  date: string;
  summary: MultilingualText;
  content: MultilingualText;
  featured: boolean;
}

export interface GuideStep {
  stepNumber: number;
  title: MultilingualText;
  description: MultilingualText;
}

export interface Guide {
  id: string;
  title: MultilingualText;
  category: string;
  readTime: string;
  steps: GuideStep[];
}

export interface FAQ {
  id: string;
  category: string;
  question: MultilingualText;
  answer: MultilingualText;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'SuperAdmin' | 'Admin' | 'Agent';
  active: boolean;
  createdAt: string;
}

export interface PlatformSettings {
  siteName: MultilingualText;
  agencyName: MultilingualText;
  emergencyPhone: string;
  supportEmail: string;
  announcementActive: boolean;
  announcement: MultilingualText;
  version: string;
  academicReference: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}
