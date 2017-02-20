const router = function ($routeProvider) {
  $routeProvider
    .when('/test', {
      templateUrl: './views/test.html',
      // controller: '',
    })
    .when('/secrets', {
      templateUrl: './views/secrets.html',
      // controller: '',
    });
};

angular.module('Spurr', [
  'Spurr-Ctrl',
  'Spurr-Fact',
  'ngRoute',
])
.config(router);
