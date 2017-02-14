(function(){

	angular.module('myApp')
	.service('loginService', ['$location', '$localStorage', '$rootScope', 'sessionData', Login]);

	function Login($location, $localStorage, $rootScope, sessionData){

		var loginService = {};

		loginService.initialize = function(){
			//Verify if the user is logged in and start the manage of routing according to user's role
			
		    $rootScope.$on('$routeChangeStart', function (event) {
		        if ($location.$$path != '/login' && $localStorage.userSesion == undefined) {
		            event.preventDefault();
		            $location.path('login');
		        } else if($localStorage.userSesion != undefined){
		            $rootScope.user = $localStorage.userSesion;
		            if($location.$$path == '/login'){
		                event.preventDefault();
		                $location.path('chores');
		            }

		        }
		    });
		};

		//Initialize global method to close session from any view.
		$rootScope.logOut = function() {
			delete $rootScope.user;
			delete $localStorage.userSesion;
			$location.path('login');
			
		};

		return loginService;
	};
})();