const apiKey = "api_key=2d55cf2b891b4fa7fe1176c75ce5eeeb";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = baseUrl + "/search/movie?" + apiKey;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
getMovie(apiUrl);
function getMovie(apiUrl) {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => displayMovie(data.results));
}

const displayMovie = (movies) => {
  main.textContent = "";
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="movie">
    <img
      src="${imgUrl + movie.poster_path}"
      alt="${movie.original_title}"
    />
    <div class="movie-info">
      <h3>${movie.original_title}</h3>
      <span class="${getColor(movie.vote_average)}">${movie.vote_average}</span>
    </div>
    <div class="overview">
    <h3>${movie.original_title}</h3>
     <p>${movie.overview}</p>
    </div>
  </div>`;
    main.appendChild(div);
  });
};
const getColor = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = search.value;

  if (searchText) {
    getMovie(searchUrl + "&query=" + searchText);
  } else {
    getMovie(apiUrl);
  }
  search.value = "";
});
