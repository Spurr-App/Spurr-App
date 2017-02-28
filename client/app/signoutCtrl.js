angular.module('Signout-Ctrl', [])

.controller('SignoutController', function ($scope, $window, $location, Auth) {
        // $window.localStorage.clear();
        $window.localStorage.removeItem('com.spurr');
        // $location.path('/signin');
});
