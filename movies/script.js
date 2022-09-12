const BASE_URL = "https://api.themoviedb.org/3";

const ACTION = "/discover/movie?with_genres=28&";
const ADVENTURE = "/discover/movie?with_genres=12&";
const ANIMATION = "/discover/movie?with_genres=16&";
const COMEDY = "/discover/movie?with_genres=35&";
const DRAMA = "/discover/movie?with_genres=18&";
const FANTASY = "/discover/movie?with_genres=14&";
const HISTORY = "/discover/movie?with_genres=36&";
const ROMANCE = "/discover/movie?with_genres=10749&";
const SCIENCE_FICTION = "/discover/movie?with_genres=878&";

const POPULARITY = "/discover/movie?sort_by=popularity.desc&";

const PG13 = "certification_country=US&certification=PG-13&"

const API_KEY = "api_key=fc0e9877450b169f96e26306a6e15ed5";

const ACTION_POPULARITY = BASE_URL + ACTION + POPULARITY + PG13 + API_KEY;
const ADVENTURE_POPULARITY = BASE_URL + ADVENTURE + POPULARITY + PG13 + API_KEY;
const ANIMATION_POPULARITY = BASE_URL + ANIMATION + POPULARITY + PG13 + API_KEY;
const COMEDY_POPULARITY = BASE_URL + COMEDY + POPULARITY + PG13 + API_KEY;
const DRAMA_POPULARITY = BASE_URL + DRAMA + POPULARITY + PG13 + API_KEY;
const FANTASY_POPULARITY = BASE_URL + FANTASY + POPULARITY + PG13 + API_KEY;
const HISTORY_POPULARITY = BASE_URL + HISTORY + POPULARITY + PG13 + API_KEY;
const ROMANCE_POPULARITY = BASE_URL + ROMANCE + POPULARITY + PG13 + API_KEY;
const SCIENCEFICTION_POPULARITY = BASE_URL + SCIENCE_FICTION + POPULARITY + PG13 + API_KEY;

// https://api.themoviedb.org/3/discover/movie?with_genres=28&/discover/movie?sort_by=popularity.desc&api_key=fc0e9877450b169f96e26306a6e15ed5

const IMG_URL = "https://image.tmdb.org/t/p/original";

class Movie {
    constructor(id, poster_path, title) {
        this.id = id;
        this.poster_path = poster_path;
        this.title = title;
    }
}

class MovieDetails extends Movie {
    constructor(id, poster_path, title) {
        super(id, poster_path, title);
    }
}

async function getMovies(url, genre) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results, genre);
}

function showMovies(data, genre) {
    var sub_item = "";
    var genre = $(`#${genre}`);

    for (i = 0; i < 10; i++) {

        var movie = new Movie(data[i].id, data[i].poster_path, data[i].title);

        var movieDetails = new MovieDetails(data[i].id, data[i].poster_path, data[i].title);

        sub_item = `<a href="../movie_details/movie_details.html?id=${movie.id}"><div class="sub-item"><img src="${IMG_URL + movie.poster_path}"></div></a>`;
        genre.append(sub_item);
    }
}

getMovies(ACTION_POPULARITY, "action");
getMovies(ADVENTURE_POPULARITY, "adventure");
getMovies(ANIMATION_POPULARITY, "animation");
getMovies(COMEDY_POPULARITY, "comedy");
getMovies(DRAMA_POPULARITY, "drama");
getMovies(FANTASY_POPULARITY, "fantasy");
getMovies(HISTORY_POPULARITY, "history");
getMovies(ROMANCE_POPULARITY, "romance");
getMovies(SCIENCEFICTION_POPULARITY, "sciencefiction");