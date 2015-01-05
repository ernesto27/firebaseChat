app.controller("HomeCtrl", function($scope, $location, firebaseClient){
	$scope.loading = true;

	firebaseClient.isLogin(function(auth){
		if(auth){
			$scope.userLogged = auth;
			$scope.users = firebaseClient.getUsers(function(){
				$scope.loading = false;
				$scope.$apply();


			});

		}else{
			$location.path('/login');
		}
	});




});
