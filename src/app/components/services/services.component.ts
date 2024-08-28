import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
services=[
  {
    img:'assets/images/service1.svg',
    name:'Banking/Finance',
  },
  {
    img:'assets/images/service2.svg',
    name:'Medical Malpractise',
  },
  {
    img:'assets/images/service3.svg',
    name:'Contract Law',
  },
  {
    img:'assets/images/service4.svg',
    name:'Employment',
  },
  {
    img:'assets/images/service5.svg',
    name:'Litigation',
  },
  {
    img:'assets/images/service6.svg',
    name:'Intellectual Property',
  },
  {
    img:'assets/images/service7.svg',
    name:'Construction',
  },  {
    img:'assets/images/service8.svg',
    name:'Business',
  },
  {
    img:'assets/images/service9.svg',
    name:'Bankruptcy',
  },
  {
    img:'assets/images/service10.svg',
    name:'Alternative Dispute resolution',
  },
  {
    img:'assets/images/service11.svg',
    name:'Immigration',
  }
];
itemsPerRow = 5;
isLastElement(index: number): boolean {
  const totalItems = this.services.length;
  return index === totalItems - 1;
}
}
