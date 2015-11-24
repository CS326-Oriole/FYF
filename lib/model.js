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

conn.once('open', function(callback){
console.log('connection open');
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




var user_schema = mongoose.model('UserSchema', UserSchema);
var anon_schema = mongoose.model('AnonSchema', AnonSchema);

exports.userAdd = (u,cb) => {

conn.once('open', function(e,c){
	if(e){
		console.log("connection unsucessful");
		return;
	}
	else{
		console.log("connection sucessful");
	}
});

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

//mongoose.disconnect();
