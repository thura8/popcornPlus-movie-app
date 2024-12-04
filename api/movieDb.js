import axios from "axios";
import { apiKey } from "../constants";

const apiBaseUrl = "https://api.themoviedb.org/3";

//apiEndPoints

const trendingMovies = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upComingMovies = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovies = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchingMovies = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

//dynamic endpoints
const movieDetails = (id) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCredits = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMovies = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

export const fallBackCastImage = "../assets/images/user_fallBack.jpg";

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

//apiCalling

const apiCall = async (endpoint, params, retries = 3) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
    timeout: 30000, 
  };

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      if (attempt === retries - 1 || error.code !== 'ECONNABORTED') {
        console.log("API Error:", error.message);
        return {}; 
      }
      console.log(`Retrying... (${attempt + 1}/${retries})`);
    }
  }
};

export const fetchPaginatedMovies = async (endpoint, page=1) => {
  const params = {page}
  const data = await apiCall(endpoint,params)
  return data
}

export const fetchTrendingMovies = (page = 1) => {
  return fetchPaginatedMovies(trendingMovies, page);
};

export const fetchUpComingMovies = (page = 1) => {
  return fetchPaginatedMovies(upComingMovies, page);
};

export const fetchTopRatedMovies = (page = 1) => {
  return fetchPaginatedMovies(topRatedMovies, page);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetails(id));
};

export const fetchCreditsDetails = (id) => {
  return apiCall(movieCredits(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMovies(id));
};

export const searchMovies = params =>{
  return apiCall(searchingMovies,params)
}