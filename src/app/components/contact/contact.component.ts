import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ContactService } from '../../core/services/contact.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LanguageService } from '../../core/services/lang.service';
import { catchError, forkJoin, of } from 'rxjs';
import { FeedbackService } from '../../core/services/feedback.service';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MaterialModule } from '../../material.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
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
    MaterialModule,
  ],
  providers: [ContactService, FeedbackService, MessageService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
    trigger('backInRight', [
      transition('void => *', [
        animate(
          '1.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }), // Start off-screen (right)
            style({
              opacity: 0.7,
              transform: 'translateX(-20px)',
              offset: 0.7,
            }), // Move slightly backward
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }), // Final position in view
          ])
        ),
      ]),
    ]),
    trigger('backInLeft', [
      transition('void => *', [
        animate(
          '1.5s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            style({ opacity: 0.7, transform: 'translateX(20px)', offset: 0.7 }), 
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }), 
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
export class ContactComponent implements OnInit {
  contactInfo: any = [];
  settingInfo: any = [];
  feedbackForm: any;
  buttonSpinner = false;
  sanitizedMapUrl: SafeResourceUrl | undefined;

  constructor(
    private contactService: ContactService,
    private feedbackService: FeedbackService,
    private messageService: MessageService,
    private languageService: LanguageService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }
  initForm() {
    this.feedbackForm = this.fb.group({
      fullName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  get Language() {
    return this.languageService.getTranslate();
  }

  loadData() {
    forkJoin({
      contactInfo: this.contactService.getContactInfo().pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
      settingInfo: this.contactService.getPageSetting().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
    }).subscribe({
      next: ({ contactInfo, settingInfo }) => {
        this.contactInfo = contactInfo;
        this.settingInfo = settingInfo;
        console.log('Data loaded successfully', {
          contactInfo: this.contactInfo,
          settingInfo: this.settingInfo,
        });
        this.sanitizedMapUrl = this.sanitizeUrl(this.contactInfo.googleMapUrl);
      },
      error: (err) => {
        console.error('Error in subscription:', err);
      },
      complete: () => {
        console.log('Data loading process completed.');
      },
    });
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Change func.
  sendFeedback() {
    let req: any = {
      fullName: this.feedbackForm.value['fullName'],
      emailAddress: this.feedbackForm.value['emailAddress'],
      phoneNumber: this.feedbackForm.value['phoneNumber'],
      content: this.feedbackForm.value['content'],
    };
    this.feedbackService.addFeedback(req).subscribe(
      () => {
        console.log('Updated successfully');
        this.messageService.add({
          severity: 'success',
          summary: this.Language.feedbacksSuc,
          detail: this.Language.feedbackSuccess,
          life: 2000,
        });
        this.feedbackForm.reset();
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
