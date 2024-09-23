import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient, private langService: LanguageService) {}

  getContactInfo(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(`${environment.getContactPageInfo}/${lang}`);
  }

  getPageSetting(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(`${environment.getPageSettingsInfo}/${lang}/Contact`);
  }

}
