(function() {
  'use strict';

  angular
    .module('musicHack.locals')
    .controller('LocalsCtrl', LocalsCtrl);

  LocalsCtrl.$inject = ['FetchLocalsService', '$ionicPopup', '$state'];

  /* @ngInject */
  function LocalsCtrl(FetchLocalsService, $ionicPopup, $state) {
    var vm = this;
    vm.locals = [];

    vm.goToLocal = goToLocal;

    activate();

    function activate() {
      FetchLocalsService.fetchLocals()
        .then(handleLocalsFetch)
        .catch(handleFetchError);
    }

    function handleLocalsFetch(data) {
      vm.locals = data;
    }

    function goToLocal(localInfo) {
      $state.go('local', {localID: localInfo.$id});
    }

    function handleFetchError() {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Ha ocurrido un error al obtener tus locales'
      });
    }

  }
})();
