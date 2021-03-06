
(function( angular ){

  var app = angular.module( "ngTimepickerForBs3" ,[] );

  app.directive( "minAndMaxForTimepicker", function(){

    var onMinAndMax = function( limit, viewValue ){

      return ( limit.min <= viewValue && limit.max >= viewValue ) ? true:false;
    };

    return {

      require: 'ngModel',

      scope:{
        value:"=ngModel"
      },

      link:function( scope, elem, attrs, ctrl ){


        var limit = angular.fromJson( attrs.minAndMaxForTimepicker );

        ctrl.$parsers.unshift(function( viewValue ){

          if ( onMinAndMax( limit, viewValue ) ) {

            ctrl.$setValidity('integer', true);

            return parseInt( viewValue );

          } else {

            ctrl.$setValidity('integer', false);

            return undefined;
          }

        });

        var validate = function( event, currentValue ){

          if ( onMinAndMax( limit, currentValue ) ) {

            ctrl.$setValidity('integer', true);

          } else {

            ctrl.$setValidity('integer', false);
          }

        };

        var destroyListener = scope.$on( "validate.timepicker." + limit.name, validate );

        scope.$on( "$destroy", destroyListener );
      }
    };

  });
  
  app.directive( "ngTimepickerForBs3", function(){

    var increasesOrDecreases = function( min, max, type, value, attrName ){

      if ( type == "+" ) value[attrName] < max ? value[attrName]++: value[attrName] = min;

      else value[attrName] > min ? value[attrName]--: value[attrName] = max;

      return value[attrName];
    };

    return {

      restrict: "A",

      require: 'ngModel',

      scope:{
        "value":"=ngModel"
      },

      link:function( scope, elem, attrs, ctrl ){

        scope.increasesOrDecreasesHour = function( event, type ){

          event.preventDefault();
         
          var hours = increasesOrDecreases( 0, 23, type, scope.value, "hours" );

          scope.$broadcast( 'validate.timepicker.hours', hours );

        };

        scope.increasesOrDecreasesMin = function( event, type ){

          event.preventDefault();
         
          var mins = increasesOrDecreases( 0, 59, type, scope.value, "mins" );

          scope.$broadcast( 'validate.timepicker.mins', mins );

        };


        var destroyListener = scope.$watch( "ready", function(){

          if ( !scope.value ) scope.value = {};

		  if ( !scope.value.hours ) scope.value.hours = 0;

          if ( !scope.value.mins ) scope.value.mins = 0;

          destroyListener();

        });

        //scope.$on( "$destroy", destroyListener );

      },

      template:[
        '<div class="ng-bs3-time-picker panel panel-default">',
          '<div class="panel-body">',
              '<div class="text-center picker-block ">',
                  '<a href="#" ng-click="increasesOrDecreasesHour( $event, \'+\' )" class="btn-block">',
                      '<i class="glyphicon glyphicon-chevron-up"></i>',
                  '</a>',
                  '<input maxlength="2" type="text" ng-model="value.hours" class="text-center" min-and-max-for-timepicker=\'{"min":0,"max":23,"name":"hours"}\' />',
                  '<a href="#" ng-click="increasesOrDecreasesHour( $event, \'-\' )" class="btn-block">',
                      '<i class="glyphicon glyphicon-chevron-down"></i>',
                  '</a>',
              '</div>',
              '<div class="colon">:</div>',
              '<div class="text-center picker-block ">',
                  '<a href="#" ng-click="increasesOrDecreasesMin( $event, \'+\' )" class="btn-block">',
                      '<i class="glyphicon glyphicon-chevron-up"></i>',
                  '</a>',
                  '<input maxlength="2" type="text" class="text-center" ng-model="value.mins" min-and-max-for-timepicker=\'{"min":0,"max":59,"name":"mins"}\' />',
                  '<a href="#" ng-click="increasesOrDecreasesMin( $event, \'-\' )" class="btn-block">',
                      '<i class="glyphicon glyphicon-chevron-down"></i>',
                  '</a>',
              '</div>',
              '<div class="clearfix"></div>',
          '</div>',     
        '</div>'
      ].join('')


    };
  
  });

})( angular );

