(function() {
  var policyStudioApp = angular.module('policyStudioApp', [ 'ngRoute' ]);
  policyStudioApp.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/policy', {
      templateUrl : 'policy/policylist.html',
      // controller : 'PolicyListController'
    }).when('/createPolicy', {
      templateUrl : 'policy/createpolicy.html',
      // controller : 'PolicyCreateController'
    }).when('/editPolicy', {
      templateUrl : 'policy/createpolicy.html',
      // controller : 'PolicyCreateController'
    }).otherwise({
      redirectTo : '/'
    });
  } ]);

  /*var policyApp = angular.module('policyApp', [ 'ngRoute' ]);
  policyApp.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('create', {
      templateUrl : 'policy/createpolicy.html',
      controller : 'PolicyListController'
    }).otherwise({
      redirectTo : '/'
    });
  } ]);

  policyApp.provider('PolicyService', [ function() {
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
  } ]);
  angular.bootstrap(document.getElementById("policyApp"), ['demo']);
  

  policyApp.controller('PolicyListController', function($scope, $http, PolicyService) {
    // $scope.search = 'components/search.html';
    $scope.filterBy = {
      status : {
        enabled : false,
        deactivated : true,
        deployed : true,
        draft : true
      }
    };
    $scope.show_search = false;
    $scope.show_import_export = false;
    PolicyService.listPolicy().then(function(policyList) {
      $scope.policyList = policyList;
    });
    $scope.byStatus = function() {
      return function(policy) {
        return !$scope.filterBy.status.enabled || $scope.filterBy.status[policy.status];
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

  policyApp.controller('PolicyCreateController', function($scope) {
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

  });*/
})();