if(browserType.isOldIE() || browserType.isOldSafari()){
    $('.panorama-notification .preloader').hide();
    $('.panorama-notification .old-browser').show();


} else {

    var $panorama,

        $foreground,
        foregroundWidth = 9686,
        foregroundHeight = 682,

        $background1,
        background1Width = 3051,
        background1Height = 220,

        $background2,
        background2Width = 2342,
        background2Height = 220,


        animations = [],
        loaded = 0,
        currentStage = 0,

        repaint = false,
        ps = false;

    function playStage(n) {
        if (!ps) {
            var containerWidth = $panorama.parent().width(),
                kx = containerWidth / (foregroundWidth / 5);

            $('.panorama-container')
                .addClass('show-panorama')
                .removeClass('stage1 stage2 stage3 stage4 stage5')
                .addClass('stage' + n)
                .removeClass('show-details');
            $('.stage0').addClass('hide-stage');

            $('.time-point').removeClass('current');
            $('.time-point[data-stage=' + n + ']').addClass('current');

            $('.sun-container').css('transform', 'rotate(' + (50 + 20 * (n - 1)) + 'deg)');
            $('.sun').css('transform', 'rotate(-' + (50 + 20 * (n - 1)) + 'deg)');

            $('.progress-point').css('transform', 'translate3d(' + (n - 1) * $('.time-line').width() / 4 + 'px, 0, 0)');

            $panorama.removeClass('stage1 stage2 stage3 stage4 stage5').addClass('stage' + n);

            $foreground.css({
                'transform': 'translate3d( ' + -containerWidth * (n - 1) + 'px, 0, 0)',
                'transition': 'all 1s'
            });
            $background1.css({
                'transform': 'translate3d( ' + ((containerWidth - background1Width * kx) / 4) * (n - 1) + 'px, 0, 0)',
                'transition': 'all 1s'
            });
            $background2.css({
                'transform': 'translate3d( ' + ((containerWidth - background2Width * kx) / 4) * (n - 1) + 'px, 0, 0)',
                'transition': 'all 1s'
            });

            if (n == 5) {

                car.play = false;
                man5a.play = true;
                man5b.play = false;
                car.currentFrame = 0;
                man5a.currentFrame = 0;
                man5b.currentFrame = 0;
                car.element.css({
                    left: '83.89%',
                    top: '23%',
                    'transition': ''
                });
            }

            currentStage = n;
        }
    }

    function windowResize() {

        var containerWidth = $panorama.parent().width(),
            kx = containerWidth / (foregroundWidth / 5);

        if (containerWidth < 900 || $(window).width() / $(window).height() > 2.2) {
            $('.panorama-notification, .resize-message').show();
        } else {
            $('.panorama-notification, .resize-message').hide();
        }

        repaint = true;
        $panorama.css('bottom', (-53 * kx) + 33 + 'px');
        $('.sun-container').css(
            {
                top: 900 * kx + 'px',
                width: 990 * kx + 'px',
                left: 115 * kx + 'px'

            }
        );
        $('.sun').css('width', 200 * kx + 'px');

        $('.stage0-bottom').width(containerWidth).height(containerWidth / 1920 * 609);
        $('.progress-point').css('transform', 'translate3d(' + (currentStage - 1) * $('.time-line').width() / 4 + 'px, 0, 0)');

        $('.freezer').css({
            'height': ($('.panorama-details-container').width() / 3) / 393 * 169 + 'px'
        });

        $('.mixer').css({
            'height': ($('.panorama-details-container').width() / 3) / 393 * 177 + 'px'
        });

        if ($(window).width() / $(window).height() < 1.47) {
            $('.stage-description').addClass('desc-center');
        } else {
            $('.stage-description').removeClass('desc-center');
        }

        if (currentStage != 0) {
            $foreground.css({
                'transform': 'translate3d( ' + -containerWidth * (currentStage - 1) + 'px, 0, 0)',
                'transition': '',
                'width': foregroundWidth * kx + 'px',
                'height': foregroundHeight * kx + 'px',
                'bottom': '0'
            });
            $background1.css({
                'transform': 'translate3d( ' + ((containerWidth - background1Width * kx) / 4) * (currentStage - 1) + 'px, 0, 0)',
                'transition': '',
                'width': background1Width * kx + 'px',
                'height': background1Height * kx + 'px',
                'bottom': 444 * kx + 'px'
            });
            $background2.css({
                'transform': 'translate3d( ' + ((containerWidth - background2Width * kx) / 4) * (currentStage - 1) + 'px, 0, 0)',
                'transition': '',
                'width': background2Width * kx + 'px',
                'height': background2Height * kx + 'px',
                'bottom': 437 * kx + 'px'
            });
        } else {
            $foreground.css({
                'transform': 'translate3d( 0, 0, 0)',
                'transition': '',
                'width': foregroundWidth * kx + 'px',
                'height': foregroundHeight * kx + 'px',
                'bottom': '0'
            });
            $background1.css({
                'transform': 'translate3d( 0, 0, 0)',
                'transition': '',
                'width': background1Width * kx + 'px',
                'height': background1Height * kx + 'px',
                'bottom': 444 * kx + 'px'
            });
            $background2.css({
                'transform': 'translate3d( 0, 0, 0)',
                'transition': '',
                'width': background2Width * kx + 'px',
                'height': background2Height * kx + 'px',
                'bottom': 437 * kx + 'px'
            });
        }

        $('.panorama .stage-description').height($('.panorama').height() - $('.foreground').height());
        $('.stage0 .stage-description').height($('.panorama-container').height() - $('.stage0-bottom').height());

        if ($('.stage-description').height()>250){
            $('.sd-5 a').addClass('btn btn-r415');
        } else {
            $('.sd-5 a').removeClass('btn btn-r415');
        }

        for (var i = 0; i < animations.length; i++) {
            if (animations[i].scaleFunction) {
                animations[i].resize(animations[i].scaleFunction());
            } else animations[i].resize(kx);
        }
    }

    function animationPlayer(animation, repaint) {
        if (animation.stage == currentStage || animation.stage == 'all' || repaint) {

            animation.element.attr('width', animation.width * animation.scale);
            animation.element.attr('height', animation.height * animation.scale);

            function draw() {
                var sx = 0, sy = 0, k = 1;
                if (animation.direction == 'vertical') {
                    k = Math.ceil(animation.frames / animation.cols);
                    sx = animation.width * Math.floor(animation.currentFrame / k);
                    sy = animation.height * (animation.currentFrame - Math.floor(animation.currentFrame / k) * k );
                } else {
                    k = Math.ceil(animation.frames / animation.rows);
                    sx = animation.width * (animation.currentFrame - Math.floor(animation.currentFrame / k) * k);
                    sy = animation.height * Math.floor(animation.currentFrame / k);
                }


                animation.ctx.clearRect(0, 0, animation.width * animation.scale, animation.height * animation.scale);
                animation.ctx.drawImage(
                    animation.image,
                    sx,
                    sy,
                    animation.width,
                    animation.height,
                    0,
                    0,
                    animation.width * animation.scale,
                    animation.height * animation.scale
                );

                if (animation.play) {
                    if (animation.currentFrame == animation.frames - 1) {
                        animation.currentFrame = 0;
                        animation.onEnd();
                    } else {
                        animation.currentFrame++;
                    }
                }
            }

            draw();
        }
    }

    function panorama() {
        setInterval(function () {
            for (var i = 0; i < animations.length; i++) {
                animationPlayer(animations[i], repaint);
            }
            repaint = false;
        }, 62);


        $('.time-point').on('click', function () {
            var stage = $(this).data('stage');
            if ($('.panorama-container').hasClass('show-details')) {
                $('.panorama-container').removeClass('show-details');
                $panorama.css('transform', 'translate3d( 0, 0, 0)');
                setTimeout(function () {
                    playStage(stage);
                }, 500);
            } else {
                playStage(stage);
            }
        });

        $('.show-details-btn').on('click', function () {
            if(!$('.panorama-container').hasClass('show-details')){
                $('.panorama-container').addClass('show-details');
                $panorama.css('transform', 'translate3d( 0, -' + ($('.panorama-details').height() + 25) + 'px, 0)');
            } else {
                $('.panorama-container').removeClass('show-details');
                $panorama.css('transform', 'translate3d( 0, 0, 0)');
            }
        });

        $('.close-details').on('click', function () {
            $('.panorama-container').removeClass('show-details');
            $panorama.css('transform', 'translate3d( 0, 0, 0)');
        });

        $('.next-step .btn').on('click', function (e) {
            e.preventDefault();
            $('.panorama-container').removeClass('show-details');
            $panorama.css('transform', 'translate3d( 0, 0, 0)');
            setTimeout(function () {
                playStage(currentStage + 1);
            }, 500);
        });

        $('.panorama-scroll-tip').on('click', function () {
            playStage(1);
        });

        $(window).bind('mousewheel DOMMouseScroll', function (event) {
            var dir = event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0 ? -1 : 1;

            if ($('.panorama-container').hasClass('show-details')) {
                ps = true;
                $('.panorama-container').removeClass('show-details');
                $panorama.css('transform', 'translate3d( 0, 0, 0)');
                setTimeout(function () {
                    ps = false;
                    if (currentStage + dir >= 1 && currentStage + dir <= 5 && !ps) {
                        playStage(currentStage + dir);
                        ps = true;
                        setTimeout(function () {
                            ps = false;
                        }, 1000);
                    }
                }, 500);
            } else {
                if (currentStage + dir >= 1 && currentStage + dir <= 5 && !ps) {
                    playStage(currentStage + dir);

                    ps = true;
                    setTimeout(function () {
                        ps = false;
                    }, 1000);
                }
            }


        });

    }

    function panoramaLoad() {
        if (loaded == animations.length) {
            $('.load-progress').html('100%');
            panorama();
            setTimeout(function () {
                $('.preloader').fadeOut();
                for (var i = 0; i < animations.length; i++) {
                    animationPlayer(animations[i], true);
                    animations[i].currentFrame = 0;
                }
                setTimeout(function () {
                    $('.panorama-notification').fadeOut();
                    windowResize();
                }, 500);
            }, 100);

        } else {
            $('.load-progress').html(Math.floor((100 / animations.length) * loaded) + '%');
        }
        loaded++
    }

    var Animation = function (animation) {
        var that = this;
        var $image;
        this.scale = 1;
        this.scaleFunction = animation.scaleFunction ? animation.scaleFunction : false;
        this.name = animation.name;
        this.width = animation.width;
        this.height = animation.height;
        this.frames = animation.frames;
        this.currentFrame = 0;
        this.stage = animation.stage;
        this.image = new Image();
        $image = $(this.image);
        $image.on('load error abort', function () {
            panoramaLoad();
        });
        this.image.src = 'images/illustrations/panorama/stage' + animation.stage + '/' + this.name + '.png';
        this.element = $(document.createElement('canvas'));
        this.ctx = this.element[0].getContext("2d");
        this.play = true;
        this.direction = animation.direction ? animation.direction : 'horizontal';
        this.cols = animation.cols ? animation.cols : 1;
        this.rows = animation.rows ? animation.rows : 1;

        this.init = function (block) {
            block.append(that.element);
            that.element.addClass('foreground-' + that.name).attr('id', that.name);
            animations.push(that);
        };

        this.resize = function (kx) {
            that.scale = kx;
        };

        this.onEnd = animation.onEnd ? animation.onEnd : function () {
        };
    };


//  ===========================  stage - 0  ======================================

    var horse = new Animation(
        {
            name: 'horse',
            width: 170,
            height: 106,
            frames: 100,
            direction: 'vertical',
            stage: 0
        }
    );

    var windmill0 = new Animation(
        {
            name: 'windmill0',
            width: 50,
            height: 50,
            frames: 200,
            direction: 'vertical',
            stage: 0
        }
    );

//  ===========================  stage - 1  ======================================

    var boy = new Animation(
        {
            name: 'boy',
            width: 74,
            height: 96,
            frames: 110,
            stage: 1
        }
    );

    var cock = new Animation(
        {
            name: 'cock',
            width: 114,
            height: 102,
            frames: 40,
            direction: 'vertical',
            stage: 1
        }
    );

    var cow = new Animation(
        {
            name: 'cow',
            width: 308,
            height: 178,
            frames: 23,
            direction: 'vertical',
            stage: 1
        }
    );

    var granny = new Animation(
        {
            name: 'granny',
            width: 88,
            height: 174,
            frames: 40,
            stage: 1
        }
    );

    var man = new Animation(
        {
            name: 'man',
            width: 266,
            height: 268,
            frames: 149,
            direction: 'vertical',
            stage: 1,
            cols: 2
        }
    );

//  ===========================  stage - 2  ======================================

    var dog = new Animation(
        {
            name: 'dog',
            width: 186,
            height: 228,
            frames: 75,
            stage: 2,
            rows: 2
        }
    );

    var man2 = new Animation(
        {
            name: 'man2',
            width: 180,
            height: 244,
            frames: 80,
            stage: 2,
            rows: 2
        }
    );

    var mixer = new Animation(
        {
            name: 'mixer',
            width: 590,
            height: 490,
            frames: 35,
            direction: 'vertical',
            stage: 2
        }
    );

    var water = new Animation(
        {
            name: 'water',
            width: 648,
            height: 506,
            frames: 90,
            direction: 'vertical',
            stage: 2,
            cols: 2
        }
    );

//  ===========================  stage - 3  ======================================

    var kite = new Animation(
        {
            name: 'kite',
            width: 184,
            height: 302,
            frames: 76,
            stage: 3
        }
    );

    var man3 = new Animation(
        {
            name: 'man3',
            width: 364,
            height: 414,
            frames: 47,
            stage: 3
        }
    );

    var smoke = new Animation(
        {
            name: 'smoke',
            width: 140,
            height: 242,
            frames: 64,
            stage: 3
        }
    );

    var windmill3 = new Animation(
        {
            name: 'windmill3',
            width: 206,
            height: 206,
            frames: 247,
            stage: 3,
            rows: 2
        }
    );

//  ===========================  stage - 4  ======================================

    var chicken = new Animation(
        {
            name: 'chicken',
            width: 90,
            height: 96,
            frames: 43,
            stage: 4
        }
    );

    var man4 = new Animation(
        {
            name: 'man4',
            width: 352,
            height: 284,
            frames: 123,
            direction: 'vertical',
            stage: 4,
            cols: 2
        }
    );

//  ===========================  stage - 5  ======================================

    var car = new Animation(
        {
            name: 'car',
            width: 480,
            height: 250,
            frames: 108,
            direction: 'vertical',
            stage: 5
        }
    );

    var man5a = new Animation(
        {
            name: 'man5a',
            width: 184,
            height: 186,
            frames: 116,
            direction: 'vertical',
            stage: 5
        }
    );

    var man5b = new Animation(
        {
            name: 'man5b',
            width: 184,
            height: 214,
            frames: 201,
            stage: 5,
            rows: 2
        }
    );

//  ===========================  all  ======================================


    var windmill = new Animation(
        {
            name: 'windmill',
            width: 74,
            height: 72,
            frames: 200,
            direction: 'vertical',
            stage: 'all'
        }
    );


//  ===========================  freezer  ======================================

    var blowers = new Animation(
        {
            name: 'blowers',
            width: 192,
            height: 70,
            frames: 59,
            direction: 'vertical',
            stage: 1,
            scaleFunction: function () {
                return ($('.panorama-details-container').width() / 3) / 393;
            }
        }
    );
    var man1b = new Animation(
        {
            name: 'man1b',
            width: 30,
            height: 92,
            frames: 53,
            stage: 1,
            scaleFunction: function () {
                return ($('.panorama-details-container').width() / 3) / 393;
            }
        }
    );

//  ===========================  mixer    ======================================

    var machine = new Animation(
        {
            name: 'machine',
            width: 286,
            height: 178,
            frames: 111,
            direction: 'vertical',
            stage: 2,
            scaleFunction: function () {
                return ($('.panorama-details-container').width() / 3) / (286 + 108);
            }
        }
    );

    var sausages1 = new Animation(
        {
            name: 'sausages1',
            width: 108,
            height: 80,
            frames: 211,
            direction: 'vertical',
            stage: 2,
            scaleFunction: function () {
                return ($('.panorama-details-container').width() / 3) / (286 + 108);
            }
        }
    );

    var sausages2 = new Animation(
        {
            name: 'sausages2',
            width: 108,
            height: 80,
            frames: 43,
            direction: 'vertical',
            stage: 2,
            scaleFunction: function () {
                return ($('.panorama-details-container').width() / 3) / (286 + 108);
            }
        }
    );

//  ===========================  packer   ======================================

    var packer = new Animation(
        {
            name: 'packer',
            width: 464,
            height: 180,
            frames: 106,
            direction: 'vertical',
            stage: 4,
            cols: 2,
            scaleFunction: function () {
                return ($('.panorama-details-container').width() / 3) / 464;
            }
        }
    );

//  ===========================  smoker   ======================================

    var smoker = new Animation(
        {
            name: 'smoker',
            width: 430,
            height: 222,
            frames: 139,
            direction: 'vertical',
            stage: 3,
            scaleFunction: function () {
                return ($('.panorama-details-container').width() / 3) / 430;
            }
        }
    );

//  ============================================================================


    $(document).ready(function () {
        $('header').addClass('mini-header');
        $('.sub-menu').addClass('scrolled-menu');
        $('.search-wrapper').addClass('scrolled-search');
        $('footer').hide();

        $panorama = $('.panorama');

        $foreground = $('.foreground');
        $background1 = $('.background1');
        $background2 = $('.background2');

        //  ===========================  stage - 0  ======================================

        horse.init($('.stage0-bottom-img'));
        windmill0.init($('.stage0-bottom-img'));

        //  ===========================  stage - 1  ======================================

        boy.init($foreground);
        cock.init($foreground);
        cow.init($foreground);
        granny.init($foreground);
        man.init($foreground);

        //  ===========================  stage - 2  ======================================

        mixer.init($foreground);
        water.init($foreground);
        dog.init($foreground);
        man2.init($foreground);

        //  ===========================  stage - 3  ======================================

        kite.init($foreground);
        man3.init($foreground);
        smoke.init($foreground);
        windmill3.init($foreground);

        //  ===========================  stage - 4  ======================================

        chicken.init($foreground);
        man4.init($foreground);

        //  ===========================  stage - 5  ======================================

        car.init($foreground);
        car.play = false;
        man5a.init($foreground);
        man5b.init($foreground);
        man5b.play = false;
        man5a.onEnd = function () {
            man5a.play = false;
            man5b.play = true;
        };

        man5b.onEnd = function () {
            man5b.play = false;
            car.play = true;
            car.element.css({
                left: '100%',
                top: '16%',
                'transition': 'left 6s ease-in, top 6s ease-in'
            });
        };

        car.onEnd = function () {
            car.play = false;
        };


//  ===========================  all  ======================================

        windmill.init($('.background1'));

//  ===========================  freezer  ======================================

        blowers.init($('.freezer'));
        man1b.init($('.freezer'));

//  ===========================  mixer    ======================================

        machine.init($('.mixer'));
        sausages2.init($('.mixer'));

//  ===========================  packer   ======================================

        packer.init($('.packer'));

//  ===========================  smoker   ======================================

        smoker.init($('.smoker'));

//  ============================================================================

    });

    $(window).resize(function () {
        windowResize();
    });

}