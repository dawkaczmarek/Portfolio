$(document).ready(function(){
    const $animateElement = $('html, body');

/* smoth scroll function */
    function smoothScroll(event, element) {
        event.preventDefault();
        event.stopPropagation();
        const $navHeight = $('#nav').height();
        const $hrefLink =  element.attr('href');
        const $offsetTopElement = $($hrefLink).offset().top;
        const $goTo = $offsetTopElement - $navHeight;
        $animateElement.animate({
            scrollTop: $goTo
        }, 750)
    }  

/* add click event for <a> */
    $('a[href^="#"]').click(function(e) {
        smoothScroll(e, $(this));
    });
  
});