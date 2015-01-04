app.controller("HomeCtrl", function($scope, $location, firebaseClient){

	$scope.loading = true;
	firebaseClient.isLogin(function(auth){
		if(auth){
			$scope.userLogged = auth;
			$scope.users = firebaseClient.getUsers(function(){
				$scope.loading = false;
				$scope.$apply();
				console.log("current user", $scope.userLogged)
				console.log($scope.users)

			});

			$scope.openChat = function(idUserToChat){
				console.log(idUserToChat)
			};
			
			console.log("user is logged")
		}else{
			$location.path('/login');
		}
	});


	





	

});
