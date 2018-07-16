$(document).ready(function(){

/** creat click event for mobile menu **/

    $(window).resize(function() {
        if($(this).width() >= 800) {
            $('[style^=display]').removeAttr('style');
        }
    });

    $('.navbar__mobile-icon--hamburger').click(function() {
        $('.flex-wrapper__nav').animate({
            height: "150px"
        }, 500);
        $('.navbar__mobile-icon--hamburger').attr('style','display:none')
        $('.navbar').attr('style', 'display:flex; flex-direction: column; align-items: center;')
        $('.navbar__mobile-icon--exit').attr('style', 'display:flex');
    });

    $('.navbar__mobile-icon--exit').click(function() {
        $('.flex-wrapper__nav').animate({
            height: "80px"
        }, 500);
        $('.navbar__mobile-icon--hamburger').attr('style','display:flex')
        $('.navbar').attr('style', 'display:none')
        $('.navbar__mobile-icon--exit').attr('style', 'display:none');
    });

/** create smooth scroll efects **/ 

    const $animateElement = $('html, body');
    const $nav = $('#nav');
   

/* smoth scroll function */

    function smoothScroll(event, element) {
        event.preventDefault();
        event.stopPropagation();
        const $hrefLink =  element.attr('href');
        const $goTo = $($hrefLink).offset().top - $nav.height();
        $animateElement.animate({
            scrollTop: $goTo
        }, 750)
    }  

/* add click event for <a> */

    $('a[href^="#"]').click(function(e) {
        smoothScroll(e, $(this));
    });
  
/* add and remove .actvie into navigation */    

    $(window).scroll(function() {
        const $windowPosition = $(window).scrollTop();
        $('section[id]').each(function(index) {
            if($(this).position().top - $nav.height()  <= $windowPosition + 10) {
                $('.navbar__link.active').removeClass('active');
                $('.navbar__link').eq(index - 1).addClass('active');
            }
        });
    }).scroll();

});
