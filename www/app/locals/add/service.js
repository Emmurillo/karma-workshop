(function() {
  'use strict';

  angular
  .module('musicHack.locals')
  .service('AddLocalService', AddLocalService);

  AddLocalService.$inject = ['$rootScope', 'env', '$firebaseArray'];

  /* @ngInject */
  function AddLocalService($rootScope, env, $firebaseArray) {
    this.createNewUserLocal = createNewUserLocal;

    var ref = new Firebase(env.firebaseApiUrl);
    var uid = $rootScope.authenticatedUser.uid;
    var refToLocals = ref.child('user/' + uid + '/locals');
    var locals = $firebaseArray(refToLocals);

    function createNewUserLocal(localInfo) {
      return locals.$add(localInfo);
    }
  }
})();
