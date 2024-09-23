import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HomePagesService } from '../../core/services/homePage.service';
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from '../../core/services/lang.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule, HttpClientModule],
  providers: [HomePagesService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  homePageInfo: any = [];

  constructor(private homeService: HomePagesService, private languageService:LanguageService) {}

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
