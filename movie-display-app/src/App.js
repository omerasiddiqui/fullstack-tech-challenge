import React, { useState } from 'react';
import logo from './tiff_logo.svg.png';
import './App.css';
import MovieCard from './components/MovieCard';

function App() {
  const apiKey = 'cb269e4784c7332a4a0cee9e1438ef39';
  const allMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020`;

  const [movies, setMovies] = useState(null);

  let movieIds = [];
  let allMovieDetails = [];

  function fetchMovies() {

    fetch(allMoviesUrl)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.results)
        setMovies(data.results);

        data.results.map((item) => {
          movieIds.push(item.id)
        })

      });

  }

  // function displayDetails() {
  //   console.log("HELLO")

  //   movieIds.map((item, index) => {
  //     fetch(`https://api.themoviedb.org/3/movie/${item}?api_key=${apiKey}&language=en-US`)
  //       .then(response => response.json())
  //       .then(result => {
  //         console.log(result)
  //         movieDetails.push(result);
  //       })
  //   })

  //   setMovieDetails(allMovieDetails);
  //   console.log(allMovieDetails);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>TIFF Movie App</h1>
      </header>
      <main>

        <div>
          <button className="fetch-button" onClick={fetchMovies}>Get Movies</button>
        </div>

        <div className="movies">

          {movies && movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              movieTitle={movie.original_title}
              releaseDate={movie.release_date}
            />

          ))}
        </div>

      </main>
    </div>
  )
}

export default App;
