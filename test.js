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
var y = 'yeah great idea';
var jj= '1';

//var u = user("joe2","joe",true);
/*
model.addChat(y, '70','video games', 'xbox one', 'yolo', function(err , usr){
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
var th ;
model.lookupChat('videogames','asdf', function(err, chat) {	
	if(err) {
		console.log(err);
	}
	else{
		/*
		for(var key in chat){

			console.log(chat[key]);
		}
		cb(undefined, "yay");
		
	//		console.log(chat.foreach(chat.field));
		*/
	var len = chat.length;	
		console.log(chat);
		
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
