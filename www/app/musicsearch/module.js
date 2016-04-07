(function() {
  'use strict';

  angular
    .module('musicHack.musicsearch', [
      'musicHack.common'
    ])
    .config(setupHeaders);

  setupHeaders.$inject = ['$httpProvider'];

  function setupHeaders($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
})();
