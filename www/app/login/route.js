(function() {
  'use strict';

  angular
    .module('musicHack.login')
    .config(setupRoutes);

  function setupRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/login/view.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
        });

    $urlRouterProvider.otherwise('/login');

  }
})();
