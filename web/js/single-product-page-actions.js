function resizeProductPage(){
    if($('.single-product-page .left-column').css('float') == "none" ){
        $('.center-column .product-photo-full').detach().appendTo('.top-column');
        $('.left-column .product-like').detach().appendTo('.right-column');
    } else {
        $('.top-column .product-photo-full').detach().appendTo('.center-column');
        $('.right-column .product-like').detach().appendTo('.left-column');
    }

    if ($('.product-photo').width() < 200) {
        $('.product-photo').height($('.product-photo').width() / 200 * 280);
    } else {
        $('.product-photo').height(280);
    }
}

$(document).ready(function(){
    resizeProductPage();
});

$(window).resize(function(){
    resizeProductPage();
});