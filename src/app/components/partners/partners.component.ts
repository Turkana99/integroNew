import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class PartnersComponent {
  partners:any = [
    {
      img: 'assets/images/GooglePay.svg',
    },
    {
      img: 'assets/images/SamsungPay.svg',
    },
    {
      img: 'assets/images/Payoneer.svg',
    },
    {
      img: 'assets/images/OpenSea.svg',
    },
    {
      img: 'assets/images/mastercard.svg',
    },
    {
      img: 'assets/images/Paypal.svg',
    },
    {
      img: 'assets/images/SamsungPay.svg',
    },
    {
      img: 'assets/images/Payoneer.svg',
    },
    {
      img: 'assets/images/OpenSea.svg',
    },
    {
      img: 'assets/images/mastercard.svg',
    },
    {
      img: 'assets/images/GooglePay.svg',
    },
    {
      img: 'assets/images/SamsungPay.svg',
    },
    {
      img: 'assets/images/Stripe.svg',
    },
    {
      img: 'assets/images/OpenSea.svg',
    },
    {
      img: 'assets/images/westernunion.svg',
    },
    {
      img: 'assets/images/Paypal.svg',
    },
    {
      img: 'assets/images/SamsungPay.svg',
    },
    {
      img: 'assets/images/Stripe.svg',
    },
    {
      img: 'assets/images/OpenSea.svg',
    },
    {
      img: 'assets/images/UnionPay.svg',
    },
    {
      img: 'assets/images/GooglePay.svg',
    },
    {
      img: 'assets/images/SamsungPay.svg',
    },
    {
      img: 'assets/images/westernunion.svg',
    },
    {
      img: 'assets/images/Paypal.svg',
    },
  ];
}
