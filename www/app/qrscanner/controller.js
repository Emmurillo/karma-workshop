(function() {
  'use strict';

  angular
    .module('musicHack.qrscanner')
    .controller('qrScannerCtrl', qrscannerCtrl);

  qrscannerCtrl.$inject = ['QRCodeService', '$cordovaBarcodeScanner',
                          '$ionicPopup', '$state'];

  /* @ngInject */
  function qrscannerCtrl(QRCodeService, $cordovaBarcodeScanner,
                        $ionicPopup, $state) {
    var vm = this;

    vm.scan = scan;
    vm.handleIDInputSuccess = handleIDInputSuccess;

    var venueFirebasePath;

    function scan() {
      $cordovaBarcodeScanner
        .scan()
        .then(handleScanSuccess)
        .catch(handleScanError);
    }

    function handleScanSuccess(qrcodeData) {
      venueFirebasePath = qrcodeData.text;
      if (!qrcodeData.cancelled) {
        retrieveDataFromLocalID(venueFirebasePath);
      }
    }

    function handleIDInputSuccess(localID) {
      venueFirebasePath = localID;
      retrieveDataFromLocalID(localID);
    }

    function retrieveDataFromLocalID(fetchedID) {
      QRCodeService.fetchLocalFromID(fetchedID)
        .then(handleFetchDataSuccess);
    }

    function handleFetchDataSuccess(fetchedData) {
      if (fetchedData.name) {
        $ionicPopup.alert({
          title: '¡Muy Bien!',
          template: 'Has ingresado a ' + fetchedData.name
        });
        $state.go('musicsearch', {venuePath: venueFirebasePath});
      }else {
        raiseNotFoundError();
      }
    }

    function handleScanError(error) {
      $ionicPopup.alert({
        title: '¡Hubo un problema!',
        template: 'Hubo un error al leer el código QR'
      });
    }

    function raiseNotFoundError() {
      $ionicPopup.alert({
        title: '¡Hubo un problema!',
        template: 'El restaurante no está activo en Music Hack'
      });
    }

  }

})();
