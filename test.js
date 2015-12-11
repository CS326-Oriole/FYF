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

var j = 'lets get this chat to work';
var jj= '1';
/*
//var u = user("joe2","joe",true);
model.addChat(j, '69','video games', 'xbox one', 'yolo', function(err , usr){
	if(err){
		console.log(err);
	}
	else{
		console.log(usr);
	}
});
*/
//<<<<<<< HEAD
/*
=======
model.countAnon(function(err,result){
	if(err){
		console.log('ERROR HAPPENED');
	}

	else {
		console.log("RESULT PRINTED");
		console.log(result);
	}
});

>>>>>>> cd7515c40f997a842834421d85ef2ff0624db5d3
*/
model.lookupChat('69','video games','xbox one', function(err, chat) {	
	if(err) {
		console.log(err);
	}
	else{
	//	chat.forEach(function(chat1){
	//		console.log(chat.field);
	//	});
	//	console.log(chat.subject);
	
			console.log(chat.field);
		
		//console.log(chat[0]);
		//console.log(chat[1].field);
	}
});
 
//console.log(u.name, ' ' , u.pass, ' ', u.admin);

/*
var u = user('joe','joe',true);
model.userAdd(u,function( err, person) {

	if(err){
		console.log(err);
	}
	else{


		console.log(person);

	}
});

*/
