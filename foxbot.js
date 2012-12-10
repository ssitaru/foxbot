////////////////////////////////////////////////////////////////
//	ATTENTION ALL DEVS. PLEASE READ THE BELOW MESSAGE. THANKS!
//[http://www.mixolydianmuse.com/plug.dj/add-ons/foxbot/message]
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//	foxbot.js :: A robot that automates certain functions for
//		plug.dj
//	Version 101.12.6.4.2
//	Copyright 2012 1NT, FoxtrotFire, Royal Soda, [tw].me
////////////////////////////////////////////////////////////////
//	Changelog v. 101.12.10.4.1
//	-Fixed setting time limit from chat (101.12.6.4.1)
//	-Added a spam filter that -doesn't work- actually works
//	 (101.12.6.4.1)
//		-They fixed part of the API!!!!!
//	-Added a few more easter eggs
//	-Welcome AND part messages now exist
//		-Part only exists for staff (including featured DJ)
//	-Added a current version global variable (type str)
//		-PLEASE update when you change code. Effects /about
//	-Edited formatting on announces and part messages
//	-Fixed two skipping errors
//		- parseInt("09") becomes 0. So 09 minutes becomes 0.
//			-Removed parseInt entirely, and just did "09"*60.
//			-Same thing with seconds. seconds*1
//		-Skips if longer than an hour
//	-Added a /fb that sends a link to our FB

//	-Changelogs now archived at
//[http:/www.mixolydianmuse.com/plug.dj/add-ons/foxbot/changelog]
//		-Sorry for breaking formatting (only for the links)
//		-Only include changelog for MOST RECENT VERSION
//	-Edited my message and put here
//[http://www.mixolydianmuse.com/plug.dj/add-ons/foxbot/message]
////////////////////////////////////////////////////////////////
// Old changelogs
//[http:/www.mixolydianmuse.com/plug.dj/add-ons/foxbot/changelog]
////////////////////////////////////////////////////////////////

//Begin Variable Declarations
var o_settings = {
    autoSkip: true,
    autoWoot: true,
    autoQueue: true,
    welcomeMsg: true,
    goodbyeMsg: true,
	maxSongLength: 8, // in mins.
    rules: 'Play EDM only, no Trap. 8 min max. Please show love and respect to everyone.',
	strictMode: false,
	i_timerID: null,
	f_autoSkip: f_long
};
var a_jokes = [];
var o_tmp = {};
var b_hasModRights = false;
var cur_Vers="101.12.10.4.2";

