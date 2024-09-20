import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HomePagesService } from '../../core/services/homePage.service';
import { HttpClientModule } from '@angular/common/http'; // Make sure this is imported

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule, HttpClientModule],
  providers: [HomePagesService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  homePageInfo: any[] = [];

  constructor(private homeService: HomePagesService) {}

  ngOnInit(): void {
    this.getHomePages();
  }

  // Get all homePage info
  getHomePages() {
    this.homeService.getHomePages({}).subscribe(
      (response) => {
        this.homePageInfo = response;
        console.log('Type', this.homePageInfo);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
