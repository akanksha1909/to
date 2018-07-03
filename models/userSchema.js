const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({

	phone_number    : Number ,
	name            : { type : String, default : ""},
	facebook_id     : { id : String, accesstoken : String, time : Date },
	google_id       : { id : String, accesstoken : String, time : Date },
	record_status   : { type : String, enum : [ 'active', 'inactive', 'deleted' ], default:"active" },

},{
	timestamps          : { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('users',usersSchema);