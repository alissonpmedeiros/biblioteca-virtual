var controllers;

controllers = angular.module('controllers');
controllers.controller("BooksController", [
    '$scope', '$routeParams', '$location', '$resource', 'BooksService', 'BookService','BookSearchService', 'CategoriesService',
    function($scope, $routeParams, $location, $resource, BooksService, BookService,BookSearchService, CategoriesService) {



        $scope.searchBook = function(searchTerm) {
            $scope.books = [];
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.books = BookSearchService.searchBook({keywords: searchTerm});
        }

        $scope.loadBooks = function() {
          $scope.books = [];
          $scope.books = BooksService.query();
          //console.log($scope.books);
        };

        $scope.deleteBook = function(bookId){
            if(confirm("Are you sure that you want destroy this Book?")){
                BookService.delete({bookId: bookId}, function() {
                    $scope.loadBooks();
                    $location.path('/books');
                }, function(error){
                    console.log(error);
                });
            }
        };


        $scope.saveBook = function() {
          BooksService.create({book: $scope.book}, function() {
              $location.path('/books');
          }, function(error){
              console.log(error);
          });
        };

        $scope.findBook = function() {
            $scope.book = BookService.get({bookId: $routeParams.bookId});
            console.log($scope.book);
        }

        $scope.updateBook = function() {
            BookService.update({bookId: $scope.book.id}, {book: $scope.book}, function() {
                console.log($scope.book);
                $location.path('/books');
            }, function(error){
                console.log(error);
            });
        }


        $scope.loadCategories = function(){
            $scope.categories = [];
            $scope.categories = CategoriesService.query();
        }


        // LINKS
        $scope.newBook = function() {
            delete($scope.book);
            $location.path('/books/new');

        }

        $scope.showBook = function(bookId) {
            $location.path('/books/' + bookId);
        }

        $scope.editBook = function(bookId) {
            $location.path('/books/' + bookId + '/edit')
        }

        $scope.back = function() {
            $location.path('/books');
        };



        if($routeParams.bookId){
            $scope.findBook();
        }

        //$scope.loadBooks();


    }
]);