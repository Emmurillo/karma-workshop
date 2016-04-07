(function() {
  'use strict';

  angular
  .module('musicHack.qrscanner')
  .config(setupRoutes);

  function setupRoutes($stateProvider) {

    $stateProvider
    .state('menu.qrscanner', {
      url: '/qrscanner',
      views: {
        'menuContent': {
          templateUrl: 'app/qrscanner/view.html',
          controller: 'qrScannerCtrl',
          controllerAs: 'vm'
        }
      }
    });
  }
})();
