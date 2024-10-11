import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HomePagesService } from '../../core/services/homePage.service';
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from '../../core/services/lang.service';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule, HttpClientModule],
  providers: [HomePagesService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1.6s ease-in', style({ opacity: 1 })),
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
export class MainComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  homePageInfo: any = [];

  constructor(
    private homeService: HomePagesService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.getHomePages();
  }

  get Language() {
    return this.languageService.getTranslate();
  }
  // Get all homePage info
  getHomePages() {
    this.homeService.getHomePages().subscribe(
      (response) => {
        this.homePageInfo = response;
        // console.log('HomePage', this.homePageInfo);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
