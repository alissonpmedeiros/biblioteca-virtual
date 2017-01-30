var controllers;

controllers = angular.module('controllers');
controllers.controller("LoansController", [
    '$scope', '$routeParams', '$location', '$resource', 'LoansService', 'LoanService','LoansSearchService', 'UsersService', 'UserService', 'BooksService', 'BookService', '$window', '$filter', 'FinesService', 'RequestBooksService',
    function($scope, $routeParams, $location, $resource, LoansService, LoanService, LoansSearchService, UsersService, UserService, BooksService, BookService, $window, $filter, FinesService, RequestBooksService) {


        $scope.searchLoan = function(searchTerm) {
            $scope.loans= [];
            $scope.loading = true;
            if (searchTerm.length < 3) {
                return;
            }
            $scope.loans = LoansSearchService.searchLoan({keywords: searchTerm});
        }

        $scope.loadLoans = function() {
            $scope.loans = [];
            $scope.loans = LoansService.query();
            //console.log($scope.loans);
        };

        $scope.findLoanUser = function(userId) {
            $scope.userLoanFind = UserService.get({userId: userId});
        }

        $scope.loadUsers = function() {
            $scope.users = [];
            $scope.users = UsersService.query();
            //console.log($scope.users);
        }

        $scope.loadBooks = function() {
            $scope.books = [];
            $scope.books = BooksService.query();
        }

        $scope.updateUserDestroyed = function() {
            UserService.update({userId: $scope.userDestroyed.id}, {user: $scope.userDestroyed}, function() {
            }, function(error){
                console.log(error);
            });
        }

        $scope.LoanHaveFine = function(loan) {
            var date = loan.created_at;

            newDate = new Date(date);
            currentDate = new Date();

            var timeDiff = Math.abs(currentDate.getTime() - newDate.getTime());
            var diffMinutes = Math.ceil(timeDiff / 60 / 1000 );


            console.log("Loan  Date   : " + newDate);
            console.log("Current Date: " + currentDate);
            console.log("Difference Minutes:" + diffMinutes);

            if(diffMinutes > 1){
                console.log("there is FINE!!");
                $scope.valueFine = (diffMinutes -1) * 0.5;
                return true;
            }
            else {
                console.log("there ISN'T fine!!");
                return false;
            }

        }





        $scope.deleteLoan = function(loanId){
            if(confirm("Are you sure that you want receive this Loan?")){
                $scope.userDestroyed  = $scope.loan.user;
                console.log("User Before Destroyed:");
                console.log($scope.userDestroyed);
                $scope.userDestroyed.number_loans -= 1;
                console.log("User After Destroyed:");
                console.log($scope.userDestroyed);
                $scope.updateUserDestroyed();
                $scope.findLoan = LoanService.get({loanId: loanId});
                console.log("FindLoan:");
                console.log($scope.findLoan);
                $scope.findLoan.$promise.then(function(data) {
                    console.log("data:");
                    console.log(data);
                    console.log("Book Before Destroyed:")
                    console.log(data.book);
                    data.book.quantity = data.book.quantity + 1;
                    console.log("Book After Destroyed:")
                    console.log(data.book);
                    BookService.update({bookId: data.book.id}, {book: data.book}, function() {
                    }, function(error){
                        console.log(error);
                    });
                    //********************************************
                    if($scope.LoanHaveFine(data)){
                        $scope.fine = $scope.loan;
                        $scope.fine.loan_id = data.id;
                        $scope.fine.value = $scope.valueFine;
                        console.log("FineLoan:");
                        console.log($scope.fine);
                        FinesService.create({fine: $scope.fine}, function() {
                            console.log("Fine Save Sucessfully");
                        }, function(error){
                            console.log(error);
                        });
                    }

                    data.loaned = false;
                    console.log("data before update");
                    console.log(data.loaned);

                    LoanService.update({loanId: loanId}, {loan: data}, function() {
                        console.log("loan update sucessfully!");
                        $location.path('/loans');
                        //$window.location.reload();
                    }, function(error){
                        console.log(error);
                    });

                });
            }
        };

        $scope.updateBook = function() {
            BookService.update({bookId: $scope.loan.book.id}, {book: $scope.loan.book}, function() {
            }, function(error){
                console.log(error);
            });
        }

        $scope.updateUser = function() {
            UserService.update({userId: $scope.userFindId}, {user: $scope.userFind}, function() {
            }, function(error){
                console.log(error);
            });
        }

        $scope.saveLoan = function() {
            $scope.userFind = UserService.get({userId: $scope.loan.user_id});

            $scope.valid;
            $scope.bookValid = true;
            $scope.userFind.$promise.then(function(data){
                console.log("USER LOANS: ");
                console.log(data);
                data.loans.forEach(function(loan, key) {
                    if(loan.book_id === $scope.loan.book.id && loan.loaned === true ){
                        $scope.bookValid = false;
                        return;
                    }
                });

                if(data.number_loans < 5 && $scope.loan.book.quantity > 0 && $scope.bookValid){
                    $scope.valid = true;
                    $scope.userFindId = data.id;

                }
                else {
                    $scope.valid = false;
                }
                if($scope.valid){
                    console.log("userFindLoans Before: " + data.number_loans);
                    data.number_loans = data.number_loans + 1;
                    console.log("userFindLoans After: " + data.number_loans);
                    console.log("book quantity before:" + $scope.loan.book.quantity );
                    $scope.loan.book.quantity -= 1;
                    console.log("book quantity after:" + $scope.loan.book.quantity );
                    console.log($scope.loan.book);

                    $scope.updateUser();
                    $scope.updateBook();

                    $scope.newLoanScope = $scope.loan;
                    $scope.newLoanScope.user_id = data.id;
                    $scope.newLoanScope.book_id = $scope.loan.book.id;
                    $scope.newLoanScope.admin_id = $scope.user.id;
                    console.log($scope.newLoanScope);

                    LoansService.create({loan: $scope.newLoanScope}, function() {
                        $location.path('/loans');
                    }, function(error){
                        console.log(error);
                    });


                }
                else if(data.number_loans === 5){
                    alert("This user have 5 loans and is permited just 5 loans per user!");
                }
                else if(!$scope.bookValid)
                    alert("This user has already borrowed the selected book!");
                else {
                    alert("There isn't no other books for loaned");
                }
            });

        };

        $scope.findLoan = function() {
            $scope.loan = LoanService.get({loanId: $routeParams.loanId});
            console.log($scope.loan);
        }

        $scope.updateLoan = function() {
            LoanService.update({loanId: $scope.loan.id}, {loan: $scope.loan}, function() {
                $location.path('/loans');
            }, function(error){
                console.log(error);
            });
        }


        // LINKS
        $scope.newLoan = function() {
            $location.path('/loans/new');

        }

        $scope.receiveLoan = function() {
            $location.path("/loans/receive_loan")
        }

        $scope.showLoan = function(loanId) {
            $location.path('/loans/' + loanId);
        }

        $scope.editLoan = function(loanId) {
            $location.path('/loans/' + loanId + '/edit')
        }

        $scope.back = function() {
            $location.path('/loans/receive_loan');
        }

        $scope.backIndex = function() {
            $location.path('/loans');
        }

        if($routeParams.loanId){
            $scope.findLoan();
        }

        $scope.loadLoans();

    }
]);

