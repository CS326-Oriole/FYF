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


var u = user("joe","joe",true);


model.listAnon(function( err, person) {

	if(err){
		console.log("j");
	}
	else{


		person.forEach(function(err,doc) {
		console.log(doc.name);
		});

	}
});
