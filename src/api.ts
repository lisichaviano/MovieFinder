import {AsyncStorage} from 'react-native';
import axois from 'axios';

export const API_BASE = "https://api.themoviedb.org/3/";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const API_TOKEN = "698f7d8bbafd000db2c68a7dc007be41";
const API_POPULAR = `movie/popular`;
const API_SEARCH_MOVIE = `search/movie`;
const API_MOVIE_DETAIL = `movie`;

interface IQueryParams {
    endpoint: string;
    method?: "GET" | "POST",
    params?: {[name: string]: string};
    data?: {[name: string]: any};
}

export interface IOpinion {
    rating?: number;
    review?: string;
}

async function queryAPI(queryParams: IQueryParams) {
    try {
        let response = await axois(
            {
                method: queryParams.method || "GET",
                url: queryParams.endpoint,
                baseURL: API_BASE,
                params: {
                    api_key: API_TOKEN,
                    ...queryParams.params
                },
                data: queryParams.data
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getPopular() {
    return (await queryAPI({
        endpoint: API_POPULAR
    })).results;
}

export async function searchMovies(query: string) {
    return (await queryAPI({
        endpoint: API_SEARCH_MOVIE,
        params: {query: query}
    })).results;
}

export async function getMovieDetails(id: string) {
    let movie = await queryAPI({
        endpoint: `${API_MOVIE_DETAIL}/${id}`
    });

    let credits = await queryAPI({
        endpoint: `${API_MOVIE_DETAIL}/${id}/credits`
    });
    movie.cast = credits.cast;
    return movie;
}

export function getMoviePosterUrl(poster_path: string) {
    return `${IMAGE_BASE}${poster_path}`;
}

export async function getOpinion(id: string): Promise<IOpinion> {
    let review = await AsyncStorage.getItem(`review-${id}`);
    return JSON.parse(review || '{}');
}

export async function saveOpinion(id: string, review: IOpinion) {
    await AsyncStorage.setItem(`review-${id}`, JSON.stringify(review));
}