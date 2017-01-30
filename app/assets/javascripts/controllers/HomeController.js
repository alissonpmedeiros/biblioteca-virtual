var controllers;

controllers = angular.module('controllers');
controllers.controller('HomeController', [
    '$scope', '$location',
    function($scope, $location) {
        $scope.booksIndex = function() {
            return $location.path("/books/");
        }

        $scope.authorsIndex = function() {
            return $location.path("/users/");
        }
    }
]);