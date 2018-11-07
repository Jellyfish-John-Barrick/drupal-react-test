# Drupal React Test

Database:
src/db

Drupal login:
name - admin
pass - admin

React scripts: 
web/themes/custom/seven_grey/js/react

To see the demo you must be logged in. 
Configure Drupal to use the seven_grey theme as default. 
Log into Drupal, go to Appearance, find "Seven - Grey" then "install and set as default."

"Random" block on right updates every 10 seconds.
"Alpha" and "Recently Authored" blocks on right will update if you make appropriate changes, for example by adding a new node.

"Articles By Tag" block on left updates when you choose a tag by which to filter.

###

# Setup Your Own React Stuff

1. install drupal (or use https://github.com/Jellyfish-John-Barrick/drupal-react-test)
2. enable modules	
   * HAL
   * HTTP Basic Authentication
   * RESTful Web Services
   * Serialization
3. add Views as needed to display data
   * display type for each View Display should be "REST export"
   * you'll get a View error until you add a path setting to each REST display. Use something like "/api/[view-machine-name]/[unique-display-name]", e.g. "/api/articles/by-tag". You will fetch this URL from a React script
   * "format: settings" should have "json" checked for Accepted Request Formats
   * if content will update quickly, block caching should be set to "none" since, at default setting, content returned will not update until Cache has been cleared
   * by default, REST export will supply entity data. If you want better field control, change "format: show" from Entity to Fields then choose the fields you want displayed.
   * confirm your display has data by checking the Preview
4. add scripts to theme
   * <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
   * <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
   * <script crossorigin src="https://unpkg.com/axios/dist/axios.min.js"></script>
   * <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>
5. add <div> to theme with unique ID. The React script will display here. You can add this <div> wherever it makes sense; in page.twig or in a block twig, etc.
6. add one React script per <div>. See John Barrick for example script. I'm new to React so I don't have any idea about best practices... When u begin editing your script, first thing is change the source and "document.getElelmentById" at bottom