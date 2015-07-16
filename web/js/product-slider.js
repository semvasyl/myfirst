var tsPos,
    tmPos,
    slidesCount,
    currentSlide = 1,
    sliderLock = false,
    nextSlide = function () {
        return currentSlide < slidesCount ? currentSlide + 1 : 1;
    },
    prevSlide = function () {
        return currentSlide > 1 ? currentSlide - 1 : slidesCount;
    };

function slideNext() {
    if(sliderLock){
        return false;
    }
    sliderLock = true;
    setTimeout(function(){
        sliderLock = false;
    },1000);
    var cs = currentSlide, ns = nextSlide();
    currentSlide = ns;
    $('.slides').removeClass('transition-on');
    setTimeout(function () {
        $('.slide' + ns).removeClass('hide-up').addClass('hide-down');
        setTimeout(function () {
            $('.slides').addClass('transition-on');
            setTimeout(function () {
                $('.slide' + cs).removeClass('show').addClass('hide-up');
                $('.slide' + ns).removeClass('hide-down').addClass('show');

                //---------------------------------
                $('.slide-description').addClass('before-hide');
                setTimeout(function () {
                    $('.description' + cs).addClass('hide');
                    $('.description' + ns).removeClass('hide');
                    setTimeout(function () {
                        $('.slide-description').removeClass('before-hide');
                    }, 50);
                }, 300);

                //---------------------------------
                $('.slide-nav' + cs).removeClass('current');
                $('.slide-nav' + ns).addClass('current');

                //---------------------------------
                $('.mobile-wrapper .slide'+ns).css({
                    'transform': 'translate3d( 100%, 0, 0)',
                    'transition': ''
                });
                setTimeout(function(){
                    $('.mobile-wrapper .slide'+cs).css({
                        'transform': 'translate3d( -100%, 0, 0)',
                        'transition': 'all 0.5s'
                    });
                    $('.mobile-wrapper .slide'+ns).css({
                        'transform': 'translate3d( 0, 0, 0)',
                        'transition': 'all 0.5s'
                    });
                },100);


                //---------------------------------
                $('.current-slide').html(ns + '/' + slidesCount);
            }, 10);
        }, 10);
    }, 10);
}

function slidePrev() {
    if(sliderLock){
        return false;
    }
    sliderLock = true;
    setTimeout(function(){
        sliderLock = false;
    },1000);
    var cs = currentSlide, ps = prevSlide();
    currentSlide = ps;
    $('.slides').removeClass('transition-on');
    setTimeout(function () {
        $('.slide' + ps).removeClass('hide-down').addClass('hide-up');
        setTimeout(function () {
            $('.slides').addClass('transition-on');
            setTimeout(function () {
                $('.slide' + cs).removeClass('show').addClass('hide-down');
                $('.slide' + ps).removeClass('hide-up').addClass('show');

                //---------------------------------
                $('.slide-description').addClass('before-hide');
                setTimeout(function () {
                    $('.description' + cs).addClass('hide');
                    $('.description' + ps).removeClass('hide');
                    setTimeout(function () {
                        $('.slide-description').removeClass('before-hide');
                    }, 50);
                }, 300);

                //---------------------------------
                $('.slide-nav' + cs).removeClass('current');
                $('.slide-nav' + ps).addClass('current');

                //---------------------------------

                $('.mobile-wrapper .slide'+ps).css({
                    'transform': 'translate3d( -100%, 0, 0)',
                    'transition': ''
                });
                setTimeout(function(){
                    $('.mobile-wrapper .slide'+cs).css({
                        'transform': 'translate3d( 100%, 0, 0)',
                        'transition': 'all 0.5s'
                    });
                    $('.mobile-wrapper .slide'+ps).css({
                        'transform': 'translate3d( 0, 0, 0)',
                        'transition': 'all 0.5s'
                    });
                },100);


                //---------------------------------
                $('.current-slide').html(ps + '/' + slidesCount);
            }, 10);
        }, 10);
    }, 10);
}

$('.arrow-next').on('click', function (e) {
    e.preventDefault();
    slideNext();
});

$('.arrow-prev').on('click', function (e) {
    e.preventDefault();
    slidePrev();
});

function sliderResize() {
    var sliderHeight;
    if ($('.slides').width() <= 470) {
        sliderHeight = $('.slides').width() / 480 * 650;
    } else {
        sliderHeight = 470 / 480 * 650;
    }

    $('.slides').height(sliderHeight);

    if ($('.slides').css('float') == 'left') {
        $('.slide-description').height(sliderHeight);
    } else {
        $('.slide-description').height('auto');
    }

    $('.mobile-slides').height(522/480 * $(window).width()- 28);
}

$(document).ready(function () {
    slidesCount = $('.slides .slide').length;
    currentSlide = 1;
    sliderResize();
});

$(window).resize(function () {
    if (browserType.isSafari()) {
        setTimeout(
            function () {
                sliderResize();
            }, 0
        );
    } else {
        sliderResize();
    }

});

$('.mobile-slides').on('touchstart', function (event) {
    tsPos = event.originalEvent.touches[0].pageX;
});

$('.mobile-slides').on('touchmove', function (event) {
    tmPos = event.originalEvent.touches[0].pageX;
});

$('.mobile-slides').on('touchend', function (event) {
    event.preventDefault();
    if (tsPos - tmPos < -50) {
        slidePrev();
    } else if (tsPos - tmPos > 50) {
        slideNext();
    }
});

$('.slide-nav1').on('click', function () {
    slidePrev();
});

$('.slide-nav2').on('click', function () {
    slideNext();
});