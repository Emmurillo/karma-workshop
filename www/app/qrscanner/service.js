(function() {
  'use strict';

  angular
    .module('musicHack.qrscanner')
    .service('QRCodeService', QRCodeService);

  QRCodeService.$inject = ['env', '$firebaseObject'];

  /* @ngInject */
  function QRCodeService(env, $firebaseObject) {

    this.fetchLocalFromID = fetchLocalFromID;

    var ref = new Firebase(env.firebaseApiUrl);

    function fetchLocalFromID(localID) {
      var localRef = ref.child(localID);
      return $firebaseObject(localRef).$loaded();
    }

  }
})();
