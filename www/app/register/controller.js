(function() {
  'use strict';

  angular
  .module('musicHack.register')
  .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['RegistrationService', 'AuthService', '$state',
  '$ionicPopup', '$localStorage', '$rootScope'];

  /* @ngInject */
  function RegisterCtrl(RegistrationService, AuthService, $state,
    $ionicPopup, $localStorage, $rootScope) {

    var vm = this;
    vm.user = {
        uid: {},
        credentials: {},
        info: {}
      };

    vm.createAccount = createAccount;

    vm.isPasswordWeak = isPasswordWeak;
    vm.isPasswordMed = isPasswordMed;
    vm.isPasswordStrong = isPasswordStrong;

    function createAccount() {
        RegistrationService.createUser(vm.user.credentials)
        .then(handleCreationSuccess)
        .catch(handleCreationError);
      }

    function handleCreationSuccess() {
        AuthService.authWithPassword(vm.user.credentials)
        .then(handleAuthSuccess)
        .catch(handleCreationError);
      }

    function handleAuthSuccess(authData) {
        saveAuthData(authData);

        vm.user.uid = authData.uid;
        handleAdditionalUserInfo();

        $ionicPopup.alert({
          title: 'Bienvenido',
          template: 'Ahora podes ingresar como: ' + authData.password.email
        });
        vm.user = {};
        vm.passwordConfirm = null;
        $state.go('menu.qrscanner');
      }

    function saveAuthData(authData) {
        $localStorage.uid = authData.uid;
        $localStorage.provider = authData.provider;
        $localStorage.accessToken = authData.token;
        $localStorage.email = authData.password.email;
        $localStorage.profileImageURL = authData.password.profileImageURL;
        $rootScope.authenticatedUser = authData;
      }

    function handleAdditionalUserInfo() {
        vm.user.info.email = vm.user.credentials.email;
        RegistrationService.createUserAdditionalInfo(vm.user)
        .catch(handleCreationError);
      }

    function handleCreationError(error) {
        $ionicPopup.alert({
          title: 'Error',
          template: error
        });
      }

    function isPasswordWeak() {
        return vm.passwordStrength < 20;
      }

    function isPasswordMed() {
        return vm.passwordStrength > 19 && vm.passwordStrength < 50;
      }

    function isPasswordStrong() {
        return vm.passwordStrength > 49;
      }

    var months = ['Enero', 'Febrero', 'Marzo',
                  'Abril', 'Mayo', 'Junio',
                  'Julio', 'Agosto', 'Setiembre',
                  'Octubre', 'Noviembre', 'Diciembre'];
    var days = ['D', 'L', 'K', 'M', 'J', 'V', 'S'];
    vm.datePickerConfig = {
        titleLabel: 'Fecha de Nacimiento',
        todayLabel: 'Hoy',
        closeLabel: 'Cerrar',
        setLabel: 'Seleccionar',
        weekDaysList: days,
        monthList: months,
        mondayFirst: true,
        from: new Date(1900, 1, 1),
        to: new Date(),
        callback: function(selectedDate) {
          if (selectedDate) {
            vm.user.info.birthDay = selectedDate.toDateString();
          }
        },
        dateFormat: 'dd/MM/yyyy'
      };

  }
})();
