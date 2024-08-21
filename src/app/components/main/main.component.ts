import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
