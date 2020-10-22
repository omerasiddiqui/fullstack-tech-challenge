import React, { useState, useEffect } from 'react';
import logo from './tiff_logo.svg.png';
import './App.css';
import MovieCard from './components/MovieCard';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const allMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020`;

    function fetchMovies() {
      console.log(process.env.REACT_APP_API_KEY);
      fetch(allMoviesUrl)
        .then(resp => resp.json())
        .then(data => {
          console.log(data.results)
          setMovies(data.results);

        });
    }

    fetchMovies();;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>TIFF Movie App</h1>
      </header>
      <main>

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
