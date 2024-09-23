import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient, private langService: LanguageService) {}

  getAboutInfo(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(`${environment.getAboutInfo}/${lang}`);
  }

  getPageSetting(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(`${environment.getPageSettingsInfo}/${lang}/About`);
  }
}
