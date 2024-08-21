import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
team = [
  {
    img: 'assets/images/team1.svg',
    name:'Thomas Daniyel',
    position: 'Civil Attorney'
  },
  {
    img: 'assets/images/team2.svg',
    name:'Nikolona Gail',
    position: 'Senior Attorney'
  },
  {
    img: 'assets/images/team3.svg',
    name:'Michal David',
    position: 'Criminal Attorney'
  },
  {
    img: 'assets/images/team1.svg',
    name:'Thomas Daniyel',
    position: 'Civil Attorney'
  },
  {
    img: 'assets/images/team2.svg',
    name:'Nikolona Gail',
    position: 'Senior Attorney'
  },
  {
    img: 'assets/images/team3.svg',
    name:'Michal David',
    position: 'Criminal Attorney'
  },
]
}
