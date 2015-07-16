$(document).ready(function () {
    $('.main-menu li a').each(function () {
        if (window.location.pathname.indexOf($(this).attr('href')) > -1) {
            $(this).addClass('current');
        }
    });

    if (browserType.isIE()) {
        $('html').addClass('ie-browser');
    }

    if (browserType.isMobile() || browserType.isTablet()) {
        $('html').addClass('hover-off');
    } else {
        $('html').addClass('hover-on');
    }

    var showPosition = 0, scrollTopD;
    $(window).on('scroll', function () {
        var sc = $('html').scrollTop() + $('body').scrollTop();
        if(sc > 400) {
            $('header').addClass('mini-header');
            $('.sub-menu').addClass('scrolled-menu');
            $('.search-wrapper').addClass('scrolled-search');
        } else {
            $('header').removeClass('mini-header');
            $('.sub-menu').removeClass('scrolled-menu');
            $('.search-wrapper').removeClass('scrolled-search');
        }

        if( sc - showPosition > 150 ){
            $('.sub-menu').addClass('hide');
            $('.products-filter,.filter-button').removeClass('open').addClass('close');
        }

        if(scrollTopD - sc >0 ){
            $('.sub-menu').removeClass('hide');
            showPosition = sc;
        }

        scrollTopD = sc;
    });

    $('.scroll-tip').on('click', function (event) {
        event.preventDefault();

        $('html,body').animate(
            {
                scrollTop: $('.product-slider').offset().top - 68
            },
            'slow');
    });


    $('.menu-button').on('click', function () {
        $('.filter-button').removeClass('open').addClass('close');
        $('.products-filter').removeClass('open').addClass('close');

        $('.search-wrapper').addClass('hide').removeClass('show');
        $('#content').show();
        $('.search-result-wrapper').html('').removeClass('show').addClass('hide');
        $('#search_input_autocomplete').val('Пошук');
        $('#search_input').val('');
        resizeElements();
        $('.main-menu').toggleClass('open').toggleClass('close');
        $(this).toggleClass('open').toggleClass('close');
    });

    $('.filter-button').on('click', function () {
        $('.main-menu').removeClass('open').addClass('close');
        $('.menu-button').removeClass('open').addClass('close');
        $('.sub-menu').removeClass('hide');
        showPosition = $('html').scrollTop() + $('body').scrollTop();

        $('.search-wrapper').addClass('hide').removeClass('show');
        $('#content').show();
        $('.search-result-wrapper').html('').removeClass('show').addClass('hide');
        $('#search_input_autocomplete').val('Пошук');
        $('#search_input').val('');
        resizeElements();
        $('.products-filter').toggleClass('open').toggleClass('close');
        $(this).toggleClass('open').toggleClass('close');
    });

    $('.show-contact-form').on('click', function (e) {
        e.preventDefault();
        if ($(window).height() > 570) {
            $('.contact-form-popup').show().css('top', $('html').scrollTop() + $('body').scrollTop() + ($(window).height() - 570 ) / 2 + 'px');
        } else {
            $('.contact-form-popup').show().css('top', ($('html').scrollTop() + $('body').scrollTop() + 10 ) + 'px');
        }
    });

    $('.close-pop-up').on('click', function () {
        $('.pop-up').removeClass('show').hide();
        $('.errorSummary').hide();
        $('.row').removeClass('error success');
        $('.pop-up form')[0].reset();
        $('.pop-up input[type=text]').val('');
        $('.pop-up input[type=file]') .val('').replaceWith($('.pop-up input[type=file]').clone(true));
        $('.pop-up textarea').val('');
        $('.pop-up .errorMessage').hide();

        $(".form").show();
        $(".form-notification").hide();
        $(".upload-cv .note,.upload-attachment .note").html('Файл не додано');
        if (typeof Placeholders != 'undefined') {
            Placeholders.enable()
        }
    });

    var menuWidth = 0,
        menuOverflow,
        touchStartPosition,
        menuLeftMargin = 0,
        moveX;

    $('.sub-1 li').each(function () {
        menuWidth += $(this).width();
    });

    var $subMenuContainer = $('.sub-1 ul');
    menuOverflow = menuWidth - $('.sub-1 .container').width();

    var $subMenu = $('.sub-1');
    $subMenu.on('touchstart', function (event) {
        touchStartPosition = event.originalEvent.touches[0].pageX;
    });

    $subMenu.on('touchmove', function (event) {
        event.preventDefault();
        if (menuOverflow > 0) {
            var move = event.originalEvent.touches[0].pageX - touchStartPosition;
            var tr = menuLeftMargin * 1 + move * 1;
            if (tr < 100 & tr > -(100 + menuOverflow)) {
                moveX = move;
                $subMenuContainer.css('margin-left', (menuLeftMargin * 1 + move * 1) + 'px');
            }
        }
    });

    $subMenu.on('touchend', function () {
        if (menuOverflow > 0) {
            menuLeftMargin += moveX;
            if (menuLeftMargin > 0) {
                $subMenuContainer.animate({
                    marginLeft: '0px'
                }, 300);
                menuLeftMargin = 0
            }

            if (menuLeftMargin < -menuOverflow) {
                $subMenuContainer.animate({
                    marginLeft: -menuOverflow + 'px'
                }, 300);
                menuLeftMargin = -menuOverflow
            }
            touchStartPosition = 0;
        }
    });

    var ww = $('.sub-1 .container').width();

    if (!Modernizr.touch) {
        $subMenu.on('mousemove', function (event) {
            if (menuOverflow > 0) {
                event.preventDefault();
                $subMenuContainer.css('margin-left', -(event.clientX / (ww)) * menuOverflow + 'px');
            }
        });
    }

    $(window).on('resize', function () {

        menuLeftMargin = 0;
        ww = $('.sub-1 .container').width();
        if (menuOverflow > 0) {
            $subMenuContainer.css('margin-left', '0');
        } else {
            $subMenuContainer.css('margin-left', 'auto');
        }
        menuOverflow = menuOverflow = menuWidth - ww;


    });

    $('.product-like-button').on('click', function () {

        $.post(
            $('meta[name=site_url]').attr('content') + "/products/like",
            {product_id: $(this).data('productid')},
            function (data) {
                $('.product-like-count').html(data.likeCount);
            },
            "json"
        );

    }).on('mousedown', function () {
        $(this).addClass('pre-liked');
    }).on('mouseup', function () {
        $(this).addClass('liked');
    });

    $('.site-like-button').on('click', function () {

        $.post(
            $('meta[name=site_url]').attr('content') + "/products/like",
            {site_like: 'like'},
            function (data) {
                $('.site-like-count').html(data.likeCount);
            },
            "json"
        );

    }).on('mousedown', function () {
        $(this).addClass('pre-liked');
    }).on('mouseup', function () {
        $(this).addClass('liked');
    });
});

