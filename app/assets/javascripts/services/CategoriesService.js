angular.module('library').factory('CategoriesService', ['$resource', function($resource) {
    return $resource('/categories.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'}
    })
}]).factory('CategoryService', ['$resource', function($resource) {
    return $resource('/categories/:categoryId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT',    params: {categoryId: '@id'}},
        delete: {method: 'DELETE', params: {categoryId: '@id'}}
    })
}]);