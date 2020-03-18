/*
 * @TFP cp
 * @author Piccirilli Dorsey
 */

// Add typekit/fort awesome
// --------------------------------------------------

function addScript(src, html) {
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    if (src != '') scriptTag.src = src
    if (html != '') scriptTag.innerHTML = html;
    (document.getElementsByTagName('head')[0] || document.documentElement ).appendChild(scriptTag);
}

addScript('https://use.fonticons.com/6c33adc4.js', '');

// Redactor
// --------------------------------------------------

if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.iconic2 = function () {
    return {
        init: function () {
            var icons = {
                'html': '<i class="fa fa-code"></i>',
                'format': '<i class="fa fa-paragraph"></i>',
                'lists': '<i class="fa fa-list"></i>',
                'link': '<i class="fa fa-link"></i>',
                'horizontalrule': '<i class="fa fa-minus"></i>',
                'image': '<i class="fa fa-picture-o"></i>',
                'video': '<i class="fa fa-video-camera"></i>',
                'file': '<i class="fa fa-paperclip"></i>',
                'table': '<i class="fa fa-table"></i>',
                'alignment': '<i class="fa fa-align-left"></i>',
                'columns': '<i class="fa fa-columns"></i>',
                'shareBanners': '<i class="fa fa-share-alt"></i>'
            };

            $icons = $('.redactor-toolbar a');

            $icons.each(function (index, elem) {
                var $elem = $(elem);
                var key = $elem.attr('rel');

                if (typeof icons[key] !== 'undefined')
                {
                    var icon = icons[key];

                    $elem.html(icon);
                }
            });
        }
    };
};

RedactorPlugins.imagePosition = function () {
    return {
        init: function () {
            this.imagePosition.figureClasses = {
                'figureWrap': '<figure class="c-figure c-figure--inline"></figure>',
                'figureLeft': 'c-figure--left',
                'figureRight': 'c-figure--right',
                'figureFull': 'c-figure--full',
                'imageClass': 'c-figure__image',
                'captionClass': 'c-figure__caption'
            };

            this.imagePosition.positionTemplate = String()
            + '<section>'
            + '    <label>Position</label>'
            + '    <div class="btngroup big" id="redactor-image-position-field">'
            + '        <div title="Left" class="btn big" data-icon="posleft" data-option="left"></div>'
            + '        <div title="Full" class="btn big active" data-icon="posfull" data-option="full"></div>'
            + '        <div title="Right" class="btn big" data-icon="posright" data-option="right"></div>'
            + '    </div>'
            + '    <input type="hidden" id="redactor-image-position" name="redactor-image-position-field">'
            + '</section>'
            + '<script>var $buttons=$("#redactor-image-position-field div"),$position=$("#redactor-image-position");$buttons.on("click",function(){var t=$(this),i=t.data("option");return $buttons.removeClass("active"),t.addClass("active"),$position.val(i),!1});</script>';


            this.imagePosition.events();
        },

        events: function () {
            $('body').on('click', '.elementselectormodal .submit', this.imagePosition.onModalSave.bind(this));
            $('body').on('click', '#redactor-modal-button-action', this.imagePosition.onModalSave.bind(this));
            // this.core.element().on('modalOpened.callback.redactor', this.imagePosition.onModalSave.bind(this));
            this.core.element().on('modalOpened.callback.redactor', this.imagePosition.onModalOpen.bind(this));
        },

        onModalOpen: function (name, modal) {
            if (name != 'image-edit') {
                return;
            }

            var $positionSection = $(this.imagePosition.positionTemplate);
            var $positions = $positionSection.find('.btn');
            var $redactorImage = $('#redactor-modal img');
            var src = $redactorImage.attr('src');
            var $bodyImage = $('.redactor-box img[src*="' + src + '"]');
            var pos = $bodyImage.data('pos') || 'full';
            var $activePosition = $positions.filter('[data-option*="' + pos +'"]');

            $positions.removeClass('active');
            $activePosition.addClass('active');

            // insert position element
            $('#redactor-modal section:last-child').prepend($positionSection);
        },

        onModalSave: function () {
            var pos = $('#redactor-image-position').val();
            var $redactorImage = $('#redactor-modal img');
            var src = $redactorImage.attr('src');
            var $bodyImage = $('.redactor-box img[src*="' + src + '"]');
            var $images = $('.redactor-box img');

            $bodyImage.data('pos', pos);

            $images.each(this.imagePosition.formatImage.bind(this));
        },

        formatImage: function (index, elem) {
            var $image = $(elem);
            var c = $image.data('pos');
            var $caption = ($image.next('figcaption').length > 0) ? $image.next('figcaption') : $image.parent().next('figcaption');

            if (c !== 'left' && c !== 'right' && c !== 'full') return;

            $image.wrap(this.imagePosition.figureClasses['figureWrap']);
            var $figure = $image.parent('figure').unwrap();

            $image.addClass(this.imagePosition.figureClasses['imageClass']);
            $caption.addClass(this.imagePosition.figureClasses['captionClass']);

            $figure.append($caption);

            if (c === 'left') $figure.addClass(this.imagePosition.figureClasses['figureLeft']);
            if (c === 'right') $figure.addClass(this.imagePosition.figureClasses['figureRight']);
            if (c === 'full') $figure.addClass(this.imagePosition.figureClasses['figureFull']);
        }
    };
};
