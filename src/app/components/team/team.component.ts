import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
team = [
  {
    img: 'assets/images/team1.png',
    name:'Thomas Daniyel',
    position: 'Civil Attorney'
  },
  {
    img: 'assets/images/team2.png',
    name:'Nikolona Gail',
    position: 'Senior Attorney'
  },
  {
    img: 'assets/images/team3.png',
    name:'Michal David',
    position: 'Criminal Attorney'
  },
  {
    img: 'assets/images/team1.png',
    name:'Thomas Daniyel',
    position: 'Civil Attorney'
  },
  {
    img: 'assets/images/team2.png',
    name:'Nikolona Gail',
    position: 'Senior Attorney'
  },
  {
    img: 'assets/images/team3.png',
    name:'Michal David',
    position: 'Criminal Attorney'
  },
]
}
