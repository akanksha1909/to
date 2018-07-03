 const mongoose = require("mongoose");
 module.exports = {

 	//DB credentials
	mongodb : mongoose.connect('mongodb://localhost/ToDoList'),

 	//For JWT validations
  	jwtsecret   : 'thisistestjwttodolistkey',

  	//Facebook account kit
    accountkit : {
        app_id              : "137276817141255",
        account_kit_secret  : "71c012b74e073a9d25605043b81bc36e",
        access_token_url    : "https://graph.accountkit.com/v1.1/access_token",
        verify_url          : "https://graph.accountkit.com/v1.1/me"
    }
}