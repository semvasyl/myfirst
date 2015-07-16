var $illustrationContainer = $('.illustration-container'),
    $illustration = $(document.createElement('div')),
    $illustrationBackground,
    width0 = 1566,
    height0 = 980,
    animations = [],
    path = '';

function windowResize() {
    var containerWidth = $illustrationContainer.parent().width(),
        containerHeight = containerWidth * (height0 / width0),
        kx = containerWidth / width0,
        ky = containerHeight / height0;
    $illustrationContainer.width(containerWidth);
    $illustrationContainer.height(containerHeight);
    $illustrationBackground.width(containerWidth);
    $illustrationBackground.height(containerHeight);
    for (var i = 0; i < animations.length; i++) {
        animations[i].resize(kx, ky);
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

function evening() {
    path = 'images/illustrations/evening/';

    if(browserType.isMobile() || browserType.isTablet()){
        $illustrationBackground = $(document.createElement('img'));
        $illustrationBackground.attr('src', 'images/illustrations/evening/evening.svg');
        $illustrationContainer.append($illustration);
        $illustrationContainer.append($illustrationBackground);

        windowResize();
        return;
    }

    if(browserType.isOldIE()){
        $illustrationBackground = $(
            '<object type="application/x-shockwave-flash" data="images/illustrations/evening/evening.swf" width="100%" height="">' +
                '<param name="movie" value="images/illustrations/evening/evening.swf" />' +
                '<param name="wmode" value="transparent" />'+
                '</object>'
        );

        $illustrationContainer.append($illustration);
        $illustrationContainer.append($illustrationBackground);

        windowResize();
        return;
    }

    $illustrationBackground = $(document.createElement('img'));
    $illustrationBackground.attr('src', 'images/illustrations/evening/evening_background.svg');
    $illustrationContainer.append($illustration);
    $illustrationContainer.append($illustrationBackground);

    var eveningCarA = new Animation(
        {
            name: 'evening-car-a',
            width: 108,
            height: 170,
            frames: 54,
            direction: 'vertical'
        }
    );

    var eveningCarB = new Animation(
        {
            name: 'evening-car-b',
            width: 574,
            height: 173,
            frames: 111,
            direction: 'vertical'
        }
    );


    var eveningDog1 = new Animation(
        {
            name: 'evening-dog-a',
            width: 211,
            height: 206,
            frames: 57
        }
    );


    var eveningDog2 = new Animation(
        {
            name: 'evening-dog-b',
            width: 211,
            height: 206,
            frames: 9
        }
    );

    var eveningWindow1 = new Animation(
        {
            name: 'evening-window-1',
            width: 102,
            height: 24,
            frames: 2
        }
    );

    var eveningWindow2 = new Animation(
        {
            name: 'evening-window-2',
            width: 20,
            height: 20,
            frames: 2
        }
    );

    var eveningSmoke = new Animation(
        {
            name: 'evening-smoke',
            width: 15,
            height: 68,
            frames: 113
        }
    );

    var eveningWindmill = new Animation(
        {
            name: 'evening-windmill',
            width: 103,
            height: 105,
            frames: 180
        }
    );

    $(document).ready(function () {
        eveningCarA.init();
        eveningCarB.init();
        eveningDog1.init();
        eveningDog2.init();
        eveningSmoke.init();
        eveningWindow1.init();
        eveningWindow2.init();
        eveningWindmill.init();
        eveningWindow1.play = false;
        eveningWindow2.play = false;

        eveningDog1.onEnd = function () {
            eveningDog1.play = false;
            setTimeout(function () {
                eveningDog1.element.css('display', 'none');
                eveningDog2.element.css('display', 'block');
                eveningDog2.play = true;
            }, 2000);
        };

        eveningDog2.onEnd = function () {
            eveningDog2.play = false;
            setTimeout(function () {
                eveningDog2.element.css('display', 'none');
                eveningDog1.element.css('display', 'block');
                eveningDog1.play = true;
            }, 3000);
        };

        eveningCarA.onEnd = function () {
            eveningCarA.play = false;
            eveningCarA.element.css('display', 'none');
            setTimeout(function () {
                eveningCarB.play = true;
                eveningCarB.element.css('display', 'block');
                eveningWindow2.currentFrame = 0;
            }, 1000);
            eveningWindow1.currentFrame = 1;
        };

        eveningCarB.onEnd = function () {
            eveningCarB.play = false;
            eveningCarB.element.css('display', 'none');
            eveningCarA.play = true;
            eveningCarA.element.css('display', 'block');
            eveningWindow2.currentFrame = 1;
            eveningWindow1.currentFrame = 0;
        };

        eveningCarA.play = false;
        eveningCarB.play = false;
        eveningCarB.element.css('display', 'none');
        eveningDog1.play = false;
        eveningDog1.element.css('display', 'none');
        setTimeout(function () {
            eveningWindow2.currentFrame = 1;
            setTimeout(function () {
                eveningCarA.play = true;
            }, 1000);
        }, 1000);

        windowResize();

        setInterval(function () {
            for (var i = 0; i < animations.length; i++) {
                animationPlayer(animations[i]);
            }
        }, 1000 / 16);

    });
}

function midday() {
    path = 'images/illustrations/midday/';

    if(browserType.isMobile() || browserType.isTablet()){
        $illustrationBackground = $(document.createElement('img'));
        $illustrationBackground.attr('src', 'images/illustrations/midday/midday.svg');
        $illustrationContainer.append($illustration);
        $illustrationContainer.append($illustrationBackground);

        windowResize();
        return;
    }

    if(browserType.isOldIE()){
        $illustrationBackground = $(
            '<object type="application/x-shockwave-flash" data="images/illustrations/midday/midday.swf" width="100%" height="">' +
            '<param name="movie" value="images/illustrations/midday/midday.swf" />' +
            '<param name="wmode" value="transparent" />'+
            '</object>'
        );

        $illustrationContainer.append($illustration);
        $illustrationContainer.append($illustrationBackground);

        windowResize();
        return;
    }

    $illustrationBackground = $(document.createElement('img'));
    $illustrationBackground.attr('src', 'images/illustrations/midday/midday_background.svg');
    $illustrationContainer.append($illustration);
    $illustrationContainer.append($illustrationBackground);

    var middayCow = new Animation(
        {
            name: 'midday-cow',
            width: 366,
            height: 282,
            frames: 66,
            direction: 'vertical'
        }
    );

    var middayPig = new Animation(
        {
            name: 'midday-pig',
            width: 168,
            height: 103,
            frames: 20
        }
    );


    var middayPigEye = new Animation(
        {
            name: 'midday-pig-eye',
            width: 9,
            height: 6,
            frames: 10
        }
    );

    var middaySmoke = new Animation(
        {
            name: 'midday-smoke',
            width: 144,
            height: 358,
            frames: 84
        }
    );


    $(document).ready(function () {
        middayCow.init();
        middayPig.init();
        middayPigEye.init();
        middaySmoke.init();

        middayPig.onEnd = function () {
            middayPig.play = false;
            setTimeout(function () {
                middayPig.play = true;
            }, 500);
        };

        middayPigEye.onEnd = function () {
            middayPigEye.play = false;
            setTimeout(function () {
                middayPigEye.play = true;
            }, 4000);
        };

        windowResize();

        setInterval(function () {
            for (var i = 0; i < animations.length; i++) {
                animationPlayer(animations[i]);
            }
        }, 1000 / 16);

    });
}

function morning() {
    path = 'images/illustrations/morning/';

    if(browserType.isMobile() || browserType.isTablet()){
        $illustrationBackground = $(document.createElement('img'));
        $illustrationBackground.attr('src', 'images/illustrations/morning/morning.svg');
        $illustrationContainer.append($illustration);
        $illustrationContainer.append($illustrationBackground);

        windowResize();
        return;
    }

    if(browserType.isOldIE()){
        $illustrationBackground = $(
            '<object type="application/x-shockwave-flash" data="images/illustrations/morning/morning.swf" width="100%" height="">' +
                '<param name="movie" value="images/illustrations/morning/morning.swf" />' +
                '<param name="wmode" value="transparent" />'+
                '</object>'
        );

        $illustrationContainer.append($illustration);
        $illustrationContainer.append($illustrationBackground);

        windowResize();
        return;
    }

    $illustrationBackground = $(document.createElement('img'));
    $illustrationBackground.attr('src', 'images/illustrations/morning/morning_background.svg');
    $illustrationContainer.append($illustration);
    $illustrationContainer.append($illustrationBackground);

    var morningCock = new Animation(
        {
            name: 'morning-cock',
            width: 130,
            height: 119,
            frames: 29
        }
    );

    var morningCow = new Animation(
        {
            name: 'morning-cow',
            width: 440,
            height: 236,
            frames: 21
        }
    );


    var morningMan = new Animation(
        {
            name: 'morning-man',
            width: 91,
            height: 62,
            frames: 165
        }
    );

    var morningWindmill = new Animation(
        {
            name: 'morning-windmill',
            width: 128,
            height: 140,
            frames: 180
        }
    );

    $(document).ready(function () {
        morningCock.init();
        morningCow.init();
        morningMan.init();
        morningWindmill.init();

        morningCock.onEnd = function () {
            morningCock.play = false;
            setTimeout(function () {
                morningCock.play = true;
            }, 4000);
        };

        morningMan.onEnd = function () {
            morningMan.play = false;
            setTimeout(function () {
                morningMan.play = true;
            }, 1000);
        };
        windowResize();

        setInterval(function () {
            for (var i = 0; i < animations.length; i++) {
                animationPlayer(animations[i]);
            }
        }, 1000 / 16);
    });
}

var currentDate = new Date();
var currentHours = currentDate.getHours();

if (currentHours >= 5 && currentHours < 11) {
    morning();
    $('.illustration-text .intro').html('Сонечко сходить, а з ним і родина Дмитруків починає новий робочий день. Ранок на Всеволодівці – це поєднання позитивного настрою та відповідальної підготовки сировини.');
} else if (currentHours >= 11 && currentHours < 18) {
    midday();
    $('.illustration-text .intro').html('Полудень. На хуторі Всеволодівка панує аромат дубової та букової стружки, яку Дмитруки використовують для коптіння ковбасних виробів.');
} else {
    evening();
    $('.illustration-text .intro').html('Вечоріє. Вантажівки зі смачною ковбасою вирушають з Всеволодівки до усіх куточків України. А родина Дмитруків збирається на домашню вечерю, аби завтра з новими силами взятися за улюблену справу.');
}

$(window).load(function(){
    windowResize();
});

$(window).resize(function () {
    if(browserType.isSafari()){
        setTimeout(
            function(){windowResize();} , 0
        );
    } else {
        windowResize();
    }
});