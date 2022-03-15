const moviesArea = document.querySelector("#main");
const API_KEY = "3ad54b23917b3b00b9fddf7e9ae96840";
const GET_IMG = "https://image.tmdb.org/t/p/w1280";
const API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const form = document.querySelector("#form");
const searchQuery = document.querySelector("#searchInput");

//  Get initial movies

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const response = await fetch(url);

  if (response.ok) {
    let { results } = await response.json();
    showMovies(results);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

function showMovies(moviesData) {
  // empty the movies area in the page
  moviesArea.innerHTML = "";

  // loop trough movie data and display them
  moviesData.forEach((movie) => {
    //  get data from each movie
    const { title, poster_path, overview, vote_average, release_date } = movie;

    // create movie element
    const movieEl = document.createElement("div");

    // add movie class to the movie element
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${GET_IMG + poster_path}"
                alt="${title}">

            <div class="movie-info">

                <h3>${title}</h3>
                
                <span class="${getRating(vote_average)}">${vote_average}</span>
                
            </div>
            <div class="releaseDate">
            <h5>Release date: ${ release_date}</h5></div>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>
                   ${overview}
                </p>
            </div>
       
    `;
    moviesArea.appendChild(movieEl);
  });
}

// Return class name based on rating
function getRating(rating) {
  if ((rating) => 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (evt) => {
  //  Prevent page reload
  evt.preventDefault();
  //  Get the search query from input
  let searchValue = searchQuery.value;

  //Check if query present and not empty
  if (searchValue && searchValue !== "") {
    getMovies(SEARCH_URL + searchValue);
    searchQuery.value = "";
  } else {
    alert("Insert movie name.");
    window.location.reload();
  }
});
