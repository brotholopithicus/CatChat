function mainController($scope, $http) {
    $http.get('/api/posts').then(function(response) {
        console.log(response.data);
        $scope.posts = response.data;
    }, function(error) {
        console.log(error);
    });
    $scope.bacon = 'Frying some bacon...';
    $scope.sidebarState = true;
    $scope.toggleState = function() {
        $scope.sidebarState = !$scope.sidebarState;
    }
    $http.get('https://baconipsum.com/api/?type=all-meat&sentences=4&start-with-lorem=1&format=text')
        .then(function(response) {
            $scope.bacon = response.data;
        }, function(error) {
            $scope.bacon = 'You have died of dysentary.'
        });
}

angular.module('catChat', [])
    .controller('MainController', mainController);
