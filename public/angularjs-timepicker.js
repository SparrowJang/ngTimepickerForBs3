
(function( angular ){

  var app = angular.module( "ngTimepickerForBs3" ,[] );
  
  app.directive( "ngTimepickerForBs3", function(){

    var increasesOrDecreases = function( min, max, type, value, attrName ){

      if ( type == "+" ) value[attrName] < max ? value[attrName]++: value[attrName] = min;

      else value[attrName] > min ? value[attrName]--: value[attrName] = max;
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
         
          increasesOrDecreases( 0, 23, type, scope.value, "hours" );

        };

        scope.increasesOrDecreasesMin = function( event, type ){

          event.preventDefault();
         
          increasesOrDecreases( 0, 59, type, scope.value, "mins" );

        };


        var destroyListener = scope.$watch( "ready", function(){

          if ( !scope.value ) scope.value = {};

		  if ( scope.value.hours ) scope.value.hours = 0;

          if ( scope.value.mins ) scope.value.mins = 0;

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
                  '<input type="text" ng-model="value.hours" class="text-center" />',
                  '<a href="#" ng-click="increasesOrDecreasesHour( $event, \'-\' )" class="btn-block">',
                      '<i class="glyphicon glyphicon-chevron-down"></i>',
                  '</a>',
              '</div>',
              '<div class="colon">:</div>',
              '<div class="text-center picker-block ">',
                  '<a href="#" ng-click="increasesOrDecreasesMin( $event, \'+\' )" class="btn-block">',
                      '<i class="glyphicon glyphicon-chevron-up"></i>',
                  '</a>',
                  '<input type="text" class="text-center" ng-model="value.mins" />',
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

