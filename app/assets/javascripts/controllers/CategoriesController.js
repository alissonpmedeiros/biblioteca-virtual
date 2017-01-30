var controllers;

controllers = angular.module('controllers');
controllers.controller("CategoriesController", [
    '$scope', '$routeParams', '$location', '$resource', 'CategoriesService', 'CategoryService',
    function($scope, $routeParams, $location, $resource, CategoriesService, CategoryService) {
        $scope.loadCategories = function(){
            $scope.categories = [];
            $scope.categories = CategoriesService.query();
        }



        $scope.saveCategory = function() {
            CategoriesService.create({category: $scope.category}, function() {
                $location.path('/categories');
            }, function(error){
                console.log(error);
            });
        }

        $scope.deleteCategory = function(categoryId){
            if(confirm("Are you sure that you want destroy this Category?")){
                CategoryService.delete({categoryId: categoryId}, function() {
                    $scope.loadCategories();
                    $location.path('/categories');
                }, function(error){
                    console.log(error);
                });
            }
        };

        // links
        $scope.back = function() {
            $location.path('/categories');
        }

        $scope.newCategory = function() {
            $location.path('/categories/new');
        }
    }
]);