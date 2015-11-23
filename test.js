var model = require('./lib/model2');


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

/*
model.userLookup('joe','joe', function(err, u){

	if(err){
	//	console.log(err.username, " ", err.password);
		console.log("user not found");
	}
	else{

		console.log(u.username, " " , u.password);
	}
});
*/


//model.userAdd('joe','joe');
/*
model.userAdd('joe2','joe2', function(err,u){
	if(err){
		console.log(err);
	}
	else{
		console.log(u.username,'sucessful', u.password);
	}
});
*/



model.userLookup('joe2','joe2', function(err,u){

	if(err){
		console.log(err);
	}
	else{
		console.log(u.username, " ", u.password);	
	}
});

model.userAdd('joe2', 'joe', function(err,u){

	if(err){
		
