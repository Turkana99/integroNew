import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  constructor(private http: HttpClient, private langService: LanguageService) {}

  getEvaluationInfo(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(`${environment.caseEvaluation}/${lang}`);
  }

  getPageSetting(): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    return this.http.get<any>(
      `${environment.getPageSettingsInfo}/${lang}/FreeCaseEvaluation`
    );
  }
  // Add feedback func.
  addEvaluation(request: any): Observable<any> {
    return this.http.post<any>(environment.caseEvaluation, request);
  }
}
