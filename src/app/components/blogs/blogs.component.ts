import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  blogs=[
    {
      img:'assets/images/blog1.png',
      title:'What Makes an Authentic Employee Profile?',
      description:'Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem model text, many web sites still in their infancy. Content here, content here, making it look like readable English. Many  web page editors now use Lorem model text, many web sites still in their infancy. '
    },
    {
      img:'assets/images/blog2.png',
      title:'What Makes an Authentic Employee Profile?',
      description:'Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem model text, many web sites still in their infancy. Content here, content here, making it look like readable English. Many  web page editors now use Lorem model text, many web sites still in their infancy. '
    },
    {
      img:'assets/images/blog3.png',
      title:'What Makes an Authentic Employee Profile?',
      description:'Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem model text, many web sites still in their infancy. Content here, content here, making it look like readable English. Many  web page editors now use Lorem model text, many web sites still in their infancy. '
    },
    {
      img:'assets/images/blog3.png',
      title:'What Makes an Authentic Employee Profile?',
      description:'Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem model text, many web sites still in their infancy. Content here, content here, making it look like readable English. Many  web page editors now use Lorem model text, many web sites still in their infancy. '
    },
    {
      img:'assets/images/blog1.png',
      title:'What Makes an Authentic Employee Profile?',
      description:'Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem model text, many web sites still in their infancy. Content here, content here, making it look like readable English. Many  web page editors now use Lorem model text, many web sites still in their infancy. '
    },
    {
      img:'assets/images/blog2.png',
      title:'What Makes an Authentic Employee Profile?',
      description:'Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem model text, many web sites still in their infancy. Content here, content here, making it look like readable English. Many  web page editors now use Lorem model text, many web sites still in their infancy. '
    }
  ];
}
