(function() {
  var app = angular.module('policyApp', []);
  app.controller('PolicyListController', function($scope, $http) {
    // Initialization
    $scope.editting = false;
    $scope.policyList = null;
    $scope.filterByStatus = {
      deactivated : true,
      deployed : true,
      draft : true
    };
    $http.get('resource/policies.json').success(function(data) {
      $scope.policyList = data;
    });

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
    $scope.clearForm();

    $scope.add = function() {
      $scope.policyList.push(angular.copy($scope.policy));
      $scope.clearForm();
    };
    $scope.editPolicy = function(policy) {
      $scope.policy = policy;
      $scope.editting = true;
    };

    $scope.save = function() {
      $scope.clearForm();
    };

    $scope.deletePolicy = function(index) {
      if (confirm('Are you sure to delete this policy? This can not be undone!')) {
        $scope.policyList.splice(index, 1);
      }
    };

    $scope.byStatus = function() {
      return function(policy) {
        return $scope.filterByStatus[policy.status];
      }
    };
  });
})();