let apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=06e532580c1c3e8760858e959695a1b2&sort_by=popularity.desc&page=1";
let img = "https://image.tmdb.org/t/p/w1280";
let apiSearch = "https://api.themoviedb.org/3/search/movie?&api_key=06e532580c1c3e8760858e959695a1b2&query=";

let main = document.getElementById("content");
let form = document.getElementById("form");
let search = document.getElementById("search");

getMovies(apiUrl);

async function getMovies(url) {
    let response = await fetch(url);
    let result = await response.json();

    console.log(result);
    showMovies(result.results);
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        let { poster_path, title, vote_average } = movie;

        let movieCard = document.createElement("div");
        movieCard.classList.add("movie");

        movieCard.innerHTML = `
            <img
                src="${img + poster_path}" alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="rate">${vote_average}</span>
            </div>
        `;

        main.appendChild(movieCard);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchTerm = search.value;
    if (searchTerm) {
        getMovies(apiSearch + searchTerm);
        search.value = "";
    }
});