$('#carouselExampleIndicators').on('slide.bs.carousel', function (event) {
  if ($(event.relatedTarget).find('#videoC').length > 0) {
    $('#videoC').get(0).currentTime = 0;
    $('#videoC').get(0).play();
  }
});