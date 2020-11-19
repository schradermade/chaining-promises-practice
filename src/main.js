import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Epic from './js/epic-service.js';
import GiphyService from './js/giphy-service.js';

function clearFields()  {
  $('#date').val("");
  $('.show-errors').text("");
  $('.show-giph').text("");
}

function getElements(response) {
  if (response.photos)  {
    $('.show-rover').text(`This picture was taken on ${response.photos[0].earth_date} by the ${response.photos[0].rover.name} rover!`);
    $('.show-image').html(`<img src=${response.photos[0].img_src}>`);
  }
}

function showGiph(response) {
  const url = response.data[0].images.downsized.url;
  $('.show-giph').html(`<img src='${url}'>`);
}

function displayErrors(error) {
  $('.show-errors').text(`There was an error processing your request: ${error}`);
}

$(document).ready(function() {
  $("#formOne").submit(function(event) {
    event.preventDefault();
    let date = $("#date").val();
    clearFields();
    Epic.getImage(date)
      .then(function(roverResponse) {
        if (roverResponse instanceof Error) {
          throw Error(`Mars Rover API error: ${roverResponse.message}`);
        }
        const roverImage = roverResponse.photos[0].rover.name;
        getElements(roverResponse);
        return GiphyService.getGiph(roverImage);
      })
      .then(function(giphyResponse) {
        if(giphyResponse instanceof Error)  {
          throw Error(`Giphy API error: ${giphyResponse.message}`);
        }
        showGiph(giphyResponse);
      })
      .catch(function(error)  {
        displayErrors(error.message);
      });
  });
}); 