import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url: string = "assets/jsonData/moviedata.json";

  constructor(private httpClient: HttpClient) { }

  getMovieData(): Observable<any> {
    return this.httpClient.get(this.url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("A client side or network error occurred: ", error.error);
    } else {
      console.error(`Backend returned code ${error.status}, error: `, error.error);
    }
    return throwError(() => new Error('Something wrong happened; please try again later'));
  }

}
