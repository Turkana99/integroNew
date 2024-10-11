import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutService } from '../../core/services/about.service';
import { catchError, forkJoin, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { LanguageService } from '../../core/services/lang.service';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ButtonModule],
  providers: [AboutService],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('backInRight', [
      transition('void => *', [
        animate(
          '1.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }), // Start off-screen (right)
            style({ opacity: 0.7, transform: 'translateX(-20px)', offset: 0.7 }), // Move slightly backward
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }), // Final position in view
          ])
        ),
      ]),
    ]),
    trigger('backInLeft', [
      transition('void => *', [
        animate(
          '1.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }), // Start off-screen (left)
            style({ opacity: 0.7, transform: 'translateX(20px)', offset: 0.7 }), // Move slightly forward
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }), // Final position in view
          ])
        ),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  aboutInfo: any = [];
  settingInfo: any = [];

  constructor(
    private aboutService: AboutService,
    private languageService: LanguageService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get Language() {
    return this.languageService.getTranslate();
  }

  loadData() {
    forkJoin({
      aboutInfo: this.aboutService.getAboutInfo().pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({ items: [] });
        })
      ),
      settingInfo: this.aboutService.getPageSetting().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] });
        })
      ),
    }).subscribe({
      next: ({ aboutInfo, settingInfo }) => {
        this.aboutInfo = aboutInfo;
        this.settingInfo = settingInfo;
        // Start the animation after data loading
        this.startAnimation();
      },
      error: (err) => {
        console.error('Error in subscription:', err);
      },
      complete: () => {
        console.log('Data loading process completed.');
      },
    });
  }

  startAnimation() {
    // Disable scroll while animating
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    // After the animation duration, re-enable scroll
    setTimeout(() => {
      this.renderer.removeStyle(document.body, 'overflow');
    }, 1500); // Matches the animation duration
  }
}
