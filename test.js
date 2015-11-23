var model = require('./lib/model');


/*
model.userLookup('joe', 'joe', function(err, u) {


	if(err){
		console.log('error');
	}
	else{

		console.log('yay');
		
	}
console.log('double yay');	
});

*/


model.userLookup('joe','joe', function(err,u){

	if(err){
		console.log('error');
	}
	else{
		cosole.log(u[0]);
	}
});