var o_chatcmds = {
	/////////////////////////////////////////////
	// chmod 555
	/////////////////////////////////////////////
	'/about': {
		f: f_about,
		needsPerm: false,
		visible: true
	},
	'/cookie': {
		f: f_cookie,
		needsPerm: false,
		visible: true
	},
	'/commands': {
		f: f_commands,
		needsPerm: false,
		visible: true
	},
	'/dance': {
		f: f_dance,
		needsPerm: false,
		visible: true
	},
	'/drink': {
		f: f_drink,
		needsPerm: false,
		visible: true
	},
	'/fb': {
		f: f_fb,
		needsPerm: false,
		visible: true
	},
	'/joke': {
		f: f_joke,
		needsPerm: false,
		visible: true
	},
	'/rules': {
		f: f_rule,
		needsPerm: false,
		visible: true
	},
	'/whymeh': {
		f: f_whymeh,
		needsPerm: false,
		visible: true
	},
	'hugs foxbot': {
		f: f_hug,
		needsPerm: false,
		visible: true
	},
	'rapes foxbot': {
		f: f_rape,
		needsPerm: false,
			visible: true
	},
	/////////////////////////////////////////////
	// chmod 554
	/////////////////////////////////////////////
	'/autostrict': {
		f: f_toggleStrictMode,
		needsPerm: true,
		visible: true
	},
	'/lock': {
		f: f_lock,
		needsPerm: true,
		needsLocalPerm: true,
		visible: true
	},
	'/retry': {
		f: f_retry,
		needsPerm: true,
		needsLocalPerm: true,
		visible: true
	},
	'/set': {
		f: f_set,
		needsPerm: true,
		visible: true
	},
	'/skip': {
		f: f_skip,
		needsPerm: true,
		needsLocalPerm: true,
		visible: true
	},
	'/test': {
		f: f_test,
		needsPerm: true,
		visible: true
	},	
	'/unlock': {
		f: f_unlock,
		needsPerm: true,
		needsLocalPerm: true,
		visible: true
	},
	////////////////////////////////////////////
	// chmod 111
	////////////////////////////////////////////
	'brb': {
		f: f_brb,
		needsPerm: false,
		visible: false
	},
	'g2g': {
		f: f_userIntentLeave,
		needsPerm: false,
		visible: false
	},
	'gtg': {
		f: f_userIntentLeave,
		needsPerm: false,
		visible: false
	},
	'got2go': {
		f: f_userIntentLeave,
		needsPerm: false,
		visible: false
	},
	'gotta go': {
		f: f_userIntentLeave,
		needsPerm: false,
		visible: false
	},
	'no u': {
		f: f_nou,
		needsPerm: false,
		visible: false
	}, 
	'no U': {
		f: f_nou,
		needsPerm: false,
		visible: false
	}, 
	'No u': {
		f: f_nou,
		needsPerm: false,
		visible: false
	},
	'No U': {
		f: f_nou,
		needsPerm: false,
		visible: false
	},
	'NO U': {
		f: f_nou,
		needsPerm: false,
		visible: false
	},
	'plug.dj/': {
		f: f_nospam,
		needsPerm: false,
		visible: false
	},	
	'suidobashijuko': {
		f: f_suidobashijuko,
		needsPerm: false,
		visible: false
	}, 
	////////////////////////////////////////////
	// chmod 110
	////////////////////////////////////////////
	'/kill': {
		f: f_reload,
		needsPerm: true,
		visible: false
	},
	////////////////////////////////////////////
	// chmod 100 ::TEST COMMANDS
	////////////////////////////////////////////
};
var a_jokes = ["\
Q. Why did the man put his money in the freezer? \
A. He wanted cold hard cash!\
","\
Heh, javascript\
","\
Q. What did the porcupine say to the cactus? \
A. \"Is that you mommy? \"\
","\
Q. What do you get when you cross a snowman with a vampire? \
A. Frostbite.\
","\
Q. How do crazy people go through the forest? \
A. They take the psycho path.\
","\
Q. What do prisoners use to call each other? \
A. Cell phones.\
","\
Q. What do you get from a pampered cow? \
A. Spoiled milk.\
","\
Q. Where do polar bears vote? \
A. The North Poll\
","\
Q. What did Geronimo say when he jumped out of the airplane? \
A. ME!!!\
","\
Q. Where do snowmen keep their money? \
A. In snow banks.\
","\
Q. What's brown and sticky? \
A. A stick.\
","\
Q. Why do sea-gulls fly over the sea? \
A. Because if they flew over the bay they would be bagels!\
","\
Q. What dog keeps the best time? \
A. A watch dog.\
","\
Q. Why did the tomato turn red? \
A. It saw the salad dressing!\
","\
Q. What did the grape do when it got stepped on? \
A. It let out a little wine!\
","\
Q. How do you make a tissue dance? \
A. Put a little boogey in it!\
","\
Q. Where do bees go to the bathroom? \
A. At the BP station!\
","\
Q. What did the judge say when the skunk walked in the court room? \
A. Odor in the court.\
","\
Q. What did the water say to the boat? \
A. Nothing, it just waved.\
","\
Q. What did the fish say when he swam into the wall? \
A. Dam!\
","\
Q. Why don't skeletons fight each other? \
A. They don't have the guts.\
","\
Q. What has four legs but can't walk? \
A. A table!\
","\
Q. Why did the turtle cross the road? \
A. To get to the Shell station!\
","\
Q. What did the ground say to the earthquake? \
A. You crack me up!\
","\
Q. What do you get when you cross a cow and a duck? \
A. Milk and quackers!\
","\
Q. Why did the elephant eat the candle? \
A. He wanted a light snack!\
","\
Q. Why is the letter \"G\" scary? \
A. It turns a host into a ghost\
","\
Q. What has 4 eyes but no face? \
A. Mississippi!\
","\
Q. What did the spider do on the computer? \
A. Made a website!\
","\
Q. What letters are not in the alphabet? \
A. The ones in the mail, of course!\
","\
Q. Why was 6 afraid of 7? \
A. Because 789!\
","\
Q. Why did the cookie go to the hospital? \
A. Because it felt crummy.\
","\
Q. How do you know carrots are good for your eyes? \
A. Because you never see rabbits wearing glasses!\
","\
Q. What do you call a pony with a sore throat? \
A. A little horse\
","\
Q. What do you call cheese that is not yours? \
A. Nacho Cheese\
","\
Q. Why did the sheep say \"moo\"? \
A. It was learning a new language!\
","\
Q. What streets do ghosts haunt? \
A. Dead ends!\
","\
Q. What is an astronaut's favorite place on a computer? \
A. The Space bar!\
","\
Q. What exam do young witches have to pass? \
A. A spell-ing test!\
","\
Q. Why did the boy eat his homework? \
A. Because his teacher said it was a piece of cake!\
","\
Q. Why is Basketball such a messy sport? \
A. Because you dribble on the floor!\
","\
Q. What is the best day to go to the beach? \
A. Sunday, of course!\
","\
Q. What bow can't be tied? \
A. A rainbow!\
","\
Q. What happens if you eat yeast and shoe polish? \
A. Every morning you'll rise and shine!\
","\
Q. What does a teddy bear put in his house? \
A. Fur-niture!\
","\
Q.What season is it when you are on a trampoline? \
A.Spring time.\
","\
Q. What happens to cows during an earthquake? \
A. They give milk shakes!\
","\
Q. Why did the jelly wobble? \
A. Because it saw the milk shake!\
","\
Q. What do you call a girl who is always in the bookies? \
A. Betty!\
","\
Q. Where do cows go on holiday? \
A. Moo York\
","\
Q. Where did the computer go to dance? \
A. To a disc-o.\
","\
Q. What do you call a man who rolls in the leaves? \
A. Russel\
","\
Q. What has one head, one foot and four legs? \
A. A Bed\
","\
Q. Why didn't the chicken cross the road? \
A. He was a chicken.\
","\
Q. What is the difference between a school teacher and a train? \
A. The teacher says spit your gum out and the train says \"chew chew chew\".\
","\
Q. Why did the birdie go to the hospital? \
A. To get a tweetment.\
","\
Q. What do you call someone who is afraid of Santa? \
A. A Clausterphobic\
","\
Q. Why was the guy looking for the food on his friend? \
A. Because his friend said its on me.\
","\
Q. Did you hear the joke about the roof? \
A. Never mind, it's over your head!\
","\
Q. What do you call a cow eating grass in a paddock? \
A. A lawn mooer\
","\
Q. Why didn't the skeleton go to the dance? \
A. Because he had no-body to go with.\
","\
Q. What did the penny say to the other penny? \
A. We make perfect cents.\
","\
Q. Why did the man with one hand cross the road? \
A. To get to the second hand shop.\
","\
Q. Why did the picture go to jail? \
A. Because it was framed.\
","\
Q. What are two things you cannot have for breakfast? \
A. Lunch and dinner.\
","\
Q. Why did the boy sprinkle sugar on his pillow before he went to sleep? \
A. So he could have sweet dreams.\
","\
Q. Why did the robber take a bath? \
A. Because he wanted to make a clean getaway.\
","\
Q. What did the judge say to the dentist? \
A. Do you swear to pull the tooth, the whole tooth and nothing but the tooth.\
","\
Q. What do you call a bear with no socks on? \
A. Bare-foot.\
","\
Q. What can you serve but never eat? \
A. A volleyball.\
","\
Q. What did one teddy bear say to the other teddy bear when he offered him some dessert? \
A. No thank you, I am stuffed.\
","\
Q. What kind of shoes do all spies wear? \
A. Sneakers.\
","\
Q. What did one wall say to the other wall? \
A. I'll meet you at the corner.\
","\
Q. Why did the soccer player bring string to the game? \
A. So he could tie the score.\
","\
Q. Why is a baseball team similar to a muffin? \
A. They both depend on the batter.\
","\
Q. What did the alien say to the garden? \
A. Take me to your weeder.\
","\
Q. Have you heard the joke about the butter? \
A. I better not tell you, it might spread.\
","\
Q. How do baseball players stay cool? \
A. Sit next to their fans.\
","\
Q. What gets wetter the more it dries? \
A. A towel.\
","\
Q. Why was the math book sad? \
A. Because it had too many problems.\
","\
Q. What runs but doesn't get anywhere? \
A. A refrigerator.\
","\
Q. How do you catch a squirrel? \
A. Climb a tree and act like a nut!\
","\
Q. What do you do with a blue whale? \
A. Try to cheer him up! \
","\
Q. How do you communicate with a fish? \
A. Drop him a line!\
","\
Q. Where do sheep go to get haircuts? \
A. To the Baa Baa shop!\
","\
Q. What does a shark eat with peanut butter? \
A. Jellyfish!\
","\
Q. Why was the pelican kicked out of the hotel? \
A. Because he had a big bill!\
","\
Q. What do cats eat for breakfast? \
A. Mice Crispies!\
","\
Q. What kind of dog tells time? \
A. A watch dog!\
","\
Q. Why can't a leopard hide? \
A. Because he's always spotted!\
","\
Q. What do you give a dog with a fever? \
A. Mustard, its the best thing for a hot dog!\
","\
Q. What do you get when you cross a cat with a lemon? \
A. A sour puss!\
","\
Q. Why do birds fly south for the winter? \
A. Its easier than walking!\
","\
Q. What kind of key opens a banana? \
A. A monkey!\
","\
Q. How do you know that carrots are good for your eyesight? \
A. Have you ever seen a rabbit wearing glasses? \
","\
Q. Why does a hummingbird hum? \
A. It doesn't know the words!\
","\
Q. Why are some fish at the bottom of the ocean? \
A. Because they dropped out of school!\
","\
Q. What goes up and down but doesn't move? \
A. The temperature!\
","\
Q. What two days of the week start with the letter \"T\"? \
A. Today and Tomorrow!\
","\
Q. Which weighs more, a ton of feathers or a ton of bricks? \
A. Neither, they both weigh a ton!\
","\
Q. What has four eyes but can't see? \
A. Mississippi!\
","\
Q. Where does wood come from? \
A. A guy named woody.\
","\
Q. What has one horn and gives milk\
A. A milk truck.\
","\
Q. Where do bulls get their messages\
A. On a bull-etin board.\
","\
Q. What do bulls do when they go shopping? \
A. They CHARGE!\
","\
Q. Why were the giant's fingers only eleven inches long? \
A. Because if they were twelve inches long, they'd be a foot.\
","\
Q. What is invisible and smells like carrots? \
A. Bunny Farts!\
","\
Q. What runs but can't walk? \
A. The faucet!\
","\
Q. What kind of bed does a mermaid sleep in? \
A. A water bed!\
","\
Q. What kind of crackers do firemen like in their soup? \
A. Firecrackers!\
","\
Q. What did the teddy bear say when he was offered dessert? \
A. No thanks, I'm stuffed!\
","\
Q. Why did the barber win the race? \
A. Because he took a short cut.\
","\
Q. What's taken before you get it? \
A. Your picture.\
","\
Q. Why did the tree go to the dentist? \
A. To get a root canal.\
","\
Q. Why did the child study in the airplane? \
A. He wanted a higher education!\
","\
Q. Why was the broom late? \
A. It over swept!\
","\
Q. What did the fireman's wife get for Christmas? \
A. A ladder in her stocking!\
","\
Q. What did one virus say to another? \
A. Stay away, I think I've got penicillin!\
","\
Q. What did the tie say to the hat? \
A. You go on ahead and I'll hang around!\
","\
Q. What pet makes the loudest noise? \
A. A trum-pet!\
","\
Q. What is a tornado? \
A. Mother nature doing the twist!\
","\
Q. Why did the boy tiptoe past the medicine cabinet? \
A. He didn't want to wake the sleeping pills!\
","\
Q. How do you tease fruit? \
A. Banananananananana!\
","\
Q. Why did Goofy put a clock under his desk? \
A. Because he wanted to work over-time!\
","\
Q. Why did Tommy throw the clock out of the window? \
A. Because he wanted to see time fly!\
","\
Q. How does a moulded fruit-flavoured dessert answer the phone? \
A. Jell-o!\
","\
Q. When do you stop at green and go at red? \
A. When you're eating a watermelon!\
","\
Q. How did the farmer mend his pants? \
A. With cabbage patches!\
","\
Q. Why don't they serve chocolate in prison? \
A. Because it makes you break out!\
","\
Q. What do you call artificial spaghetti? \
A. Mockaroni!\
","\
Q. What happens to a hamburger that misses a lot of school? \
A. He has a lot of ketchup time!\
","\
Q. Why did the man at the orange juice factory lose his job? \
A. He couldn't concentrate!\
","\
Q. How do you repair a broken tomato? \
A. Tomato Paste!\
","\
Q. Why did the baby strawberry cry? \
A. Because his parents were in a jam!\
","\
Q. What did the hamburger name his daughter? \
A. Patty!\
","\
Q. What kind of egg did the bad chicken lay? \
A. A deviled egg!\
","\
Q. What kind of key opens the door on Thanksgiving? \
A. A turkey!\
","\
Q. What kind of cake do you get at a cafeteria? \
A. A stomach-cake!\
","\
Q. Why did the cookie go to the hospital? \
A. He felt crummy!\
","\
Q. When does a cart come before a horse? \
A. In the dictionary!\
","\
Q. Why were the teacher's eyes crossed? \
A. She couldn't control her pupils!\
","\
Q. What do you get when you put a fish and an elephant together? \
A. Swimming trunks.\
","\
Q. What goes up when the rain comes down? \
A. An umbrella.\
","\
Q. What disappears when you stand up? \
A. Your lap.\
","\
Q. What did the big firecracker say to the little firecracker? \
A. My pop is bigger than yours.\
","\
Q. What did the big chimney say to the small chimney? \
A. You are too little to smoke.\
","\
Q. What do you call a surgeon with eight arms? \
A. A doctopus!\
","\
Q. Why did the teacher jump into the lake? \
A. Because she wanted to test the waters!\
","\
Q. Why did the belt go to jail? \
A. Because it held up a pair of pants!\
","\
Q. What is the center of gravity? \
A. The letter V!\
","\
Q. What did the stamp say to the envelope? \
A. Stick with me and we will go places!\
","\
Q. What sort of star is dangerous? \
A. A shooting star!\
","\
Q. Why did the teacher write the lesson on the windows? \
A. He wanted the lesson to be very clear!\
","\
Q. What kind of lights did Noah use on the Ark? \
A. Flood lights!\
","\
Q. What do computers do when they get hungry? \
A. They eat chips!\
","\
Q. Why don't you see giraffes in elementary school? \
A. Because they're all in High School!\
","\
Q. Which is the longest word in the dictionary? \
A. \"Smiles\", because there is a mile between each \"s\"!\
","\
Q. Which month do soldiers hate most? \
A. The month of March!\
","\
Q. What did the painter say to the wall? \
A. One more crack like that and I'll plaster you!\
","\
Q. Why do golfers wear two pairs of pants? \
A. In case they get a hole in one!\
","\
Q. What did the the tie say to the hat? \
A. You go on a head, I'll just hang around!\
","\
Q. What would you call two banana skins? \
A. A pair of slippers.\
"];

