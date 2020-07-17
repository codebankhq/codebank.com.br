var termynal = new Termynal('#termynal', { noInit: true });

var scrolled = false;
var element_position = $('#termynal').offset().top;
var screen_height = $(window).height();
var activation_offset = 0.5;
var activation_point = element_position - (screen_height * activation_offset);

$(window).on('scroll', function() {
    let y_scroll_pos = window.pageYOffset;
    let element_in_view = y_scroll_pos >= activation_point;

    if(element_in_view && !scrolled) {
        scrolled = true;
        termynal.init();
    }
});
