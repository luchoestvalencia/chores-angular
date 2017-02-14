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