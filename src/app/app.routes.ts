import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TeamComponent } from './components/team/team.component';
import { PartnersComponent } from './components/partners/partners.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'service',
    component: ServicesComponent,
  },
  {
    path: 'service-detail/:id',
    component: ServiceDetailComponent,
  },
  {
    path: 'team',
    component: TeamComponent,
  },
  {
    path: 'partner',
    component: PartnersComponent,
  },
  {
    path: 'blog',
    component: BlogsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'blog-detail/:id',
    component: BlogDetailComponent,
  },
  {
    path: 'evaluation',
    component: EvaluationComponent,
  },
];
