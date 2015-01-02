app.factory("firebaseClient", function(){
  var ref = new Firebase("https://angularfirex.firebaseio.com/");

  
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
	  			callback("register_ok");
	  		}  
	  	});
  	},

    login: function(email, password, callback){
    	ref.authWithPassword({
        	email    : email,
         	password : password
        }, callback);
    },

    isLogin: function(callback){
    	ref.onAuth(callback);
    },

    logout: function(){
    	ref.unauth();
    }
  }
});