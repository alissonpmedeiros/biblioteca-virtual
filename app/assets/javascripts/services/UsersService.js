angular.module('library').factory('UsersService', ['$resource', function($resource) {
    return $resource('/users.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'},
    })
}]).factory('UserSearchService', ['$resource', function($resource ) {
    return $resource('/search_users.json', {}, {
        'searchUsers': {method: 'GET', isArray: true, params: {keywords: '@searchTerm'}}
    })
}]).factory('UserService', ['$resource', function($resource) {
    return $resource('/users/:userId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT',    params: {userId: '@id'}},
        delete: {method: 'DELETE', params: {userId: '@id'}}
    });
}]);
