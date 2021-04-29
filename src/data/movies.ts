interface IMovieInfo {
    id: number;
    title: string;
    authors: string[];
    poster_path: any;
    overview: string;
    rating?: number;
    review?: string
}

const art = require('./artboards/dias.jpg');

const movie = {
    id: 0,
    title: "7 días en la Habana.",
    authors: ["Willi Díaz", "Humberto Cuevas", "Miriam Rojas"],
    overview: "Un retrato de la capital cubana en siete capítulos dirigidos por siete directores aclamados internacionalmente. Cada capítulo muestra un día de la semana a partir de las historias de sus protagonistas, que están relacionadas entre ellas.",
    poster_path: art,
    review: ''
};

const movies: IMovieInfo[] = [
    movie,
    movie,
    movie,
    movie,
    movie,
]

export { movies, IMovieInfo };