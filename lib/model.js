// This script will serve as the library for mongo operations

var mongojs = require('mongojs');


// connect to the fyf username database
var connstr = 'mongodb://fyf:fyf@ds051833.mongolab.com:51833/fyf'

var db = mongojs(connstr, [], {authMechanism: 'ScramSHA1'});

// connect to the users collection containing username and pass pairs
var users = db.collection('users');



// lookup user and password function
/*
exports.userLookup = (user, pass) =>{
//exports.userLookup = (user,pass) => {

	var query = users.find({username:user, password: pass});

        query.forEach(function (err, doc){
		if(err){
			return false;
		}
		else{

		return true;
		}
		if(doc == null){
			process.exit(0);
		}

		
	});
}


*/


exports.userLookup = (user, pass, callback) => {


	users.find({username: user, password: pass}, function(err, result) {

		//var pair ={username: result.username, password: result.password};
//console.log(result);

		callback(result);

	});
	
};
