var Activated = 0;
var o_chatcmds = {
    '/activate': {
	needsPerm: true,
	}
};

function f_chainloadInit() {
API.sendChat('/me Foxbot waiting for activation!');
API.addEventListener(API.CHAT, f_chainChat);
} 
function f_chainChat(data) {
	if(data.type == "message"){
		for(var s in o_chatcmds)  {
			if(data.message.toString().indexOf(s) != -1) { 
				if(API.getUser(data.fromID).permission.toString()>1){
					if(Activated != 1){
						var Activated = 1;
						var scriptTag = document.createElement('script');
						scriptTag.type = 'text/javascript';
						scriptTag.src = 'https://raw.github.com/foxtrotfire/foxbot/master/foxbot.js';
						document.body.appendChild(scriptTag);
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

window.setTimeout(function(){f_chainloadInit();},10000);