saveTheTurtlesApp.controller('turtlesController', [ '$scope', function ($scope) {

  $scope.markers = [ {
    id: '0',
    latitude: 40.1451,
    longitude: -99.6680,
    date: '2015-07-23'
  }, {
    id: '1',
    latitude: 0,
    longitude: 0,
    date: '2015-07-23'
  }, {
    id: '2',
    latitude: -40,
    longitude: 40,
    date: '2015-07-23'
  } ];

  $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };

} ])
