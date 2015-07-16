$(document).ready(function () {
    $('.filter-button').addClass('enable');

    if(window.location.hash.replace('#','')=='dstu'){
        $('.top-category-select').removeClass('active');
        $('.category-select').removeClass('active');
        $('.top-category-select[href=#tc1]').addClass('active');


            $('.product').removeClass('show').addClass('hide');
            $('.product.tc1').removeClass('hide').addClass('show');


        $('.category-select').addClass('disable');
        $('.products-category-container').show();

        $('.products-category-container').each(function(){
            if($(this).find('.product.show').length == 0){
                $(this).hide();
            } else {
                $( 'a[href = #'+$(this).attr('id')+']').removeClass('disable');
            }
        });
    }

    $('.top-category-select').on('click', function (e) {
        e.preventDefault();
        $('.top-category-select').removeClass('active');
        $('.category-select').removeClass('active');
        $(this).addClass('active');

        if($(this).attr('href') == '#all'){
            $('.product').removeClass('hide').addClass('show');
        } else {
            $('.product').removeClass('show').addClass('hide');
            $('.product.' + $(this).attr('href').replace('#', '')).removeClass('hide').addClass('show');
        }

        $('.category-select').addClass('disable');
        $('.products-category-container').show();

        $('.products-category-container').each(function(){
           if($(this).find('.product.show').length == 0){
               $(this).hide();
           } else {
               $( 'a[href = #'+$(this).attr('id')+']').removeClass('disable');
           }
        });

        $('html,body').animate(
            {
                scrollTop: 0
            }, 'slow'
        );
    });

    $('.category-select').on('click', function (e) {
        e.preventDefault();

        $('.main-menu').removeClass('open').addClass('close');
        $('.menu-button').removeClass('open').addClass('close');

        $('.products-filter').removeClass('open').addClass('close');
        $('.filter-button').toggleClass('open').toggleClass('close');

        if(!$(this).hasClass('disable')){
            $('.category-select').removeClass('active');
            $(this).addClass('active');

            if(!browserType.isIE8()){
                if(($($(this).attr('href')).offset().top - (92+$('.sub-menu').height())) < 400){
                    $('html,body').animate(
                        {
                            scrollTop: $($(this).attr('href')).offset().top - (92+$('.sub-menu').height())
                        },
                        'slow');
                } else {
                    $('html,body').animate(
                        {
                            scrollTop: $($(this).attr('href')).offset().top - (68+$('.sub-menu').height())
                        },
                        'slow');
                }
            } else {
                $('html,body').animate(
                    {
                        scrollTop: $($(this).attr('href')).offset().top
                    },
                    'slow');
            }
        }
    });

});