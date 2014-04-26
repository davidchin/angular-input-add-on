angular-input-add-on.js
=======================

`input-append` and `input-prepend` append and prepend value to `ngModel` respectively. It is useful when you want to partially pre-fill the value of an input and don't want the user to remove or change the pre-filled part. For example, you want the user to enter his twitter username and prepend the @ symbol to the input value before sending it to the server. Or you want to append a domain name, ie: .yourdomain.com to the end of a user input.

## Usage

Add `input-append` or `input-prepend` as an attribute to the `ng-model` you wish to modify. The following example prepends '@' symbol to the model value and uses Bootstrap 3 `input-group-addon` CSS to display the prepended value next to the input field.

```html
<div class="input-group">
  <span class="input-group-addon">@</span>
  <input ng-model="name" input-prepend="@" type="text" class="form-control">
</div>
```

When the user types in something new in the input field, it modifies the `$modelValue` of the `ngModel` directive with the prepended string, while keeping the `$viewValue` the same so that the prepended value is not visible in the input field. Also, if the `ngModel` is already bound to an existing value that has the prepended value, the prepended part is stripped out from the model's `$viewValue` while keeping `$modelValue` unmodified.

`input-append` works in a similar fashion.

```html
<div class="input-group">
  <input ng-model="name" input-append=".yourdomain.com" type="text" class="form-control">
  <span class="input-group-addon">.yourdomain.com</span>
</div>
```

## Install

You can get the directives via GitHub by cloning this repository or via Bower `bower install angular-input-add-on`. Include the following script tags on your page (or in your packaged js file) in this order.

```html
<script type="text/javascript" src="/path/to/jquery.min.js"></script>
<script type="text/javascript" src="/path/to/angular-input-add-on.min.js"></script>
```

And then, you need to include `dc.inputAddOn` module as part of your application module. For example:

```javascript
angular.module('myApp', ['dc.inputAddOn']);
```