//Begin Function Declarations
function f_foxbotInit() {
	API.sendChat('/me This user is now running foxbot!');
	b_hasModRights = API.getSelf().permission.toString()>1;
	// now all the event listeners
	API.addEventListener(API.USER_JOIN, join);
	API.addEventListener(API.USER_LEAVE, leave);
	API.addEventListener("curateUpdate", f_curate);
	API.addEventListener(API.CHAT, f_checkChat);
	API.addEventListener(API.DJ_ADVANCE, f_djAdvance);
	// mute the player
	Playback.setVolume(0);
}
function join(user){
	if(user.id=="50aeb20fc3b97a2cb4c2d804"){
		API.sendChat("/me :: All hail our Extreme Overlord, @"+user.username+" ! Welcome back master!");
	}
	else if(user.permission.toString()>1){
		API.sendChat("/me :: A wild moderator appears! Wait, no. We know this one. The moderator's name is "+user.username+" . Well, that was anticlimactic. Now back to regular programming");
	}
	else{
		API.sendChat("/me :: Welcome @" + user.username + " to " + Models.room.data.name + ". Thank you for plugging in!");
		//window.setTimeout(function(){f_rule({from: user.username});}, 1000); //Uncomment to send rules
	}
}


function leave(user){
	if(user.id=="50aeb20fc3b97a2cb4c2d804"){
		API.sendChat("/me :: All hail our Extreme Overlord, @"+user.username+" ! Thank you for gracing us with your presence!");
	}
	else if(user.permission.toString()>1){
		API.sendChat("/me :: Bye bye, Mr. Moderator, sir! Bye @"+user.username+" !");
	}
	else if(user.permission.toString()==1){
		API.sendChat("/me :: [Featured DJ]"+user.username+" has left the room");
	}
}


