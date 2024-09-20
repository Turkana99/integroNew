import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class HomePagesService {
  constructor(private http: HttpClient, private langService: LanguageService) {}

  // Get phone func.
  getHomePages(req: any): Observable<any> {
    const lang = this.langService.getLanguage(); // Get current language
    let url = `${environment.getHomePageInfo}/${lang}`; 
    const defaultValues: any = {
      searchNumber: '',
      filterNumberType: 0,
    };
    for (const key of Object.keys(req)) {
      const value = req[key] || defaultValues[key];
      url += `${key}=${value}&`;
    }
    return this.http.get<any>(url, { observe: 'response' }).pipe(
      map((response) => {
        const totalData = JSON.parse(
          response.headers.get('x-pagination') as string
        ).TotalData;
        response.body.TotalData = totalData;
        return response.body;
      })
    );
  }
}
