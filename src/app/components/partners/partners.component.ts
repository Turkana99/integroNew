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
      img: 'assets/images/GooglePay.png',
    },
    {
      img: 'assets/images/SamsungPay.png',
    },
    {
      img: 'assets/images/Payoneer.png',
    },
    {
      img: 'assets/images/OpenSea.png',
    },
    {
      img: 'assets/images/mastercard.png',
    },
    {
      img: 'assets/images/Paypal.png',
    },
    {
      img: 'assets/images/SamsungPay.png',
    },
    {
      img: 'assets/images/Payoneer.png',
    },
    {
      img: 'assets/images/OpenSea.png',
    },
    {
      img: 'assets/images/mastercard.png',
    },
    {
      img: 'assets/images/GooglePay.png',
    },
    {
      img: 'assets/images/SamsungPay.png',
    },
    {
      img: 'assets/images/Stripe.png',
    },
    {
      img: 'assets/images/OpenSea.png',
    },
    {
      img: 'assets/images/Visa.png',
    },
    {
      img: 'assets/images/Paypal.png',
    },
    {
      img: 'assets/images/SamsungPay.png',
    },
    {
      img: 'assets/images/Stripe.png',
    },
    {
      img: 'assets/images/OpenSea.png',
    },
    {
      img: 'assets/images/UnionPay.png',
    },
    {
      img: 'assets/images/GooglePay.png',
    },
    {
      img: 'assets/images/SamsungPay.png',
    },
    {
      img: 'assets/images/Visa.png',
    },
    {
      img: 'assets/images/Paypal.png',
    },
  ];
}
