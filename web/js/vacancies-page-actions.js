function showVacancyForm(vacancy){
    if($(window).height()> 785){
        $('.job-offer-form-popup').show().css('top',$('html').scrollTop() + $('body').scrollTop() + ($(window).height() - 785 )/2+'px');
    } else {
        $('.job-offer-form-popup').show().css('top',($('html').scrollTop() + $('body').scrollTop() + 10 )+'px');
    }

    $('.job-offer-form-popup .form-header').html(vacancy);
    $('input[name=job_name]').val(vacancy);
}

function VacancySuccess(){
    $(".notification-title").html("Дякуємо");
    $(".form-message").html('Наші фахівці зателефонують вам протягом доби.<br> Успіхів на співбесіді!');
    $(".form").hide();
    $(".form-notification").show();

    if($(window).height()> 250){
        $('.job-offer-form-popup').show().css('top',$('html').scrollTop() + $('body').scrollTop() + ($(window).height() - 250 )/2+'px');
    } else {
        $('.job-offer-form-popup').show().css('top',($('html').scrollTop() + $('body').scrollTop() + 10 )+'px');
    }
}

$(document).ready(function(){
    $('.short-description a').on('click', function(event){
        event.preventDefault();
        if(!$(this).parent().parent().hasClass('show')){
            $('.vacancies-page .vacancy').removeClass('show');
            $(this).parent().parent().addClass('show');
            $('html,body').animate(
                {
                    scrollTop: $('.vacancy.show').offset().top - 90
                }, 200
            );
        } else {
            $('.vacancies-page .vacancy').removeClass('show');
            return false;
        }
    });

    $('.vacancies-page .vacancy').on('click', function(event){
        if(!$(this).hasClass('show')){
            $('.vacancies-page .vacancy').removeClass('show');
            $(this).addClass('show');
            $('html,body').animate(
                {
                    scrollTop: $('.vacancy.show').offset().top - 90
                }, 200
            );
        }
    });

    $('.show-vacancy-form').on('click', function(event){
        event.preventDefault();
        showVacancyForm($(this).data('title'));
    });

    $('.upload-cv .btn').on('click', function(){
        $('#JobOfferContact_cv').click();
    });

    $('#JobOfferContact_cv').on( "change", function (){
        $(".upload-cv .note").html($(this).val());
    });

    $('#target-iframe').load(function() {
        var responseText = $(this).contents().text();

        var result = JSON.parse(responseText);

        if(result.success){
            VacancySuccess();
        } else
        if(result.error){
            $(".notification-title").html("Помилка");
            $(".form-message").html(result.error);
            $(".form").hide();
            $(".form-notification").show();

            if($(window).height()> 250){
                $('.job-offer-form-popup').show().css('top',$('html').scrollTop() + $('body').scrollTop() + ($(window).height() - 250 )/2+'px');
            } else {
                $('.job-offer-form-popup').show().css('top',($('html').scrollTop() + $('body').scrollTop() + 10 )+'px');
            }
        } else {
            $.each(result, function(key, val) {
                $("#job-offer-form #"+key+"_em_").text(val);
                $("#job-offer-form #"+key+"_em_").show();
                $("#job-offer-form #"+key+"_em_").parent().addClass("error");
            });
            $(".errorSummary").show();
        }
    });
});
