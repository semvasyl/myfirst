function StoresMap() {
    var map,
        markers = [],
        dmytrukIcon = {
            url: $('meta[name=site_url]').attr('content')+'/images/map/dmytruk-marker.png',
            size: new google.maps.Size(44,60),
            scaledSize: new google.maps.Size(44,60)
        },
        dmytrukIconGray = {
            url: $('meta[name=site_url]').attr('content')+'/images/map/dmytruk-marker-gray.png',
            size: new google.maps.Size(44,60),
            scaledSize: new google.maps.Size(44,60)
        };

    var that = this;

    this.addMarker = function (id, position, name) {
        var position = position.split(', ');
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(position[0], position[1]),
            map: map,
            title: name,
            icon: dmytrukIcon
        });

        markers.push({
            id: id,
            marker: marker
        });
        return that;
    };

    this.showMarkers = function (partners_id) {
        if(partners_id){
            for (var i = 0; i < markers.length; i++) {
                markers[i].marker.setIcon(dmytrukIconGray);
            }

            $.post(
                $('meta[name=site_url]').attr('content')+"/stores/GetSalesPoints",
                { partners_id: partners_id },
                function (data) {
                    for (i = 0; i < data.length; i++) {
                        var p = data[i];
                        for (var j = 0; j < markers.length; j++) {
                            if (markers[j].id == p.id) {
                                markers[j].marker.setIcon(dmytrukIcon);
                            }
                        }
                    }
                },
                "json"
            );
        } else {
            for (var i = 0; i < markers.length; i++) {
                markers[i].marker.setIcon(dmytrukIcon);
            }
        }
    }

    this.setCenter = function (position) {
        var position = position.split(', ');
        map.setCenter(new google.maps.LatLng(position[0], position[1]));
    };

    this.initialize = function (position) {
        var position = position.split(', ');
        var $map_canvas = $('#where-to-buy-map');
        $map_canvas.height($(window).height() * 0.8);

        var map_canvas = document.getElementById('where-to-buy-map');
        var map_options = {
            center: new google.maps.LatLng(position[0], position[1]),
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

        $.post(
            $('meta[name=site_url]').attr('content')+"/stores/GetSalesPoints",
            function (data) {
                for (i = 0; i < data.length; i++) {
                    var p = data[i];
                    that.addMarker(p.id, p.sale_point_coordinate, p.sale_point_name);
                }
            },
            "json"
        );

    };
}

$(document).ready(function () {
    $('.sub-menu a[href=#3]').addClass('active');

    $('.point-of-sale .partner').hide();
    $.post(
        $('meta[name=site_url]').attr('content')+"/stores/GetPartners",
        { region_id: $('.sub-menu a[href=#3]').attr('href').replace('#', '') },
        function (data) {
            for (i = 0; i < data.length; i++) {
                var p = data[i];
                $('.partner' + p.id).show();
            }
        },
        "json"
    );


    var storesMap = new StoresMap();
    storesMap.initialize($('.sub-menu a[href=#3]').data('coordinates'));

    $('.sub-menu a').on('click', function (e) {
        e.preventDefault();

        $('.sub-menu a').removeClass('active');
        $(this).addClass('active');

        $('.point-of-sale .partner').hide();
        $.post(
            $('meta[name=site_url]').attr('content')+"/stores/GetPartners",
            { region_id: $(this).attr('href').replace('#', '') },
            function (data) {
                for (i = 0; i < data.length; i++) {
                    var p = data[i];
                    $('.partner' + p.id).show();
                }
            },
            "json"
        );

        storesMap.setCenter($(this).data('coordinates'));

        $('.point-of-sale .partner').removeClass('fade');
        storesMap.showMarkers();
        $('.show-all-pin').addClass('hide');
    })

    $('.show-all-pin').on('click', function (e) {
        e.preventDefault();

        $('.point-of-sale .partner').removeClass('fade');
        storesMap.showMarkers();
        $(this).addClass('hide');

        $('html,body').animate(
            {
                scrollTop: $('#where-to-buy-map').offset().top - 240
            },
            'slow');
    })

    $('.point-of-sale .partner a').on('click', function (e) {
        e.preventDefault();

        $('.point-of-sale .partner').addClass('fade');
        $(this).parent().removeClass('fade');
        storesMap.showMarkers($(this).attr('href').replace('#', ''));

        var top = $('#where-to-buy-map').offset().top;
        if ($('.show-all-pin.hide').length != 0){
            top -= 100;
        } else {
            top -= 170;
        }

        $('html,body').animate(
            {
                scrollTop: top
            },
            'slow');

        $('.show-all-pin').removeClass('hide');
    });
});

$(window).resize(function(){
    $('#where-to-buy-map').height($(window).height()*0.8);
});