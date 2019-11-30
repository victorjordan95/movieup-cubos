import React, {useState, useEffect, useRef} from 'react'
import styled         from 'styled-components';
import { withRouter } from 'react-router-dom';
import Pagination     from "react-js-pagination";

import MovieCard from '../../Components/MovieCard.component'
import Loader    from '../../Components/Loader.component';

import { discoverMovieByName, getGenres } from '../../Services/Endpoints.service';

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

const paginateItems = (items, activePage) => {
    const startNumber = activePage === 0 ? 0 : activePage * 5;
    const endNumber   = activePage === 0 ? 5 : (activePage + 1) * 5; 
    return items.slice(startNumber, endNumber)
}

const ResultSearch = (props) => {

    const [inputVal, setInputVal]       = useState("")
    const [isLoading, setLoading]       = useState(true)
    const [listMovies, setListMovies]   = useState()
    const [genres, setGenres]           = useState()
    
    
    // Pagination
    const [activePageFront, setActivePageFront]       = useState(1)
    const [allMovies, setAllMovies]         = useState()
    const [totalResults, setTotalResults]   = useState()
    const [backEndPage, setBackendPage]     = useState()

    const inputRef  = useRef("")
    const timeoutId = useRef()

    useEffect(() => {
        fetchGenres();

        const searchedTerm = props.location.state.searchedTerm;

        if (searchedTerm) {
            discoverMovieByName(searchedTerm, 1)
            .then((res) => {
                setInputVal(searchedTerm)
                inputRef.current = searchedTerm
                setBackendPage(res.data.page)
                setActivePageFront(1)
                setTotalResults(res.data.total_results)
                setListMovies(paginateItems(res.data.results, 0));
                setAllMovies(res.data.results)
                setLoading(false)
            });
        }
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        setInputVal(e.target.value)
        inputRef.current = e.target.value
    }

    const handlePageChange = (e) => {
        setLoading(true)

        if (e <= 5 && !(e % 5)) {
            const pageToShow = (e / 5) === 1 ? 2 : e / 5;

            discoverMovieByName(inputVal, pageToShow)
                .then((res) => {
                    setBackendPage(res.data.page)
                    setListMovies(paginateItems(res.data.results, 0));
                    setAllMovies(res.data.results)
                    window.scroll(0, 0);
                    setLoading(false)
                });
        } else if (e >= 6 && !(e % 4)) {
            const pageToShow = (e / 5) === 1 ? 2 : e / 5;
            discoverMovieByName(inputVal, Math.ceil(pageToShow) + 1)
                .then((res) => {
                    setBackendPage(res.data.page)
                    setListMovies(paginateItems(res.data.results, 0));
                    setAllMovies(res.data.results)
                    window.scroll(0, 0);
                    setLoading(false)
                });
        } else {
            const pageToShow =  e - (5 * (backEndPage - 1));
            setListMovies(paginateItems(allMovies, pageToShow));
            setLoading(false)
            window.scroll(0, 0);
        }
        setActivePageFront(e)
        
    }

    const fetchGenres = async () => {
        const response = await getGenres();
        setGenres(response.data.genres);
    }

    useEffect(() => {
        clearTimeout(timeoutId.current)
        if (!inputVal.trim()) return
        timeoutId.current = setTimeout(() => {
            setLoading(true);
            discoverMovieByName(inputVal, 1).then((res) => {
                props.history.push({
                    state: { 
                        searchedTerm: inputVal,
                        movies: res.data.results
                    }
                })
                setBackendPage(res.data.page)
                setActivePageFront(1)
                setTotalResults(res.data.total_results)
                setListMovies(paginateItems(res.data.results, 0));
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
            && listMovies.map((movie, key) => <MovieCard key={key} movie={movie} genres={genres}/>)
        }
        <Pagination
            activePage         = {activePageFront}
            itemsCountPerPage  = {5}
            totalItemsCount    = {totalResults}
            pageRangeDisplayed = {5}
            onChange           = {(e) => handlePageChange(e)}
        />
  
    </ResultSearchStyled>
}

export default withRouter(ResultSearch);