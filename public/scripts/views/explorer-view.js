'use strict';

(function(module) {
  var explorerView = {};

  explorerView.init = (ctx, next) => {
    $('#login').hide();
    $('#create-account').hide();
    $('#account').hide();
    $('#landing').hide();
    $('#results').hide();
    $('#about-us').hide();
    $('.logged-in-saved').hide();
    $('#explorer').show();

    if(localStorage.user_id) {
      $('#nav-login').hide();
    } else {
      $('#nav-favorites').hide();
      $('#nav-logout').hide();
    };

    let rover = ctx.params.rover;
    let roverHeader = rover.charAt(0).toUpperCase() + rover.slice(1);
    $('#explorer h2').text(roverHeader);

    $('main').ready(function() {
      $('section#manifest').show();
      window.roverData.fetchManifest(rover)
    })

    $('#datepicker').on('change', function(e) {
      e.preventDefault();

      let roverName = ctx.params.rover;
      let pickedDate = $('#alt_date').val();

      console.log('picked date:',pickedDate)

      window.roverData.fetchCameras(roverName,pickedDate)
    })

    $('.camera button').on('click', function(e) {
      e.preventDefault();
      $('.logged-in').show();
      $('.logged-in-saved').hide();

      let roverName = ctx.params.rover;
      let pickedDate = $('#alt_date').val();
      let pickedCamera = $('#available-cameras option:checked').val();

      console.log('picked date:',pickedDate)
      console.log('picked camera:',pickedCamera)

      window.roverData.fetchPhoto(roverName, pickedDate, pickedCamera);
    })

    $('.logged-in a').on('click', function(e) {
      e.preventDefault();

      let roverName = ctx.params.rover;
      let earthDate = $('#alt_date').val();
      let cameraName = $('#available-cameras option:checked').text();
      let imageUrl = $('#results-img').attr('src');
      console.log('roverName', roverName);
      console.log('earthDate', earthDate);
      console.log('cameraName', cameraName);
      console.log('imageUrl', imageUrl);

      window.roverData.addImage(roverName, earthDate, cameraName, imageUrl);
      $('.logged-in').hide();
      $('.logged-in-saved').show();
    })
  }

  module.explorerView = explorerView;
})(window);