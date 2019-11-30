import constants from "../Constants/constants";
import api from "./api";

/**
 * Fetch movies by a
 * selected genre.
 * @param {Number} genreId ID of the genre
 */
export const discoverMovieByGenre = async (genreId) => 
    await api.get(`/discover/movie/?api_key=${constants.API_KEY}&language=${constants.LANGUAGE}&with_genres=${genreId}`)

/**
 * Return a list of movies
 * that match with the searched term.
 * @param {String} movie Movie's name
 * @param {Number} currentPage Current page
 */
export const discoverMovieByName = async (movie, currentPage = 1) => 
    await api.get(`/search/movie/?api_key=${constants.API_KEY}&query=${movie}&page=${currentPage}&language=${constants.LANGUAGE}`);

/**
 * Return the information of
 * an specific movie, find it
 * by it id.
 * @param {Number} movie_id 
 */
export const getMovieById = async (movie_id) => 
    await api.get(`/movie/${movie_id}?api_key=${constants.API_KEY}&language=${constants.LANGUAGE}`);
        

