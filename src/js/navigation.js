$(document).ready(function (){

/** creat click event for mobile menu **/

    const $iconHamburger = $('.navbar__mobile-icon--hamburger');
    const $navbar = $('.navbar');
    const $iconExit = $('.navbar__mobile-icon--exit');
    const DELAY_ANIMATE_NAV = 500;
    const WIDTH_WINDOW = 800;

    $(window).resize(function () {

        if ($(this).width() >= WIDTH_WINDOW) {
            $('[style^=display]').removeAttr('style');
            $('.flex-wrapper__nav').stop().animate({
                height: "80px"
            }, DELAY_ANIMATE_NAV)
        }
        
    });

    $iconHamburger.click(function () {

        $('.flex-wrapper__nav').stop().animate({
            height: "150px"
        }, DELAY_ANIMATE_NAV, function() {
            $iconHamburger.attr('style','display:none')
            $navbar.attr('style', 'display:flex; flex-direction: column; align-items: center;')
            $iconExit.attr('style', 'display:flex');
        });
    });

    $iconExit.click(function () {

        $iconHamburger.attr('style','display:flex')
        $navbar.attr('style', 'display:none')
        $iconExit.attr('style', 'display:none');
        $('.flex-wrapper__nav').stop().animate({
            height: "80px"
        }, DELAY_ANIMATE_NAV,);
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

        const $windowPosition = $(window).scrollTop() + ($(window).height() / 3);
 
        $('section[id]').each(function(index) {
            if($(this).position().top - $nav.height() <= $windowPosition) {
                $('.navbar__link.active').removeClass('active');
                $('.navbar__link').eq(index - 1).addClass('active');
            }
        });

    }).scroll();
});
