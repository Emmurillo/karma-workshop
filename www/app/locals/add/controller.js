(function() {
  'use strict';

  angular
  .module('musicHack.locals')
  .controller('AddLocalCtrl', AddLocalCtrl);

  AddLocalCtrl.$inject = ['AddLocalService', '$ionicPopup', '$state'];

  /* @ngInject */
  function AddLocalCtrl(AddLocalService, $ionicPopup, $state) {
    var vm = this;
    vm.localInfo = {};

    vm.registerLocal = registerLocal;

    function registerLocal() {
      vm.localInfo.available = false;
      AddLocalService.createNewUserLocal(vm.localInfo)
        .then(handleLocalSaved)
        .catch(handleSavingLocalError);
    }

    function handleLocalSaved() {
      $ionicPopup.alert({
        title: '¡Muy bien!',
        template: 'Guardaste el local ' + vm.localInfo.name
      });
      vm.localInfo = {};
      $state.go('menu.locals');
    }

    function handleSavingLocalError() {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Ha ocurrido un error al intentar guardar el local'
      });
    }
  }
})();
