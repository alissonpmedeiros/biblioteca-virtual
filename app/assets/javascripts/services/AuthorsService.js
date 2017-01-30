angular.module('library').factory('AuthorsService', ['$resource', function($resource) {
    return $resource('/authors.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'}
    })
}]).factory('AuthorSearchService', ['$resource', function($resource ) {
    return $resource('/search_authors.json', {}, {
        'searchAuthors': {method: 'GET', isArray: true, params: {keywords: '@searchTerm'}}
    })
}]).factory('AuthorService', ['$resource', function($resource) {
    return $resource('/authors/:authorId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT',    params: {authorId: '@id'}},
        delete: {method: 'DELETE', params: {authorId: '@id'}}
    });
}]);
