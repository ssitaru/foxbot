var parser = true;
var o_chatcmds = {
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
//Will work on this. It's kind of annoying as it stands and doesn't allow for cool stuff
	if((data.type == "message") && (parser) ){
		for(var s in o_chatcmds) {
			if(data.message.toString().indexOf(s) != -1) { 
				if(o_chatcmds[s].needsPerm){
					if(API.getUser(data.fromID).permission.toString()>1){
						o_chatcmds[s].f(data);
					}
					else{
						API.sendChat('@'+data.from+': Im sorry Dave, but Im afraid I cant let you do that.');
					}
				}
				else{
					o_chatcmds[s].f(data);
				}
						   
			}
		}
	}
	
}
function f_load(data){
var parser = false;
var scriptTag = document.createElement('script');
scriptTag.type = 'text/javascript';
scriptTag.src = 'https://raw.github.com/foxtrotfire/foxbot/master/foxbot.js';
document.body.appendChild(scriptTag);
}
window.setTimeout(function(){f_chainloadInit();},10000);