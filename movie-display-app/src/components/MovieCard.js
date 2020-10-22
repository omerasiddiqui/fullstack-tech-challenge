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

    displayDetails = () => {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=cb269e4784c7332a4a0cee9e1438ef39&language=en-US`)
            .then(response => response.json())
            .then(result => {
                console.log(result)
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
        if (this.state.runtime > 0) {
            if (this.state.tagline.length < 2) {
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
            } else {
                details =
                    (
                        <div class="modal">
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

        } else {
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
