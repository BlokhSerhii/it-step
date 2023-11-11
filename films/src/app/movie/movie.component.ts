import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent {

  movieTitle: string = '';
  movieYear: number | null = null;
  movie: any;
  isMovie: boolean = false;
  errorMovie: boolean = false;
  typeOfInfo: string = 'short';

  constructor(private http: HttpClient) {}

  getFullInfo(movieId: string) {
    const apiKey = 'd870ee02';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`;

    this.http.get(url).subscribe(
      (response: any) => {
        this.movie.fullPlot = response.Plot;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchMovie() {

    this.isMovie = false;
    this.errorMovie = false;
    this.typeOfInfo = 'short';
    
    const apiKey = 'd870ee02';
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${this.movieTitle}`;

    if (this.movieYear) {
      url += `&y=${this.movieYear}`;
    }

    this.http.get(url).subscribe(
      (response: any) => {
        this.movie = response;

        if (this.movie.Response === 'True') {
          this.getFullInfo(this.movie.imdbID);
          this.isMovie = !this.isMovie;
        }
          else {
            this.errorMovie = !this.errorMovie;
          }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
