import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit{
  title:any;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.title = params['title'];
    });
  }
}
