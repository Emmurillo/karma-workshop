(function() {
  'use strict';

  angular
    .module('musicHack.menu')
    .config(setupRoutes);

  function setupRoutes($stateProvider) {

    $stateProvider
        .state('menu', {
          url: '/menu',
          abstract: true,
          templateUrl: 'app/menu/view.html',
          controller: 'MenuCtrl',
          controllerAs: 'vm'
        });
  }
})();
