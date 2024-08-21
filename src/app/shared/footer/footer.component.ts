import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  currentYear: number | undefined;
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
