import React, {useState, useEffect, useRef} from 'react'
import styled   from 'styled-components';

import MovieCard from '../../Components/MovieCard.component'
import api from '../../Services/api';
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


const ResultSearch = () => {

    const [inputVal, setInputVal] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [listMovies, setListMovies] = useState()
    const inputRef  = useRef("")
    const timeoutId = useRef()

    function handleChange(e) {
        setInputVal(e.target.value)
        // mimic the value so we can access
        // the latest value in our API call
        inputRef.current = e.target.value
    }

    useEffect(() => {
        // if the user keeps typing, stop the API call!
        clearTimeout(timeoutId.current)
        // don't make an API call with no data
        if (!inputVal.trim()) return
        // capture the timeoutId so we can
        // stop the call if the user keeps typing
        timeoutId.current = setTimeout(() => {
            // grab our query, but store it in state so
            // I can show it to you below in the example 😄
            setLoading(true);
            searchMovie(inputVal).then((res) => {
                console.log(res.data.results)
                setListMovies(res.data.results)
                setLoading(false)
            });
                // here we pass a callback so we get the current callCount value
                // from the useState hook's setter function
                // we use a Ref for timeoutId to avoid this same problem
        }, 800)
    }, [inputVal])
    
    return <ResultSearchStyled>

        <input 
            placeholder = "Busque um filme por nome, ano ou gênero..."
            type        = "text" 
            className   = "result-input"
            onChange    = {handleChange}
            value       = {inputVal}
        />

        {
            listMovies
            && listMovies.map(movie => <MovieCard movie={movie}/>)
        }

    </ResultSearchStyled>
}

export default ResultSearch;