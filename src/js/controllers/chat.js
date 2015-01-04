app.controller("ChatCtrl" , function($scope, $location, firebaseClient, $routeParams){
	var chatRoom = $routeParams.chatRoom;
	var	wrapperChat = document.getElementById("wrapper-messages");
	
	// Order chatRoom and redirect if neccesary
	var arrayChat = chatRoom.split("-");
	var user1 = arrayChat[0];
	var user2 = arrayChat[1];

	if(parseInt(user1.split(":")[1]) > parseInt(user2.split(":")[1])){
		console.log("redirect")
		$location.path("/chat/" + user2 + "-" + user1);
	}

	
	firebaseClient.isLogin(function(auth){
		if(auth){
			$scope.user = auth;

		}else{
			$location.path('/login');
		}
	});


	$scope.chats = firebaseClient.getRoomChats(chatRoom, function(){
		setTimeout(function(){
			wrapperChat.scrollTop = wrapperChat.scrollHeight;

		}, 100);
	});
	console.log($scope.chats)

	$scope.sendChat = function(){
		firebaseClient.addMessageToChat($routeParams.chatRoom, $scope.message, function(){
			wrapperChat.scrollTop = wrapperChat.scrollHeight;
		});
		
	};
});