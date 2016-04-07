(function() {
  'use strict';

  angular
    .module('musicHack.register')
    .service('RegistrationService', RegistrationService);

  RegistrationService.$inject = ['$firebaseAuth', 'env', '$firebaseArray'];

  /* @ngInject */
  function RegistrationService($firebaseAuth, env, $firebaseArray) {
    this.createUser = createUser;
    this.createUserAdditionalInfo = createUserAdditionalInfo;
    this.authWithPassword = authWithPassword;

    var ref = new Firebase(env.firebaseApiUrl);
    var authProvider = $firebaseAuth(ref);

    function createUser(userInfo) {
      return authProvider.$createUser(userInfo);
    }

    function authWithPassword(credentials) {
      return authProvider.$authWithPassword(credentials);
    }

    var authProviderAdditional = ref.child('user');

    function createUserAdditionalInfo(userInfo) {
      var userID = userInfo.uid;
      var authProviderID = authProviderAdditional.child(userID);

      var userAdditionalInfo = userInfo.info;
      return authProviderID.set(userAdditionalInfo);
    }
  }
})();
