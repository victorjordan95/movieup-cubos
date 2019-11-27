import React, {useState, useEffect} from 'react'
import styled   from 'styled-components';
import Score from './Score.component';
import Tag from './Tag.component';
import constants from '../Constants/constants';
import api from '../Services/api';
import ConvertDate from '../Services/ConvertDate.service';

const CardStyled = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin: 0 0 64px;

    .card-poster {
        min-height: 300px;
        width: 200px;
    }

    .card-content {
        background-color: #ebebeb;
        width: calc(100% - 200px);

        .card-header {
            height: 100px;
            .title {
                align-items: center;
                background-color: #116193;
                color: #00e8e4;
                display: flex;
                flex-flow: row wrap;
                font-size: 2rem;
                padding: 16px 128px 8px;
            }
            .subtitle {
                align-items: center;
                background-color: #ebebeb;
                color: #9E9E9E;
                display: flex;
                flex-flow: row wrap;
                font-size: 1.2rem;
                padding: 8px 128px;
            }
        }

        .card-body {
            margin: 0 0 32px;
            padding: 0 32px;

            .body-overview {
                color: #424242;
                font-size: 1.1rem;
                line-height: 1.4rem;
                margin: 8px 16px 32px;
            }

            .tags {
                align-items: center;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                margin: 0 16px;
            }
        }
    }
`;

const MovieCard = ({movie}) => {

    const [genres, setGenres] = useState()

    useEffect(() => {
        fetchGenres();
    }, [])

    const fetchGenres = async () => {
        const response = await api.get(`/genre/movie/list?api_key=${constants.API_KEY}&language=${constants.LANGUAGE}`);
        setGenres(response.data.genres);
    }

    const getGenreName = (selectedGenreId) => genres.filter(genre => genre.id === selectedGenreId)[0].name;

    return <CardStyled>
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
                <p className="body-overview">
                    {movie.overview.length >= 100
                    ? `${movie.overview.slice(0,500)}... <a href="">Read more</a>`
                    : movie.overview
                }
                
                </p>
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