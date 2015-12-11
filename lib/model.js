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
	admin: {type: Boolean, required: true},
	phone: {type:String, required: true},
	email: {type:String, required: true},
	interests: {type: String, required:true},
});



var AnonSchema = mongoose.Schema({
	name:{ type: String, required:true, index:{unique: true}}
//	id:{ type: String, required: true},
});

var ChatSchema = mongoose.Schema({
        field: {type: String, required: true, index: {unique: true}},
	id: { type: String, required: true},
	subject: { type: String, required: true},
	name: { type: String, required:true},
	pass: { type: String, required:false}
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
		admin: u.admin,
		phone: u.phone,
		email: u.email,
		interests: u.interests
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
		admin: person.admin,
		phone: person.phone,
		email: person.email,
		interests: person.interests
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
//count the number of anonymouse users to dynamically create them

exports.countAnon = (cb) => {
anon_schema.count(function(err,count){
	if(err){
		cb(err,undefined);
	}
	else {
		console.log(count);
		cb(undefined,count);
	}
});
}


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

exports.addChat = (s,i,sub,n,p,cb) => {

	var save_chat = new chat_schema({
		field: s,
		id: i,
		subject: sub,
		name: n,
		pass: p
	});


	save_chat.save( function (err, save_chat) {
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


exports.lookupChat = (sub, n, cb) => {

	chat_schema.find({subject: sub, name: n }, function( err, chats) {
		if(err){
			cb('error');
		}
		else{
		/*

			var chat = [];

			chats.forEach(function(thing){
				chat[thing] =thing.field;
			});

			//cb(undefined,chats.field);
		*/
			cb(undefined,chats);
		}
	});
};


exports.countChat = (cb) => {
	chat_schema.count(function(err,count){
        if(err){
       console.log("\ncount chat error: " + err + "\n");
	     cb(err,undefined);
	}
	else {

		cb(undefined,count);
	}
});
}




//mongoose.disconnect();
