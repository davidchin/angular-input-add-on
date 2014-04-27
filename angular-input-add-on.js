/*!
 * angular-input-add-on.js v0.0.1
 * http://davidchin.me
 * Copyright 2014 David Chin
 * MIT License
 */
angular.module('dc.inputAddOn', []);

(function() {
  'use strict';

  function AddOnFilter(type, attrs, model) {
    // Set props
    this.type = type;
    this.name = type === 'prepend' ? 'inputPrepend' : 'inputAppend';

    // Add parser / formatter
    model.$parsers.unshift(angular.bind(this, this.parse));
    model.$formatters.unshift(angular.bind(this, this.format));

    // Observe attr change
    attrs.$observe(this.name, angular.bind(this, this.define));

    // Define
    this.define(attrs[this.name]);
  }

  AddOnFilter.prototype.format = function(value) {
    var regexp;

    if (this.type === 'prepend') {
      regexp = new RegExp('^(' + this.escapedAddOn + ')');
    } else {
      regexp = new RegExp('(' + this.escapedAddOn + ')$');
    }

    return angular.isString(value) ? value.replace(regexp, '') : value;
  };

  AddOnFilter.prototype.parse = function(value) {
    var regexp,
        newValue;

    if (this.type === 'prepend') {
      regexp = new RegExp('^(' + this.escapedAddOn + ')?');
      newValue = this.addOn + '$`';
    } else {
      regexp = new RegExp('(' + this.escapedAddOn + ')?$');
      newValue = '$\'' + this.addOn;
    }

    return angular.isString(value) ? value.replace(regexp, newValue) : value;
  };

  AddOnFilter.prototype.define = function(value) {
    this.addOn = value;
    this.escapedAddOn = this.escape(this.addOn);
  };

  AddOnFilter.prototype.escape = function(str) {
    if (str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    } else {
      return '';
    }
  };

  function directiveFn(type) {
    return function() {
      return {
        restrict: 'A',
        require: 'ngModel',

        link: function(scope, element, attrs, model) {
          var addOnFilter = new AddOnFilter(type, attrs, model);
        }
      };
    };
  }

  angular.module('dc.inputAddOn')
    .directive('inputAppend', directiveFn('append'))
    .directive('inputPrepend', directiveFn('prepend'));

})();
