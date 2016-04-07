(function() {
  'use strict';

  angular
    .module('musicHack')
    .run(setupIonic)
    .run(setupFacebook);

  function setupIonic($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins &&
          window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }

  setupFacebook.$inject = ['env'];

  function setupFacebook(env) {
    window.fbAsyncInit = function() {
      FB.init({
        appId: env.facebookAppID,
        xfbml: true,
        version: 'v2.5'
      });
    };

    (function(d, s, id) {
      var js = d.getElementsByTagName(s)[0];
      var fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
})();
