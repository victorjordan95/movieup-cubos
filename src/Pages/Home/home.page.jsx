import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';

import styled   from 'styled-components';
import { discoverMovieByName } from '../../Services/Endpoints.service';

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
        width: 90%;
        @media screen and (min-width: 1024px) {
            width: 50%;
        }
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
        width: 90%;
        @media screen and (min-width: 1024px) {
            width: 30%;
        }
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

const Home = (props) => {

    const [movie, setMovie] = useState()

    const keyPressed = (e) => {
        if(e.key === "Enter") {
            searchMovie()
        }
    }


    const searchMovie = async () => {
        const response = await discoverMovieByName(movie)
        props.history.push({
            pathname: '/resultado',
            state: { 
                movies: response.data,
                searchedTerm: movie,
                searchedCategory: ''
            }
        })
    }

    return <SectionStyle>
        <h1 className="title">MovieUp</h1>
        <input 
            type="text"
            className="search-input"
            onChange={(e) => setMovie(e.target.value)}
            placeholder="Faça sua pesquisa. Ex.: Vingadores, O Turista, Malévola, A cabana"
            onKeyDown={(e) => keyPressed(e)}
        />
        <button 
            type="submit"
            className="search-button"
            onClick={searchMovie}
        >
            Procurar
        </button>
    </SectionStyle>
}

export default withRouter(Home);