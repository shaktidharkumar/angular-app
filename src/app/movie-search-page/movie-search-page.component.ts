import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../movies/movie.service';

@Component({
  selector: 'app-movie-search-page',
  templateUrl: './movie-search-page.component.html',
  styleUrls: ['./movie-search-page.component.scss']
})
export class MovieSearchPageComponent {
  movieList: Array<any> = [];
  movieDataSubscription: Subscription = new Subscription();
  movieSearchBox: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovieList();
  }

  getMovieList(): void {
    this.movieDataSubscription = this.movieService.getMovieData()
      .subscribe({
        next: (movieData: Array<any>): void => {
          this.movieList = movieData;
        },
        error: (err) => {
          console.log(err);
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
