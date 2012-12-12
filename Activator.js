var Activated = 0; 

var o_chaincmds = {
    '/activate': {
	needsPerm: true,
	}
};

function f_chainloadInit() {
	API.sendChat('/me Foxbot standing by, type /activate to initiate!');
	API.addEventListener(API.CHAT, f_chainChat);
}
function f_activecheck() {
	if(Activated != 1){
		API.sendChat("/me Hey staffmembers of this room! It would be very nice if you would type /activate to initiate me!");
	}
}
function f_chainChat(data) {
	if(data.type == "message"){
		for(var s in o_chaincmds)  {
			if(data.message.toString().indexOf(s) != -1) { 
				if(API.getUser(data.fromID).permission.toString()>1){
					if(Activated != 1){
						var scriptTag = document.createElement('script');
						scriptTag.type = 'text/javascript';
						scriptTag.src = 'https://raw.github.com/foxtrotfire/foxbot/master/foxbot.js';
						document.body.appendChild(scriptTag);
						Activated = 1;
						API.sendChat("/me Activating!");
					}
					else{
						API.sendChat('/me Bot already activated!');
					}
				}
				else{
					API.sendChat('@'+data.from+': Im sorry Dave, but Im afraid I cant let you do that.');
				}			   
			}
		}	
	}
}

window.setTimeout(function(){f_chainloadInit();},10000);
window.setTimeout(function(){f_activecheck();},70000);