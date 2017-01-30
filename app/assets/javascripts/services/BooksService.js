angular.module('library').factory('BooksService', ['$resource', function($resource) {
    return $resource('/books.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'}
    })
}]).factory('BookSearchService', ['$resource', function($resource) {
    return $resource('search_books.json', {}, {
        'searchBook': {method: 'GET', isArray: true, params: {keywords: '@searchTerm'}}
    })
}]).factory('BookService', ['$resource', function($resource){
    return $resource('/books/:bookId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT', params: {bookId: '@id'}},
        delete: {method: 'DELETE', params: {bookId: '@id'}}
    });
}]);

