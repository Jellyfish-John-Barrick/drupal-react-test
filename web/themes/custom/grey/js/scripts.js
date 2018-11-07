(function ($, Drupal, window, document) {
  window.dataLayer = window.dataLayer || [];
	Drupal.behaviors.global = {
		attach: function (context, settings) {


			// init Blazy
			var bLazy = new Blazy();



      // add wrapper around all buttons
      function jf_buttons()	{

        $('a.jf-button, main form input[type="submit"]').each(function() {

          if( !$(this).parent().hasClass('jf-button-container') )	{

            // add outer and inner wrappers
            $(this).wrap('<span class="jf-button-container">');
            //$(this).wrapInner('<span class="button-inner">');
            if( $(this).is('a') )	{
              $(this).append('<span class="button-decoration">');
              }

            // add class based on inline, block, inline-block
            if ( $(this).hasClass('button-block') )	{
              $(this).parent().addClass('button-block');
            }
            else	{
              $(this).parent().addClass('button-inline-block');
            }

            // float
            if ( $(this).hasClass('float-left') )	{
              $(this).parent().addClass('float-left');
            }
            if ( $(this).hasClass('float-right') )	{
              $(this).parent().addClass('float-right');
            }

            // fixed
            if ( $(this).hasClass('width-100px') )	{
              $(this).parent().addClass('width-100px');
            }
            else if ( $(this).hasClass('width-200px') )	{
              $(this).parent().addClass('width-200px');
            }
            else if ( $(this).hasClass('width-300px') )	{
              $(this).parent().addClass('width-300px');
            }

            // button colours
            if ( $(this).hasClass('green') )	{
              $(this).parent().addClass('green');
            }
            if ( $(this).hasClass('blue') )	{
              $(this).parent().addClass('blue');
            }
            if ( $(this).hasClass('white') )	{
              $(this).parent().addClass('white');
            }
            if ( $(this).hasClass('red') )	{
              $(this).parent().addClass('red');
            }
            if ( $(this).hasClass('grey') )	{
              $(this).parent().addClass('grey');
            }
            if ( $(this).hasClass('orange') )	{
              $(this).parent().addClass('orange');
            }
            if ( $(this).hasClass('purple') )	{
              $(this).parent().addClass('purple');
            }
            if ( $(this).hasClass('gradient-1') )	{
              $(this).parent().addClass('gradient-1');
            }

            // button types
            if ( $(this).hasClass('type-1') )	{
              $(this).parent().addClass('type-1');
            }
            if ( $(this).hasClass('type-2') )	{
              $(this).parent().addClass('type-2');
            }
            if ( $(this).hasClass('type-3') )	{
              $(this).parent().addClass('type-3');
            }

            // button case
            if ( $(this).hasClass('lowercase') )	{
              $(this).parent().addClass('lowercase');
            }
            if ( $(this).hasClass('uppercase') )	{
              $(this).parent().addClass('uppercase');
            }
            if ( $(this).hasClass('reset-case') )	{
              $(this).parent().addClass('reset-case');
            }

            // button no letter-spacing
            if ( $(this).hasClass('no-letter-spacing') )	{
              $(this).parent().addClass('no-letter-spacing');
            }

          }

        });

      }
      jf_buttons();


      // add bootstrap to default paragraph--text
      $('.paragraph--text').addClass('col-lg-9');
      $('.paragraph--boxes .paragraph--text').removeClass('col-lg-9');
      $('.paragraph--boxes .paragraph-boxes-content > .row > div').addClass('col-lg-4');


      /*****************************/
      // START: language switcher
      /*****************************/

      // close switcher
      function language_switcher_close()  {
        $('.block--block-languageswitcher').removeClass('is-open');
      }

      // on home "is-active" only sets on the li.
      // need to add it to child <a> as other pages do automagically
      // should probably move this into links--language-block.html.twig
      $('.block--block-languageswitcher li.is-active a').each(function() {
        $(this).addClass('is-active');
      });

      // toggle click
      $('.block--block-languageswitcher .toggle-container').once().click(function() {
        if( $(this).closest('.block--block-languageswitcher').hasClass('is-open') )  {
          language_switcher_close();
        }
        else  {
          $(this).closest('.block--block-languageswitcher').addClass('is-open');
        }
      });

      // user clicks off-target, close language switcher
      $(document).on('click', function(event) {
        if (!$(event.target).closest('.block--block-languageswitcher').length) {
          language_switcher_close();
        }
      });

      /*****************************/
      // END: language switcher
      /*****************************/


      // match product description heights so buttons align
      $('.paragraph--text .boxes-field-description').matchHeight(
        {
          byRow: true
        }
      );
      $('.view--products-6-most-recent .view-content .views-field-field-product-description').matchHeight(
        {
          byRow: true
        }
      );



      // scroll effects
      $(window).scroll(function() {

      });


      // resize effects
      $(window).resize(function() {

          //

      });


      $(document).keyup(function(e) {

        // ESC key press
        if (e.keyCode == 27) {
          // close switcher on ESC
          language_switcher_close();
        }

      });


      // ajax complete
      $(document).ajaxComplete(function(e) {

        // not firing in all browsers

      });


      // add custom text to video button
      $(".paragraph--video video").once().on("loadstart", function () {
        var buttonText = $(this).attr('data-button-text');
        var oldText = $(this).parent().find('.vjs-big-play-button .vjs-control-text').text();
        $(this).parent().find('.vjs-big-play-button .vjs-control-text').text(buttonText);
      });


      $('.learn-more').once().on('click', function(e) {
        let data = {};
        data.event = 'productClick';
        data.product = {
          name: $(this).data('title'),
          id: $(this).data('id') || '',
          category: $(this).data('category') || '',
          variant: $(this).data('variant') || '',
        };
        window.dataLayer.push(data);
      });

      $('.body-footer .menu-item > a').once().on('click', function(e) {
        let data = {};
        data.event = 'navigationCTA';
        data.cta = {
          linkText: $(this).attr('title'),
          navigation: 'footerMenu'
        };
        window.dataLayer.push(data);
      });


      let formStarted = false;
      $('form input').on('focus', function() {
        if(formStarted === false) {
            window.dataLayer.push({
                'event': 'formStart',
                'contactForm': {
                    'formProgress': 'Form Started'
                }
            });
            formStarted = true;
          }
       });

      $('form').on('submit', function() {
          window.dataLayer.push({
              'event': 'formSubmitted',
              'contactForm': {
                  'formProgress': 'Form Submitted'
              }
          });
       });

      $('.see-all').once().on('click', function(e) {
        let data = {};
        data.event = 'seeAllCTA';
        window.dataLayer.push(data);
      });


		}
	};

})(jQuery, Drupal, window, document);




//*********************
// busting out of behaviours...
//*********************
(function ($, Drupal, window, document) {


  //*********************
  // start: video tracking
  //*********************

  $('video').on('play', function(e) {
    let data = {};
    data.event = 'videoPlay';
    data.videoDetails = {
      videoAction: 'start',
      videoTitle: $(this).data('title'),
      videoID: $(this).data('id') || '',
      videoLength: $(this).data('length') || '', // ms
    };
    window.dataLayer.push(data);
  });

  $('video').on('ended', function(e) {
    let data = {};
    data.event = 'videoComplete';
    data.videoDetails = {
      videoAction: 'complete',
      videoTitle: $(this).data('title'),
      videoID: $(this).data('id') || '',
      videoLength: $(this).data('length') || '', // ms
    };
    window.dataLayer.push(data);
  });

  //*********************
  // end: video tracking
  //*********************


})(jQuery, Drupal, window, document);





/*  create html elements so IE will display HTML5 properly  */
document.createElement('header');
document.createElement('section');
document.createElement('article');
document.createElement('footer');
document.createElement('nav');
document.createElement('main');
document.createElement('aside');
