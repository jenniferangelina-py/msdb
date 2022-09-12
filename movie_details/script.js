const BASE_URL = "https://api.themoviedb.org/3";

const PG13 = "certification_country=US&certification=PG-13&"

const API_KEY = "api_key=fc0e9877450b169f96e26306a6e15ed5";

const IMG_URL = "https://image.tmdb.org/t/p/original";

const YOUTUBE_URL = "https://www.youtube.com/embed/";

async function getMovie(id) {
  var url = `${BASE_URL}/movie/${id}?${API_KEY}`;

  // https://api.themoviedb.org/3/movie/610150?api_key=fc0e9877450b169f96e26306a6e15ed5

  const res = await fetch(url);
  const data = await res.json();
    
  var title = `${data.title}`;
  $("#title").text(title);
  
  var genres = "";
  for (i = 0; i < data.genres.length; i++) {
    if (i == 0) {
        genres += data.genres[i].name;
    }
    if (i !== 0) {
        genres += " - " + data.genres[i].name;
    }
  }

  $("#genres").text(genres);

  var rating = `${data.vote_average}`;
  $("#rating").append(" " + rating + " / 10");

  var overview = `${data.overview}`;
  $("#overview").text(overview);
}

async function getTrailer(id) {
  var url = `${BASE_URL}/movie/${id}/videos?${API_KEY}`;

  // https://api.themoviedb.org/3/movie/610150/videos?api_key=fc0e9877450b169f96e26306a6e15ed5

  const res = await fetch(url);
  const data = await res.json();

  for (i = 0; i < data.results.length; i++) {
    if (data.results[i].site == "YouTube" && data.results[i].type == "Trailer" && data.results[i].official) {
      var video = `${YOUTUBE_URL + data.results[i].key}`;
      $("#video").attr("src", video);
      break;
    }
  }
}

async function getRecommendations(id) {
  var url = `${BASE_URL}/movie/${id}/recommendations?${API_KEY}`;

  // https://api.themoviedb.org/3/movie/610150/recommendations?api_key=fc0e9877450b169f96e26306a6e15ed5&page=1

  const res = await fetch(url);
  const data = await res.json();

  var sub_item = "";
  var recommendations = $("#recommendations");

  for (i = 0; i < 10; i++) {
    sub_item = `<a href="movie_details.html?id=${data.results[i].id}"><div class="sub-item"><img src="${IMG_URL + data.results[i].poster_path}"></div></a>`;
    recommendations.append(sub_item);
  }
}

async function getReleaseYear(id) {
  var url = `${BASE_URL}/movie/${id}/release_dates?${API_KEY}`;

  // https://api.themoviedb.org/3/movie/610150/recommendations?api_key=fc0e9877450b169f96e26306a6e15ed5&page=1

  const res = await fetch(url);
  const data = await res.json();

  var unconvertedYear = `${data.results[0].release_dates[0].release_date}`;
  var year = `(${unconvertedYear.slice(0, 4)})`;

  $("#year").text(year);
}

async function getMovieCredits(id) { // blm
  var url = `${BASE_URL}/movie/${id}/credits?${API_KEY}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  var sub_item = "";
  var cast = $("#cast");
  var castnames = $("#castnames");
  for (i = 0; i < data.cast.length; i++) {
    var image = data.cast[i].profile_path !== null ? IMG_URL + data.cast[i].profile_path : "public/anonim.png";
    if (data.cast[i].known_for_department == "Acting") {
      sub_item = `<div class="castdiv"><img class="castimg" src="${image}"><p class="smallfont">${data.cast[i].name} as ${data.cast[i].character}</p></div>`;
      cast.append(sub_item);
    }
  }
}

var url = window.location.href;
var new_url = new URL(url);
var id = new_url.searchParams.get("id");

getMovie(id);
getTrailer(id);
getRecommendations(id);
getReleaseYear(id);
getMovieCredits(id);
