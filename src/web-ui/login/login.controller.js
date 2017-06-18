
angular.module('Authentication', [])
  .controller('loginController', function($http, $window, AuthenticationService) {

    const controller = this;

    controller.accessPanel = function() {
        
        // Configure Basic token (Base64 encoding).
        // $http.defaults.headers.common.Authorization = 'Basic ' + window.btoa(controller.username + ':' + controller.password);
        AuthenticationService.SetCredentials(controller.username, controller.password);

        $http.get('/users/' + controller.username)
            .then(function(data) {
                $window.location.href = '/panel';
                console.log(data);
            })
            .catch(function(data) {
                console.log($http.defaults.headers.common.Authorization);
                console.log('Error: ' + data);
        });
    };
    
  });