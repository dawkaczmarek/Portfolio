
$(document).ready(function() {

    $('.carousel__wrapper').each(function (index) {

        const $this = $(this);
        const $inner = $this.find('.carousel__inner');
        const $item = $this.find('.carousel__item');
        const $bullet = $this.find('.bullets__list');
        const lastMargin = -100 * ($item.length - 1);
        let interval;

        function slide () {
            const actualMargin = Number($inner[0].style.marginLeft.split(/%|vw/).join(''));
            console.log(actualMargin);
            let unit;

            if ($this.width() >= 1800) {
                unit = '%';
            } else {
                unit ='vw';
            }

          
            if (actualMargin <= lastMargin) {
                interval = setTimeout(function () {
                    animateSlide("0", 500, unit);
                 }, 4000)    
            } else {
                interval = setTimeout(function () {
                    animateSlide("-=100", 500, unit);
                 }, 4000) 
            }
        }


        function animateSlide(margin, duration, slideUnit)  {
            $inner.animate({
                marginLeft: margin + slideUnit
            }, duration, function() {
                slide();
            });
        }  

        slide(); 
 
    });

});


 /*
        $item.each(function () {
            $bullet.append('<li></li>').find('li').addClass('bullet');
        });

   
        function eventBullet () {
        
            $('.bullet').each(function (index) {
                $(this).click(function (){
                    const nextMargin = `${-100 * index}`;
                    let unit;

                    if ($this.width() == 1800) {
                        unit = "%";
                    } else {
                        unit = "vw";
                    }

                    clearInterval(interval);
                    $inner.stop();

                    $inner.animate({
                        marginLeft: nextMargin + unit,
                    }, 750, function () {
                        if ($inner[0].style.marginLeft === "-200" + unit) {
    
                            clearInterval(interval);
                            setTimeout(function() {
        
                                $inner.animate({
                                    marginLeft: "0",
                                }, 750);
        
                                nextSlide(0);
        
                            }, 3000);

                        } else {
                            clearInterval(interval);
                            setTimeout(function() {
        
                                $inner.animate({
                                    marginLeft: "0",
                                }, 750);
        
                                nextSlide(index);
        
                            }, 3000);
                        }

                    })

                });
            });
        }


        function activeButton (index) {
            if (index == 0) {
                $('.bullet').removeClass('active');
                $('.bullet').eq(index).addClass('active'); 
            } else  {
                $('.bullet').eq(index - 1).removeClass('active');
                $('.bullet').eq(index).addClass('active'); 
            }
        }

       function nextSlide(actualIndex) {
            let currentIndex = actualIndex;
            activeButton(currentIndex);
            interval = setInterval (function() {

                let unit;

                    if ($this.width() == 1800) {
                        unit = "%";
                    } else {
                        unit = "vw";
                    }
                   
                
                currentIndex = currentIndex + 1;
              ;

                $inner.animate({
                    marginLeft: "-=100" + unit,
                    start:  activeButton(currentIndex),
                }, 750, function() {
                    if ($inner[0].style.marginLeft === "-200" + unit) {
    
                    clearInterval(interval);
                    setTimeout(function() {

                        $inner.animate({
                            marginLeft: "0",
                            start: activeButton(currentIndex),
                        }, 750);

                        nextSlide(0);

                    }, 3000);

                    } else {
                        clearInterval(interval);
                        nextSlide(index);
                    } 
                });

            }, 3000);    
        }

        eventBullet();
        nextSlide(0);

        */