import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../movies/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  movieList: Array<any> = [];
  movieDataSubscription: Subscription = new Subscription();

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.getMovieList();
  }

  getMovieList(): void {
    this.movieDataSubscription = this.movieService.getMovieData()
      .subscribe({
        next: (movieData: Array<any>): void => {
          this.movieList = movieData;
          this.movieList.sort((a: any, b: any) => b.year - a.year);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/error']);
        },
        complete: () => {
          console.log("completed");
        }
      });
  }
  ngOnDestroy(): void {
    this.movieDataSubscription.unsubscribe();
  }
}
