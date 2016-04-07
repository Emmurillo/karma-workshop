(function() {
  'use strict';

  angular
    .module('musicHack.musicsearch')
    .config(setupRoutes);

  function setupRoutes($stateProvider) {

    $stateProvider
        .state('musicsearch', {
          url: '/musicsearch/:venuePath',
          templateUrl: 'app/musicsearch/view.html',
          controller: 'MusicSearchCtrl',
          controllerAs: 'vm',
          cache: false
        });
  }
})();
