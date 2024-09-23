import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { EvaluationService } from '../../core/services/evalutaion.service';
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from '../../core/services/lang.service';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    HttpClientModule,
  ],
  providers: [EvaluationService],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.scss',
})
export class EvaluationComponent {
  caseInfo: any = [];
  settingInfo: any = [];

  constructor(
    private evaluateService: EvaluationService,
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
      caseInfo: this.evaluateService.getEvaluationInfo().pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
      settingInfo: this.evaluateService.getPageSetting().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
    }).subscribe({
      next: ({ caseInfo, settingInfo }) => {
        this.caseInfo = caseInfo;
        this.settingInfo = settingInfo;
        // console.log('Data loaded successfully', {
        //   caseInfo: this.caseInfo,
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
