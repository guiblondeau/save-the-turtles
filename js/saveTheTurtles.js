var saveTheTurtlesApp = angular.module('saveTheTurtles', ['ngRoute', 'uiGmapgoogle-maps', 'ui.bootstrap']);

saveTheTurtlesApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/turtles/', {
      templateUrl : 'turtles.html',
      controller : 'turtlesController'
    }).when('/addTurtle/', {
      templateUrl : 'addTurtle.html',
      controller : 'addTurtleController'
    }).otherwise({
      redirectTo : '/turtles/'
    })
}]);

saveTheTurtlesApp.config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyB8LkC5E8QSRDiNHkoglPbGByDD8Ppg5Yo',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
}])