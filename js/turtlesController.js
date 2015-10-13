saveTheTurtlesApp.controller('turtlesController', [ '$scope', 'saveTheTurtles', function ($scope, saveTheTurtles) {

  function initController() {
    saveTheTurtles.getTurtleList().then(function(response) {
      $scope.markers = response.data;
    })
  }

  initController();

  // Init Google Map
  $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };

} ])
