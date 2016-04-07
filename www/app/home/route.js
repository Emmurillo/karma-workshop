(function() {
  'use strict';

  angular
    .module('musicHack.home')
    .config(setupRoutes);

  function setupRoutes($stateProvider) {

    $stateProvider
        .state('menu.home', {
          url: '/home',
          views: {
            'menuContent': {
              templateUrl: 'app/home/view.html',
              controller: 'HomeCtrl',
              controllerAs: 'vm'
            }
          }
        });
  }
})();
