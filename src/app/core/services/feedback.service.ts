import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment';
import { LanguageService } from './lang.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient, private langService: LanguageService) {}

  // Add feedback func.
  addFeedback(request: any): Observable<any> {
    return this.http.post<any>(
      environment.feedback,
      request
    );
  }


}
