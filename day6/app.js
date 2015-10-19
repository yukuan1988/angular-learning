(function() {
  angular.module('emptyRootApp',[]);
  var app = angular.module('policyStudioApp', [ 'ui.bootstrap', 'ui.router' ]);
  angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById("policyStudioApp"), ['policyStudioApp']);
  });
  app.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /error
    $urlRouterProvider.otherwise("/error")

    $stateProvider.state('policy', {
      url : "/policy",
      templateUrl : "policy/policylist.html",
      controller : 'PolicyListController'
    }).state('policy.create', {
      url : "/createpolicy",
      templateUrl : "policy/createpolicy.html",
      controller : 'PolicyCreateController'
    }).state('component', {
      url : "/component",
      templateUrl : "component/list.html"
    }).state('component.subject', {
      url : "/subject",
      template : "<h1>SUBJECT</h1>"
    }).state('component.action', {
      url : "/action",
      template : "<h1>ACTION</h1>"
    }).state('component.resource', {
      url : "/resource",
//      templateUrl : "component/list.html"
    }).state('component.resource.document', {
      url : "/document",
      template : "<h1>DOCUMENT</h1>"
    }).state('component.resource.sharepoint', {
      url : "/sharepoint",
      template : "<h1>SHAREPOINT</h1>"
    }).state('component.resource.sap', {
      url : "/sap",
      template : "<h1>SAP</h1>",
    }).state('component.resource.enoiva', {
      url : "/enoiva",
      template : "<h1>ENOIVA</h1>"
    }).state('delegations', {
      url : "/delegations",
      template : "<h1>DELEGATIONS</h1>"
    })
  });

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

  app.provider('PolicyService', [ function() {
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