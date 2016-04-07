(function() {
  describe('RegisterCtrl', function(){
    var $this;
    var RegistrationService;
    var AuthService;
    var $state;
    var $ionicPopup;
    var $localStorage;
    var $controller;
    var $q;

    beforeEach(module('musicHack.common'));
    beforeEach(module('musicHack.register'));

    beforeEach(module(function ($provide) {
      $provide.service('RegistrationService', function () {
        this.createUser = function (user) {};
      });
    }));

    beforeEach(module(function ($provide) {
      $provide.service('AuthService', function () {
        this.authWithPassword = function (user) {};
      });
    }));

    beforeEach(inject(function (_$controller_, _$q_, _RegistrationService_, _AuthService_, _$state_, _$ionicPopup_, _$localStorage_) {
      $q = _$q_;
      $controller = _$controller_;
      RegistrationService = _RegistrationService_;
      AuthService = _AuthService_;
      $state = _$state_;
      $ionicPopup = _$ionicPopup_;
      $localStorage = _$localStorage_;
    }));

    beforeEach(function () {
      $this = $controller('RegisterCtrl', {
        RegistrationService: RegistrationService,
        AuthService: AuthService,
        $state: $state,
        $ionicPopup: $ionicPopup,
        $localStorage: $localStorage
      });
    });

    it("Should be initialized", function () {
      expect($this).toBeDefined();
      expect($this.user.credentials).toEqual({});
      expect($this.user.info).toEqual({});
    });

    it("Should call auth service when creating account", function () {
      var deferredSuccess = $q.defer();
      spyOn(RegistrationService, 'createUser').and.returnValue(deferredSuccess.promise);
      $this.user.credentials = { email: 'foo', password: '12345678' };
      $this.createAccount();
      expect(RegistrationService.createUser).toHaveBeenCalled();
      expect(RegistrationService.createUser).toHaveBeenCalledWith($this.user.credentials);
      deferredSuccess.resolve();
    });

  });
})();
