angular.module('library').factory('AddressesService', ['$resource', function($resource) {
    return $resource('/addresses.json', {}, {
        query:  {method: 'GET', isArray: true},
        create: {method: 'POST'}
    })
}])