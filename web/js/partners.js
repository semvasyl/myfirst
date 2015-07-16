;
(function () {
    var kr = 0,
        $illustrationContainer = $('.illustration-container'),
        $illustration = $(document.createElement('div')),
        $illustrationBackground = $(document.createElement('img')),
        width0 = 1907,
        height0 = 636,
        animations = [],
        path = '';

    function windowResize() {
        var containerWidth = $illustrationContainer.width(),
            containerHeight = containerWidth * (height0 / width0),
            kx = containerWidth / width0,
            ky = containerHeight / height0;
        kr++;

        $illustrationContainer.height(containerHeight);
        $illustrationBackground.width(containerWidth);
        $illustrationBackground.height(containerHeight);
        for (var i = 0; i < animations.length; i++) {
            animations[i].resize(kx, ky);
        }

        if($('.container').css('max-width') == '980px' || $('.container').css('max-width') == '1180px'){
            $illustrationContainer.css('margin-bottom',-(containerHeight*0.58+80)+'px');
        } else {
            $illustrationContainer.css('margin-bottom','0');
        }

    }

    function animationPlayer(animation) {
        animation.element.attr('width', animation.width * animation.scale);
        animation.element.attr('height', animation.height * animation.scale);
        var draw = function () {
            animation.ctx.clearRect(0, 0, animation.width * animation.scale, animation.height * animation.scale);
            animation.ctx.drawImage(
                animation.image,
                animation.direction == 'horizontal' ? animation.width * animation.currentFrame : 0,
                animation.direction == 'vertical' ? animation.height * animation.currentFrame : 0,
                animation.width,
                animation.height,
                0,
                0,
                animation.width * animation.scale,
                animation.height * animation.scale
            );

            if (animation.play){
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

    var Animation = function (animation) {
        var that = this;
        this.scale = 1;
        this.name = animation.name;
        this.width = animation.width;
        this.height = animation.height;
        this.frames = animation.frames;
        this.currentFrame = 0;
        this.image = new Image();
        this.image.src = path + this.name + '.png';
        this.element = $(document.createElement('canvas'));
        this.ctx = this.element[0].getContext("2d");
        this.play = true;
        this.direction = animation.direction ? animation.direction : 'horizontal';

        this.init = function () {
            $illustration.append(that.element);
            that.element.addClass(that.name).attr('id', that.name);
            animations.push(that);
        };

        this.resize = function (kx, ky) {
            that.scale = kx;
        };

        this.onEnd = animation.onEnd ? animation.onEnd : function () {
        };
    };

    function partnersIllustration(){
        path = $('meta[name=site_url]').attr('content')+'/images/illustrations/partner/';

        if(browserType.isMobile() || browserType.isTablet()){
            $illustrationBackground.attr('src', $('meta[name=site_url]').attr('content')+'/images/illustrations/partner/partners.svg');
            $illustrationContainer.append($illustration);
            $illustrationContainer.append($illustrationBackground);

            windowResize();
            return;
        }

        if(browserType.isOldIE()){
            $illustrationBackground = $(
                '<object type="application/x-shockwave-flash" data="'
                    +$('meta[name=site_url]').attr('content')
                    +'/images/illustrations/partner/partners.swf" width="100%" height="">' +
                    '<param name="movie" value="'
                    +$('meta[name=site_url]').attr('content')
                    +'/images/illustrations/partner/partners.swf" />' +
                    '<param name="wmode" value="transparent" />'+
                    '</object>'
            );

            $illustrationContainer.append($illustration);
            $illustrationContainer.append($illustrationBackground);

            windowResize();
            return;
        }

        $illustrationBackground.attr('src', $('meta[name=site_url]').attr('content')+'/images/illustrations/partner/partners-background.svg');

        $illustrationContainer.append($illustration);
        $illustrationContainer.append($illustrationBackground);

        var partnerCar1a = new Animation(
            {
                name: 'partner-car-1a',
                width: 1446,
                height: 208,
                frames: 88,
                direction: 'vertical'
            }
        );

        var partnerCar1b = new Animation(
            {
                name: 'partner-car-1b',
                width: 1446,
                height: 208,
                frames: 92,
                direction: 'vertical'
            }
        );

        var partnerCar2a = new Animation(
            {
                name: 'partner-car-2a',
                width: 180,
                height: 138,
                frames: 105,
                direction: 'vertical'
            }
        );

        var partnerCar2b = new Animation(
            {
                name: 'partner-car-2b',
                width: 180,
                height: 138,
                frames: 62,
                direction: 'vertical'
            }
        );


        var partnerCow = new Animation(
            {
                name: 'partner-cow',
                width: 282,
                height: 164,
                frames: 66,
                direction: 'vertical'
            }
        );


        var partnerPig = new Animation(
            {
                name: 'partner-pig',
                width: 150,
                height: 92,
                frames: 20,
                direction: 'vertical'
            }
        );

        var partnerPigEye = new Animation(
            {
                name: 'partner-pig-eye',
                width: 8,
                height: 6,
                frames: 10,
                direction: 'vertical'
            }
        );

        var partnerWindmill = new Animation(
            {
                name: 'partner-windmill',
                width: 124,
                height: 138,
                frames: 172,
                direction: 'vertical'
            }
        );

        var partnerFence = new Animation(
            {
                name: 'partner-fence',
                width: 281,
                height: 114,
                frames: 1
            }
        );

        $(document).ready(function () {
            partnerCar1a.init();
            partnerCar1b.init();
            partnerCar2a.init();
            partnerCar2b.init();
            partnerCow.init();
            partnerPig.init();
            partnerPigEye.init();
            partnerWindmill.init();
            partnerFence.init();
            partnerFence.play = false;


            partnerPig.onEnd = function () {
                partnerPig.play = false;
                setTimeout(function () {
                    partnerPig.play = true;
                }, 2500);
            };

            partnerPigEye.onEnd = function () {
                partnerPigEye.play = false;
                setTimeout(function () {
                    partnerPigEye.play = true;
                }, 4000);
            };

            partnerCar1a.onEnd = function () {
                partnerCar1a.play = false;
                partnerCar1a.element.css('display', 'none');
                partnerCar2a.play = true;
                partnerCar2a.element.css('display', 'block');
            };

            partnerCar2a.onEnd = function () {
                partnerCar2a.play = false;
                partnerCar2a.element.css('display', 'none');
                setTimeout(function () {
                    partnerCar2b.play = true;
                    partnerCar2b.element.css('display', 'block');
                }, 2000);
            };

            partnerCar2b.onEnd = function () {
                partnerCar2b.play = false;
                partnerCar2b.element.css('display', 'none');
                partnerCar1b.play = true;
                partnerCar1b.element.css('display', 'block');
            };

            partnerCar1b.onEnd = function () {
                partnerCar1b.play = false;
                partnerCar1b.element.css('display', 'none');
                setTimeout(function () {
                    partnerCar1a.play = true;
                    partnerCar1a.element.css('display', 'block');
                }, 2000);
            };

           

            partnerCar1b.play = false;
            partnerCar1b.element.css('display', 'none');
            partnerCar2a.play = false;
            partnerCar2a.element.css('display', 'none');
            partnerCar2b.play = false;
            partnerCar2b.element.css('display', 'none');

            windowResize();

            setInterval(function () {
                for (var i = 0; i < animations.length; i++) {
                    animationPlayer(animations[i]);
                }
            }, 1000 / 16);

        });
    }


    $(window).load(function(){
        windowResize();
    });

    $(window).resize(function () {
        windowResize();
    });

    partnersIllustration();

}).call(this);
