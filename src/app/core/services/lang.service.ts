import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService implements OnInit {
  private currentLanguage: string;
  constantNavItem: any = {
    az: {
      homePage: 'Ana Səhifə',
      about: 'Haqqımızda',
      service: 'Xidmətlər',
      team: 'Komandamız',
      partner: 'Tərəfdaşlar',
      blog: 'Bloglar',
      case: 'Hüquqi qiymətləndirmə',
      contact: 'Əlaqə məlumatları',
      workHours: 'İş saatları',
      openDay: 'Həftəiçi iş saatları:',
      vacation: 'Qeyri-iş günləri:',
      vacDay: 'Hər şənbə, bazar və bütün rəsmi bayram günləri',
      question: 'Sualınız var?',
      workDay1: 'Bazar ertəsi - Cümə: 10:00-dan 17:00-dək',
      homeBtn: 'Hüquqi dəyərləndirmə',
      copyright: 'Bütün müəllif hüquqları qorunur - Integro',
      feedbackSuccess: 'Rəyiniz uğurla göndərildi!',
      feedbackError: 'Xəta baş verdi!',
      feedbacksSuc: 'Uğurlu',
      feedBackErr: 'Xəbərdarlıq',
      nameHolder: 'Ad',
      emailHolder: 'Elektron-poçt ünvanı',
      numberHolder: 'Telefon nömrəsi',
      messageHolder: 'Məzmun',
      reqMessage: 'Bu xana boş ola bilməz',
      formatMessage: 'Düzgün format deyil',
      close: 'Bağla',
    },
    en: {
      homePage: 'Home Page',
      about: 'About',
      service: 'Services',
      team: 'Team',
      partner: 'Partners',
      blog: 'Blogs',
      contact: 'Contact',
      case: 'Free case evaluation',
      workHours: 'Business hours',
      openDay: 'Opening Days:',
      vacation: 'Vacations:',
      vacDay: 'All saturday, sunday days all official holidays',
      question: 'Have a questions?',
      workDay1: 'Monday - Friday: 10:00 to 17:00',
      homeBtn: 'Legal assessment',
      copyright: 'Copyright All rights reserved Integro',
      feedbackSuccess: 'Your feedback has been sent successfully!',
      feedbackError: 'An error occurred!',
      feedbacksSuc: 'Success',
      feedBackErr: 'Error',
      nameHolder: 'Name',
      emailHolder: 'Email',
      numberHolder: 'Phone number',
      messageHolder: 'Message',
      reqMessage: "This field can't be empty",
      formatMessage: 'Not the correct format',
      close: 'Close',
    },
    ru: {
      homePage: 'Главная страница',
      about: 'О нас',
      service: 'Услуги',
      team: 'Наша команда',
      partner: 'Партнёры',
      blog: 'Блоги',
      contact: 'Связь',
      case: 'Бесплатная оценка дела',
      workHours: 'Часы работы',
      openDay: 'Дни работы:',
      vacation: 'Каникулы:',
      vacDay: 'Все cуббота, воскресные дни, все официальные праздники.',
      question: 'Есть вопросы?',
      workDay1: 'Понедельник-Пятница: с 10:00 до 17:00.',
      homeBtn: 'Юридическая оценка',
      copyright: 'Авторские права Все права защищены Integro',
      feedbackSuccess: 'Ваш отзыв был успешно отправлен!',
      feedbackError: 'Произошла ошибка!',
      feedbacksSuc: 'Успешный',
      feedBackErr: 'Ошибка',
      nameHolder: 'Имя',
      emailHolder: 'Электронная почта',
      numberHolder: 'Номер телефона',
      messageHolder: 'Сообщение',
      reqMessage: 'Это поле не может быть пустым',
      formatMessage: 'Неверный формат',
      close: 'Закрывать',
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
