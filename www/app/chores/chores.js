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


