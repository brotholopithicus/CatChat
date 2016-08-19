function mainController($scope, $http, orderByFilter) {
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
    $http.get('/api/posts')
        .then(function(response) {
            $scope.posts = response.data;
            console.log($scope.posts);
        }, function(error) {
            $scope.posts = ['You Have Died Of Dysentary.'];
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

    // POST SORTING
    $scope.propertyName = 'updated';
    $scope.reverse = false;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    }

    // POST VOTING
    $scope.hasVoted = false;
    $scope.upvote = function(post) {
        if (!$scope.hasVoted) {
            $scope.hasVoted = true;
            return post.upvotes += 1;
        } else {
            $scope.hasVoted = false
            return post.upvotes -= 1;
        }
    }
    $scope.timeSinceSubmit = function(post) {
        var ms_hr = 2.777777777777778e-7;
        var updated = new Date(post.updated);
        var now = new Date()
        var elapsed = now.getTime() - updated.getTime();
        var hours = elapsed * ms_hr;
        return hours;
    }
    $scope.downvote = function(post) {
        if (!$scope.hasVoted) {
            $scope.hasVoted = true;
            return post.upvotes -= 1;
        } else {
            $scope.hasVoted = false;
            return post.upvotes += 1;
        }
    }
}

angular.module('catChat', [])
    .controller('MainController', mainController);
