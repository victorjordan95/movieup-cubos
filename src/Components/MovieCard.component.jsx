import React from 'react'

import { Link } from "react-router-dom";
import styled   from 'styled-components';

import Score    from './Score.component';
import Tag      from './Tag.component';

import ConvertDate  from '../Services/ConvertDate.service';

const CardStyled = styled(Link)`
    border-bottom: 2px solid #EEEEEE;
    display: flex;
    flex-flow: column wrap;
    margin: 0 0 32px;
    padding: 0 0 16px;
    text-decoration: none;

    @media screen and (max-width: 768px) {
        align-items: center;
        justify-content: center;
        margin: 0 0 16px;
    }
    
    @media screen and (min-width: 1024px) {
        border-bottom: 0;
        flex-flow: row wrap;
        margin: 0 0 64px;
    }

    .card-poster {
        min-height: 300px;
        width: 100%;
        @media screen and (min-width: 1024px) {
            width: 200px;
        }
    }

    .card-content {
        background-color: #ebebeb;
        width: 100%;
        @media screen and (min-width: 1024px) {
            min-height: 300px;
            width: calc(100% - 200px);
        }

        .card-header {
            @media screen and (min-width: 1024px) {
                height: 100px;
            }
            .title {
                align-items: center;
                background-color: #116193;
                color: #00e8e4;
                display: flex;
                flex-flow: row wrap;
                font-size: 2rem;
                padding: 16px;
                @media screen and (min-width: 1024px) {
                    padding: 16px 128px 8px;
                    max-width: 100%;
                    overflow: hidden !important;
                    text-decoration: none;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .subtitle {
                align-items: center;
                background-color: #ebebeb;
                color: #9E9E9E;
                display: flex;
                flex-flow: row wrap;
                font-size: 1.2rem;
                padding: 16px;
                @media screen and (min-width: 1024px) {
                    padding: 8px 128px;
                }
            }
        }

        .card-body {
            margin: 0 0 16px;
            padding: 0 16px;
            @media screen and (min-width: 1024px) {
                margin: 0 0 32px;
                padding: 0 32px;
            }

            .body-overview {
                color: #424242;
                font-size: 1.1rem;
                line-height: 1.4rem;
                margin: 32px 16px;
                @media screen and (min-width: 1024px) {
                    margin: 8px 16px 32px;
                }
            }

            .see-more {
                color: #116193;
                display: block;
                font-weight: bold;
                margin: 32px 16px;
                text-align: center;

                @media screen and (min-width: 1024px) {
                    text-align: left;
                }
            }

            .tags {
                align-items: center;
                display: flex;
                flex-flow: row wrap;
                justify-content: space-evenly;
                @media screen and (min-width: 1024px) {
                    margin: 0 16px;
                    justify-content: flex-start;
                }
            }
        }
    }
`;

const MovieCard = ({movie, genres}) => {

    const getGenreName = (selectedGenreId) => genres.filter(genre => genre.id === selectedGenreId)[0].name;

    return <CardStyled to={`movie/${movie.id}`}>
        <img 
            src={ movie.poster_path 
                ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                : 'https://via.placeholder.com/300/'
            } 
            alt={`Imagem oficial do filme ${movie.title}`}
            className="card-poster"    
        />

        <div className="card-content">
            
            <header className="card-header">
                <h1 className="title">{movie.title}</h1>
                <h3 className="subtitle">{ConvertDate(movie.release_date)}</h3>
                <Score score={movie.vote_average * 10} width={'70'}/>
            </header>

            <div className="card-body">
                {window.innerWidth >= 1024
                    ? <p className="body-overview">
                        {movie.overview.length >= 100
                            ? `${movie.overview.slice(0, 500)}...`
                            : movie.overview
                        }
                    </p>
                    : <p className="body-overview">
                        {movie.overview.length >= 100
                            ? `${movie.overview.slice(0, 200)}...`
                            : movie.overview
                        }
                    </p>}
                <Link to={`movie/${movie.id}`} className="see-more">Ver mais detalhes</Link>
                <div className="tags">
                    {genres 
                    && movie 
                    && movie.genre_ids.map((genre, key) => <Tag key={key} type={getGenreName(genre)}/>)}
                </div>
            </div>

        </div>
    </CardStyled>
}

export default MovieCard;