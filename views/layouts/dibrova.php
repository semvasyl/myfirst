<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="<?= Html::encode($this->meta_name) ?>">
    <meta name="keywords" content="<?= Html::encode($this->meta_keywords) ?> ">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>

    <?php $this->head() ?>

</head>
<body>

<?php $this->beginBody() ?>
    <div class="page-wrapper">
<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="javascript:if(confirm('http://browsehappy.com/  \n\nThis file was not retrieved by Teleport Pro, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?'))window.location='http://browsehappy.com/'" >upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->

<header>
    <nav>
        <div class="main-menu close">
            <div class="container">
                <ul class="left-menu" id="yw0">
<li><a href="products.htm" >Продукція</a></li>
<li><a href="production.htm" >Виробництво</a></li>
<li><a href="special_offers.htm" >Акції</a></li>
<li><a href="stores.htm" >Де купити</a></li>
</ul>                <ul class="right-menu" id="yw1">
<li><a href="news.htm" >Новини</a></li>
<li><a href="for_partners.htm" >Партнерам</a></li>
<li><a href="job_offers.htm" >Вакансії</a></li>
<li><a href="contacts.htm" >Контакти</a></li>
</ul>                <div class="open-search"></div>
            </div>
            <div class="mobile-menu-block">
                <div class="close menu-button"></div>
                <div class="open-search"></div>
                <div class="close filter-button"></div>
            </div>
        </div>

        <div class="logo">
            <a href="index.htm" >
                <img src="images/logo.png"  alt=""/>
            </a>
        </div>
    </nav>
</header>

<div id="search_wrapper" class="search-wrapper hide">
    <div class="container">
        <div class="search-form-wrapper">
            <form id="search_form" action="" method="POST">
                <input type="hidden" id="full_search" name="full_search" value="true">
                <input type="text" id="search_input_autocomplete" name="search" value="Пошук">
                <input type="text" id="search_input" name="search" value="">
            </form>
            <div class="close-search"></div>
        </div>
    </div>
</div>
<div id="search-result-wrapper" class="search-result-wrapper"></div>

    <div id="content">
    <div class="home-page">

        <?= $content ?>

    <div class="where-to-buy container">
        <div class="partners">
            <img src="images/partners/home-page/1.jpg" tppabs="http://dmytruk.com/images/partners/home-page/1.jpg" alt=""/>
            <img src="images/partners/home-page/2.jpg" tppabs="http://dmytruk.com/images/partners/home-page/2.jpg" alt=""/>
            <img src="images/partners/home-page/3.jpg" tppabs="http://dmytruk.com/images/partners/home-page/3.jpg" alt=""/>
            <img src="images/partners/home-page/4.jpg" tppabs="http://dmytruk.com/images/partners/home-page/4.jpg" alt=""/>
            <img src="images/partners/home-page/5.jpg" tppabs="http://dmytruk.com/images/partners/home-page/5.jpg" alt=""/>
            <img src="images/partners/home-page/6.jpg" tppabs="http://dmytruk.com/images/partners/home-page/6.jpg" alt=""/>
            <img src="images/partners/home-page/7.jpg" tppabs="http://dmytruk.com/images/partners/home-page/7.jpg" alt=""/>
            <img src="images/partners/home-page/8.jpg" tppabs="http://dmytruk.com/images/partners/home-page/8.jpg" alt=""/>
        </div>
        <div class="columns-2">
            <div class="column">
                <a href="stores.htm" >Де купити?</a>
            </div>
            <div class="column">
                <a href="for_partners.htm" >Стати партнером</a>
            </div>
        </div>
    </div>
</div></div><!-- content -->
    
<div class="pop-up contact-form-popup">
    <div class="pop-up-container">
        <div class="wrapper">
            <div class="close-pop-up btn-close"></div>
            <div class="form-notification">
                <div class="notification-wrapper">
                    <div class="notification-title"></div>
                    <div class="form-message"></div>
                    <div class="btn btn-b252 close-pop-up">Закрити</div>
                </div>
            </div>

            <div class="form">
                <div class="form-header">Напишіть нам</div>
                <form id="contact-form" action="http://dmytruk.com/contacts/sendMessage" method="post">
                <div id="contact-form_es_" class="errorSummary" style="display:none">Будь ласка правильно заповніть всі необхідні поля
