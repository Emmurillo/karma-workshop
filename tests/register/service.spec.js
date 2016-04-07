(function() {
  'use strict';

  describe('RegistrationService', function(){
    var RegistrationService;
    var $firebaseAuth;
    var env;
    var authProvider;

    beforeEach(module('musicHack.common'));
    beforeEach(module('musicHack.register'));

    beforeEach(module(function ($provide) {
      $provide.constant('env', {
        firebaseApiUrl: 'https://some_fake_url.firebaseio.com/'
      });
    }));

    beforeEach(module(function ($provide) {
      authProvider = { $createUser: function (userInfo) {} };
      $provide.value('$firebaseAuth', function (ref) {
        return authProvider
      });
    }));

    beforeEach(inject(function (_RegistrationService_, _$firebaseAuth_, _env_) {
      RegistrationService = _RegistrationService_;
      $firebaseAuth = _$firebaseAuth_;
      env = _env_;
    }));

    it("Should be initialized", function () {
      expect(RegistrationService).toBeDefined();
    });

    it("Should call firebase API when authenticating", function () {
      spyOn(authProvider, '$createUser');
      RegistrationService.createUser(null);
      expect(authProvider.$createUser).toHaveBeenCalled();
    });

  });

})();
