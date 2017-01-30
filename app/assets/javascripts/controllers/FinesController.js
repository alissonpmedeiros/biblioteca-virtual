var controllers;

controllers = angular.module('controllers');
controllers.controller("FinesController", [
    '$scope', '$routeParams', '$location', '$resource', 'FinesService', 'FineService', 'BookService', 'UserService',
    function($scope, $routeParams, $location, $resource, FinesService, FineService, BookService, UserService) {
        $scope.openPdf = function(fine) {
            var value = fine.value.toString();
            var fineId = fine.id.toString();
            var fineCreated = fine.created_at.toString();
            var fineLoanCreated = fine.loan.created_at.toString();
            var fineLoanId = fine.loan_id.toString();
            var fineAdmin = fine.loan.admin.email.toString();
            var fineUser = fine.loan.user.email.toString();
            var fineBook = fine.loan.book.title.toString();

            var docDefinition = {
                content: [
                    {
                        text: '.......................................................................................................................................................................'
                    },
                    {
                        text: '\n\nMulta emitida em nome do senhor(a) ' + fineUser + '\n\n', style: 'header'
                    },
                    {
                        style: 'demoTable',
                        table: {
                            widths: ['*', '*', '*', '*'],
                            body: [
                                [{text: 'Identificador', style: 'header'}, {text: 'Responsável', style: 'header'},
                                    {text: 'Valor', style: 'header'}, {text: 'Livro', style: 'header'}
                                ],
                                [fineId, fineAdmin, value, fineBook]
                            ]
                        }
                    },
                    {
                        text: '\n\n',
                        text: '.......................................................................................................................................................................'
                    }
                ],
                styles: {
                    header: {
                        bold: true,
                        color: '#000',
                        fontSize: 13
                    },
                    demoTable: {
                        color: '#666',
                        fontSize: 12
                    }
                }
            };
            pdfMake.createPdf(docDefinition).open();
        };


        $scope.loadFines = function(){
            $scope.fines = [];
            $scope.fines = FinesService.query();
        }

        $scope.findFine = function() {
            $scope.fine = FineService.get({fineId: $routeParams.fineId});
            $scope.fine.$promise.then(function(data) {
                $scope.userFind = UserService.get({userId: data.loan.user_id});
                $scope.adminFind = UserService.get({userId: data.loan.admin_id});
                $scope.bookFind = BookService.get({bookId: data.loan.book_id});

            });
        }

        $scope.showFine = function(fineId) {
            $location.path('/fines/' + fineId);
        }

        // links
        $scope.back = function() {
            $location.path('/fines');
        }


        if($routeParams.fineId){
            $scope.findFine();
        }

    }
]);