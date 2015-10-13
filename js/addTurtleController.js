saveTheTurtlesApp.controller('addTurtleController', [ '$scope', 'saveTheTurtles', '$timeout', '$location',
  function ($scope, saveTheTurtles, $timeout, $location) {

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

  // Add turtle

  $scope.addTurtle = function (latitude, longitude, date) {
    if (latitude && longitude) {
      // Add turtle
      saveTheTurtles.postTurtleList({
          longitude: longitude,
          latitude: latitude,
          date: formatDate(date)
        }).then(function() {
        addAlert('success', 'Congratulations, you have successfully added a turtle!');
        $timeout(function () {
          $location.path('/turtles/')
        }, 2000);
      })
    } else {
      addAlert('warning', 'You should provide a localisation on the map.');
    }
  };

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  // Alerts

  $scope.alerts = [];

  function addAlert(type, message) {
    $scope.alerts.push({type: type, message: message});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

} ])
