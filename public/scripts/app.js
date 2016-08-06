function mainController($scope, $http) {
    $scope.displayInformation = function() {
        return {
            availableWidth: screen.availWidth,
            availableHeight: screen.availHeight,
            totalWidth: screen.width,
            totalHeight: screen.height,
            browserWidth: window.innerWidth,
            browserHeight: window.innerHeight
        }
    }
    $http.get('/api/posts').then(function(response) {
        console.log(response.data);
        $scope.posts = response.data;
    }, function(error) {
        console.log(error);
    });
    $scope.bacon = 'Frying some bacon...';
    $scope.sidebarState = false;
    $scope.toggleState = function() {
        if ($scope.displayInformation().browserWidth > 767) {
            $scope.sidebarState = !$scope.sidebarState;
        } else {
            $scope.sidebarState = false;
        }
    }
    console.log($scope.sidebarState);

    $http.get('https://baconipsum.com/api/?type=all-meat&sentences=4&start-with-lorem=1&format=text')
        .then(function(response) {
            $scope.bacon = response.data;
        }, function(error) {
            $scope.bacon = 'You have died of dysentary.'
        });
    $scope.tableActive = false;
    $scope.showTable = function() {
        $scope.tableActive = !$scope.tableActive;
    }
}

angular.module('catChat', [])
    .controller('MainController', mainController);
