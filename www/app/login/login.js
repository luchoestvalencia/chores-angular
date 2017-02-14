(function(){

	angular.module('myApp')
	.controller('loginCtrl', ['$location', '$localStorage', '$rootScope', 'httpService', Login]);

	function Login($location, $localStorage, $rootScope, httpService){
		var vmLogin = this;
		vmLogin.user = {};
		vmLogin.login = login;

		//Login according given data
		function login(){
		    
			if(vmLogin.user.username != '' && vmLogin.user.password != ''){
                   console.log(vmLogin.user.username);
				var successCallback = function(response){
				     console.log(response);
					if(response.data.length > 0){
						$localStorage.userSesion = $rootScope.user = response.data[0];
						$location.path('chores');
					} else {
						
					}
				};

				var errorCallback = function(error){
					console.log('error: ' + error);
				};

				var url = applicationConfig.users + '?username=' + vmLogin.user.username + '&password=' + vmLogin.user.password;

				httpService.get(url, {}, successCallback, errorCallback)
			}
		};
	};
})();