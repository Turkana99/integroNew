import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutService } from '../../core/services/about.service';
import { catchError, forkJoin, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { LanguageService } from '../../core/services/lang.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [AboutService],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  aboutInfo: any = [];
  settingInfo: any = [];

  constructor(private aboutService: AboutService,private languageService:LanguageService) {}

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
        // console.log('Data loaded successfully', {
        //   aboutInfo: this.aboutInfo,
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
