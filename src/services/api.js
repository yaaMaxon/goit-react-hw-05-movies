import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'd8c620888c22581099bcd5e45550c95c';

export const getTrendMovies = async () => {
    const { data } = await axios.get(`${BASE_URL}trending/movie/day?language=en-US&api_key=${API_KEY}`);

    return data;
}

export const searchMovies = async (query) => {
    const { data } = await axios.get(`${BASE_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`);

    return data.results; 
}

export const getMovieDetails = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}movie/${movieId}?language=en-US&api_key=${API_KEY}`);

    return data; 
}

export const getMovieCredits = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}movie/${movieId}/credits?language=en-US&api_key=${API_KEY}`);
    
    return data.cast; 
}

export const getMovieReviews = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}movie/${movieId}/reviews?language=en-US&page=1&api_key=${API_KEY}`);

    return data.results; 
}

