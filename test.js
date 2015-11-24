var model = require('./lib/model');


var nextUID =0;


function user(name, pass, admin) {
  return {
      name: name,
      pass: pass,
      uid : ++nextUID,
      admin : admin
	};
}


//var u = user("joe2","joe",true);
model.makeUser =('joe','joe',true, function(err , usr);

//console.log(u.name, ' ' , u.pass, ' ', u.admin);

/*
model.userAdd(u,function( err, person) {

	if(err){
		console.log(err);
	}
	else{


		console.log(person);

	}
});
*/
