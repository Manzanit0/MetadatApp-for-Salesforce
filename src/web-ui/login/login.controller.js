
angular.module('Authentication', [])
  .controller('loginController', function($scope, $http, $window, AuthenticationService) {

    const controller = this;
    
    // Reset login status.
    AuthenticationService.ClearCredentials();

    controller.login = function () {
        // Set Auth header.
        AuthenticationService.SetCredentials(controller.username, controller.password);

        // Try to login.
        AuthenticationService.Login(controller.username, controller.password)
            .then(response => {
                console.log(response);
                if(response.status == 200) {
                    // Redirects to the main dashboard page.
                    $window.location.href = '/panel';
                }
                else if(response.status == 204) {
                     // Displays red message.
                    $scope.$apply(() => {
                        controller.unauthorized = true;
                    });
                }
            })
            .catch(error => {
                controller.dataLoading = false;
                console.log(error);
                //TODO: display error - reuse unauthorized error (make it dynamic).
        });
    };

  });