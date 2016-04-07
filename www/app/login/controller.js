(function() {
  'use strict';

  angular
    .module('musicHack.login')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$rootScope', 'AuthService',
                       '$state', '$ionicPopup', '$localStorage'];

  /* @ngInject */
  function LoginCtrl($rootScope, AuthService,
                     $state, $ionicPopup, $localStorage) {
    var vm = this;

    vm.user = {};

    vm.authenticate = authenticate;
    vm.authWithFacebook = authWithFacebook;

    function authenticate() {
      AuthService.authWithPassword(vm.user)
        .then(handleAuthSuccess)
        .catch(handleAuthError);
    }

    function authWithFacebook() {
      AuthService.authWithFacebook()
        .then(handleFacebookAuthSuccess)
        .catch(handleAuthError);
    }

    function handleFacebookAuthSuccess(authData) {
      $ionicPopup.alert({
        title: 'Bienvenido',
        template: 'Ha iniciado sesión como ' + authData.facebook.displayName
      });
      vm.user = {};
      $state.go('menu.home');
    }

    function handleAuthSuccess(authData) {
      saveAuthData(authData);
      $ionicPopup.alert({
        title: 'Bienvenido',
        template: 'Ha iniciado sesión como ' + authData.password.email
      });
      vm.user = {};
      $state.go('menu.home');
    }

    function saveAuthData(authData) {
      $localStorage.uid = authData.uid;
      $localStorage.provider = authData.provider;
      $localStorage.accessToken = authData.token;
      $localStorage.email = authData.password.email;
      $localStorage.profileImageURL = authData.password.profileImageURL;
      $rootScope.authenticatedUser = authData;
    }

    function handleAuthError(error) {
      $ionicPopup.alert({
        title: 'Error de Autentificación',
        template: 'La contraseña o el usuario ingresados no son correctos'
      });
    }
  }
})();
