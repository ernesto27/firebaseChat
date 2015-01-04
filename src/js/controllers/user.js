app.controller("LoginCtrl", function($scope, $location, firebaseClient){
	console.log($scope.userLogged);
	$scope.buttonSendDisabled = false;
	$scope.loading = false;

	function authHandler(error, authData) {
  		if (error) {
  			$scope.errorMessage = true;
  		} else {
   			$scope.userLogged = authData;
  			$location.path("/")
  		}

  		$scope.loading = false;
		$scope.buttonSendDisabled = false;
		$scope.$apply();
	}

	$scope.doLogin = function(){
		$scope.buttonSendDisabled = true;
		$scope.loading = true;

	    firebaseClient.login($scope.email, $scope.password, authHandler );
	};

	$scope.doLogout = function(){
		firebaseClient.logout();
	}


});



app.controller("RegisterCtrl", function($scope, firebaseClient){
	$scope.buttonSendDisabled = false;
	$scope.loading = false;

	$scope.doRegister = function(){
		$scope.buttonSendDisabled = true;
		$scope.loading = true;

		firebaseClient.register($scope.email, $scope.password, function(status){
			console.log(status);
			if(status == "register_ok"){
				$scope.successMessage = true;
				$scope.textMessage = "Usuario registrado exitosamente";
			}

			switch(status){
				case 'register_ok':
					$scope.errorMessage = false;
					$scope.successMessage = true;
					$scope.textMessage = "Usuario registrado exitosamente";
					break;
				case 'email_taken':
					$scope.successMessage = false;
					$scope.errorMessage = true;
					$scope.textMessage = "Email ya en uso";
					break;
				case 'error':
					$scope.successMessage = false;
					$scope.errorMessage = true;
					$scope.textMessage = "Ocurrio un error";
					break;
			}

			$scope.loading = false;
			$scope.buttonSendDisabled = false;
			$scope.$apply();
		});
	}
});