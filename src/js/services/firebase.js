app.factory("firebaseClient", function($firebase){
	var ref = new Firebase("https://angularfirex.firebaseio.com/");

	
	 

  	function login(email, password, cb){
    	ref.authWithPassword({
        	email    : email,
         	password : password
        }, cb)
  	}
  
  	return {
	  	register: function(email, password, callback){
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
	    	ref.unauth();
	    },


	    // Home services
	    getUsers: function(callback){
	    	var users  = $firebase(ref.child("users"));
	    	return users.$asArray();
	    }
	  }
});