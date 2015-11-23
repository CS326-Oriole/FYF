// This script will serve as the library for mongo operations

var mongojs = require('mongojs');


// connect to the fyf username database
var connstr = 'mongodb://fyf:fyf@ds051833.mongolab.com:51833/fyf'

var db = mongojs(connstr, [], {authMechanism: 'ScramSHA1'});

// connect to the users collection containing username and pass pairs
var users = db.collection('users');



// lookup user and password function

exports.userLookup = (user, pass, cb) =>{

var db = mongojs(connstr, [], {authMechanism: 'ScramSHA1'});

// connect to the users collection containing username and pass pairs
var users = db.collection('users');

	users.find({username: user, password: pass}, function(err,usr) {

        	
		if(err == null){

		//onsole.log('why am i exiting');
			cb(null, 'wtf'); 

			//process.exit(0);	
		}
		else{
			cb(usr);
		}


	});

 db.close();
};



