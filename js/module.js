angular.module('restlet.saveTheTurtles', [])

  .provider('saveTheTurtles', function () {
    'use strict';

    var endpoint = 'https://savetheturtles.apispark.net/v1';
    var defaultHeaders = {};
    var defaultQueryParameters = {};

    /**
     * Sets a new endpoint.
     *
     * @param newEndPoint - the endpoint to be set.
     */
    this.setEndpoint = function (newEndPoint) {
      endpoint = newEndPoint;
    };

    /**
     * Sets up the authentication to be performed through basic auth.
     *
     * @param username - the user's username
     * @param password - the user's password
     */
    this.setBasicAuth = function (username, password) {
      var digested = 'Basic ' + btoa(username + ':' + password);

      defaultHeaders.Authorization = digested;
    };

    /**
     * Sets up the authentication to be performed through API token.
     *
     * @param tokenName - the name of the query parameter or header based on the location parameter.
     * @param tokenValue - the value of the token.
     * @param location - the location of the token, either header or query.
     */
    this.setApiToken = function (tokenName, tokenValue, location) {
      if (angular.isUndefined(location)) {
        location = 'header';
      }

      if (location === 'query') {
        defaultQueryParameters[ tokenName ] = tokenValue;
      } else if (location === 'header') {
        defaultHeaders[ tokenName ] = tokenValue;
      } else {
        throw new Error('Unknown location: ' + location);
      }
    };

    this.$get = [ '$http', function ($http) {
      var saveTheTurtles = {};

      /**
       * Checks path variables
       */
      function checkPathVariables () {
        var errors = [];
        for (var i = 0; i < arguments.length; i += 2) {
          if (angular.isUndefined(arguments[ i ])) {
            errors.push(arguments[ i + 1 ]);
          }
        }

        if (errors.length > 0) {
          throw new Error('Missing required parameter: ' + errors.join(', '));
        }
      }

      /**
       * Sends a request to server.
       * @param methodName - The name of method: GET, POST, PUT, DELETE
       * @param url - url
       * @param body - body
       * @param config - Object describing the request to be made and how it should be processed.
       * @returns{HttpPromise} a promise object
       */
      function send (methodName, url, config, body) {
        config = config || {};

        return $http({
          method: methodName,
          url: url,
          params: angular.extend({}, defaultQueryParameters, config.params),
          data: body,
          headers: angular.extend({}, defaultHeaders, config.headers)
        });
      }

      /**
       * Loads the list of files for the folder css
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "list" : [ ]
         }
       */
      saveTheTurtles.getCssFolder = function (config) {
        var url = endpoint + '/css/';

        return send('GET', url, config);
      };

      /**
       * Returns a file for the folder css
       *
       * @param file - REQUIRED - File name
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         { }
       */
      saveTheTurtles.getCssFile = function (file, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/css/' + file + '';

        return send('GET', url, config);
      };

      /**
       * Stores a cssFileRepresentation
       *
       * @param file - REQUIRED - File name
       * @param body - the cssFileRepresentation payload with the following structure:
       *
       { }
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         { }
       */
      saveTheTurtles.putCssFile = function (file, body, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/css/' + file + '';

        return send('PUT', url, config, body);
      };

      /**
       * Deletes a cssFileRepresentation
       *
       * @param file - REQUIRED - File name
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       */
      saveTheTurtles.deleteCssFile = function (file, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/css/' + file + '';

        return send('DELETE', url, config);
      };

      /**
       * Loads the list of files for the folder fonts
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "list" : [ ]
         }
       */
      saveTheTurtles.getFontsFolder = function (config) {
        var url = endpoint + '/fonts/';

        return send('GET', url, config);
      };

      /**
       * Returns a file for the folder fonts
       *
       * @param file - REQUIRED - File name
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         { }
       */
      saveTheTurtles.getFontsFile = function (file, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/fonts/' + file + '';

        return send('GET', url, config);
      };

      /**
       * Stores a fontsFileRepresentation
       *
       * @param file - REQUIRED - File name
       * @param body - the fontsFileRepresentation payload with the following structure:
       *
       { }
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         { }
       */
      saveTheTurtles.putFontsFile = function (file, body, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/fonts/' + file + '';

        return send('PUT', url, config, body);
      };

      /**
       * Deletes a fontsFileRepresentation
       *
       * @param file - REQUIRED - File name
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       */
      saveTheTurtles.deleteFontsFile = function (file, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/fonts/' + file + '';

        return send('DELETE', url, config);
      };

      /**
       * Loads the list of files for the folder html
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "list" : [ ]
         }
       */
      saveTheTurtles.getHtmlFolder = function (config) {
        var url = endpoint + '/html/';

        return send('GET', url, config);
      };

      /**
       * Returns a file for the folder html
       *
       * @param file - REQUIRED - File name
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         { }
       */
      saveTheTurtles.getHtmlFile = function (file, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/html/' + file + '';

        return send('GET', url, config);
      };

      /**
       * Stores a htmlFileRepresentation
       *
       * @param file - REQUIRED - File name
       * @param body - the htmlFileRepresentation payload with the following structure:
       *
       { }
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         { }
       */
      saveTheTurtles.putHtmlFile = function (file, body, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/html/' + file + '';

        return send('PUT', url, config, body);
      };

      /**
       * Deletes a htmlFileRepresentation
       *
       * @param file - REQUIRED - File name
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       */
      saveTheTurtles.deleteHtmlFile = function (file, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/html/' + file + '';

        return send('DELETE', url, config);
      };

      /**
       * Loads the list of files for the folder js
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "list" : [ ]
         }
       */
      saveTheTurtles.getJsFolder = function (config) {
        var url = endpoint + '/js/';

        return send('GET', url, config);
      };

      /**
       * Returns a file for the folder js
       *
       * @param file - REQUIRED - File name
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         { }
       */
      saveTheTurtles.getJsFile = function (file, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/js/' + file + '';

        return send('GET', url, config);
      };

      /**
       * Stores a jsFileRepresentation
       *
       * @param file - REQUIRED - File name
       * @param body - the jsFileRepresentation payload with the following structure:
       *
       { }
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         { }
       */
      saveTheTurtles.putJsFile = function (file, body, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/js/' + file + '';

        return send('PUT', url, config, body);
      };

      /**
       * Deletes a jsFileRepresentation
       *
       * @param file - REQUIRED - File name
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       */
      saveTheTurtles.deleteJsFile = function (file, config) {
        checkPathVariables(file, 'file');

        var url = endpoint + '/js/' + file + '';

        return send('DELETE', url, config);
      };

      /**
       * Loads a list of Turtle
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       {
         "date" : "Allows to filter the collections of result by the value of field date",
         "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
         "longitude" : "Allows to filter the collections of result by the value of field longitude",
         "$size" : "Size of the page to retrieve. Integer value",
         "id" : "Allows to filter the collections of result by the value of field id",
         "$page" : "Number of the page to retrieve. Integer value.",
         "latitude" : "Allows to filter the collections of result by the value of field latitude"
       }
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
       [
         {
           "date" : "sample date",
           "id" : "sample id",
           "latitude" : "sample latitude",
           "longitude" : "sample longitude"
         }
       ]
       */
      saveTheTurtles.getTurtleList = function (config) {
        var url = endpoint + '/turtles/';

        return send('GET', url, config);
      };

      /**
       * Adds a Turtle
       *
       * @param body - the Turtle payload with the following structure:
       *
       {
         "date" : "sample date",
         "id" : "sample id",
         "latitude" : "sample latitude",
         "longitude" : "sample longitude"
       }
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "date" : "sample date",
           "id" : "sample id",
           "latitude" : "sample latitude",
           "longitude" : "sample longitude"
         }
       */
      saveTheTurtles.postTurtleList = function (body, config) {
        var url = endpoint + '/turtles/';

        return send('POST', url, config, body);
      };

      /**
       * Loads a Turtle
       *
       * @param turtleid - REQUIRED - Identifier of the Turtle
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "date" : "sample date",
           "id" : "sample id",
           "latitude" : "sample latitude",
           "longitude" : "sample longitude"
         }
       */
      saveTheTurtles.getTurtle = function (turtleid, config) {
        checkPathVariables(turtleid, 'turtleid');

        var url = endpoint + '/turtles/' + turtleid + '';

        return send('GET', url, config);
      };

      /**
       * Stores a Turtle
       *
       * @param turtleid - REQUIRED - Identifier of the Turtle
       * @param body - the Turtle payload with the following structure:
       *
       {
         "date" : "sample date",
         "id" : "sample id",
         "latitude" : "sample latitude",
         "longitude" : "sample longitude"
       }
       *
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       *   * Status code : 200 - Payload :
         {
           "date" : "sample date",
           "id" : "sample id",
           "latitude" : "sample latitude",
           "longitude" : "sample longitude"
         }
       */
      saveTheTurtles.putTurtle = function (turtleid, body, config) {
        checkPathVariables(turtleid, 'turtleid');

        var url = endpoint + '/turtles/' + turtleid + '';

        return send('PUT', url, config, body);
      };

      /**
       * Deletes a Turtle
       *
       * @param turtleid - REQUIRED - Identifier of the Turtle
       * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
       * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
       * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
       *
       * @throws will throw an error if a required parameter is not set
       *
       * @returns {HttpPromise} - a promise resolved with the response from the server.
       * In case of success (status in the 2XX range)
       */
      saveTheTurtles.deleteTurtle = function (turtleid, config) {
        checkPathVariables(turtleid, 'turtleid');

        var url = endpoint + '/turtles/' + turtleid + '';

        return send('DELETE', url, config);
      };

      return saveTheTurtles;
    } ];
  });