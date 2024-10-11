import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartnerService } from '../../core/services/partner.service';
import { LanguageService } from '../../core/services/lang.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError, forkJoin, of } from 'rxjs';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [PartnerService],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
  animations: [
    trigger('bounceInUp', [
      // Adding bounceInUp animation
      transition('void => *', [
        animate(
          '1.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(30px)', offset: 0 }), // Start slightly below
            style({
              opacity: 0.5,
              transform: 'translateY(-15px)',
              offset: 0.6,
            }), // Bounce up slightly
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }), // Final position
          ])
        ),
      ]),
    ]),
    trigger('backInUp', [
      transition('void => *', [
        animate(
          '1.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(200%)', offset: 0 }),
            style({
              opacity: 0.7,
              transform: 'translateY(-20px)',
              offset: 0.7,
            }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class PartnersComponent {
  partnerInfo: any = [];
  settingInfo: any = [];

  constructor(
    private partnerService: PartnerService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  get Language() {
    return this.languageService.getTranslate();
  }

  loadData() {
    forkJoin({
      partnerInfo: this.partnerService.getPartnerInfo().pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
      settingInfo: this.partnerService.getPageSetting().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
    }).subscribe({
      next: ({ partnerInfo, settingInfo }) => {
        this.partnerInfo = partnerInfo.items;
        this.settingInfo = settingInfo;
        // console.log('Data loaded successfully', {
        //   aboutInfo: this.partnerInfo,
        //   settingInfo: this.settingInfo,
        // });
      },
      error: (err) => {
        console.error('Error in subscription:', err);
      },
      complete: () => {
        console.log('Data loading process completed.');
      },
    });
  }
}