function f_curate(data){
	API.sendChat("/me " + data.user.username + " loves this track!");
}
function f_commands(data){
	var cmds = '';
	for(var cmd in o_chatcmds){
		if(o_chatcmds[cmd].visible){
			cmds = cmds + cmd + ', ';
		}
	}
	cmds_clean = cmds.slice(0, -2);
	API.sendChat('/me Commands currently supported are: '+cmds_clean);
}

function f_skip(data) {
    API.sendChat('/me Current DJ has been skipped by operator!');
    window.setTimeout(function(){new ModerationForceSkipService(Models.room.data.historyID);}, 1000);
	window.setTimeout(function(){API.sendChat("/me Your song got skipped because it was either not on genre, overplayed or (the outro) was too long.");}, 2000);
}
function f_long() {
	API.sendChat('@'+o_tmp.username+' Your song has played for '+o_settings.maxSongLength+' minutes and will now be skipped!');
    window.setTimeout(function(){new ModerationForceSkipService(Models.room.data.historyID);}, 1000);
}
function f_lock(data) {
        API.sendChat('/me Dj Booth has been locked by operator!');
        rpcGW.execute('room.update_options', null, Models.room.data.id,
              {
                name: Models.room.data.name,
                description: Models.room.data.description,
                boothLocked: true,
                waitListEnabled: Models.room.data.waitListEnabled,
                maxPlays: Models.room.data.maxPlays,
                maxDJs:5
              }
		);
}
function f_unlock(data){
	API.sendChat('/me Dj Booth has been unlocked by operator!');
    rpcGW.execute('room.update_options', null, Models.room.data.id,
		{
			name: Models.room.data.name,
			description: Models.room.data.description,
			boothLocked: false,
			waitListEnabled: Models.room.data.waitListEnabled,
			maxPlays: Models.room.data.maxPlays,
			maxDJs:5
		}
	);
}
function f_retry(data) {
	API.sendChat('/me Please choose a different song and try again.');
	window.setTimeout(function(){ rpcGW.execute('room.update_options', null, Models.room.data.id,
		{
			name: Models.room.data.name,
			description: Models.room.data.description,
			boothLocked: true,
			waitListEnabled: Models.room.data.waitListEnabled,
			maxPlays: Models.room.data.maxPlays,
			maxDJs:5
		}
	);}, 1000);
	window.setTimeout(function(){new ModerationForceSkipService(Models.room.data.historyID);}, 3000);
	window.setTimeout(function(){rpcGW.execute('room.update_options', null, Models.room.data.id,
		{
			name: Models.room.data.name,
			description: Models.room.data.description,
			boothLocked: false,
			waitListEnabled: Models.room.data.waitListEnabled,
			maxPlays: Models.room.data.maxPlays,
			maxDJs:5
		}
	);}, 5000); //This line is part of the LAST window.setTimeout command
}	
function f_cookie(data){
	API.sendChat('@'+data.from+': here you go!');
	window.setTimeout(function(){API.sendChat('/me tosses a cookie at '+data.from);}, 500);
}
function f_rape(data){
	API.sendChat('/me slays @'+data.from+'!');
}
function f_hug(data){
	API.sendChat('/me hugs @'+data.from+'!');
}
function f_dance(data){
	API.sendChat('/me Is on Fire!');
}
function f_rule(data) {
	API.sendChat('/me Rules: '+o_settings.rules);
}
function f_about(data) {
	API.sendChat('/me [foxbot v'+cur_Vers+'] by 1NT, foxtrotfire, royal soda, [tw].me. Type in "/commands" to find out how to interact with me.');
}
function f_brb(data) {
	API.sendChat('@'+data.from+' Hurry back!!');
}
function f_nou(data) {
	API.sendChat('@'+data.from+' No U!');
}
function f_drink(data) {
	switch(data.fromID){
		case "50aeb0af3e083e18fa2d5d6e":
			//SartheBoat
			API.sendChat('Some gasoline to fuel the @'+data.from+' ! The ship has been refueled, captain!');
			break;
		case "50aeb5e83e083e18fa2e20a0":
			//WJG
			API.sendChat("Here's your hard cider, @"+data.from+" . Enjoy!");
			break;
		case "50aeb07a877b9217e2fbffb2":
			//Guess who? It's already in there
			API.sendChat("The master has spoken! One Absolut Vodka for @"+data.from+" !");
			break;
		case "50aeb020d6e4a94f774740a9":
			//foxtrot
			API.sendChat("Sorry, we're all out of alcohol. Here's your apple juice, @"+data.from+" .");
			break;
		case "50aeb3fa3e083e18fa2ddbed":
			//FramedTKE
			API.sendChat("Dang, you were framed? Here's a jagerbomb to help you get through the night, @"+data.from+" . All your drinks are on the house!");
			break;
		case "50aeb3ea3e083e18fa2dd996":
			//[SOL]
			API.sendChat("Here's your scotch, Mr. "+data.from+" , sir.");
			break;
		case "50aeb3fd96fba52c3ca0d0a6":
			//krstenalex
			API.sendChat("Rum delivered by Ms. Jolie? Hm. I can do the rum but I don't know about Ms. Jolie. Ah, speak of the devil, she just walked through the door. Here is rum your with a side of Angelina Jolie, @"+data.from+" !");
			break;
		case "50aeb3fd96fba52c3ca0d0c2":
			//micro
			API.sendChat("Here's some tequila and chocolate milk. Down one drink, or down both. The choice is yours, "+data.from+" .");
			break;
		case "50aeb3aa877b9217e2fc8036":
			//CopyLeft
			API.sendChat("Here is a bloody mary, with some actual blood from Mary... Please refrain from ordering a drink, @"+data.from+" , as we are running out of people named Mary...");
			break;
		case "50aeafe696fba52c3ca02f1b":
			//Linear Logic
			API.sendChat("Ah, Mr. @"+data.from+" ! Here's your mojito, good sir!");
			break;
		case "50aeb301c3b97a2cb4c2fa57":
			//Mamushka
			API.sendChat("Shirley Temple? Here you go! Enjoy, "+data.from+" !");
			break;
		case "50aeb310d6e4a94f7747a527":
			//Wobbles
			API.sendChat("Here's your Apple Martini, Mr @"+data.from+" . Enjoy!");
			break;
		case "50aeb402877b9217e2fc8dcf":
			//Syvel
			API.sendChat("And a Dunkel Hefeweizen for @"+data.from+" !");
			break;
		case "50aeb3fd877b9217e2fc8d13":
			//DJ MC Wheelchair
			API.sendChat("Here's your bottle of Jack, "+data.from+" . When you leave for the night, remember to come back!");
			break;
		case "50aeb20fc3b97a2cb4c2d804":
			// Bass Addict
			API.sendChat("The Supreme Overlord wants cranberry juice! What are you doing? Yes, the Supreme Overlord. Yes, @"+data.from+"Hurry up. Get cranberry juice. Yes, now.");
			API.sendchat("Sorry for the wait Mr. Supreme Overlord, sir. *Hands @"+data.from+" a glass of cranberry juice.* There is more in the back if you need it, Mr. Supreme Overlord, sir.");
			break;
		case "50c22bc9877b92490a396b28":
			//Acidus. He gets a special one because he helped with the code. No, he did not get full code. Just one tiny snippet.
			API.sendChat("Here is your bottle of Valmiermuiza, "+data.from+" . You get a lifetime supply, on the house. So feel free to grab another!");
			break;
		case "50bd6f1596fba554c159e1ab":
			//[tw].me
			API.sendChat("Hahaha @"+data.from+", get back to work! No drink for you!");
			break;
		case "50aeb04ac3b97a2cb4c29c3c":
			//[tw]Mixolydian Muse
			API.sendChat("Your usual? Here's your Gold Medal Taiwan Beer, "+data.from+" !");
			break;
		case "50aeb02ad6e4a94f77474299":
			//[F]oxtrot[Q]ontrol
			API.sendChat("Here's your Rum @"+data.from+", Yarr matey!");
			break;
		case "50bfaa69c3b97a770bf85bbc":
			//97#DJMnC#79
			API.sendChat("Here's your Coca Cola @"+data.from+", Enjoy!");
			break;
		default:
			API.sendChat('Here is your strong alcoholic beverage @'+data.from+' , enjoy!');
	}
}
function f_whymeh(data) {
	API.sendChat('/me Please reserve mehs for songs that are A: Troll songs, B: Truly terrible, or C: Overplayed. If you are simply not feeling a song remain neutral.');
}

