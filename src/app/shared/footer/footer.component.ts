import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { LanguageService } from '../../core/services/lang.service';
import { catchError, forkJoin, of } from 'rxjs';
import { HomePagesService } from '../../core/services/homePage.service';
import { ContactService } from '../../core/services/contact.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DividerModule, HttpClientModule],
  providers: [HomePagesService, ContactService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  currentYear: number | undefined;
  homeInfo: any = {};
  contactInfo: any = {};

  constructor(
    private languageService: LanguageService,
    private homeService: HomePagesService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.loadData();
  }

  get Language() {
    return this.languageService.getTranslate();
  }

  loadData() {
    forkJoin({
      homeInfo: this.homeService.getHomePages().pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({}); 
        })
      ),
      contactInfo: this.contactService.getContactInfo().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({}); 
        })
      ),
    }).subscribe({
      next: ({ homeInfo, contactInfo }) => {
        this.homeInfo = homeInfo;
        this.contactInfo = contactInfo;
        // console.log('Data loaded successfully', {
        //   homeInfo: this.homeInfo,
        //   contactInfo: this.contactInfo,
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
