import React, {useEffect, useState} from 'react'
import styled   from 'styled-components';
import { withRouter } from 'react-router-dom';

import Tag    from '../../Components/Tag.component';
import Score  from '../../Components/Score.component';
import Loader from '../../Components/Loader.component';

import ConvertDate      from '../../Services/ConvertDate.service';
import { getMovieById, getMovieVideoById } from '../../Services/Endpoints.service';

const MovieDetailsStyled = styled.section `
    margin: 0 0 32px;
`

const MovieInfoStyle = styled.article `
    background-color: #f2f2f2;
    display: flex;
    flex-flow: column-reverse;
    margin: 16px 0;
    @media screen and (min-width: 1024px) {
        flex-flow: row wrap;
        margin: 32px 0;
    }

    .movie-content {
        width: 100%;
        @media screen and (min-width: 1024px) {
            width: calc(100% - 300px);
        }
    }

    .info-header {
        align-items: center;
        background-color: #e6e6e6;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        margin: 32px 0 0;
        padding: 16px;
        text-align: center;
        width: 100%;
        @media screen and (min-width: 1024px) {
            margin: 0;
            padding: 16px 32px;
            text-align: left;
        }

        .title {
            color: #116193;
            font-size: 2rem;
            margin-bottom: 16px;
            text-align: center;
            width: 100%;
            @media screen and (min-width: 1024px) {
                margin: 0;
                text-align: left;
                width: 80%;
            }
        }

        .date {
            color: #616161;
            text-align: center;
            width: 100%;
            @media screen and (min-width: 1024px) {
                text-align: left;
                width: auto;
            }
        }
    }

    .info-body {
        padding: 32px;

        .subtitle {
            border-bottom: 2px solid #00e0cf;
            color: #116193;
            font-size: 1.5rem;
            margin: 16px 0;
            @media screen and (min-width: 1024px) {
                margin: 32px 0;
            }
        }

        .description {
            line-height: 1.6rem;
            margin: 16px 0;
            text-align: justify;
            @media screen and (min-width: 1024px) {
                line-height: 1.5rem;
                margin: 32px 0;
                text-align:left;
            }
        }

        .info {
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
            margin: 16px 0;

            .info-box {
                align-items: center;
                display: flex;
                flex-flow: column wrap;
                justify-content: center;
                margin: 16px 0;
                width: 50%;
                @media screen and (min-width: 768px) {
                    align-items: flex-start;
                    width: 25%;
                }
                @media screen and (min-width: 1024px) {
                    width: 33%;
                }
                @media screen and (min-width: 1440px) {
                    width: 13%;
                }
                .title {
                    color: #116193;
                    font-size: 1.1rem;
                    margin-bottom: 4px;
                }

            }
        }
        .info-tags {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            .tags {
                align-items: center;
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                width: 100%;
                @media screen and (min-width: 1024px) {
                    justify-content: flex-start;
                    width: 80%;
                }
            }

            .score {
                margin: 32px 0 0;
                width: 100%;
                @media screen and (min-width: 1024px) {
                    width: 20%;
                }
                > div {
                    bottom: 0;
                }
            }
        }
    }

    .movie-poster {
        margin: 0 auto;
        max-width: 300px;
        padding: 16px 16px 0;
        width: 100%;
        @media screen and (min-width: 1024px) {
            padding: 0;
        }
    }

`

const Movie = (props) => {

    const [loading, setLoading]      = useState(true)
    const [movieDetails, setDetails] = useState()
    const [videos, setVideos]        = useState()

    useEffect(() => {
        fetchMovieDetails(props.match.params.id)
        fetchMovieVideos(props.match.params.id)
    }, [props])

    const fetchMovieDetails = async (movie_id) => {
        const response = await getMovieById(movie_id);
        setDetails(response.data);
        setLoading(false)
    }

    const fetchMovieVideos = async (movie_id) => {
        const response = await getMovieVideoById(movie_id);
        setVideos(response.data.results && response.data.results[0]);
    }

    return !loading 
        ? <MovieDetailsStyled>
            {
                movieDetails
                && <MovieInfoStyle>
                    <div className="movie-content">
                        <header className="info-header">
                            <h1 className="title">{movieDetails.title}</h1>
                            <span className="date">{ConvertDate(movieDetails.release_date)}</span>
                        </header>

                        <div className="info-body">

                        <h2 className="subtitle">Sinopse</h2>
                        <p className="description">{movieDetails.overview}</p>

                        <h2 className="subtitle">Informações</h2>

                        <div className="info">
                            <div className="info-box">
                                <h4 className="title">Situação</h4>
                                <span className="resume">{movieDetails.status}</span>
                            </div>
                            <div className="info-box">
                                <h4 className="title">Idioma</h4>
                                <span className="resume">{movieDetails.original_language}</span>
                            </div>
                            <div className="info-box">
                                <h4 className="title">Duração</h4>
                                <span className="resume">{movieDetails.runtime} minutos</span>
                            </div>
                            <div className="info-box">
                                <h4 className="title">Orçamento</h4>
                                <span className="resume">$ {movieDetails.budget}</span>
                            </div>
                            <div className="info-box">
                                <h4 className="title">Receita</h4>
                                <span className="resume">$ {movieDetails.revenue}</span>
                            </div>
                            <div className="info-box">
                                <h4 className="title">Lucro</h4>
                                <span className="resume">$ {movieDetails.revenue - movieDetails.budget}</span>
                            </div>
                        </div>
                        <div className="info-tags">
                            <div className="tags">
                                {movieDetails.genres.map((genre, key) => <Tag key={key} type={genre.name} />)}
                            </div>
                            <div className="score">
                                <Score score={movieDetails.vote_average * 10} width={'100'} />
                            </div>
                        </div>
                    </div>
                    </div>
                    <img
                        src={movieDetails.poster_path
                            ? `https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`
                            : 'https://via.placeholder.com/300/'
                        }
                        alt=""
                        className="movie-poster"
                    />
                </MovieInfoStyle>
            }
            {
                videos
                && <iframe 
                    width       = "100%" 
                    height      = "440" 
                    src         = {`https://www.youtube.com/embed/${videos.key}`} 
                    frameborder = "0" 
                    allow       = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    title       = {videos.id}
                />
                
            }
        </MovieDetailsStyled>
    : <Loader />
}

export default withRouter(Movie);