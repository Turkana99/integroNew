import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private defaultLang = 'Az'; // Default language

  constructor() {}

  // Set language in localStorage
  setLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
  }

  // Get language from localStorage
  getLanguage(): string {
    return localStorage.getItem('lang') || this.defaultLang;
  }

  // Initialize language on startup
  initializeLanguage(): void {
    const savedLang = this.getLanguage();
    this.setLanguage(savedLang); // Set default if not available
  }
}
