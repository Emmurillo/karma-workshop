(function() {
  'use strict';

  angular
    .module('musicHack.menu')
    .controller('MenuCtrl', MenuCtrl);

  MenuCtrl.$inject = ['$rootScope', '$state', '$localStorage'];

  /* @ngInject */
  function MenuCtrl($rootScope, $state, $localStorage) {
    var vm = this;

    vm.logOut = logOut;

    function logOut() {
      delete $rootScope.authenticatedUser;
      $localStorage.$reset();
      $state.go('login');
    }
  }
})();
