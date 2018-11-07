(function ($, Drupal) {
  Drupal.behaviors.customCKEditorConfig = {
    attach: function (context, settings) {

      if (typeof CKEDITOR !== "undefined") {

        /* changes work but editor reverts if using scrollbar or switching to SOURCE
        //CKEDITOR.config.removePlugins = 'autoGrow';
        //CKEDITOR.config.autoGrow_onStartup = false;
        //CKEDITOR.config.height = 400;
        */

      }

    }
  }
})(jQuery, Drupal);
