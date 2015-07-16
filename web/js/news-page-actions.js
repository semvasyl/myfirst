$(document).ready(function(){
    $('.show-cat').first().addClass('active');

    $('.news-block .column').addClass('show').removeClass('hide');

    $('.show-cat').on('click', function(event){
        event.preventDefault();

        $('.show-cat').removeClass('active');
        $(this).addClass('active');

        var cat = '.'+($(this).attr('href').replace('#', ''));
        if(cat != '.all'){
            $('.news-block .column').addClass('hide').removeClass('show');
            $(cat).addClass('show').removeClass('hide');
        } else {
            $('.news-block .column').addClass('show').removeClass('hide');
        }

    });

    if(window.location.hash){
        $('.show-cat').removeClass('active');
        $('a[href='+window.location.hash+']').addClass('active');

        var cat = '.'+(window.location.hash.replace('#', ''));
        if(cat != '.all'){
            $('.news-block .column').addClass('hide').removeClass('show');
            $(cat).addClass('show').removeClass('hide');
        } else {
            $('.news-block .column').addClass('show').removeClass('hide');
        }
    }
});