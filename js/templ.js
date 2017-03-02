function getComparePanel() {
    var $panel = $('.panel-compare'),
        $panelImg = $panel.find('.product-img').find('img'),
        $panelProduct = $panel.find('.product-title').find('span');

    return {'panel': $panel, 'img': $panelImg, 'product': $panelProduct};
}

function checkFooterBtns($footer, $btnArrow, $btnCallback) {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if (!scrolled) {
        $btnArrow.css('opacity', 0);
        return;
    }

    $btnArrow.css('opacity', .8);

    if (scrolled + document.documentElement.clientHeight >= $footer.offset().top) {
        $btnArrow.css('position', 'absolute');
        $btnCallback.css('position', 'absolute');
    }
    else {
        $btnArrow.css('position', 'fixed');
        $btnCallback.css('position', 'fixed');
    }
}

$(function () {

    /* mobile menu */
    $('#touch-menu').click(function(ev) {
        $(this).toggleClass('active');
        $('#nav-main').slideToggle();
        ev.preventDefault();
    });
    /* mobile menu */

    /* mobile catalog */
    $('#sidebar-left h2').click(function(ev) {
        $(this).toggleClass('active');
        $('.nav-catalog').slideToggle();
        ev.preventDefault();
    });
    /* mobile catalog */



    /* footer fixed btns */
    var $btnArrow = $('.footer-fixed.arrow-up'),
        $btnCallback = $('.footer-fixed.callback'),
        $footer = $('#footer');

    window.addEventListener('scroll', checkFooterBtns.bind(null, $footer, $btnArrow, $btnCallback));

    $('.footer-fixed.arrow-up').click(function () {
        $btnArrow = $(this);
        window.removeEventListener('scroll', checkFooterBtns);
        $("html, body").animate({scrollTop: 0}, 200, function () {
            window.addEventListener('scroll', checkFooterBtns);
            var btnOpacity = getComputedStyle($btnArrow[0]).opacity;
            btnOpacity > 0 && $btnArrow.css('opacity', 0);
        });
    });
    /* footer fixed btns */

    /* catalog detail */
    $('.panel-compare .close').click(function () {
        $(this).closest('.panel-compare').css('z-index', -1);
        $(this).closest('.panel-compare').css('opacity', 0);
    });

    $('.cart .compare').click(function () {
        var $this = $(this),
            $parent = $this.closest('.page-catalog-detail'),
            $panel = $('.panel-compare'),
            $panelImg = $panel.find('.product-img').find('img'),
            $panelProduct = $panel.find('.product-title').find('span'),
            title = $parent.find('h1.title').text(),
            imgSrc = $parent.find('.img-detail').find('img').attr('src');

        $panelImg.attr('src', imgSrc);
        $panelImg.attr('alt', title);

        $panelProduct.text(title);
        $panel.css('z-index', 999);
        $panel.css('opacity', 1);
    });

    /* catalog compare */
    /*
     $('.ico-del').click(function() {
     var $this = $(this);
     var $carousel = $this.closest('.carousel');
     var $item = $('[data-id='+$this.closest('.item-catalog').data('id')+']');

     //$item.hide();
     //$carousel.carousel('next');
     //$item.remove();

     !$carousel.find('.item-catalog').length && $carousel.remove();
     });
     */

    if ($('button.product-compare').length) {
        $('button.product-compare').click(function () {
            location.href = 'catalog-compare.html';
        });
    }

    $('.page-catalog-compare').length && $('[data-toggle="tooltip"]').tooltip();
    /* catalog compare */

    /* catalog */
    if ($('.item-catalog .img-hit').length) {
        $('.item-catalog .img-hit').mouseenter(function () {
            $(this).parent().find('.img-compare').show();
        });
        $('.item-catalog .img-hit').mouseleave(function (ev) {
            $(this).parent().find('.img-compare').hide();
        });
        $('.img-compare').click(function () {
            var $objPamel = getComparePanel(),
                $parent = $(this).closest('.item-catalog');
            var title = $parent.find('.descr-hit .product-title').text(),
                imgSrc = $parent.find('.img-product').attr('src');

            $objPamel.img.attr('src', imgSrc);
            $objPamel.img.attr('alt', title);

            $objPamel.product.text(title);
            $objPamel.panel.css('z-index', 999);
            $objPamel.panel.css('opacity', 1);

            $(this).hide();
        });
    }
    /* catalog */


    /* contacts page */
    if ($('#map-production').length) {
        ymaps.ready(function () {
            var coordsProduction = [56.828527, 53.173644]; //УР, Ижевск, Новоажимова, 12
            var map = new ymaps.Map('map-production', {
                center: coordsProduction,
                zoom: 15
            });

            map.geoObjects.add(
                new ymaps.Placemark(
                    coordsProduction,
                    {iconCaption: 'улица Новоажимова, 12'},
                    {preset: "islands#blueCircleDotIconWithCaption"}
                )
            );

            map.controls.destroy()
        });
    }
    /* contacts page */
});