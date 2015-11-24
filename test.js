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
/*
var j = 'joe is super cool';
var jj= '1';

//var u = user("joe2","joe",true);
model.addChat(j, jj,'video games', function(err , usr){
	if(err){
		console.log(err);
	}
	else{
		console.log(usr);
	}
});
*/

model.lookupChat('1','sports', function(err, chat) {	
	if(err) {
		console.log(err);
	}
	else{
		//chat.forEach(function(chat1){
		//	console.log(chat.field);
		//});
	//	console.log(chat.subject);
		chat.forEach(function(string) {
			console.log(string.field);
		});
		//console.log(chat[0]);
		//console.log(chat[1].field);
	}
});

//console.log(u.name, ' ' , u.pass, ' ', u.admin);

/*
var u = user('dan','dan',false);
model.userAdd(u,function( err, person) {

	if(err){
		console.log(err);
	}
	else{


		console.log(person);

	}
});
*/