<ul><li>dummy</li></ul></div>
                <div class="row">
                    <input placeholder="Ваше ім’я" name="ContactForm[name]" id="ContactForm_name" type="text" />                    <div class="errorMessage" id="ContactForm_name_em_" style="display:none"></div>                </div>

                <div class="row">
                    <input placeholder="Email" name="ContactForm[email]" id="ContactForm_email" type="text" />                    <div class="errorMessage" id="ContactForm_email_em_" style="display:none"></div>                </div>

                <div class="row">
                    <input placeholder="Телефон" class="phone-mask" name="ContactForm[phone]" id="ContactForm_phone" type="text" />                    <div class="errorMessage" id="ContactForm_phone_em_" style="display:none"></div>                    <div class="note">Наші фахівці зателефонують вам за цим номером</div>
                </div>

                <div class="row">
                    <textarea placeholder="Текст повідомлення" rows="6" cols="60" name="ContactForm[message]" id="ContactForm_message"></textarea>                    <div class="errorMessage" id="ContactForm_message_em_" style="display:none"></div>                </div>


                <div class="row buttons">
                    <input class="btn btn-r306" name="cfSubmit" type="submit" value="Надіслати Повідомлення" id="cfSubmit" />                </div>

                </form>
            </div>
            <script src="js/vendor/placeholders.min.js" ></script>
            <!-- form -->
        </div>
    </div>
    <div class="pop-up-back"></div>
</div>
</div>


<footer>
    <div class="contacts">
        <div class="columns-2 container">
            <div class="column">
                Подобається наша продукція? Став ковбасний лайк!
                <div class="social">
                    <a href="javascript:if(confirm('https://vk.com/dmytrukua  \n\nThis file was not retrieved by Teleport Pro, because it is addressed using an unsupported protocol (e.g., gopher).  \n\nDo you want to open it from the server?'))window.location='https://vk.com/dmytrukua'"  target="_blank" class="vk"></a>
                    <a href="javascript:if(confirm('http://www.odnoklassniki.ru/group/52164608458948  \n\nThis file was not retrieved by Teleport Pro, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?'))window.location='http://www.odnoklassniki.ru/group/52164608458948'"  target="_blank" class="od"></a>
                                        <div class="site-like-button pl-2 "></div>
                    <a href="javascript:if(confirm('https://www.facebook.com/DmytrukUa  \n\nThis file was not retrieved by Teleport Pro, because it is addressed using an unsupported protocol (e.g., gopher).  \n\nDo you want to open it from the server?'))window.location='https://www.facebook.com/DmytrukUa'"  target="_blank" class="fb"></a>
                    <a href="javascript:if(confirm('http://instagram.com/dmytrukua  \n\nThis file was not retrieved by Teleport Pro, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?'))window.location='http://instagram.com/dmytrukua'"  target="_blank" class="inst"></a>
                </div>
                <div class="site-like-count">1511</div>
            </div>
            <div class="column">
                Запитання щодо продукції? Зателефонуйте Олегу Дмитруку
                <div class="phone">0 (800)-50-52-44</div>
                або <a href="#" class="show-contact-form">напишіть нам</a>
            </div>
        </div>
    </div>
    <div class="copyright">
        <div class="columns-2 container">
            <div class="column">
                © 2007-<?= date('Y') ?> ТМ Дмитрук
            </div>
            <div class="column">
                Наковбасили в <a target="_blank" href="#" >ele production</a>&nbsp;&nbsp;&nbsp;<?= Yii::powered() ?>
            </div>
        </div>
    </div>
