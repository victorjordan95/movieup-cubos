import React, {useState, useEffect} from 'react'
import styled   from 'styled-components';
import api from '../../Services/api';
import constants from '../../Constants/constants';

const SectionStyle = styled.div `
    align-items: center;
    height: 80vh;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;

    .title {
        font-size: 3rem;
        margin-bottom: 32px; 
    }

    .search-input {
        border-radius: 16px;
        border: none;
        box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
        height: 48px;
        padding: 0 32px;
        width: 50%;
    }

    .search-option {
        font-size: 1.8rem;
        font-weight: bold;
        margin: 16px 0;
        text-transform: lowercase;
    }

    .search-select {
        border-radius: 16px;
        border: none;
        box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
        height: 48px;
        padding: 0 32px;
        width: 30%;
    }

    .search-button {
        background-color: #116193;
        border: none;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: bold;
        margin: 32px 0;
        padding: 16px 32px;
        text-transform: uppercase;
        transition: background-color ease 0.5s;

        &:hover {
            background-color: #145279; 
        }
    }
`

const Home = () => {

    const [movie, setMovie] = useState()
    const [genres, setGenres] = useState()
    const [listMovies, setListMovies] = useState()

    useEffect(() => {
        fetchGenres();
    }, [])

    const fetchGenres = async () => {
        const response = await api.get(`/genre/movie/list?api_key=${constants.API_KEY}&language=${constants.LANGUAGE}`);
        setGenres(response.data.genres);
    }

    const searchMovie = async () => {
        const response = await api.get(`/search/movie/?api_key=${constants.API_KEY}&query=${movie}&language=${constants.LANGUAGE}`);
        setListMovies(response.data)
    }

    const movieByGenre = async (genreId) => {
        const response = await api.get(`/discover/movie/?api_key=${constants.API_KEY}&language=${constants.LANGUAGE}&with_genres=${genreId}`);
        setListMovies(response.data)
    }

    return <SectionStyle>
        <h1 className="title">MovieUp</h1>
        <input 
            type="text"
            className="search-input"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            placeholder="Faça sua pesquisa. Ex.: Vingadores, O Turista, Malévola, A cabana"
        />
        <button 
            type="submit"
            className="search-button"
            onClick={searchMovie}
        >
            Procurar
        </button>
        <p className="search-option">Ou</p>
        {genres && <select className="search-select" onChange={(e) => movieByGenre(e.target.value)}>
            <option value="">Selecione um gênero</option>
            {genres.map(genre => <option value={genre.id} key={genre.id}>{genre.name}</option>)}
        </select>}
    </SectionStyle>
}

export default Home;