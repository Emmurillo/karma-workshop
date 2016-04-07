module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'www/lib/ionic/js/ionic.bundle.min.js',
      'www/lib/angular-ui-router/release/angular-ui-router.min.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/ngstorage/ngStorage.min.js',
      'www/lib/angular-jwt/dist/angular-jwt.min.js',
      'www/lib/firebase/firebase.js',
      'www/lib/angularfire/dist/angularfire.min.js',
      'www/lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js',
      'www/lib/ng-password-strength/dist/scripts/ng-password-strength.js',
      'www/lib/ngCordova/dist/ng-cordova.js',
      'www/app/app.js',
      'www/app/*.js',
      'www/app/common/*.js',

      'www/app/**/module.js',
      'www/app/**/*.js',

      'tests/**/*.spec.js'
    ],
    preprocessors: {
      'www/app/**/*.js': ['coverage']
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
