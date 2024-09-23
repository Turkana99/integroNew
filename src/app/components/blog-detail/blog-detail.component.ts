import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/lang.service';
import { BlogService } from '../../core/services/blog.service';
import { catchError, forkJoin, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule,CarouselModule],
  providers: [BlogService],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
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