jQuery(function ($) {
    $(".phone-mask").mask("+38(099)999-99-99");
    if (typeof Placeholders != 'undefined') {
        Placeholders.enable()
    }
});

function share(el, provider, entity_id, entity_type) {
    $(el).find('.share-count').text($(el).find('.share-count').text() * 1 + 1);
    $.post(
        $('meta[name=site_url]').attr('content')+"/products/share",
        {
            entity_type: entity_type,
            entity_id: entity_id,
            provider: provider
        },
        function (data) {

        },
        "json"
    );

    window.open($(el).attr('href'), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes,top=100, left=100, width=600, height=400");
}

function resizeElements(){
    if ($('.product-photo').width() < 200) {
        $('.product-photo').height($('.product-photo').width() / 200 * 280);
    } else {
        $('.product-photo').height(280);
    }

    $('.news-block .news-block-item,.news-block-item .v-align-wrapper').height($('.news-block .column.show').width());
    $('.news-block-item .v-align-wrapper').width($('.news-block .column.show').width());

    if($('footer').css('display') != 'none'){$('.page-wrapper').css('padding-bottom',$('footer').outerHeight(true)+'px')};
}

$(window).resize(function () {
    if(browserType.isSafari()){
        setTimeout(
            function(){resizeElements();} , 0
        );
    } else {
        resizeElements();
    }
});

$(window).load(function(){
    resizeElements();
});

$(document).ready(function () {
    resizeElements();
});