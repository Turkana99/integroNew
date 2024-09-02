import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  services = [
    {
      img: 'assets/images/service1.png',
      name: 'Banking/Finance',
    },
    {
      img: 'assets/images/service2.png',
      name: 'Medical Malpractise',
    },
    {
      img: 'assets/images/service3.png',
      name: 'Contract Law',
    },
    {
      img: 'assets/images/service4.png',
      name: 'Employment',
    },
    {
      img: 'assets/images/service5.png',
      name: 'Litigation',
    },
    {
      img: 'assets/images/service6.png',
      name: 'Intellectual Property',
    },
    {
      img: 'assets/images/service7.png',
      name: 'Construction',
    },
    {
      img: 'assets/images/service8.png',
      name: 'Business',
    },
    {
      img: 'assets/images/service9.png',
      name: 'Bankruptcy',
    },
    {
      img: 'assets/images/service10.png',
      name: 'Alternative Dispute resolution',
    },
    {
      img: 'assets/images/service11.png',
      name: 'Immigration',
    },
  ];
  rows: any = [];
  ngOnInit() {
    // this.splitServices(this.services, 5);
    // console.log(this.rows);
  }

  // splitServices(servicesArray: any[], itemsPerRow: number) {
  //   const totalRows = Math.ceil(servicesArray.length / itemsPerRow);
  //   for (let i = 0; i < totalRows; i++) {
  //     let row = servicesArray.slice(
  //       i * itemsPerRow,
  //       i * itemsPerRow + itemsPerRow
  //     );
  //     this.rows.push(row);

  //   }
  // }

}
