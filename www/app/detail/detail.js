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


