
export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  content: string;
  imageUrl: string;
  createdAt: number;
  author: string;
  isBreaking?: boolean;
}

export enum NewsCategory {
  NATIONAL = 'জাতীয়',
  POLITICS = 'রাজনীতি',
  INTERNATIONAL = 'আন্তর্জাতিক',
  SPORTS = 'খেলাধুলা',
  ENTERTAINMENT = 'বিনোদন',
  TECH = 'প্রযুক্তি',
  ECONOMY = 'অর্থনীতি'
}

export interface UserSession {
  isAdmin: boolean;
  lastLogin: number;
}
