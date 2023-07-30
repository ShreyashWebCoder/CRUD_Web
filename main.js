let movies = [];
if (localStorage.getItem('moives') !== null) {
    movies = JSON.parse(localStorage.getItem('movies'))
}

// Function of Movie Array 

function displayMovieTable(arr) {

    document.getElementById('movie_data').innerHTML = "";

    arr.forEach((movie, index) => {

        let row_data = document.createElement("tr");

        let numbering = document.createElement('td');
        numbering.append(index + 1);
        row_data.appendChild(numbering);

        let title = document.createElement('td');
        title.append(movie.title);
        row_data.appendChild(title);

        let releaseDate = document.createElement('td');
        releaseDate.append(movie.releaseDate);
        row_data.appendChild(releaseDate);

        let genres = document.createElement('td');
        movie.genres.forEach((genre, index) => {
            genres.append(genre + " . ")
        })
        row_data.appendChild(genres)

        let duration = document.createElement("td");
        duration.append(movie.duration);
        row_data.appendChild(duration);

        let imdbRating = document.createElement('td');
        imdbRating.append(movie.imdbRating);
        row_data.appendChild(imdbRating);



        let actions = document.createElement('td');
        actions.classList.add("icons");


        let eye = document.createElement('i');
        eye.classList.add("fa-solid");
        eye.classList.add("fa-eye");
        actions.appendChild(eye);
        eye.onclick = openMovieModal.bind(this, movie.id);



        let edit = document.createElement('i');
        edit.classList.add("fa-solid");
        edit.classList.add("fa-pen-to-square");
        actions.appendChild(edit);


        let trash = document.createElement('i');
        trash.classList.add("fa-solid");
        trash.classList.add("fa-trash-can");
        actions.appendChild(trash);


        row_data.appendChild(actions);


        document.getElementById("movie_data").appendChild(row_data);
    })
}
displayMovieTable(movies)




// OPEN Modal Function By Eye Button 
function openMovieModal(movieid) {

    let movie = movies.find((movie, index) => {
        return movie.id === movieid
    })

    document.getElementById('movie_name').innerHTML = movie.title;
    document.getElementById('movie_storyline').innerHTML = movie.storyline;
    document.getElementById('movie_actors').innerHTML = movie.actors;
    document.getElementById('movie_releaseDate').innerHTML = movie.releaseDate;
    document.getElementById('movie_duration').innerHTML = movie.duration;
    document.getElementById('movie_imdbRating').innerHTML = movie.imdbRating;
    document.getElementById('movie_genres').innerHTML = movie.genres;
    document.getElementById('movie_posterurl').src = movie.posterurl;

    document.getElementById('modal').style.display = 'flex';

}


// Close Modal Function
function closeModal(modalID) {
    document.getElementById(modalID).style.display = 'none';
}





// Add New ReleaseDate Movie 
function changeReleaseDate() {
    document.getElementById('add_releaseDate').type = 'date';
}



function openAddMovieModal() {
    document.getElementById("addModal").style.display = 'flex';
}



// Create Movie
function createMovie() {

    let lastId;
    if (movies.length !== 0) {
        lastId = movies[movies.length - 1].id
    }
    else {
        lastId = 0;
    }

    let movie = {
        id: lastId + 1,
        ratings: []
    }

    movie.title = document.getElementById('addMovieTitle').value;
    movie.storyline = document.getElementById('addMovieStoryLine').value;
    movie.actors = document.getElementById('addMovieActors').value.split(',');
    movie.releaseDate = document.getElementById('add_releaseDate').value;
    movie.duration = document.getElementById('addMovieDuration').value;
    movie.imdbRating = document.getElementById('addMovieIMDB').value;
    movie.genres = document.getElementById('addMovieGenres').value.split(',');
    movie.posterurl = document.getElementById('addMoviePosterURL').value;

    movies.push(movie);
    closeModal('addModal')
    displayMovieTable(movies);
    document.getElementById('addMovieFormID').reset();
    localStorage.getItem('movies', JSON.stringify(movies));

    console.log(movie);
}
