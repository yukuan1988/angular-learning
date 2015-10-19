(function() {
  var app = angular.module('policyApp', [ 'ngRoute' ]);
  app.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl : 'policylist.html',
      controller : 'PolicyListController'
    }).when('/createPolicy', {
      templateUrl : 'createpolicy.html',
      controller : 'PolicyCreateController'
    }).when('/editPolicy', {
      templateUrl : 'createpolicy.html',
      controller : 'PolicyCreateController'
    }).otherwise({
      redirectTo : '/'
    });
  } ]);

  // app.factory('PolicyService', function($http) {
  // var id = Math.random();
  // var service = {};
  // console.log(this);
  // service.listPolicy = function() {
  // return $http.get('resource/policies.json').then(function(result) {
  // // resolve the promise as the data
  // return result.data;
  // });
  // }
  // return service;
  // });

  app.provider('PolicyService', [function() {
    this.$get = function($http) {
      return {
        listPolicy : function() {
          return $http.get('resource/policies.json').then(function(result) {
            // resolve the promise as the data
            return result.data;
          });
        },
      };
    }
  }]);

  // app.service('PolicyService', function($http) {
  // this.listPolicy = function() {
  // return $http.get('resource/policies.json').then(function(result) {
  // // resolve the promise as the data
  // return result.data;
  // });
  // };
  //
  // });

  app.controller('PolicyListController', function($scope, $http, PolicyService) {
//    $scope.search = 'components/search.html';
    $scope.filterBy = {
      status : {
        deactivated : true,
        deployed : true,
        draft : true
      }
    };
    PolicyService.listPolicy().then(function(policyList) {
      $scope.policyList = policyList;
    });
    $scope.byStatus = function() {
      return function(policy) {
        return $scope.filterBy.status[policy.status];
      }
    };
    $scope.deletePolicy = function(index) {
      if (confirm('Are you sure to delete this policy? This can not be undone!')) {
        $scope.policyList.splice(index, 1);
      }
    };

    $scope.editPolicy = function(policy) {
      $scope.policy = policy;
      $scope.editting = true;
    };

  });

  app.controller('PolicyCreateController', function($scope) {
    // Initialization
    $scope.editting = false;

    $scope.clearForm = function() {
      $scope.policy = {
        subject : null,
        resource : null,
        action : null,
        ad : null,
        status : null,
        status : 'draft'
      };
      $scope.editting = false;
    };
    // $scope.clearForm();

    $scope.add = function() {
      $scope.policyList.push(angular.copy($scope.policy));
      $scope.clearForm();
    };

    $scope.save = function() {
      $scope.clearForm();
    };

  });
})();