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
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,InputTextModule,InputTextareaModule, ButtonModule,ToastModule,CommonModule,RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit{
  feedbackForm: any;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.feedbackForm = this.fb.group({
      fullName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
}