function f_joke(data) {
    n = Math.floor(Math.random()*a_jokes.length);
    API.sendChat('/me Joke #'+n+': '+a_jokes[n]);
}
function f_test(data) {
	s = '[WM: '+o_settings.welcomeMsg+', GM: '+o_settings.goodbyeMsg+', AS: '+o_settings.autoSkip+', MSL: '+o_settings.maxSongLength+', AW: '+o_settings.autoWoot+', AQ: '+o_settings.autoQueue+', M: '+b_hasModRights+']';
	API.sendChat('/me Systems are online and functional! '+s);
}
function f_reload(data) {
    API.sendChat('/me [TERMINATING]');
    window.setTimeout(function(){location.reload();}, 1000);
}
function f_userIntentLeave(data) {
	API.sendChat('@'+data.from+': we hope you enjoyed your stay, please visit us again soon!');
}
function f_toggleStrictMode(data) {
	if(o_settings.strictMode == false) {
		API.sendChat('/me Strict mode now enabled');
		o_settings.strictMode = true;
	}
	else {
		API.sendChat('/me Strict mode now disabled');
		o_settings.strictMode = false;
	}
}
function f_set(data) {
    var args = f_getArgs(data.message);
    var setValue = args[1];
    var s;
	
    if((setValue == 'true') || (setValue == 'false')){
		s = 'o_settings.'+args[0]+' = '+setValue+';';
	}
	else { // we're dealing with strings
        setValue = setValue.replace("'", "\\'");
		s = 'o_settings.'+args[0]+' = \''+setValue+'\';';
    }
	eval(s);
	API.sendChat('/me '+args[0]+' now '+eval('o_settings.'+args[0]));
}