</footer>
<script type="text/javascript">
/*<![CDATA[*/
jQuery(function($) {
jQuery('body').on('click','#cfSubmit',function(){jQuery.ajax({'success':function(data) {
                                var result = JSON.parse(data);
                                if(result.success){
                                    $(".notification-title").html("Дякуємо");
                                    $(".form-message").html(result.success);
                                    $(".form").hide();
                                    $(".form-notification").show();

                                    if($(window).height()> 230){
                                        $(".contact-form-popup").show().css("top",$("html").scrollTop() + $("body").scrollTop() + ($(window).height() - 230 )/2+"px");
                                    } else {
                                        $(".contact-form-popup").show().css("top",($("html").scrollTop() + $("body").scrollTop() + 10 )+"px");
                                    }
                                } else
                                if(result.error){
                                    $(".notification-title").html("Помилка");
                                    $(".form-message").html(result.error);
                                    $(".form").hide();
                                    $(".form-notification").show();

                                    if($(window).height()> 230){
                                        $(".contact-form-popup").show().css("top",$("html").scrollTop() + $("body").scrollTop() + ($(window).height() - 230 )/2+"px");
                                    } else {
                                        $(".contact-form-popup").show().css("top",($("html").scrollTop() + $("body").scrollTop() + 10 )+"px");
                                    }
                                } else {
                                    $.each(result, function(key, val) {
                                         $("#contact-form #"+key+"_em_").text(val);
                                         $("#contact-form #"+key+"_em_").show();
                                         $("#contact-form #"+key+"_em_").parent().addClass("error");
                                    });
                                    $(".errorSummary").show();
                                }
                            },'type':'POST','url':'/contacts/sendMessage','cache':false,'data':jQuery(this).parents("form").serialize()});return false;});
jQuery('#contact-form').yiiactiveform({'validateOnSubmit':true,'attributes':[{'id':'ContactForm_name','inputID':'ContactForm_name','errorID':'ContactForm_name_em_','model':'ContactForm','name':'name','enableAjaxValidation':true,'clientValidation':function(value, messages, attribute) {

if(jQuery.trim(value)=='') {
    messages.push("\u041f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0442\u0435\u0441\u044c \u0431\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430.");
}


if(jQuery.trim(value)!='' && value.match(/[\^<,\"@\/\{\}\(\)\*\$%\?=>:\|;#]+/i)) {
    messages.push("\u0406\u043c'\u044f \u043d\u0435 \u043c\u043e\u0436\u0435 \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u0441\u043f\u0435\u0446 \u0441\u0438\u043c\u0432\u043e\u043b\u0438.");
}

},'summary':true},{'id':'ContactForm_email','inputID':'ContactForm_email','errorID':'ContactForm_email_em_','model':'ContactForm','name':'email','enableAjaxValidation':true,'clientValidation':function(value, messages, attribute) {

if(jQuery.trim(value)=='') {
    messages.push("\u0412\u0432\u0435\u0434\u0456\u0442\u044c email \u0430\u0434\u0440\u0435\u0441\u0443");
}



if(jQuery.trim(value)!='' && !value.match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/)) {
    messages.push("\u041d\u0435\u043f\u0440\u0430\u0432\u0435\u043b\u044c\u043d\u0438\u0439 email");
}

},'summary':true},{'id':'ContactForm_phone','inputID':'ContactForm_phone','errorID':'ContactForm_phone_em_','model':'ContactForm','name':'phone','enableAjaxValidation':true,'summary':true},{'id':'ContactForm_message','inputID':'ContactForm_message','errorID':'ContactForm_message_em_','model':'ContactForm','name':'message','enableAjaxValidation':true,'clientValidation':function(value, messages, attribute) {

if(jQuery.trim(value)=='') {
    messages.push("\u041e\u043f\u0438\u0448\u0456\u0442\u044c \u0441\u0432\u043e\u044e \u043f\u0440\u043e\u043f\u043e\u0437\u0438\u0446\u0456\u044e.");
}

},'summary':true}],'summaryID':'contact-form_es_','errorCss':'error'});
});
/*]]>*/
</script>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>






    <div class="wrap">
        <?php
            NavBar::begin([
                'brandLabel' => 'My Company',
                'brandUrl' => Yii::$app->homeUrl,
                'options' => [
                    'class' => 'navbar-inverse navbar-fixed-top',
                ],
            ]);
            echo Nav::widget([
                'options' => ['class' => 'navbar-nav navbar-right'],
                'items' => [
                    ['label' => 'Home', 'url' => ['/site/index']],
                    ['label' => 'About', 'url' => ['/site/about']],
                    ['label' => 'Contact', 'url' => ['/site/contact']],
                    Yii::$app->user->isGuest ?
                        ['label' => 'Login', 'url' => ['/site/login']] :
                        ['label' => 'Logout (' . Yii::$app->user->identity->username . ')',
                            'url' => ['/site/logout'],
                            'linkOptions' => ['data-method' => 'post']],
                ],
            ]);
            NavBar::end();
        ?>

        <div class="container">
            <?= Breadcrumbs::widget([
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            ]) ?>
            <?= $content ?>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p class="pull-left">&copy; My Company <?= date('Y') ?></p>
            <p class="pull-right"><?= Yii::powered() ?></p>
        </div>
    </footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
