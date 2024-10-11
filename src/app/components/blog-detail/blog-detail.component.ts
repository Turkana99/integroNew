import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/lang.service';
import { BlogService } from '../../core/services/blog.service';
import { catchError, forkJoin, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, CarouselModule],
  providers: [BlogService],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
  animations: [
    trigger('bounceInUp', [
      // Adding bounceInUp animation
      transition('void => *', [
        animate(
          '1.7s ease-out',
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
export class BlogDetailComponent implements OnInit {
  blogId: any;
  blogInfo: any = [];
  settingInfo: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService,
    private blogService: BlogService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.blogId = params['id'];
    });
    this.loadData();
  }

  get Language() {
    return this.languageService.getTranslate();
  }

  loadData() {
    forkJoin({
      blogInfo: this.blogService.getBlogDetail(this.blogId).pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
      settingInfo: this.blogService.getPageSettingDet().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
    }).subscribe({
      next: ({ blogInfo, settingInfo }) => {
        this.blogInfo = blogInfo;
        this.settingInfo = settingInfo;
        console.log('Data loaded successfully', {
          blogInfo: this.blogInfo,
          settingInfo: this.settingInfo,
        });
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
