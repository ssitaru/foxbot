var Activated = 0;

var o_chaincmds = {
    '/activate': {
  	f: f_load,
		needsPerm: true,
	}
};

function f_chainloadInit() {
API.sendChat('/me foxbot waiting for activation!');
API.addEventListener(API.CHAT, f_chainChat);
} 
function f_chainChat(data) {
	if(data.type == "message"){
		for(var s in o_chaincmds) {
			if(data.message.toString().indexOf(s) != -1) { 
				if(o_chaincmds[s].needsPerm){
					if(API.getUser(data.fromID).permission.toString()>1){
						if(Activated != 1){
							o_chaincmds[s].f(data);
						}
						else{
							API.sendChat('/me Bot already active!');
						}
					}
					else{
						API.sendChat('@'+data.from+': Im sorry Dave, but Im afraid I cant let you do that.');
					}
				}			   
			}
		}	
	}
}

function f_load(data){
var scriptTag = document.createElement('script');
scriptTag.type = 'text/javascript';
scriptTag.src = 'https://raw.github.com/foxtrotfire/foxbot/master/foxbot.js';
document.body.appendChild(scriptTag);
var Activated = 1;
}

window.setTimeout(function(){f_chainloadInit();},10000);