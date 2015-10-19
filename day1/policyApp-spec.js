describe("policyApp", function() {
  var $rootScope, $scope, controller;
  beforeEach(function() {
    module('policyApp');
    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')('PolicyListController', {
        $scope : $scope
      });
    })
  });
  describe("PolicyListController", function() {
    it("should be initialized", function() {
      expect($scope.editting).toEqual(false);
      expect($scope.policyList.length).toEqual(4);
    });
    it("should be added successfully", function() {
      $scope.policy = {
        subject : 'new added',
        resource : 'new added',
        action : 'new added',
        ad : 'allow',
        status : 'draft'
      };
      $scope.add();
      expect($scope.policyList.length).toEqual(5);
      expect($scope.policyList[4].subject).toEqual('new added');
      expect($scope.policy.subject).toBe(null);
    });
    it("should handle delete successfully", function() {
      var orig2 = $scope.policyList[2];
      spyOn(window, 'confirm').and.callFake(function() {
        return true;
      });
      $scope.deletePolicy(1);
      expect($scope.policyList.length).toEqual(3);
      expect($scope.policyList[1]).toEqual(orig2);
    });
    it("should handle delete successfully when canceled", function() {
      var orig2 = $scope.policyList[2];
      spyOn(window, 'confirm').and.callFake(function() {
        return false;
      });
      $scope.deletePolicy(1);
      expect($scope.policyList.length).toEqual(4);
      expect($scope.policyList[2]).toEqual(orig2);
    });
  });

});