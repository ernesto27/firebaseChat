app.factory("firebaseClient", function($firebase){
	var ref = new Firebase("https://angularfirex.firebaseio.com/");

  	function login(email, password, cb){
    	ref.authWithPassword({
        	email    : email,
         	password : password
        }, cb)
  	}
  
  	return {
	  	register: function(username, email, password, callback){
	  		ref.createUser({email: email, password: password}, function(error){
		  		if(error){
		  			switch (error.code) {
	      				case "EMAIL_TAKEN":
	      					callback("email_taken");
	      					break;
	      				default:
	      					callback("error");
	      					break;
	      			}
		  		}else{
		  			// log user register in firebase for save data in users table
		  			login(email, password, function(error, authData){
		  				if(!error){
		  					ref.onAuth(function(authData) {
								if (authData) {
									authData.username = username;
								    // save the user's profile into Firebase so we can list users,
								    // use them in Security and Firebase Rules, and show profiles
								    ref.child("users").child(authData.uid).set(authData);
								    console.log("Login after register")
		  							console.log(authData)
		  							callback("register_ok");
								}
							});
		  					
		  				}
		  			});
		  			
		  		}  
		  	});
	  	},

	    login: login,

	    isLogin: function(callback){
	    	ref.onAuth(callback);

	    },

	    logout: function(){
	    	console.log("user logout")
	    	ref.unauth();
	    },


	    // Home services
	    getUsers: function(callback){
	    	var users  = $firebase(ref.child("users"));
	    	ref.on("value", callback);
	    	return users.$asArray();
	    },


	    // Chats
	    getRoomChats: function(chatRoom, callback){
	    	var chats  = $firebase(ref.child("chats/" + chatRoom));
	    	ref.on("value", callback);
	    	return chats.$asArray();
	    },

	    addMessageToChat: function(chatRoom, message, fromName, callback){
	    	var date = new Date();
	    	var dateString = date.toString();
	    	var chat = $firebase(ref.child("chats/" + chatRoom ));
	    	chat.$push({
	    		message: message,
	    		from: fromName,
	    		date: dateString
	    	}).then(callback);
	    },

	    // Notifications
	    getNotifications: function(userId, callback){
	    	var child = ref.child("notifications/" + userId);
	    	var notification = $firebase(child);
	    	child.on("value", callback);
	    	return notification.$asArray();
	    },

	    sendNotification: function(userIdTo, userIdFrom, usernameFrom, message){
	    	//console.log(userIdFrom); return;
	    	var chatRoom = null;
	    	if(userIdTo > userIdFrom){
	    		chatRoom = userIdFrom + "-" + userIdTo;
	    	}else{
	    		chatRoom = userIdTo + "-" + userIdFrom;
	    	}

			var notification = $firebase(ref.child("notifications/" + userIdTo + "/" + userIdFrom));
			notification.$set({
				message:  message,
				from: usernameFrom,
				unread: 0,
				chatRoom: chatRoom
			});
	    },


	    getUsernameLogged: function(userId, callback){
	    	var user = ref.child("/users/" + userId + "/username");
	    	user.once("value", callback);
	    } 
	  }
});