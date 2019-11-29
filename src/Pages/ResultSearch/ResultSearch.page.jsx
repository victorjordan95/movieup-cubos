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

    .pagination {
        align-items: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        @media screen and (min-width: 1024px) {
            margin-bottom: 32px;
        }

        li {
            align-items: center;
            border-radius: 50%;
            display: flex;
            flex-flow: row wrap;
            height: 35px;
            justify-content: center;
            width: 35px;
            @media screen and (min-width: 1024px) {
                height: 45px;
                margin: 0 16px;
                width: 45px;
            }

            a {
                text-decoration: none;
            }

            &.active {
                background: #0adadb;
                color: #00e8e4;

                a {
                    align-items: center;
                    background-color: #116193;
                    border-radius: 50%;
                    color: #00e8e4;
                    display: flex;
                    flex-flow: row wrap;
                    height: 25px;
                    justify-content: center;
                    width: 25px;
                    @media screen and (min-width: 1024px) {
                        height: 35px;
                        width: 35px;
                    }
                }
            }
        }
    }
`

const searchMovie = async (inputVal, currentPage) => await api.get(`/search/movie/?api_key=${constants.API_KEY}&query=${inputVal}&page=${currentPage}&language=${constants.LANGUAGE}`);

const paginateItems = (items, activePage) => {
    return items.slice(activePage === 1 ? 0 : ((activePage - 1) * 5) + 1, activePage * 5);
}

const ResultSearch = (props) => {

    const [inputVal, setInputVal] = useState("")
    const [isLoading, setLoading] = useState(true)
    const [listMovies, setListMovies] = useState()
    
    // Pagination
    const [activePageFront, setActivePageFront]       = useState(1)
    const [allMovies, setAllMovies]         = useState()
    const [totalResults, setTotalResults]   = useState()
    const [numberSlice, setNumberSlice]     = useState(1)

    const inputRef  = useRef("")
    const timeoutId = useRef()

    useEffect(() => {
        setAllMovies(props.location.state.movies.results)
        setListMovies(paginateItems(props.location.state.movies.results, numberSlice));
        setTotalResults(props.location.state.movies.total_results)
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        setInputVal(e.target.value)
        inputRef.current = e.target.value
    }

    const handlePageChange = (e) => {
        setLoading(true)

        if (!(e % 5)) {
            const pageToShow = (e / 5) === 1 ? 2 : e / 5;
            setNumberSlice(1)

            searchMovie(inputVal, pageToShow).then((res) => {
                setListMovies(paginateItems(res.data.results, 1));
                setAllMovies(res.data.results)
                setLoading(false)
            });
        }
        setActivePageFront(e)
        setListMovies(paginateItems(allMovies, e));
        setNumberSlice(numberSlice)
        setLoading(false)
        window.scroll(0, 0);

    }

    useEffect(() => {
        clearTimeout(timeoutId.current)
        if (!inputVal.trim()) return
        timeoutId.current = setTimeout(() => {
            setLoading(true);
            searchMovie(inputVal, 1).then((res) => {
                setActivePageFront(1)
                setTotalResults(res.data.total_results)
                setListMovies(paginateItems(res.data.results, numberSlice));
                setAllMovies(res.data.results)
                setLoading(false)
            });
        }, 800)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            activePage={activePageFront}
            itemsCountPerPage={5}
            totalItemsCount={totalResults}
            pageRangeDisplayed={5}
            onChange={(e) => handlePageChange(e)}
        />
  
    </ResultSearchStyled>
}

export default withRouter(ResultSearch);