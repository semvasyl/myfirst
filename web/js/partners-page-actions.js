function showPartnershipForm(form_type){
    $('.partners-form-popup .form-header').html($(this).data('title'));
    if(form_type == 'distributor'){
        $('.row.attachment').hide();
        if($(window).height()> 620){
            $('.partners-form-popup').show().css('top',$('html').scrollTop() + $('body').scrollTop() + ($(window).height() - 620 )/2+'px');
        } else {
            $('.partners-form-popup').show().css('top',($('html').scrollTop() + $('body').scrollTop() + 10 )+'px');
        }
    } else {
        $('.row.attachment').show();
        if($(window).height()> 720){
            $('.partners-form-popup').show().css('top',$('html').scrollTop() + $('body').scrollTop() + ($(window).height() - 720 )/2+'px');
        } else {
            $('.partners-form-popup').show().css('top',($('html').scrollTop() + $('body').scrollTop() + 10 )+'px');
        }
    }

    $('input[name=tabs]').val(form_type);
}
function partnershipSuccess(){
    $(".notification-title").html("Дякуємо");
    $(".form-message").html('Наші фахівці зателефонують вам протягом доби');
    $(".form").hide();
    $(".form-notification").show();

    if($(window).height()> 230){
        $('.partners-form-popup').show().css('top',$('html').scrollTop() + $('body').scrollTop() + ($(window).height() - 230 )/2+'px');
    } else {
        $('.partners-form-popup').show().css('top',($('html').scrollTop() + $('body').scrollTop() + 10 )+'px');
    }
}

function showPageTab(form_type){
    $('.sub-menu a').removeClass('active');
    $('.sub-menu a[href=#'+form_type+']').addClass('active');

    $('#distributor,#provider,#distributor-description,#provider-description').hide();

    $('#' + form_type).show();
    $('#' + form_type +'-description').show();

    $('.our-partners .btn').data('form_type', form_type);
}

$(document).ready(function(){

   $('.sub-menu a').on('click', function(e){
       e.preventDefault();

       showPageTab($(this).attr('href').replace('#',''));
   });

    $('.show-partner-form').on('click', function(event){
        event.preventDefault();
        showPartnershipForm($(this).data('form_type'));
    });

    $('.upload-attachment .btn').on('click', function(){
        $('#PartnershipRequestForm_attachment').click();
    });

    $('#PartnershipRequestForm_attachment').on( "change", function (){
        $(".upload-attachment .note").html($(this).val());
    });

    $('#target-iframe').load(function() {
        var responseText = $(this).contents().text();
        var result = JSON.parse(responseText);

        if(result.success){
            partnershipSuccess();
        } else
        if(result.error){
            $(".notification-title").html("Помилка");
            $(".form-message").html(result.error);
            $(".form").hide();
            $(".form-notification").show();

            if($(window).height()> 230){
                $('.partners-form-popup').show().css('top',$('html').scrollTop() + $('body').scrollTop() + ($(window).height() - 230 )/2+'px');
            } else {
                $('.partners-form-popup').show().css('top',($('html').scrollTop() + $('body').scrollTop() + 10 )+'px');
            }
        } else {
            $.each(result, function(key, val) {
                $("#partnership-request-form #"+key+"_em_").text(val);
                $("#partnership-request-form #"+key+"_em_").show();
                $("#partnership-request-form #"+key+"_em_").parent().addClass("error");
            });
            $(".errorSummary").show();
        }
    });

});