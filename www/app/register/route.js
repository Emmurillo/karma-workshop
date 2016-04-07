(function() {
  'use strict';

  angular
    .module('musicHack.register')
    .config(setupRoutes);

  function setupRoutes($stateProvider) {

    $stateProvider
        .state('register', {
          url: '/register',
          templateUrl: 'app/register/view.html',
          controller: 'RegisterCtrl',
          controllerAs: 'vm'
        });

  }
})();
