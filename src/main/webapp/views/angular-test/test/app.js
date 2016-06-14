'use strict';
var phonecatApp=angular.module('phonecatApp',['ngRoute','phonecatFilters','ngResource']);

phonecatApp.config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/phones', 
        	{
	        	templateUrl: 'list.html',  
	        	controller: PhoneListController
	        }
        ).when('/phones/:phoneId', 
        	{
        		templateUrl: 'detail.html',
        		controller: PhoneDetailCtrl
        	}
        ).otherwise(
        		{
		        	templateUrl: '../../home.jsp',  
		        	controller: PhoneListController
        		});
    }
  ]);
var PhoneListController=['$scope','Phone', 
    function ($scope,Phone) {
		$scope.orderProp = 'age';
		$scope.phones = Phone.query();
	}
];
var PhoneDetailCtrl =['$scope','Phone','$routeParams',
    function ($scope, Phone, $routeParams) {
		$scope.phoneId = $routeParams.phoneId;
		$scope.phone = Phone.get({phoneId:$routeParams.phoneId},function(phone){
			$scope.mainImageUrl='../'+phone.images[0];
		});
		$scope.setImage=function(imageUrl){
			$scope.mainImageUrl='../'+imageUrl;
		}
	}
]

