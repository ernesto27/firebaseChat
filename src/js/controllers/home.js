app.controller("HomeCtrl", function($scope, $location, firebaseClient){

	$scope.loading = true;
	firebaseClient.isLogin(function(auth){
		if(auth){
			$scope.userLogged = auth;
			
			console.log("user is logged")
		}else{
			$location.path('/login');
		}
	});


	$scope.users = firebaseClient.getUsers(function(){
		$scope.loading = false;
		$scope.$apply();
		console.log("current user", $scope.userLogged)

	});


	$scope.openChat = function(idUserToChat){
		console.log(idUserToChat)
	};





	

});
