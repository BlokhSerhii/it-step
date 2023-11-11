
$(document).ready(function (){
  $('.slider').slick({
      slidesToShow:3,
      adaptiveHeight:true,
      slidesToScroll:1,
      adaptiveHeight: true,
      dots:false,
      speed:500,
      responsive: [
        {
          breakpoint: 800,
          settings: {
           slidesToShow: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
           slidesToShow: 1,
          }
        }
      ]
  });
});

/* *****for fullscreen***** */
function ibg() {

    $.each($('.ibg'), function (index, val) {
       if ($(this).find('img').length > 0) {
          $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
       }
    });
 }
 
 ibg()

const myCarouselElement = document.querySelector('#myCarousel')
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  wrap: false
});

$('.carousel-header').carousel({
  pause: false,
});
