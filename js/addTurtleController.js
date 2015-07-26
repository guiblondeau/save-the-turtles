saveTheTurtlesApp.controller('addTurtleController', [ '$scope', function ($scope) {

  // Map

  $scope.clickedMarker = {
    id: 0,
    options: {
    }
  };

  function click (mapModel, eventName, originalEventArgs) {
    var e = originalEventArgs[ 0 ];
    var latitude = e.latLng.lat();
    var longitude = e.latLng.lng();
    $scope.clickedMarker = {
      id: 0,
      coords: {
        latitude: latitude,
        longitude: longitude
      },
      options: {
        labelContent: 'Latitude: ' + latitude + '<br/> Longitude: ' + longitude,
        labelClass: "marker-labels",
        labelAnchor: "50 0"
      }
    };
    $scope.$apply();
  };

  $scope.map = {
    center: { latitude: 0, longitude: 0 },
    zoom: 1,
    events: {
      click: click
    }
  };

  // Datepicker

  $scope.dateFormat = 'yyyy-MM-dd';

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.date = new Date();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  //
} ])
