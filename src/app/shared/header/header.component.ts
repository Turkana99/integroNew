import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  whiteLogo = false;
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
}
