import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MaterialModule } from '../../material.module';

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
    MaterialModule
  ],
  providers: [EvaluationService, MessageService],
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
  animations: [
    trigger('bounceInUp', [
      transition('void => *', [
        animate(
          '1.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(30px)', offset: 0 }),
            style({
              opacity: 0.5,
              transform: 'translateY(-15px)',
              offset: 0.6,
            }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('backInUp', [
      transition('void => *', [
        animate(
          '1.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(200%)', offset: 0 }),
            style({
              opacity: 0.7,
              transform: 'translateY(-20px)',
              offset: 0.7,
            }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class EvaluationComponent implements OnInit {
  caseInfo: any = [];
  settingInfo: any = [];
  evaluateForm: any;
  buttonSpinner=false;
  files: File[] = []; // Store selected files
  allowedFileTypes: string[] = [
    'image/svg+xml',
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];
  maxFileSize: number = 5 * 1024 * 1024; // 5MB
  invalidFileType: boolean = false;
  fileSizeExceeded: boolean = false;

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
          console.error('Error fetching caseInfo:', error);
          return of({ items: [] }); 
        })
      ),
      settingInfo: this.evaluateService.getPageSetting().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] }); 
        })
      ),
    }).subscribe({
      next: ({ caseInfo, settingInfo }) => {
        this.caseInfo = caseInfo;
        this.settingInfo = settingInfo;
      },
      error: (err) => {
        console.error('Error in subscription:', err);
      },
      complete: () => {
        console.log('Data loading process completed.');
      },
    });
  }

  onFilesSelected(event: any) {
    this.files = []; 
    this.invalidFileType = false; 
    this.fileSizeExceeded = false; 

 
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];

        // Check for file type
        if (!this.allowedFileTypes.includes(file.type)) {
          this.invalidFileType = true;
          break; 
        }

        // Check for file size
        if (file.size > this.maxFileSize) {
          this.fileSizeExceeded = true;
          break;
        }

        this.files.push(file); 
      }

      // Display error messages if validation fails
      if (this.invalidFileType) {
        this.messageService.add({
          severity: 'error',
          summary: this.Language.feedBackErr,
          detail: this.Language.formatMessage,
          life: 3000,
        });
        this.files = []; 
      } else if (this.fileSizeExceeded) {
        this.messageService.add({
          severity: 'error',
          summary: this.Language.feedBackErr,
          detail: this.Language.fileSizeErrorMessage,
          life: 3000,
        });
        this.files = []; 
      } else {
        console.log('Selected files:', this.files); 
      }
    }
  }

  submitEvaluation() {
    const formData = new FormData();
    formData.append('Message', this.evaluateForm.get('message')!.value);

    // Append files to FormData
    for (const file of this.files) {
      formData.append('Attachments', file); 
    }

    // Call service to add evaluation
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
        this.files = []; 
      },
      (error) => {
        console.error('Error submitting evaluation:', error);
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
