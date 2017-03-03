$(function () {

    /**
     * check fix buttons (arrow-up, callback) on window scroll event
     */
    var $parent = $('.btns-fix'),
        $btnArrow = $parent.find('.arrow-up'),
        btnOpacity = getComputedStyle($btnArrow[0]).opacity,
        $btnCallback = $parent.find('.callback'),
        $footer = $('#footer'),
        maxScroll = $footer.offset().top;

    $btnArrow[0].addEventListener('click', scrollWindow.bind(null, $btnArrow));
    window.addEventListener('scroll', checkFixBtns.bind(null, maxScroll, [$btnArrow, $btnCallback], btnOpacity));


    /**
     * show tooltip - add product to compare list. catalog page
     */
    if ($('.item .img-catalog').length) {
        $('.item .img-catalog').mouseenter(function () {
            $(this).parent().find('.img-compare').show();
        });
        $('.item .img-catalog').mouseleave(function (ev) {
            $(this).parent().find('.img-compare').hide();
        });
        $('.img-compare').click(function () {
            var $objPamel = getComparePanel(),
                $parent = $(this).closest('.item'),
                title = $parent.find('.text-catalog .product-title').text(),
                imgSrc = $parent.find('.img-product').attr('src');

            $objPamel.img.attr('src', imgSrc);
            $objPamel.img.attr('alt', title);

            $objPamel.product.text(title);
            $objPamel.panel.css('z-index', 999);
            $objPamel.panel.css('opacity', 1);

            $(this).hide();
        });
    }


    /**
     * Compare page. Remove item from compare list
     */
    $('.ico-del').click(function(event) {
        event.preventDefault();
    });


});

function getComparePanel() {
    var $panel = $('#panel-compare'),
        $panelImg = $panel.find('.product-img').find('img'),
        $panelProduct = $panel.find('.product-title').find('span');

    return {'panel': $panel, 'img': $panelImg, 'product': $panelProduct};
}

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

