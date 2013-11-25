ngTimepickerForBs3
==================

An [Angularjs](http://angularjs.org/) module that is timepicker for bootstrap3.

##Dependency

* bootstrap3
* angularjs

#Install

```
bower install ngTimepickerForBs3
```

##Usage

###Include some scripts and styles

```
<link rel="stylesheet" href="angularjs-timepicker.css" />
<script type="text/javascript" src="angularjs-timepicker.js"></script>
```

###Set a model value
```
<div ng-timepicker-for-bs3 ng-model="test" ng-init="test={hours:23,mins:59}"></div>
{{test}}
```

###Require ngTimepickerForBs3 and inject the services
```
angular.module( "app", [
    "ngTimepickerForBs3"
]);
```

##Demo

Clone this project.
 
```
git clone http://github.com/SparrowJang/ngTimepickerForBs3.git
 
cd ngTimepickerForBs3
```
 
Install the express framework and grunt modules.
```
npm install
```
 
run a server:
```
grunt server
```
 
Finally,open your brower,enter [http://localhost:3000/index.html](http://localhost/index.html).



