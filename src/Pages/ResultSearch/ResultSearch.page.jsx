import React, {useState, useEffect, useRef} from 'react'
import styled   from 'styled-components';
import { withRouter } from 'react-router-dom';
import Pagination from "react-js-pagination";

import MovieCard from '../../Components/MovieCard.component'
import Loader    from '../../Components/Loader.component';

import api       from '../../Services/api';
import constants from '../../Constants/constants';

const ResultSearchStyled = styled.section `
    padding: 0 16px;
    @media screen and (min-width: 1024px) {
        padding: 0 64px;
    }

    .result-input {
        border-radius: 16px;
        border: none;
        box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
        height: 48px;
        padding: 0 32px;
        margin: 64px 0;
        width: 100%;
    }
`

const searchMovie = async (inputVal) => await api.get(`/search/movie/?api_key=${constants.API_KEY}&query=${inputVal}&language=${constants.LANGUAGE}`);

const ResultSearch = (props) => {

    const [inputVal, setInputVal] = useState("")
    const [isLoading, setLoading] = useState(true)
    const [listMovies, setListMovies] = useState()
    const [activePage, setActivePage] = useState(1)
    const inputRef  = useRef("")
    const timeoutId = useRef()

    useEffect(() => {
        setListMovies(props.location.state.movies)
        setLoading(false)
    }, [props])

    const handleChange = (e) => {
        setInputVal(e.target.value)
        inputRef.current = e.target.value
    }

    const handlePageChange = () => {
        console.log('changing page')
    }

    useEffect(() => {
        clearTimeout(timeoutId.current)
        if (!inputVal.trim()) return
        timeoutId.current = setTimeout(() => {
            setLoading(true);
            searchMovie(inputVal).then((res) => {
                setListMovies(res.data.results)
                setLoading(false)
            });
        }, 800)
    }, [inputVal])
    
    return isLoading
    ? <Loader />
    : <ResultSearchStyled>
        <input 
            placeholder = "Busque um filme por nome, ano ou gênero..."
            type        = "text" 
            className   = "result-input"
            onChange    = {handleChange}
            value       = {inputVal}
        />

        {
            listMovies
            && listMovies.map((movie, key) => <MovieCard key={key} movie={movie}/>)
        }
        <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
        />
  
    </ResultSearchStyled>
}

export default withRouter(ResultSearch);