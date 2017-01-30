var controllers;

controllers = angular.module('controllers');
controllers.controller("NavController", ['$scope', '$location',
    function($scope, $location) {

        // LINKS
        $scope.index = function(){
            $location.path('/');
        }
        $scope.authors = function(){
            $location.path('/authors');
        }
        $scope.books = function(){
            $location.path('/books');
        }
        $scope.categories = function(){
            $location.path('/categories');
        }
        $scope.userLoans = function() {
            $location.path('/user/loans');
        }
    }
]);
