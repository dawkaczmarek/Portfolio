
$(document).ready(function() {

    $('.carousel__wrapper').each(function(index) {

        const $this = $(this);
        const $inner = $this.find('.carousel__inner');
        const $item = $this.find('.carousel__item');
        const $bullet = $this.find('.bullets__list');
        const lastMargin = -100 * ($item.length - 1);

        /* Settings delay and duration carousel */
        const  options = {
            delay: 4000,
            back_slide_delay: 600,
            next_slide_duration: 500,
            current_slide_duration:  750,
        }
        
        let unit = "vw";
        let counter = 0;
        let interval;

        /* add bullets */
        $item.each(function() {
            $bullet.append('<li></li>').find('li').addClass('bullet');
            $('.bullet').eq(0).addClass('active');
        });
        
        /* add click evnet on bullets*/
        $this.find('.bullet').each(function(index) {
           $(this)
           .click(function () {
                const toMargin = -100 * index;
                counter = index;
                clearInterval(interval);
                animateSlide (toMargin, options.current_slide_duration, unit);

           })
           .mouseenter(function() {
                $(this).css('background-color','#00ea94');
           })
           .mouseleave(function() {
                $(this).removeAttr('style');
           }) 
       })


       
        function slide () {

            /* Get actual margin left '.inner' remove unit and change string to number */
            const actualMargin = Number($inner[0].style.marginLeft.split(/%|vw/).join(''));

            /*Check '.inner' widht. When is bigger then 1800 change unit to %*/
            if ($this.width() >= 1800) {
                unit = '%';
            } else {
                unit ='vw';
            }

            activeBullet(actualMargin, counter);
            
            /* Check  '.inner' actual margin*/
            if (actualMargin <= lastMargin) {
                counter = 0;
                interval = setTimeout(function() {
                    animateSlide("0", options.back_slide_delay, unit);
                 }, options.delay);   
            } else {
                counter++;
                interval = setTimeout(function() {
                    animateSlide("-=100", options.next_slide_duration, unit);
                },  options.delay); 
            }
        }

        /* Funtcion to add and remove class active */
        function activeBullet (margin, index) {
            
            if (margin >= lastMargin) {
                if ($(window.width > 800)) {
                    $this.find('.bullet').removeAttr('style');
                }
                $this.find('.bullet').removeClass('active');
                $this.find('.bullet').eq(index).addClass('active');
            } 
        }

        /* Function to animate slide */
        function animateSlide (margin, duration, slideUnit)  {
            $inner.stop().animate({
                marginLeft: margin + slideUnit
            }, duration, function() {
                slide();
            });
        }  

        slide(); 
 
    });

});
