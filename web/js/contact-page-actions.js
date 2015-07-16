var map;
function initialize() {
    var $map_canvas = $('#contact-page-map');
    $map_canvas.height($(window).height()*0.8);

    var map_canvas = document.getElementById('contact-page-map');
    var map_options = {
        center: new google.maps.LatLng(50.743553, 25.173723),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        streetViewControl: false
    }
    map = new google.maps.Map(map_canvas, map_options);

    var dmytrukIcon = {
            url: $('meta[name=site_url]').attr('content')+'/images/map/dmytruk-marker.png',
            size: new google.maps.Size(44,60),
            scaledSize: new google.maps.Size(44,60)
        };

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.743553, 25.173723),
        map: map,
        icon: dmytrukIcon
    });
}
google.maps.event.addDomListener(window, 'load', initialize);

$(window).resize(function(){
    $('#contact-page-map').height($(window).height()*0.8);
});

$(document).ready(function(){
    $('a[href=#contact-page-map]').on('click', function(event){
        event.preventDefault();

        $('html,body').animate(
            {
                scrollTop: $('#contact-page-map').offset().top - 90
            },
            'slow');
    });
})