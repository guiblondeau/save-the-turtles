saveTheTurtlesApp.controller('turtlesController', [ '$scope', 'SaveTheTurtlesClientResource', function ($scope, SaveTheTurtlesClientResource) {

  var saveTheTurtlesClientResource = new SaveTheTurtlesClientResource();

  function initController() {
    saveTheTurtlesClientResource.getTurtleList().then(function(turtles) {
      $scope.markers = turtles;
    })
  }

  initController();

  // Init Google Map
  $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };

} ])
