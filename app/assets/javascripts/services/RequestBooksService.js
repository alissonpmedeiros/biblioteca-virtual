angular.module('library').factory('RequestBooksService', ['$resource', function($resource) {
    return $resource('/request_books.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'}
    })
}]).factory('RequestBookService', ['$resource', function($resource) {
    return $resource('/request_books/:requestBookId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT',    params: {requestBookId: '@id'}},
        delete: {method: 'DELETE', params: {requestBookId: '@id'}}
    });
}]);
