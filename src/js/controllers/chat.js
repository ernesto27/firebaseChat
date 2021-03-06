app.controller("ChatCtrl" , function($scope, $location, firebaseClient, $routeParams){
	var chatRoom = $routeParams.chatRoom;
	var	wrapperChat = document.getElementById("wrapper-messages");

	// Order chatRoom and redirect if neccesary
	var arrayChat = chatRoom.split("-");
	var user1 = arrayChat[0];
	var user2 = arrayChat[1];

	if(parseInt(user1.split(":")[1]) > parseInt(user2.split(":")[1])){
		$location.path("/chat/" + user2 + "-" + user1);
	}

	
	firebaseClient.isLogin(function(auth){
		if(auth){
			$scope.userLogged = auth;
			// Get username user
			firebaseClient.getUsernameLogged($scope.userLogged.uid, function(snapshot){
				$scope.usernameLogged = snapshot.val();
			});
			

			$scope.loading = true;
			$scope.chats = firebaseClient.getRoomChats(chatRoom, function(){
				setTimeout(function(){
					wrapperChat.scrollTop = wrapperChat.scrollHeight;
					$scope.loading = false;
					$scope.$apply();
				}, 100);
			});
		

			$scope.sendChat = function(){
				var userIdToSendNotification = null;
				if(user1 != $scope.userLogged.uid){
					userIdToSendNotification = user1;
				}else{
					userIdToSendNotification = user2;
				}


				firebaseClient.addMessageToChat($routeParams.chatRoom, $scope.message, $scope.usernameLogged,  function(){
					wrapperChat.scrollTop = wrapperChat.scrollHeight;

					firebaseClient.sendNotification(userIdToSendNotification,$scope.userLogged.uid, 
												$scope.usernameLogged, $scope.message); return
				});
				
			};

		}else{
			$location.path('/login');
		}
	});



});