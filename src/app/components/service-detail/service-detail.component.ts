import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/lang.service';
import { ServicesService } from '../../core/services/services.service';
import { catchError, forkJoin, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ServicesService],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent {
  serviceId: any;
  serviceInfo: any = [];
  settingInfo: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService,
    private servService: ServicesService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.serviceId = params['id'];
      console.log("ServiceId", this.serviceId);

    });
    this.loadData();
  }

  get Language() {
    return this.languageService.getTranslate();
  }

  loadData() {
    forkJoin({
      serviceInfo: this.servService.getServiceDetail(this.serviceId).pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
      settingInfo: this.servService.getPageSetting().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
    }).subscribe({
      next: ({ serviceInfo, settingInfo }) => {
        this.serviceInfo = serviceInfo;
        this.settingInfo = settingInfo;
        console.log('Data loaded successfully', {
          serviceInfo: this.serviceInfo,
          settingInfo: this.settingInfo,
        });
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
