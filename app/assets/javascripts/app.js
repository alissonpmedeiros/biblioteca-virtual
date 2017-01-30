
var controllers, library;

controllers = angular.module('controllers', []);

library = angular.module('library',
    [
        'ngCookies',
        'ipCookie',
        'ui.router',
        'templates',
        'ngRoute',
        'ngResource',
        'controllers',
        'ng-token-auth'

    ]
);

//routes

library.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('auth:logout-success', function() {
        $location.path('/');
    });
    $rootScope.$on('auth:registration-email-error', function(ev, reason) {
        alert("Falha ao registrar este email!");
    });

    $rootScope.$on('auth:login-success', function() {
        $location.path('/');
    });
    $rootScope.$on('auth:login-error', function() {
        alert("Email ou senha incorreta");
    });

}]);




library.config([
    '$routeProvider', function($routeProvider, $authProvider) {
        return $routeProvider.when('/', {           // HOME ROUTE
            templateUrl: "home/index.html",
            controller: "HomeController"
        }).when('/books', {                         // BOOKS ROUTES
            templateUrl: "book/index.html",
            controller:  "BooksController"
        }).when('/books/new', {
            templateUrl: "book/new.html",
            controller:  "BooksController"
        }).when('/books/:bookId', {
            templateUrl: "book/show.html",
            controller:  "BooksController"
        }).when('/books/:bookId/edit', {
            templateUrl: "book/edit.html",
            controller:  "BooksController"
        }).when('/authors', {                       //AUTHORS ROUTES
            templateUrl: "author/index.html",
            controller:  "AuthorsController"
        }).when('/authors/new', {
            templateUrl: "author/new.html",
            controller:  "AuthorsController"
        }).when('/authors/:authorId', {
            templateUrl: "author/show.html",
            controller:  "AuthorsController"
        }).when('/authors/:authorId/edit', {
            templateUrl: "author/edit.html",
            controller:  "AuthorsController"
        }).when('/categories', {                       //CATEGORIES ROUTES
            templateUrl: "category/index.html",
            controller:  "CategoriesController"
        }).when('/categories/new', {
            templateUrl: "category/new.html",
            controller:  "CategoriesController"
        }).when('/user_login', {                        // AUTHENTICATE USER
            templateUrl: "user_session/_login.html",
            controller:  "UsersSessionController"
        }).when('/admin_login', {                       // AUTHENTICATE ADMIN
            templateUrl: "user_session/_login.html",
            controller:  "UsersSessionController"
        }).when('/user_register', {
            templateUrl: "user_session/_register.html",
            controller:  "UsersSessionController"
        }).when('/user/loans', {                             // USERS
            templateUrl: "user/loans.html",
            controller:  "UsersController"
        }).when('/user/loans/:loanId', {
            templateUrl: "user/show_user_loans.html",
            controller:  "UsersController"
        }).when('/users', {
            templateUrl: "user/index.html",
            controller:  "UsersController"
        }).when('/register_address', {                  // REGISTER ADDRESS FOR
            templateUrl: "user_session/_register_address.html",
            controller:  "UsersSessionController"
        }).when('/loans', {                             // LOANS
            templateUrl: "loan/index.html",
            controller:  "LoansController"
        }).when('/loans/new', {
            templateUrl: "loan/new.html",
            controller:  "LoansController"
        }).when('/loans/receive_loan', {
            templateUrl: "loan/receive_loan.html",
            controller:  "LoansController"
        }).when('/loans/:loanId', {
            templateUrl: "loan/show.html",
            controller:  "LoansController"
        }).when('/fines', {                             // FINES
            templateUrl: "fine/index.html",
            controller:  "FinesController"
        }).when('/fines/:fineId', {
            templateUrl: "fine/show.html",
            controller:  "FinesController"
        }).otherwise({                                  //OTHERWISE ROUTE
            redirectTo: '/'
        });
    }
]);

