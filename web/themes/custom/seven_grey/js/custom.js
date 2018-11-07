(function ($, Drupal, window, document) {
  Drupal.behaviors.customCKEditorConfig = {
    attach: function (context, settings) {

      if (typeof CKEDITOR !== "undefined") {

        /* changes work but editor reverts if using scrollbar or switching to SOURCE
        //CKEDITOR.config.removePlugins = 'autoGrow';
        //CKEDITOR.config.autoGrow_onStartup = false;
        //CKEDITOR.config.height = 400;
        */

      }


      // toggle click
      $('.view-filter .view-filter--title').once().click(function() {
        if( $(this).closest('.view-filter').hasClass('is-open') )  {
          react_filter_close();
        }
        else  {
          $(this).closest('.view-filter').addClass('is-open');
        }
      });

      function react_filter_close() {
        $('.view-filter').removeClass('is-open');
      }

      // toggle active
      $('.view-filter .view-filter--tag-options li').once().click(function() {
        $('.view-filter .view-filter--tag-options li').removeClass('active');
        $(this).addClass('active');
        var active_tag_name = $(this).text();
        console.log(active_tag_name);
        $(this).closest('.view-filter').find('.view-filter--title .active-tag').html(active_tag_name);
        react_filter_close();
      });


      $(document).keyup(function(e) {

        // ESC key press
        if (e.keyCode == 27) {
          // close switcher on ESC
          react_filter_close();
        }

      });


    }
  }
})(jQuery, Drupal, window, document);




//*********************
// busting out of behaviours...
//*********************
(function ($, Drupal, window, document) {

  //

})(jQuery, Drupal, window, document);
