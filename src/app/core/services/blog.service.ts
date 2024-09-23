import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private langService: LanguageService) {}

  getBlogInfo(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(`${environment.getBlogPageInfo}/${lang}`);
  }

  getPageSetting(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(
      `${environment.getPageSettingsInfo}/${lang}/Blogs`
    );
  }
  getPageSettingDet(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(
      `${environment.getPageSettingsInfo}/${lang}/BlogDetail`
    );
  }
  getBlogDetail(id:any): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(
      `${environment.getBlogInfo}/${lang}/${id}`
    );
  }
}
