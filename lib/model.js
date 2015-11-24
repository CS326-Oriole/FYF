//take two featuring mongoose


var mongoose =  require('mongoose');


var uriUtil = require('mongodb-uri');

var nextUID = 0;


var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };    



var mongodbUri = 'mongodb://fyf:fyf@ds051833.mongolab.com:51833/fyf'
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error: '));

conn.once('open', function(err, resp){

	if(err){
		console.log("connection error");
	}
	else{
		console.log("connection sucess");
	}
});


var UserSchema =  mongoose.Schema({

	username: { type: String, required: true, index:{ unique: true}},
	password: { type: String, required: true},
	id:{type: String , required: true},
	admin: {type: Boolean, required: true}
});



var AnonSchema = mongoose.Schema({
	name:{ type: String, required:true, index:{unique: true}}
//	id:{ type: String, required: true},
});

var ChatSchema = mongoose.Schema({
        field: {type: String, required: true, index: {unique: true}},
	id: { type: String, required: true},
	subject: { type: String, required: true}
});


var user_schema = mongoose.model('UserSchema', UserSchema);
var anon_schema = mongoose.model('AnonSchema', AnonSchema);
var chat_schema = mongoose.model('ChatSchema', ChatSchema);


exports.userAdd = (u,cb) => {
/*
conn.once('open', function(e,c){
	if(e){
		console.log("connection unsucessful");
		return;
	}
	else{
		console.log("connection sucessful");
	}
});
*/
	var person = new user_schema({
		username: u.name,
		password: u.pass,
		id: u.uid,
		admin: u.admin
	});

	person.save(function (err, person){

		if(err){
//		mongoose.connection.close();
		cb(err);
		}
		else{
//		mongoose.connection.close();
		cb(undefined,{
		username: person.username, 
		password: person.password,
		id: person.id,
		admin: person.admin
		});
		}
	});

};



exports.lookup = (user, pass ,cb) => {
/*
conn.once('open',function(e,c) {
	if(e){
		console.log("connection unsucessful");
		return;
	}
	else{
		console.log("connection sucessful");
	}
});

*/

	user_schema.findOne({username: user, 
	password: pass}, 
	function(err, person) {

	if(err) {
	//mongoose.connection.close();
	cb('lookup error');
	}
	else{
	//mongoose.connection.close();
//	cb(undefined,{name: person.username, 
////		password: person.password
//		});
	cb(undefined, person);
	}
	});

	
};


exports.addAnon = (i,cb) => {

 //anon_num++;
/*
conn.once('open', function(e,c) {
	if(e){
		console.log("connection unsucessful");
	}
	else{
		console.log("connection sucessful");
	}
});
*/	
	var person  = new anon_schema({
		name: "Anonymous user" + i
	//	id: i
	});

	person.save(function (err, person){
		if(err){
		//	mongoose.connection.close();
			cb('error');
		}
		else{
		//	mongoose.connection.close();

			cb(undefined, {name: person.name});
		}
	});
};


exports.makeUser = (n, p, a)=>{
	return{
		name: n,
		pass: p,
		uid: ++nextUID,
		admin: a
	};
}


exports.listAnon = (cb) => {
/*
	conn.once('open', function(e,c) {
		if(e){
			console.log("connection unsucessful");
		}
		else{
			console.log("connection sucessful");
		}
	});
*/
	user_schema.find(function(err, persons) {
		if(err){
//			mongoose.connection.close();
			cb('error');
		}
		else{
//		 	mongoose.connection.close();
			cb(undefined, persons);
		}
	});
};



exports.destroy = (cb) => {
	mongoose.connection.db.dropCollection('anonschemas',function(err, resp) {
	if(err){
		cb('error');
	}
	else{
		cb('destoryed');
	}
	});
}

exports.addChat = (s,i,sub,cb) => {
	
	var save_chat = new chat_schema({
		field: s,
		id: i,
		subject: sub
	});


	save_chat.save(function (err, save_chat) {
		if(err){
//			mongoose.connection.close();
			cb(err);
		}
		else{
//			mongoose.connection.close();
			cb(undefined, save_chat);
		}
	});
};


exports.lookupChat = (i,sub, cb) => {
	
	chat_schema.find({id:i, subject: sub }, function( err, chats) {
		if(err){
			cb('error');
		}
		else{
			/*		
			var chat = [];

			chats.forEach(function(thing){
				chat.push(thing.field);
			});
			*/
			cb(undefined,chats);
		}
	});
};






//mongoose.disconnect();
