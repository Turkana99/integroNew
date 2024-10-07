import { Component, Inject, OnInit } from '@angular/core';
import { TeamService } from '../../../core/services/team.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/services/lang.service';

@Component({
  selector: 'app-worker-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, MatDialogModule],
  providers: [TeamService],
  templateUrl: './worker-detail.component.html',
  styleUrl: './worker-detail.component.scss',
})
export class WorkerDetailComponent implements OnInit {
  memberId: any;
  workerInfo: any = [];

  constructor(
    private teamService: TeamService,
    private langService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<WorkerDetailComponent>
  ) {}

  ngOnInit(): void {
    this.memberId = this.data?.memberId;
    if (this.memberId) this.getMemberById(this.memberId);
  }

  get Language() {
    return this.langService.getTranslate();
  }

  getMemberById(id: number) {
    console.log('id', id);

    this.teamService.getMemberWithId(id).subscribe(
      (response) => {
        console.log('response', response);
        this.workerInfo = response;
      },
      (error) => {
        console.error('Error fetching member data:', error);
      }
    );
  }
}
