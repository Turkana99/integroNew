import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamService } from '../../core/services/team.service';
import { LanguageService } from '../../core/services/lang.service';
import { catchError, forkJoin, of } from 'rxjs';
import { WorkerDetailComponent } from '../dialogs/worker-detail/worker-detail.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
  ],
  providers: [TeamService],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  teamInfo: any = [];
  settingInfo: any = [];

  constructor(
    private teamService: TeamService,
    public dialog: MatDialog,
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
      teamInfo: this.teamService.getTeamInfo().pipe(
        catchError((error) => {
          console.error('Error fetching aboutInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
      settingInfo: this.teamService.getPageSetting().pipe(
        catchError((error) => {
          console.error('Error fetching settingInfo:', error);
          return of({ items: [] }); // Возвращаем объект с пустым массивом
        })
      ),
    }).subscribe({
      next: ({ teamInfo, settingInfo }) => {
        this.teamInfo = teamInfo.items;
        this.settingInfo = settingInfo;
        // console.log('Data loaded successfully', {
        //   teamInfo: this.teamInfo,
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

  openDialog(id?: number) {
    this.dialog
      .open(WorkerDetailComponent, {
        width: '800px!important',
        autoFocus: false,
        data: { memberId: id },
        position: {
          top: '50px',
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      });
  }
}
