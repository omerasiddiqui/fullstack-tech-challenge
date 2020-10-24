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
                        <p className="label description" >description: </p>
                        <p>{this.state.description}</p>
                    </div>
                    <div className="movie-runtime">
                        <p className="label" >runtime: </p>
                        <p>{this.state.runtime}</p>
                    </div>
                    <div className="movie-genres">
                        <p className="label" >genres: </p>
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
                                <p className="label" >tagline: </p>
                                <p>{this.state.tagline}</p>
                            </div>
                            <div className="movie-description">
                                <p className="label description">description: </p>
                                <p>{this.state.description}</p>
                            </div>
                            <div className="movie-runtime">
                                <p className="label" >runtime: </p>
                                <p>{this.state.runtime}</p>
                            </div>
                            <div className="movie-genres">
                                <p className="label" >genres: </p>
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
                    <p className="label mainLabel" >Movie Title: </p>
                    <p>{this.props.movieTitle}</p>
                </div>
                <div className="movie-release-date">
                    <p className="label mainLabel" >Release Date: </p>
                    <p>{this.props.releaseDate}</p>
                </div>
                {details}
            </div>
        )
    }
}

export default MovieCard;
