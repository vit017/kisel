$(function () {

    var $parent = $('.btns-fix'),
        $btnArrow = $parent.find('.arrow-up'),
        $btnCallback = $parent.find('.callback'),
        btnOpacity = getComputedStyle($btnArrow[0]).opacity,
        $footer = $('#footer'),
        maxScroll = $footer.offset().top;

    $btnArrow[0].addEventListener('click', scrollWindow.bind(null, $btnArrow));
    window.addEventListener('scroll', checkFixBtns.bind(null, maxScroll, [$btnArrow, $btnCallback], btnOpacity));
});

function scrollWindow($btnArrow) {
    window.removeEventListener('scroll', checkFixBtns);
    $('html, body').animate({scrollTop: 0}, 200, function () {
        window.addEventListener('scroll', checkFixBtns);
        $btnArrow.css('opacity', 0);
    });
}

function checkFixBtns(maxScroll, $btns, btnOpacity) {
    if (arguments.length < 4)
        return;

    var scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if (!scrolled) {
        $btns[0].css('opacity', 0);
    }
    else if (scrolled + document.documentElement.clientHeight >= maxScroll) {
        $btns.forEach(function ($btn) {
            $btn.removeClass('pos-f');
            $btn.addClass('pos-a');
        });
    }
    else {
        $btns.forEach(function ($btn) {
            $btn.removeClass('pos-a');
            $btn.addClass('pos-f');
            $btn.css('opacity', btnOpacity);
        });
    }


}

