(function() {
  'use strict';

  describe('AuthService', function(){
    var AuthService;
    var $firebaseAuth;
    var env;
    var $localStorage;
    var jwtHelper;
    var $q;
    var authProvider;

    beforeEach(module('musicHack.common'));
    beforeEach(module('musicHack.login'));

    beforeEach(module(function ($provide) {
      $provide.constant('env', {
        firebaseApiUrl: 'https://mhdev.firebaseio.com/'
      });
    }));

    beforeEach(module(function ($provide) {
      authProvider = {
        $authWithPassword: function (credentials) {},
        $authWithOAuthPopup: function (provider) {}
      };
      $provide.value('$firebaseAuth', function (ref) {
        return authProvider
      });
    }));

    beforeEach(inject(function (_AuthService_, _$firebaseAuth_, _env_, _$localStorage_, _jwtHelper_, _$q_) {
      AuthService = _AuthService_;
      $firebaseAuth = _$firebaseAuth_;
      env = _env_;
      $localStorage = _$localStorage_;
      jwtHelper = _jwtHelper_;
      $q = _$q_;
    }));

    it("Should be initialized", function () {
      expect(AuthService).toBeDefined();
    });

    it("Should return un-authenticated when not access_token provided", function () {
      var authenticated = AuthService.isAuthenticated();
      expect(authenticated).toBeFalsy();
    });

    function getToken(tokenInfo) {
      return tokenInfo.join('.');
    }

    it("Should return non-authenticated for expired access token", function () {
      var token = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0',
      'yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw'];
      var access_token = getToken(token);
      $localStorage['access_token'] = access_token;
      var authenticated = AuthService.isAuthenticated();
      expect(authenticated).toBeFalsy();
    });

    it("Should return authenticated for non-expired access token", function () {
      var token = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9',
      'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'];
      var access_token = getToken(token);
      $localStorage['access_token'] = access_token;
      var authenticated = AuthService.isAuthenticated();
      expect(authenticated).toBeTruthy();
    });

    it("Should call firebase API when authenticating", function () {
      spyOn(authProvider, '$authWithPassword');
      AuthService.authWithPassword(null);
      expect(authProvider.$authWithPassword).toHaveBeenCalled();
    });

    it("Should call facebook auth API", function () {
      spyOn(authProvider, '$authWithOAuthPopup');
      AuthService.authWithFacebook('facebook');
      expect(authProvider.$authWithOAuthPopup).toHaveBeenCalled();
    });

    afterEach(function () {
      $localStorage.$reset();
    });

  });

})();
