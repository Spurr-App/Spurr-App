const router = function ($routeProvider) {
  $routeProvider
    .when('/test', {
      templateUrl: '../views/test.html',
      // controller: '',
    })
    .when('/secrets', {
      templateUrl: '../views/secrets.html',
      // controller: '',
    })
    .when('/confess', {
      templateUrl: '../views/confess.html',
      controller: 'confessCtrl',
    })
    .otherwise({
      redirectTo: '/test',
    });
};

angular.module('Spurr', [
  'Spurr-Ctrl',
  'Spurr-Fact',
  'Confess-Ctrl',
  'Confess-Fact',
  'ngRoute',
  'ngMessages',
])
.config(router);
