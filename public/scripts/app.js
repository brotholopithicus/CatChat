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
    $scope.posts = [{
        title: 'Sandwiches Are Chill',
        author: 'James',
        upvotes: 18,
        views: 93,
        comments: [0, 1, 4, 5]
    }, {
        title: 'Silks Are Soft',
        author: 'Matt',
        upvotes: 8,
        views: 3,
        comments: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    }, {
        title: 'Coins Are Shiny',
        author: 'Zach',
        upvotes: 11,
        views: 45,
        comments: [0]
    }, {
        title: 'Waters Are Wet',
        author: 'Andrew',
        upvotes: 2,
        views: 12,
        comments: [0, 3, 4, 5]
    }, {
        title: 'Florida Are Dingleberry',
        author: 'Gregory',
        upvotes: 4,
        views: 123,
        comments: [0, 1, 2, 3, 4, 5]
    }];
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
    $scope.propertyName = 'author';
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
