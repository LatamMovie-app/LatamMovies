$(document).ready(function() {
  $('#searchForm').on('submit', function(event) {
    var searchText = $('#searchText').val();
    getMovies(searchText);
    event.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=3a181f1c').then(function(response) {
    console.log(response);
    var movies = response.data.Search;
    var output = '';
    $.each(movies, function(index, movie) {
      output += `
      <div class="card-size mb-5 col-6 col-sm-4 col-md-3 col-lg-2">
        <div class="card">
          <img class="card-img-top" src="${movie.Poster}" alt="Card image cap" onclick="movieSelected('${movie.imdbID}')">
          <div class="card-body">
            <h6 class="card-title">${movie.Title}</h6>
            <p class="card-text">${movie.Year}</p>
          </div>
        </div>
      </div>
      `;
    });

    $('#movies').html(output);
  }).catch(function(error) {
    console.log(error);
  });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  var movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=3a181f1c').then(function(response) {
    console.log(response);
    var movie = response.data;
    var output = `
      <div class="row">
        <div class="col-sm-4">
          <img src="${movie.Poster}" alt="" class="img-thumbnail img-fluid">
        </div>
        <div class="col-sm-8">
          <h2>${movie.Title}</h2>
          <ul class="mt-3 mb-4 List-group">
            <li class="List-group-item"><strong>Año:</strong> ${movie.Year}</li>
            <li class="List-group-item"><strong>Género:</strong> ${movie.Genre}</li>
            <li class="List-group-item"><strong>País:</strong> ${movie.Country}</li>
            <li class="List-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="List-group-item"><strong>Reparto:</strong> ${movie.Actors}</li>
          </ul>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-info">Ver IMDB</a>
          <a href="#" class="btn btn-outline-info">Ver más tarde</a>
          <a href="#trailer" class="btn btn-outline-info">Trailer</a>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-12">
          <h3>Sinopsis</h3>
          ${movie.Plot}
        </div>
      </div>
    `;
    $('#movie').html(output);
  }).catch(function(error) {
    console.log(error);
  });
}

// CARRUSEL-------------
var randonMovieArray = ['Peloteros', 'Pantaleón y las visitadoras', 'Piratas en el Callao', 'Asu Mare'];
function apicall() {
  var divSection = $('#divSection');
  for (var i = 0; i < randonMovieArray.length; i++) {
    var randonMovie = randonMovieArray[i];

    $(document).on('click', function(event) {
      if ($(event.target).hasClass('modalEvent')) {
        var movieID = $(event.target).attr('id');
        $.getJSON('https://www.omdbapi.com/?i=' + movieID + '&apikey=91013cb1').then(function(response) {
          console.log(response.Title);
        });
        console.log($(event.target).attr('id'));
      }
    });

    $.getJSON('https://www.omdbapi.com/?t=' + encodeURI(randonMovie) + '&apikey=91013cb1').then(function(response) {
      var image = response.Poster;
      var title = response.Title;
      var year = response.Year;
      var director = response.Director;
      var language = response.Language;
      var genre = response.Genre;
      var actors = response.Actors;
      var plot = response.Plot;
      var id = response.imdbID;
      /* modal button*/
      var aModal = $('<a class="modalEvent btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal"></a>');
      divSection.append(aModal);
      console.log(aModal);

      var divMovie = $('<div class="div-movie"></div>');
      aModal.append(divMovie);

      var divImage = $('<div class="div-image"></div>');
      divMovie.append(divImage);
      var poster = $('<img src="image" class="poster">');
      divImage.append(poster);
      poster.attr('src', image);

      var divContentMovie = $('<div class="div-text div-content-movie"></div>');
      divMovie.append(divContentMovie);

      var titleMovie = $('<div class="div-text title-movie"></div>');
      divContentMovie.append(titleMovie);
      titleMovie.append(title);
      aModal.click(function() {
        $('.modal-body').append('Title: ' + title);
        $('.modal-body').append('; year: ' + year);
        $('.modal-body').append('; sinopsis: ' + plot);
      });
    });// ---- $.getJASON
  } // for
} // --- apicall()
apicall();
