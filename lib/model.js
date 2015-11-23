//take two featuring mongoose


var mongoose =  require('mongoose');


var uriUtil = require('mongodb-uri');




var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };    



var mongodbUri = 'mongodb://fyf:fyf@ds051833.mongolab.com:51833/fyf'
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error: '));
/*
conn.once('open', function(callback){
console.log('connection open');
});
*/

var UserSchema =  mongoose.Schema({

	username: { type: String, required: true, index:{ unique: true}},
	password: { type: String, required: true}
});

var user_schema = mongoose.model('UserSchema', UserSchema);

exports.userAdd = (user, pass, cb) => {

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
		username: user,
		password: pass
	});

	person.save(function (err, person){

		if(err){
		mongoose.connection.close();
		cb('error');
		}
		else{
		mongoose.connection.close();
		cb(undefined,{username: person.username, password: person.password});
		}
	});

};

exports.userLookup = (user,pass,cb) => {

conn.once('open',function(e,c) {
	if(e){
		console.log("connection unsucessful");
		return;
	}
	else{
		console.log("connection sucessful");
	}
});



	user_schema.findOne({username: user, password: pass}, function(err, person) {

	if(err) {
	mongoose.connection.close();
	cb('lookup error');
	}
	else{
	mongoose.connection.close();
	cb(undefined,{username: person.username, password: person.password});
	}
	});

	
};








//mongoose.disconnect();
