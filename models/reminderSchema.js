const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({

	user_id    : { type: mongoose.Schema.Types.ObjectId, ref:"users"},
	time       : { type : Date, default : new Date() },
	title			: String,
	location     : { type : String,default : ""},
	description   : String,
	type 		    : { type : String, enum : [ 'meeting', 'todo', 'event' ], default:"todo" },
	record_status   : { type : String, enum : [  'completed', 'notcompleted' ], default:"notcompleted" }
	
},{
	timestamps          : { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('reminder',reminderSchema);