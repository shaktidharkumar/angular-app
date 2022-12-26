import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieDetailPageComponent } from './movie-detail-page/movie-detail-page.component';
import { MovieSearchPageComponent } from './movie-search-page/movie-search-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent
  },
  {
    path: 'movie-list',
    title: 'Movie Search List',
    component: MovieSearchPageComponent
  },
  {
    path: 'movie-detail',
    title: 'Movie Details',
    // canActivate:[redi]
    component: MovieDetailPageComponent
  },
  {
    path: 'movie-detail/:movieRank',
    title: 'Movie Details',
    component: MovieDetailPageComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'error',
    title: 'Error Occurred',
    component: ErrorPageComponent
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit {
  movieRank!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movieRank = params['movieRank'];
    })
  }
}
