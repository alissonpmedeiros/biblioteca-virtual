var controllers;

controllers = angular.module('controllers');
controllers.controller("UsersController", [
    '$scope', '$routeParams', '$location', '$resource', 'UsersService', 'UserService', 'UserSearchService', 'LoansService', 'LoanService', 'BooksService', 'RequestBooksService',
    function($scope, $routeParams, $location, $resource, UsersService, UserService, UserSearchService, LoansService, LoanService, BooksService, RequestBooksService) {
        $scope.users = [];

        $scope.search = function(searchTerm) {
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.users = UserSearchService.searchUsers({keywords: searchTerm});
        }

        $scope.loadBooks = function() {
            $scope.booksForRequest = BooksService.query();
        }

        $scope.saveRequestBook = function() {
            $scope.request_book.user_id = $scope.user.id;
            RequestBooksService.create({request_book: $scope.request_book}, function() {
                $location.path('/');
            }, function(error){
                console.log(error);
            });
        }

        $scope.loadUsers  = function() {
            $scope.userss = UsersService.query();
            //console.log($scope.users);
        }

        $scope.showUserLoaned = function(loan) {
            $location.path('/user/loans/' + loan.id);
        }

        $scope.findUserLoaned = function() {
            $scope.userLoaned = LoanService.get({loanId: $routeParams.loanId});
        }

        if($routeParams.loanId){
            $scope.findUserLoaned();
        }

        $scope.loadUserLoans = function() {
            $scope.userLoans = LoansService.query();
        }

        $scope.deleteUser = function(userId) {
            if(confirm("Are you sure that you want destroy this User?")){
                UserService.delete({userId: userId}, function() {
                    $scope.loadUsers();
                    $location.path('/users');
                }, function(error){
                    console.log(error);
                });
            }
        }

        $scope.backUserLoans = function() {
            $location.path('/user/loans');
        }

        $scope.findUser = function() {
            $scope.user = UserService.get({userId: $routeParams.userId});
            //console.log($scope.author);
        }

        $scope.newRequestBook = function() {
            $location.path('/user/request_book');
        }


        if($routeParams.userId){
            $scope.findUser();
        }
    

    }
]);