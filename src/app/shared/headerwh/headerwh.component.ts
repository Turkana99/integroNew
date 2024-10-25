import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core'; 
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/lang.service';

@Component({
  selector: 'app-headerWh',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './headerwh.component.html',
  styleUrls: ['./headerwh.component.scss'],
})
export class HeaderWhComponent implements OnInit {
  whiteLogo = false;
  selectedLanguage: string = 'az';

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private elementRef: ElementRef 
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

  get currentLanguage() {
    return this.languageService.getLanguage();
  }

  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.selectedLanguage = lang;
    location.reload();
  }

  
  closeNavbar() {
    const navbarCollapse = this.elementRef.nativeElement.querySelector('.navbar-collapse') as HTMLElement;
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');  
    }
  }
}
