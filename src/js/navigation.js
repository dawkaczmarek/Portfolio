$(document).ready(function(){

/** create smooth scroll **/    

    const $animateElement = $('html, body');

/* smooth scroll function */

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