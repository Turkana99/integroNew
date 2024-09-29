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
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [EvaluationService, MessageService],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.scss',
})
export class EvaluationComponent {
  caseInfo: any = [];
  settingInfo: any = [];
  evaluateForm: any;
  file?: File;
  constructor(
    private evaluateService: EvaluationService,
    private messageService: MessageService,
    private languageService: LanguageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.initForm();
  }
  initForm() {
    this.evaluateForm = this.fb.group({
      message: ['', Validators.required],
      caseEvaluationAttachments: ['', Validators.required],
    });
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
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  submitEvaluation() {
    const formData = new FormData();
    formData.append('message', this.evaluateForm.get('message')!.value);
    if (this.file) {
      formData.append('caseEvaluationAttachments', this.file);
    }
    this.evaluateService.addEvaluation(formData).subscribe(
      () => {
        console.log('Updated successfully');
        this.messageService.add({
          severity: 'success',
          summary: this.Language.feedbacksSuc,
          detail: this.Language.feedbackSuccess,
          life: 2000,
        });
        this.evaluateForm.reset();
      },
      (error) => {
        console.error('Error updating password :', error);
        this.messageService.add({
          severity: 'error',
          summary: this.Language.feedBackErr,
          detail: this.Language.feedbackError,
          life: 2000,
        });
      }
    );
  }
}
