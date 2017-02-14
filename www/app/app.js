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