$(function () {


    /* catalog detail */
    $('.panel-compare .close').click(function() {
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

        console.log($panel)
        console.log($panelImg)
        console.log($panelProduct)
        console.log(title)
        console.log(imgSrc)

        $panelImg.attr('src', imgSrc);
        $panelImg.attr('alt', title);

        $panelProduct.text(title);
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

    $('[data-toggle="tooltip"]').tooltip();
    /* catalog compare */


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