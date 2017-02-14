//Routing of backedn service
var applicationConfig = {
    'base_url':'http://localhost:3000/',
    'users':'users',
    'chores':'chores',
    'comments':'comments'
};

//Dependencies
angular.module('myApp', [
  'ngRoute',
  'ngStorage'
])
.run(['loginService',  function(loginService){
    loginService.initialize();    
}])
.constant('applicationConfig', applicationConfig)
.value('sessionData', {})
.config(['$routeProvider', function($routeProvider) {
    
    //Routing settings
    $routeProvider
    .when("/login", {
        templateUrl : "app/login/login.html",
        controller: 'loginCtrl',
        controllerAs:'login' 
    })
    .when("/chores", {
        templateUrl : "app/chores/chores.html",
        controller: 'choresCtlr',
        controllerAs:'vmChore'
    }).when("/addchore", {
        templateUrl : "app/addChore/addchore.html",
        controller: 'addChoreCtlr',
        controllerAs:'vmAddChore'
    }).when("/changepass", {
        templateUrl : "app/changepass/changepass.html",
        controller: '',
        controllerAs:''
    }).when("/editchore", {
        templateUrl : "app/editchore/editchore.html",
        controller: 'editChoreCtlt',
        controllerAs:'vmChore'
    }).when("/finishedchores", {
        templateUrl : "app/finishedchores/finishedchores.html",
        controller: 'finishChoresCtlr',
        controllerAs:'vmFinishedChore'
    }).when("/detail", {
        templateUrl : "app/detail/detail.html",
        controller: 'detailCtlt',
        controllerAs:'vmChore'
    })
    
    .otherwise({redirectTo: '/login'});
}]);
(function(){

	angular.module('myApp')
	.controller('addChoreCtlr', ['applicationConfig', 'httpService', 'sessionData', '$scope', '$rootScope', '$location','$localStorage' , RegisterChore]);

	function RegisterChore(applicationConfig, httpService, sessionData, $scope, $rootScope, $location, $localStorage){
		var vmAddChore = this;
		vmAddChore.newChore = {};
		vmAddChore.newChore.state="undone";
		vmAddChore.newChore.resposable = $localStorage.userSesion.id;
		vmAddChore.addChore = addChore;
		//add a new core
		function addChore(){
			var successCallback = function(response){
				if(response.data){
					$scope.formRegisterChore.$setPristine();
					vmAddChore.newChore = {};
					console.log("Se registro el chore de manera exitosa");
				}
			};

			var errorCallback = function(error){
				console.log('error: ' + error);
			};
			console.log(vmAddChore.newChore);
			httpService.post(applicationConfig.chores, vmAddChore.newChore, successCallback, errorCallback);
		}
		
		
	};
})();
(function(){

	angular.module('myApp')
	.controller('choresCtlr', ['$location', 'applicationConfig', 'httpService', 'sessionData', '$rootScope', '$localStorage', ChoresList]);

	function ChoresList($location,applicationConfig, httpService, sessionData, $rootScope, $localStorage){
		var vmChore = this;
		//variables
		vmChore.chore = [];
		vmChore.paginator = 0;
		vmChore.choresAvailable = true;
		vmChore.query = '';
	  
		//functions
		vmChore.loadMoreChores = loadMoreChores;
		vmChore.detail = detail;
		vmChore.finalizar = finalizar;
		vmChore.editar = editar;

		getChores();

		function getChores(){
			var successCallback = function(chore){
				addData(chore.data);
			};

			var errorCallback = function(error){
				console.log('error: ' + error);
			};
			
			var end = vmChore.paginator + 10;
			console.log(end);
			var start;
			if(vmChore.paginator>0){
				start =end - 5;
			}
			else{
				start=0;
			}
			
			var url = applicationConfig.chores +'?resposable='+$localStorage.userSesion.id+ '&state=undone&_start=' + start + '&_end=' + end;

			httpService.get(url, {}, successCallback, errorCallback);
		}

		//load more chore according paginator
		function loadMoreChores(){
			vmChore.paginator += 5;
			getChores();
		};

		//Add new chore to the current chore list
		function addData(data){
			var numberItems = Object.keys(data).length;
			if(numberItems > 0){
				console.log(data);
				vmChore.chore = vmChore.chore.concat(data);
				console.log(vmChore.chore);
			} else {
				vmChore.choresAvailable = false;
			}
			
		}
		function editar(obj) {
			sessionData.chore = obj;  
			$location.path('/editchore');
		}
		function finalizar (obj) {
			obj.state="done";
			var successCallback = function(response){
				if(response.data){
					console.log("Done Chore");
				}
			};
			var errorCallback = function(error){
				console.log('error: ' + error);
			};
			var url = applicationConfig.chores + "/" + obj.id;
			httpService.put(url, obj, successCallback, errorCallback);
		}

		//Go to detail view of the selected chore
		function detail(chore){
			sessionData.choreDetalle = chore;  
			$location.path('/detail');
		}
		
	};
})();



