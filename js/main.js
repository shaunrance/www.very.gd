var sceneHidden = true;
$(function () {
    "use strict";

    /* ==========================================================================
    Sub Form
    ========================================================================== */

    $('#mc-form').ajaxChimp({
        language: 'cm',
        url: 'http://very.us14.list-manage.com/subscribe/post?u=cc7aa26e60bb57ae51ee85a1e&id=5ec19d6136'
    });

    $.ajaxChimp.translations.cm = {
        'submit': 'Submitting...',
        0: '<i class="fa fa-envelope"></i> Awesome! We have sent you a confirmation email',
        1: '<i class="fa fa-exclamation-triangle"></i> Please enter a value',
        2: '<i class="fa fa-exclamation-triangle"></i> An email address must contain a single @',
        3: '<i class="fa fa-exclamation-triangle"></i> The domain portion of the email address is invalid (the portion after the @: )',
        4: '<i class="fa fa-exclamation-triangle"></i> The username portion of the email address is invalid (the portion before the @: )',
        5: '<i class="fa fa-exclamation-triangle"></i> This email address looks fake or invalid. Please enter a real email address'
    };

    /* ==========================================================================
    sticky nav
    ========================================================================== */

    $('.navbar-default').waypoint('sticky', {
        offset: -10
    });

    /* ==========================================================================
    Nav bar
    ========================================================================== */
    
    $('.navbar-toggle').on('click', function(){
        $(".collapse").fadeToggle(250);
    });
    

    $(".navbar-nav li a").on('click', function () {
         $(".collapse").fadeOut(250);
    });

    /* ==========================================================================
    Scene List mobile toggle
    ========================================================================== */
    
    $('body').on('click', '.toggle-scene', function(){
        if ( sceneHidden ) {
            $('.scene-list-holder').css({
                'height': 'auto',
                'max-height': '300px'
            });
            $('.scene-list-holder').animate({
                bottom: 0
            }, 250, function(){
                sceneHidden = false;
            });
        } else {
            var newbottom = -1*( $('.scene-list-holder').height() - 36 );
            $('.scene-list-holder').animate({
                bottom: newbottom
            }, 250, function(){
                sceneHidden = true;
            });
        }
    });


    /* ==========================================================================
    Gallery VR Lightbox Modal
    ========================================================================== */
/*
    $(document).on('click', '.vr_viewer', function() {
        var url = $(this).data('url');
        $('#vr_lightbox iframe').attr('src',url);
        $('#vr_lightbox').fadeIn(300);
    });
    $(document).on('click', '#vr_lightbox button', function() {
        $('#vr_lightbox').fadeOut(300);
        $('#vr_lightbox iframe').attr('src','');
    });
*/

});
