angular.module('library').factory('FinesService', ['$resource', function($resource) {
    return $resource('/fines.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'}
    })
}]).factory('FineService', ['$resource', function($resource) {
    return $resource('/fines/:fineId.json', {}, {
        show:   {method: 'GET'},
        update: {method: 'PUT',    params: {fineId: '@id'}},
        delete: {method: 'DELETE', params: {fineId: '@id'}}
    });
}]);
