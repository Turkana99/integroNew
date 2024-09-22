import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/lang.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  whiteLogo = false;
  selectedLanguage: string = 'Az';
  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const element = document.querySelector('.header') as HTMLElement;
    if (window.pageYOffset > 100) {
      element.classList.add('navbar-inverse');
      this.whiteLogo = true;
    } else {
      element.classList.remove('navbar-inverse');
      this.whiteLogo = false;
    }
  }

  ngOnInit(): void {
    this.selectedLanguage = this.languageService.getLanguage();
  }

  get Language() {
    return this.languageService.getTranslate();
  }

  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.selectedLanguage = lang;
    location.reload();
  }
}
