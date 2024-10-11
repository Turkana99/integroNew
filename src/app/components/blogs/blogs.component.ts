import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from '../../core/services/blog.service';
import { LanguageService } from '../../core/services/lang.service';
import { catchError, forkJoin, of } from 'rxjs';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
  ],
  providers: [BlogService],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
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
export class BlogsComponent {
  blogInfo: any = [];
  settingInfo: any = [];

  constructor(
    private blogService: BlogService,
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
      blogInfo: this.blogService.getBlogInfo().pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
      settingInfo: this.blogService.getPageSetting().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
    }).subscribe({
      next: ({ blogInfo, settingInfo }) => {
        this.blogInfo = blogInfo.items;
        this.settingInfo = settingInfo;
        // console.log('Data loaded successfully', {
        //   blogInfo: this.blogInfo,
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
