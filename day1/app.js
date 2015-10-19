(function() {
  var app = angular.module('policyApp', []);
  app.controller('PolicyListController', function($scope) {
    // Initialization
    $scope.editting = false;
    $scope.policyList = [ {
      subject : 'US citizen',
      resource : 'ITAR file',
      action : 'open',
      ad : 'allow',
      status : 'deployed'
    }, {
      subject : 'none US citizen',
      resource : 'ITAR file',
      action : 'open',
      ad : 'deny',
      status : 'deployed'
    }, {
      subject : 'R&D',
      resource : 'finalcial file',
      action : 'edit',
      ad : 'deny',
      status : 'deactivated'
    }, {
      subject : 'finalcial',
      resource : 'finalcial file',
      action : 'edit',
      ad : 'allow',
      status : 'draft'
    } ];

    $scope.clearForm = function() {
      $scope.policy = {
        subject : null,
        resource : null,
        action : null,
        ad : null,
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
    }
  });
})();