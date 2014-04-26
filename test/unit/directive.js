(function() {
  'use strict';

  describe('dc.inputAddOn', function() {
    var scope,
        directive,
        html;

    beforeEach(function() {
      module('dc.inputAddOn');

      inject(function($rootScope) {
        scope = $rootScope.$new();
      });
    });

    function compile(html) {
      var element;

      inject(function($compile) {
        element = $compile(html)(scope);
      });

      return {
        element: element,
        ngModel: element.controller('ngModel'),
        scope: element.scope()
      };
    }

    describe('inputPrepend', function() {
      beforeEach(function() {
        html = '<input ng-model="name" input-prepend="@" type="text">';
      });

      it('should prepend the specified string to the model value when its view value changes', function() {
        directive = compile(html);
        directive.ngModel.$setViewValue('angularjs');

        expect(directive.ngModel.$modelValue).toEqual('@angularjs');
      });

      it('should not show the prepended string to the end-user', function() {
        directive = compile(html);
        directive.ngModel.$setViewValue('angularjs');

        expect(directive.ngModel.$viewValue).toEqual('angularjs');
      });

      it('should hide the prepended string if the model value already has the prepended string but not modify it', function() {
        scope.name = '@angularjs';
        directive = compile(html);
        scope.$apply();

        expect(directive.ngModel.$viewValue).toEqual('angularjs');
        expect(directive.ngModel.$modelValue).toEqual('@angularjs');
      });

      it('should do nothing if the model value is not a string', function() {
        directive = compile('<input ng-model="name" input-prepend="@" type="number">');
        directive.ngModel.$setViewValue(123);

        expect(directive.ngModel.$modelValue).toEqual(123);
      });
    });

    describe('inputAppend', function() {
      beforeEach(function() {
        html = '<input ng-model="name" input-append=".com" type="text">';
      });

      it('should append the specified string to the model value when its view value changes', function() {
        directive = compile(html);
        directive.ngModel.$setViewValue('angularjs');

        expect(directive.ngModel.$modelValue).toEqual('angularjs.com');
      });

      it('should not show the appended string to the end-user', function() {
        directive = compile(html);
        directive.ngModel.$setViewValue('angularjs');

        expect(directive.ngModel.$viewValue).toEqual('angularjs');
      });

      it('should hide the appended string if the model value already has the appended string but not modify it', function() {
        scope.name = 'angularjs.com';
        directive = compile(html);
        scope.$apply();

        expect(directive.ngModel.$viewValue).toEqual('angularjs');
        expect(directive.ngModel.$modelValue).toEqual('angularjs.com');
      });

      it('should do nothing if the model value is not a string', function() {
        directive = compile('<input ng-model="name" input-append=".com" type="number">');
        directive.ngModel.$setViewValue(123);

        expect(directive.ngModel.$modelValue).toEqual(123);
      });
    });
  });
})();
