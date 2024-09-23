import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from '../../core/services/blog.service';
import { LanguageService } from '../../core/services/lang.service';
import { catchError, forkJoin, of } from 'rxjs';
@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule,HttpClientModule],
  providers: [BlogService],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  blogInfo: any = [];
  settingInfo: any = [];

  constructor(private blogService: BlogService,private languageService:LanguageService) {}

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
