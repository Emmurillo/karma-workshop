(function() {
  'use strict';

  angular
    .module('musicHack.login')
    .service('AuthService', AuthService);

  AuthService.$inject = ['$firebaseAuth', 'env', '$localStorage', 'jwtHelper'];

  /* @ngInject */
  function AuthService($firebaseAuth, env, $localStorage, jwtHelper) {
    this.isAuthenticated = isAuthenticated;
    this.authWithPassword = authWithPassword;
    this.authWithFacebook = authWithFacebook;

    var ref = new Firebase(env.firebaseApiUrl);
    var authProvider = $firebaseAuth(ref);

    function isAuthenticated() {
      var token = $localStorage.accessToken;
      if (!token) {
        return false;
      }else {
        return !jwtHelper.isTokenExpired(token);
      }
    }

    function authWithPassword(credentials) {
      return authProvider.$authWithPassword(credentials);
    }

    function authWithFacebook() {
      return authProvider.$authWithOAuthPopup('facebook');
    }
  }
})();
