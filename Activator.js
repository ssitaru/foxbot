var o_settings = {
	Parser: false
};

var o_chaincmds = {
    '/chainload': {
  	f: f_load,
		needsPerm: true,
	}
};

function f_chainloadInit() {
API.sendChat('/me foxbot chainloader waiting for activation!');
API.addEventListener(API.CHAT, f_chainChat);
} 
function f_chainChat(data) {
	if(data.type == "message"){
		for(var s in o_chaincmds) {
			if(data.message.toString().indexOf(s) != -1) { 
				if(o_chaincmds[s].needsPerm){
					if(API.getUser(data.fromID).permission.toString()>1){
						if(o_settings.Parser){
							o_chaincmds[s].f(data);
						}
						else{
							API.sendChat('/me Bot already loaded!');
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
var o_settings.Parser = false;
var scriptTag = document.createElement('script');
scriptTag.type = 'text/javascript';
scriptTag.src = 'https://raw.github.com/foxtrotfire/foxbot/master/foxbot.js';
document.body.appendChild(scriptTag);
}

window.setTimeout(function(){f_chainloadInit();},10000);