import constants from "../Constants/constants";
import api from "./api";

export const discoverMovieByGenre = async (genreId) => 
    await api.get(`/discover/movie/?api_key=${constants.API_KEY}&language=${constants.LANGUAGE}&with_genres=${genreId}`)

export const discoverMovieByName = async (movie, currentPage = 1) => 
    await api.get(`/search/movie/?api_key=${constants.API_KEY}&query=${movie}&page=${currentPage}&language=${constants.LANGUAGE}`);

export const getMovieById = async (movie_id) => 
    await api.get(`/movie/${movie_id}?api_key=${constants.API_KEY}&language=${constants.LANGUAGE}`);
        

