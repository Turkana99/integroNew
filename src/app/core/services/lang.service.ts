import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService implements OnInit{
  private currentLanguage: string;
  constantNavItem: any = {
    az: {
      homePage: 'Ana Səhifə',
      about: 'Haqqımızda',
      service: 'Xidmətlər',
      team: 'Komandamız',
      partner: 'Partnyorlar',
      blog: 'Bloglar',
      case:'Hüquqi qiymətləndirmə',
      contact: 'Əlaqə məlumatları',
      workHours: 'İş saatları',
      openDay: 'Həftəiçi iş saatları:',
      vacation: 'Qeyri iş günləri:',
      vacDay: 'Hər bazar və bütün rəsmi bayram günləri',
      question: 'Sualınız var?',
      workDay1: 'Bazar ertəsi - Cümə: 09:00-dan 20:00-dək',
      workDay2: 'Şənbə: 09:00-dan 17:00-dək',
      homeBtn:'Hüquqi dəyərləndirmə',
      copyright:'Bütün müəllif hüquqları qorunur - Integro',
    },
    en: {
      homePage: 'Home Page',
      about: 'About',
      service: 'Services',
      team: 'Team',
      partner: 'Partners',
      blog: 'Blogs',
      contact: 'Contact',
      case:'Free case evaluation',
      workHours: 'Business hours',
      openDay: 'Opening Days:',
      vacation: 'Vacations:',
      vacDay: 'All sunday days all official holidays',
      question: 'Have a questions?',
      workDay1: 'Monday - Friday: 09:00 to 20:00',
      workDay2: 'Saturday: 09:00 to 17:00',
      homeBtn:'Legal assessment',
      copyright:'Copyright All rights reserved Integro',
    },
    ru: {
      homePage: 'Главная страница',
      about: 'О нас',
      service: 'Услуги',
      team: 'Команда',
      partner: 'Партнеры',
      blog: 'Блоги',
      contact: 'Контакт',
      case:'Бесплатная оценка дела',
      workHours: 'Часы работы',
      openDay: 'Дни работы:',
      vacation: 'Каникулы:',
      vacDay: 'Все воскресные дни, все официальные праздники.',
      question: 'Есть вопросы?',
      workDay1: 'Понедельник-Пятница: с 09:00 до 20:00.',
      workDay2: 'Суббота: с 09:00 до 17:00',
      homeBtn:'Юридическая оценка',
      copyright:'Авторские права Все права защищены Integro',
    },
  };
  constructor() {
    this.currentLanguage = localStorage.getItem('lang') || 'az';
  }
  ngOnInit(): void {
    this.getTranslate();
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