(function(){

	angular.module('myApp')
	.controller('detailCtlt', ['$location', 'applicationConfig', 'httpService', 'sessionData', '$rootScope', '$localStorage', DetailChore]);

	function DetailChore($location,applicationConfig, httpService, sessionData, $rootScope, $localStorage){
		var vmChore = this;
		//variables
		vmChore.chore = [];
		vmChore.chore=sessionData.choreDetalle;
		       
	};
})();



(function(){

	angular.module('myApp')   
	.controller('editChoreCtlt', ['applicationConfig', 'httpService', 'sessionData', '$scope', '$rootScope', '$location',  EditChore]);

	function EditChore(applicationConfig, httpService, sessionData, $scope, $rootScope, $location){
		var vmChore = this;
		vmChore.newChore=sessionData.chore;
		vmChore.save=save;
				

		//Update a selected Chore
		function updateChore(){
			var successCallback = function(response){
				if(response.data){
					$scope.formRegisterChore.$setPristine();
					
				}
			};

			var errorCallback = function(error){
				console.log('error: ' + error);
			};

			
		}

		function save (obj) {
			console.log(obj);
			var successCallback = function(response){
				if(response.data){
					console.log("Editado");
				}
			};
			var errorCallback = function(error){
				console.log('error: ' + error);
			};
			var url = applicationConfig.chores + "/" + obj.id;
			httpService.put(url, obj, successCallback, errorCallback);
		}		
	};
})();
(function(){

	angular.module('myApp')
	.controller('finishChoresCtlr', ['$location', 'applicationConfig', 'httpService', 'sessionData', '$rootScope', '$localStorage', ChoresList]);

	function ChoresList($location,applicationConfig, httpService, sessionData, $rootScope, $localStorage){
		var vmFinishedChore = this;
		//variables
		vmFinishedChore.chore = [];
		vmFinishedChore.choresAvailables = true;
		vmFinishedChore.query = '';
	  
		
		getChore();

		function getChore(){
			console.log("this");
			var successCallback = function(chore){
				addData(chore.data);
			};

			var errorCallback = function(error){
				console.log('error: ' + error);
			};	
			
			
			var url = applicationConfig.chores +'?resposable='+$localStorage.userSesion.id+ '&state=done';
console.log(url);
			httpService.get(url, {}, successCallback, errorCallback);
		}

		

		//Add new chore to the current chore list
		function addData(data){
			var numberItems = Object.keys(data).length;
			if(numberItems > 0){
				console.log(data);
				vmFinishedChore.chore = vmFinishedChore.chore.concat(data);
				console.log(vmFinishedChore.chore);
			} else {
				
			}
			
		}		
		
		
	};
})();





//Set the width of the side navigation to 250px
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("dark-background").style.display = "block";
    
}

// Set the width of the side navigation to 0 
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("dark-background").style.display = "none";
}
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
(function(){
	//Service used to make request to the backend
	angular.module('myApp')
	.service('httpService', ['$http', 'applicationConfig', httpService]);

	function httpService($http, applicationConfig){
		
		var service = {
			get: get,
			post:post,
			put:put,
			deleteReq, deleteReq
		};
		return service;


		function makeRequest(url, requestType, params, successCallback, errorCallback, headers) {

			var requestConfig = {
				method: requestType,
				url: applicationConfig.base_url + url,
				data: params,
				timeout: 10000
			};

			if (headers !== undefined) {
				requestConfig.headers = headers;
			}

			$http(requestConfig).then(successCallback, errorCallback);
		};

		function get(url, params, successCallback, errorCallback, headers){
			makeRequest(url, 'GET', params, successCallback, errorCallback, headers);
		}

		function post(url, params, successCallback, errorCallback, headers){
			makeRequest(url, 'POST', params, successCallback, errorCallback, headers);
		}

		function put(url, params, successCallback, errorCallback, headers){
			makeRequest(url, 'PUT', params, successCallback, errorCallback, headers);
		}

		function deleteReq(url, params, successCallback, errorCallback, headers){
			makeRequest(url, 'DELETE', params, successCallback, errorCallback, headers);
		}
	};
})();
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