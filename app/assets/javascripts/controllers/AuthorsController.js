var controllers;

controllers = angular.module('controllers');
controllers.controller("AuthorsController", [
    '$scope', '$routeParams', '$location', '$resource', 'AuthorsService', 'AuthorService','BooksService', 'AuthorSearchService',
    function($scope, $routeParams, $location, $resource, AuthorsService, AuthorService, BooksService, AuthorSearchService) {


        $scope.search = function(searchTerm) {
            $scope.authors = [];
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.authors = AuthorSearchService.searchAuthors({keywords: searchTerm});
        }



        $scope.loadAuthors  = function() {
            $scope.authors = [];
            $scope.authors = AuthorsService.query();

        }

        $scope.deleteAuthor = function(authorId) {
            if(confirm("Are you sure that you want destroy this Author?")){
                AuthorService.delete({authorId: authorId}, function() {
                    $scope.loadAuthors();
                    $location.path('/authors');
                }, function(error){
                    console.log(error);
                });
            }
        }

        $scope.saveAuthor = function(){
            //console.log("Saving:" + $scope.author);
            AuthorsService.create({author: $scope.author}, function() {
                $location.path('/authors');
            }, function(error){
                console.log(error);
            });
        }

        $scope.findAuthor = function() {
            $scope.author = AuthorService.get({authorId: $routeParams.authorId});
            //console.log($scope.author);
        }

        $scope.updateAuthor = function() {
            //console.log($scope.author);
            AuthorService.update({authorId: $scope.author.id}, {author: $scope.author}, function() {
                //console.log("Saved:" + $scope.author);
                $scope.showAuthor($scope.author.id);
            }, function(error) {
                console.log("Error:" + error);
            });
        }

        $scope.addBook = function() {
            $scope.loadBooks();
            console.log($scope.books);

            if($scope.author.books.length > 0){
                $scope.author.books.forEach(function(book, key) {
                    $scope.books.$promise.then(function(){
                        $scope.books.forEach(function(b, k) {
                            if(book.title === b.title){
                                $scope.books.splice(k, 1);
                            }
                        });
                    });
                });
            }

            $scope.showPanel = !$scope.showPanel;
        }

        $scope.pushBook = function() {
            $scope.author.books.push({title: $scope.book.title, isbn: $scope.book.isbn, quantity: $scope.book.quantity});
            $scope.addBook();
            $scope.showPanel = false;
        }

        $scope.loadBooks = function() {
            $scope.books = [];
            $scope.books = BooksService.query();
            //console.log($scope.books);
        }

        $scope.deleteAuthorBook = function(bookParams) {
            $scope.author.books.forEach(function(book, key) {
                if(book.title === bookParams.title){
                    $scope.author.books.splice(key, 1);
                }
            });
            $scope.updateAuthor();
        }

        $scope.authorsBooks = function() {
            $scope.showPanelAuthor = !$scope.showPanelAuthor;
        }




        // LINKS
        $scope.newAuthor = function() {
            $location.path('/authors/new');
        }

        $scope.showAuthor = function(authorId) {
            $location.path('/authors/' + authorId);
        }

        $scope.editAuthor = function(authorId) {
            $location.path('/authors/' + authorId + '/edit');
        }

        $scope.back = function() {
            $location.path('/authors');
        };

        if($routeParams.authorId){
            $scope.findAuthor();
        }



    }
]);