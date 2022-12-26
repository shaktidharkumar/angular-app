import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../movies/movie.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss']
})
export class MovieDetailPageComponent implements OnInit, OnDestroy {
  movieRank!: number;
  movieDataSubscription: Subscription = new Subscription;
  movieList: Array<any> = [];
  searchedMovieDetails: any;

  movieYear!: number;
  movieTitle!: string;
  movieDirectors: any;
  movieReleaseDate!: Date;
  movieGenres: any;
  movieImage!: string;
  moviePlot!: string;
  movieRunningTime!: number;
  movieActors: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {
    this.route.params.subscribe(params => {
      this.movieRank = params['movieRank'];
    });
  }

  ngOnInit(): void {
    this.getMovieList();
  }
  getMovieList(): void {
    this.movieDataSubscription = this.movieService.getMovieData()
      .subscribe({
        next: (movieData: Array<any>): void => {
          this.movieList = movieData;
          this.searchedMovieDetails = this.getSearchedMovieList(this.movieRank);
          if (this.searchedMovieDetails) {
            this.movieYear = this.searchedMovieDetails.year;
            this.movieTitle = this.searchedMovieDetails.title;
            this.movieDirectors = this.searchedMovieDetails.info.directors;
            this.movieReleaseDate = this.searchedMovieDetails.info.release_date;
            this.movieGenres = this.searchedMovieDetails.info.genres;
            this.movieImage = this.searchedMovieDetails.info.image_url;
            this.moviePlot = this.searchedMovieDetails.info.plot;
            this.movieRunningTime = this.searchedMovieDetails.info.running_time_secs;
            this.movieActors = this.searchedMovieDetails.info.actors;
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/error']);
        },
        complete: () => {
        }
      });
  }
  getSearchedMovieList(movieRank: any): any {
    return this.movieList.find((x) => x.info.rank == movieRank);
  }

  ngOnDestroy(): void {
    this.movieDataSubscription.unsubscribe();
  }

}
