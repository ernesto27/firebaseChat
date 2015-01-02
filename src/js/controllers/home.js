app.controller("HomeCtrl", function($scope, $location, firebaseClient){
	firebaseClient.isLogin(function(auth){
		if(auth){
			console.log("user is logged")
		}else{
			$location.path('/login');
		}
	});
});
