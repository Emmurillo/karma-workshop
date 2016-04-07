(function() {
  'use strict';

  angular
    .module('musicHack.locals')
    .service('FetchLocalsService', FetchLocalsService);

  FetchLocalsService.$inject = ['$rootScope', 'env', '$firebaseArray'];

  /* @ngInject */
  function FetchLocalsService($rootScope, env, $firebaseArray) {
    this.fetchLocals = fetchLocals;

    var ref = new Firebase(env.firebaseApiUrl);
    var uid = $rootScope.authenticatedUser.uid;
    var refToLocals = ref.child('user/' + uid + '/locals');
    var locals = $firebaseArray(refToLocals);

    function fetchLocals() {
      return locals.$loaded();
    }
  }
})();
