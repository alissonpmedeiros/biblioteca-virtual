angular.module('library').factory('StatesService', ['$resource', function($resource) {
    return $resource('/states.json', {}, {
        query:  {method: 'GET', isArray: true}
    })
}]);