function f_checkChat(data) {
//Will work on this. It's kind of annoying as it stands and doesn't allow for cool stuff
	if((data.type == "message") && (data.fromID != API.getSelf().id) ) {
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
    
function f_getArgs(s) {
    var a_s = s.split(' '); // [0] = <command>; [1-n] args
    var s_real = '';
    for(var i = 1; i < a_s.length; i++) {
        s_real += ' ' + a_s[i];
    }
    
    a_opts = s_real.split(';');
    
    return a_opts;
    
}

function f_djAdvance(obj){
	var i_timeRem = -1;
	s_timeRem = jQuery('#time-remaining-value').text();
	// wait on music to load & time to appear
	while(s_timeRem == null){
		s_timeRem = jQuery('#time-remaining-value').text();
	}
	a_timeRem = s_timeRem.toString().split(':');
	if (a_timeRem.length<3){
	//some redundancies added because JS and typecasting randomly broke
		i_timeRem = parseInt(a_timeRem[0]*60) + parseInt(a_timeRem[1]*1);
	}
	// auto-skip code:
	// clear previous timeout
	window.clearTimeout(o_settings.i_timerID);
	// if autoskip enabled & song over time limit
	if(o_settings.autoSkip && ((i_timeRem > (o_settings.maxSongLength)*60)|| (a_timeRem.length>2))){
		//strict mode, skip immediately
		if(o_settings.strictMode){
			var o_djs = API.getDJs();
		o_tmp.username = o_djs[0].username;
		f_long();
		}
		else {
		// normal mode (and if track length more than <maxSongLength>): set a timer for <maxSongLength> mins to skip the track
			var o_djs = API.getDJs();
			o_tmp.username = o_djs[0].username;
			API.sendChat('@'+o_tmp.username+' [WARNING] Sorry, your song is over the allowed time limit and will be automagically skipped after '+o_settings.maxSongLength+' minutes.');
			o_settings.i_timerID = window.setTimeout(o_settings.f_autoSkip, (o_settings.maxSongLength)*60*1000);
		}
	}

	// auto-woot the track if enabled [BROKEN]
	if(o_settings.autoWoot) {
		jQuery("#button-vote-positive").click();
	}


	// autoqueue if enabled [BROKEN]
	if(o_settings.b_autoQueue) {
		if(jQuery('#button-dj-waitlist-join').css('display') != 'none') {
		jQuery('#button-dj-waitlist-join').click();
		}
	}
}
function f_suidobashijuko(data){
	API.sendChat("Why are we talking about the suidobashijuko again? Are you going to buy me one?");
}
function f_nospam(data){
	API.sendChat("Hey, "+data.from+" ! Please do not adverise plug.dj rooms in here, thanks!");
	API.moderateDeleteChat(data.chatID);
}
function f_fb(data){
	API.sendChat("Hey, "+data.from+" , our fb page is located at: http://goo.gl/vpHWz");
}
f_foxbotInit();