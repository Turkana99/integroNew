import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: string;
  constantNavItem: any = {
    az: {
      homePage: 'Ana Səhifə',
      about: 'Haqqımızda',
      service: 'Xidmətlər',
      team: 'Komandamız',
      partner: 'Partnyorlar',
      blog: 'Bloglar',
      contact: 'Əlaqə məlumatları',
      workHours: 'İş saatları',
      openDay: 'Həftəiçi iş saatları',
      vacation: 'Qeyri iş günləri',
      vacDay: 'Hər bazar və bütün rəsmi bayram günləri',
      question: 'Sualınız var?',
    },
    en: {
      homePage: 'Home Page',
      about: 'About',
      service: 'Services',
      team: 'Team',
      partner: 'Partners',
      blog: 'Blogs',
      contact: 'Contact',
      workHours: 'Business hours',
      openDay: 'İş saatları',
      vacation: 'Vacations',
      vacDay: 'All sunday days all official holidays',
      question: 'Have a questions?',
    },
    ru: {
      homePage: 'Главная страница',
      about: 'О нас',
      service: 'Услуги',
      team: 'Команда',
      partner: 'Партнеры',
      blog: 'Блоги',
      contact: 'Контакт',
      workHours: 'Часы работы',
      openDay: 'Дни работы:',
      vacation: 'Каникулы',
      vacDay: 'Все воскресные дни, все официальные праздники.',
      question: 'Есть вопросы?',
    },
  };
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'az';
  }

  // Set language in localStorage
  setLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
  }

  // Get language from localStorage
  getLanguage(): string {
    return localStorage.getItem('lang') || this.currentLanguage;
  }

  // Initialize language on startup
  initializeLanguage(): void {
    const savedLang = this.getLanguage();
    this.setLanguage(savedLang); // Set default if not available
  }
  getTranslate() {
    return this.constantNavItem[this.currentLanguage];
  }
}
