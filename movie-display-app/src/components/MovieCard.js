import React from 'react';

class MovieCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: null,
            genres: [],
            runtime: 0,
            tagline: null
        }
    }

    apiKey = process.env.REACT_APP_API_KEY;

    displayDetails = () => {
        const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=${this.apiKey}&language=en-US`;

        fetch(movieDetailsUrl)
            .then(response => response.json())
            .then(result => {
                let genreNames = [];

                for (let i = 0; i < result.genres.length; i++) {
                    genreNames.push(result.genres[i].name)
                }

                this.setState({
                    description: result.overview,
                    genres: genreNames,
                    runtime: result.runtime,
                    tagline: result.tagline
                })
            })
    }

    exitModal = (e) => {
        e.stopPropagation();
        this.setState({
            description: null,
            genres: [],
            runtime: 0,
            tagline: null
        })
    }

    render() {
        let details;
        // check for populated state
        if (this.state.runtime > 0) {
            // display if tagline is missing
            if (this.state.tagline.length < 1) {
                details = <div className="modal">
                    <div className="exit"><p onClick={this.exitModal}>X</p></div>
                    <div className="movie-description">
                        <label htmlFor="description">description: </label>
                        <p>{this.state.description}</p>
                    </div>
                    <div className="movie-runtime">
                        <label htmlFor="runtime">runtime: </label>
                        <p>{this.state.runtime}</p>
                    </div>
                    <div className="movie-genres">
                        <label htmlFor="genres">genres: </label>
                        {this.state.genres.map((value, index) => (
                            <p key={index}>{value}   </p>
                        ))}
                    </div>
                </div>
            }
            // display modal with details
            else {
                details =
                    (
                        <div className="modal">
                            <div className="exit"><p onClick={this.exitModal}>X</p></div>
                            <div className="movie-tagline">
                                <label htmlFor="tagline">tagline: </label>
                                <p>{this.state.tagline}</p>
                            </div>
                            <div className="movie-description">
                                <label htmlFor="description">description: </label>
                                <p>{this.state.description}</p>
                            </div>
                            <div className="movie-runtime">
                                <label htmlFor="runtime">runtime: </label>
                                <p>{this.state.runtime}</p>
                            </div>
                            <div className="movie-genres">
                                <label htmlFor="genres">genres: </label>
                                {this.state.genres.map((value, index) => (
                                    <p key={index}>{value}   </p>
                                ))}
                            </div>
                        </div>
                    )
            }

        }
        // empty state
        else {
            details = <div></div>
        }
        return (
            <div className="movie-card" onClick={this.displayDetails}>
                <div className="movie-title">
                    <label htmlFor="movieTitle">Movie Title: </label>
                    <p>{this.props.movieTitle}</p>
                </div>
                <div className="movie-release-date">
                    <label htmlFor="releaseDate">Release Date: </label>
                    <p>{this.props.releaseDate}</p>
                </div>
                {details}
            </div>
        )
    }
}

export default MovieCard;
