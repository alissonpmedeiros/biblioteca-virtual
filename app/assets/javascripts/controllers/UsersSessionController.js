var controllers;

controllers = angular.module('controllers');
controllers.controller("UsersSessionController", [
    '$scope', '$routeParams', '$location', '$resource', 'UserService', 'StatesService', '$rootScope', 'AddressesService', '$window',
    function($scope, $routeParams, $location, $resource, UserService, StatesService, $rootScope, AddressesService, $window) {
        $scope.states = [];
        $scope.updateCurrentUser = function() {
            UserService.update({userId: $scope.user.id}, {user: $scope.user}, function() {
            }, function(error) {
                console.log(error);
            });
        }

        $scope.loadStates = function() {
            $scope.states = StatesService.query();
        }

        $scope.registerAddress = function() {
            $scope.address.user_id = $scope.user.id;
            $scope.user.address_registrable = true;
            $scope.updateCurrentUser();
            AddressesService.create({address: $scope.address}, function() {
                $location.path('/');
                //$window.location.reload();
            }, function(error){
                console.log(error);
            });
        };
        $rootScope.$on('auth:registration-email-success', function(ev, message) {
            //$window.location.reload();
            alert("registration email successfully!");
            $location.path('/');
            //$window.location.reload();
            $location.path('/');
        });
        
        $rootScope.$on('auth:login-error', function() {
            alert("Email ou senha incorreta");
        });


        $rootScope.$on('auth:registration-email-error', function(ev, reason) {
            alert("Registration failed: " + reason.errors[0]);
        });

        $rootScope.$on('auth:login-success', function() {
            $location.path('/');
            alert("Login Sucess!");
            //$window.location.reload();
        });

    }
]);