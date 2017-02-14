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


