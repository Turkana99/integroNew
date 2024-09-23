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
    HttpClientModule
  ],
  providers: [ContactService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  contactInfo: any = [];
  settingInfo: any = [];
  feedbackForm:any;
  
  constructor(
    private contactService: ContactService,
    private languageService: LanguageService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }
  initForm() {
    this.feedbackForm = this.fb.group({
      fullName: ['', Validators.required],
      emailAddress: ['', Validators.required],
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
        // console.log('Data loaded successfully', {
        //   contactInfo: this.contactInfo,
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
