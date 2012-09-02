var b_autoSkip = true;
var a_jokes = Array(); 

 window.setTimeout(function(){API.sendChat('/me [foxbot] Online!');}, 5000); 
 
	API.addEventListener(API.USER_JOIN, join);
    function join(user)
    {
    API.sendChat("[foxbot] @" + user.username + " Enjoy your stay in the Super Awesome Electronic Room! Use /commands to get a list of my commands.")
    }
     
    API.addEventListener(API.USER_LEAVE, leave);
    function leave(user)
    {
    API.sendChat("/me [foxbot] " + user.username + " left the room")
    }
	
	API.addEventListener("curateUpdate", f_curate); 
	function f_curate(data)
	{ 
	API.sendChat("/me [foxbot] " + data.user.username + " curated this track") 
	}
    
function f_commands(data) {
        API.sendChat('/me [foxbot] Commands currently supported are: /commands, /rules, /cookie, /lock, /unlock, /skip, /retry, rapes foxbot, hugs foxbot, brb, /about, /autoskip, /joke, /test, /reload');
}

function f_skip(data) {
        API.sendChat('/me [foxbot] Current DJ has been skipped by operator!');
        window.setTimeout(function(){new ModerationForceSkipService(Models.room.data.historyID);}, 1000);
		window.setTimeout(function(){API.sendChat("/me [foxbot] Your song got skipped because it was either not on genre, overplayed or (the outro) was too long.");}, 2000);
}
function f_long(data) {
        window.setTimeout(function(){new ModerationForceSkipService(Models.room.data.historyID);}, 1000);
		window.setTimeout(function(){API.sendChat('/me [foxbot] Current DJ got skipped by foxbot!');}, 1500);
}
function f_lock(data) {
        API.sendChat('/me [foxbot] Dj Booth has been locked by operator!');
        rpcGW.execute('room.update_options', null, Models.room.data.id,
              {
                name: Models.room.data.name,
                description: Models.room.data.description,
                boothLocked: true,
                waitListEnabled: Models.room.data.waitListEnabled,
                maxPlays: Models.room.data.maxPlays,
                maxDJs:5
              });
}
function f_unlock(data) {
        API.sendChat('/me [foxbot] Dj Booth has been unlocked by operator!');
        rpcGW.execute('room.update_options', null, Models.room.data.id,
              {
                name: Models.room.data.name,
                description: Models.room.data.description,
                boothLocked: false,
                waitListEnabled: Models.room.data.waitListEnabled,
                maxPlays: Models.room.data.maxPlays,
                maxDJs:5
              });
} 
function f_retry(data) {
		API.sendChat('/me [foxbot] Please choose a different song and try again.');
		window.setTimeout(function(){ rpcGW.execute('room.update_options', null, Models.room.data.id,
              {
                name: Models.room.data.name,
                description: Models.room.data.description,
                boothLocked: true,
                waitListEnabled: Models.room.data.waitListEnabled,
                maxPlays: Models.room.data.maxPlays,
                maxDJs:5
              });}, 1000);
		window.setTimeout(function(){new ModerationForceSkipService(Models.room.data.historyID);}, 3000);
		window.setTimeout(function(){rpcGW.execute('room.update_options', null, Models.room.data.id,
              {
                name: Models.room.data.name,
                description: Models.room.data.description,
                boothLocked: false,
                waitListEnabled: Models.room.data.waitListEnabled,
                maxPlays: Models.room.data.maxPlays,
                maxDJs:5
              });}, 5000);
}		
function f_cookie(data) {
        API.sendChat('[foxbot] @'+data.from+': here you go!');
        window.setTimeout(function(){API.sendChat('/me [foxbot] tosses a cookie at @'+data.from);}, 500);
}
function f_rape(data) {
        API.sendChat('/me [foxbot] slays @'+data.from+'!');
}

function f_hug(data) {
        API.sendChat('/me [foxbot] hugs @'+data.from+'!');
}
function f_rule(data) {
        API.sendChat('[foxbot] @'+data.from+' Rules: No song over 10 minutes long. Only play EDM, other songs will be skipped. Dont play overplayed songs, if your song is deemed overplayed you get a second chance.');
}
function f_about(data) {
		API.sendChat('/me [foxbot] Hello, I am foxbot. I am here to help the moderators and to entertain the crowd. For a list of my commands please type /commands. Copyright 1NT and FoxtrotFire .(contact one of us for suggestions)');
}
function f_brb(data) {
		API.sendChat('[foxbot] @'+data.from+' Come back soon!');
}

function f_toggleAutoskip(data) {
	if(b_autoSkip == false) {
		API.sendChat('/me [foxbot] Autoskip now enabled');
		b_autoSkip = true;
	} else {
		API.sendChat('/me [foxbot] Autoskip now disabled');
		b_autoSkip = false;
	}
	
}
function f_joke(data) {
        n = Math.floor(Math.random()*a_jokes.length);
       
        API.sendChat('/me [foxbot] Joke #'+n+': '+a_jokes[n]);
}
function f_test(data) {
		API.sendChat('/me [foxbot] Systems are online and functional!');
}
function f_reload(data) {
		API.sendChat('/me [foxbot] System Reloading!');
		window.setTimeout(function(){location.reload();}, 1000);
}
 
var o_chatcmds = {
        '/commands': {
                f: f_commands,
                needsPerm: false
        },
        '/skip': {
                f: f_skip,
                needsPerm: true
        },
		'/lock': {
                f: f_lock,
                needsPerm: true
        },
		'/unlock': {
                f: f_unlock,
                needsPerm: true
        },
		'/retry': {
                f: f_retry,
                needsPerm: true
        },
        '/cookie': {
                f: f_cookie,
                needsPerm: false
        },
		'rapes foxbot': {
                f: f_rape,
                needsPerm: false
        },
		'hugs foxbot': {
                f: f_hug,
                needsPerm: false
        },
		'/rules': {
                f: f_rule,
                needsPerm: false
        },
		'/about': {
                f: f_about,
                needsPerm: false
        },
		'brb': {
                f: f_brb,
                needsPerm: false
        },
        '/autoskip': {
                f: f_toggleAutoskip,
                needsPerm: true
        },
		'/joke': {
                f: f_joke,
                needsPerm: false
        },
		'/test': {
                f: f_test,
                needsPerm: true
        },
		'/reload': {
                f: f_reload,
                needsPerm: true
        }
};
 
API.addEventListener(API.CHAT, f_checkChat);
function f_checkChat(data) {
        if((data.type == "message") && (data.fromID != API.getSelf().id)) {
                for(var s in o_chatcmds) {
                        if(data.message.toString().indexOf(s) != -1) { // dont parse our own messages
                                // finally, perm check
                                if(o_chatcmds[s].needsPerm)
                                {
                                        if(API.getUser(data.fromID).moderator) {
                                                o_chatcmds[s].f(data);
                                        } else {
                                                API.sendChat('@'+data.from+': Im sorry Dave, but Im afraid I cant let you do that.');
                                        }
                                } else {
                                        o_chatcmds[s].f(data);
                                }
                               
                        }
                }
               
        }
}
API.addEventListener(API.DJ_ADVANCE, f_djAdvance);
function f_djAdvance(obj)
{
        var i_timeRem = -1;
        s_timeRem = jQuery('#time-remaining-value').text();
        while(s_timeRem == null) // wait on music to load & time to appear
        {
            s_timeRem = jQuery('#time-remaining-value').text();
        }
        a_timeRem = s_timeRem.toString().split(':');
        i_timeRem = (parseInt(a_timeRem[0])*60) + parseInt(a_timeRem[1]);
       
        if((i_timeRem > 10*60) && b_autoSkip) {
                var o_djs = API.getDJs();
				API.sendChat('@'+o_djs[0].username+' Sorry, your song is over the allowed time limit.');
                f_long(null);
        }
}

a_jokes = ["\
Q. Why did the man put his money in the freezer?\
A. He wanted cold hard cash!\
","\
Q. What did the porcupine say to the cactus?\
A. \"Is that you mommy?\"\
","\
Q. What do you get when you cross a snowman with a vampire?\
A. Frostbite.\
","\
Q. How do crazy people go through the forest?\
A. They take the psycho path.\
","\
Q. What do prisoners use to call each other?\
A. Cell phones.\
","\
Q. What do you get from a pampered cow?\
A. Spoiled milk.\
","\
Q. Where do polar bears vote?\
A. The North Poll\
","\
Q. What did Geronimo say when he jumped out of the airplane?\
A. ME!!!\
","\
Q. Where do snowmen keep their money?\
A. In snow banks.\
","\
Q. What's brown and sticky?\
A. A stick.\
","\
Q. Why do sea-gulls fly over the sea?\
A. Because if they flew over the bay they would be bagels!\
","\
Q. What dog keeps the best time?\
A. A watch dog.\
","\
Q. Why did the tomato turn red?\
A. It saw the salad dressing!\
","\
Q. What did the grape do when it got stepped on?\
A. It let out a little wine!\
","\
Q. How do you make a tissue dance?\
A. Put a little boogey in it!\
","\
Q. Where do bees go to the bathroom?\
A. At the BP station!\
","\
Q. What did the judge say when the skunk walked in the court room?\
A. Odor in the court.\
","\
Q. What did the water say to the boat?\
A. Nothing, it just waved.\
","\
Q. What did the fish say when he swam into the wall?\
A. Dam!\
","\
Q. Why don't skeletons fight each other?\
A. They don't have the guts.\
","\
Q. What has four legs but can't walk?\
A. A table!\
","\
Q. Why did the turtle cross the road?\
A. To get to the Shell station!\
","\
Q. What did the ground say to the earthquake?\
A. You crack me up!\
","\
Q. What do you get when you cross a cow and a duck?\
A. Milk and quackers!\
","\
Q. Why did the elephant eat the candle?\
A. He wanted a light snack!\
","\
Q. Why is the letter \"G\" scary?\
A. It turns a host into a ghost\
","\
Q. What has  4 eyes but no face?\
A. Mississippi!\
","\
Q. What did the spider do on the computer?\
A. Made a website!\
","\
Q. What letters are not in the alphabet?\
A. The ones in the mail, of course!\
","\
Q. Why was 6 afraid of 7?\
A. Because 789!\
","\
Q. Why did the cookie go to the hospital?\
A. Because it felt crummy.\
","\
Q. How do you know carrots are good for your  eyes?\
A. Because you never see rabbits wearing glasses!\
","\
Q. What do you call a pony with a sore throat?\
A. A little horse\
","\
Q. What do you call cheese that is not yours?\
A. Nacho Cheese\
","\
Q. Why did the sheep say \"moo\"?\
A. It was learning a new language!\
","\
Q. What streets do ghosts haun?\
A. Dead ends!\
","\
Q. What is an astronaut's favorite place on a computer?\
A. The Space bar!\
","\
Q. What exam do young witches have to pass?\
A. A spell-ing test!\
","\
Q. Why did the boy eat his homework?\
A. Because his teacher said it was a piece of cake!\
","\
Q. Why is Basketball such a messy sport?\
A. Because you dribble on the floor!\
","\
Q. What is the best day to go to the beach?\
A. Sunday, of course!\
","\
Q. What bow can't be tied?\
A. A rainbow!\
","\
Q. What happens if you eat yeast and shoe polish?\
A. Every morning you'll rise and shine!\
","\
Q. What does a teddy bear put in his house?\
A. Fur-niture!\
","\
Q.What season is it when you are on a trampoline?\
A.Spring time.\
","\
Q. What happens to cows during an earthquake?\
A. They give milk shakes!\
","\
Q. Why did the jelly wobble?\
A. Because it saw the milk shake!\
","\
Q. What do you call a girl who is always in the bookies?\
A. Betty!\
","\
Q. Where do cows go on holiday?\
A. Moo York\
","\
Q. Where did the computer go to dance?\
A. To a disc-o.\
","\
Q. What do you call a man who rolls in the leaves?\
A. Russel\
","\
Q. What has one head, one foot and four legs?\
A. A Bed\
","\
Q. Why didn't the chicken cross the road?\
A. He was a chicken.\
","\
Q. What is the difference between a school teacher and a train?\
A. The teacher says spit your gum out and the train says \"chew chew chew\".\
","\
Q. Why did the birdie go to the hospital?\
A. To get a tweetment.\
","\
Q. What do you call someone who is afraid of Santa?\
A. A Clausterphobic\
","\
Q. Why was the guy looking for the food on his friend?\
A. Because his friend said its on me.\
","\
Q. Did you hear the joke about the roof?\
A. Never mind, it's over your head!\
","\
Q. What do you call a cow eating grass in a paddock?\
A. A lawn mooer\
","\
Q. Why didn't the skeleton go to the dance?\
A. Because he had no-body to go with.\
","\
Q. What did the penny say to the other penny?\
A. We make perfect cents.\
","\
Q. Why did the man with one hand cross the road?\
A. To get to the second hand shop.\
","\
Q. Why did the picture go to jail?\
A. Because it was framed.\
","\
Q. What are two things you cannot have for breakfast?\
A. Lunch and dinner.\
","\
Q. Why did the boy sprinkle sugar on his pillow before he went to sleep?\
A. So he could have sweet dreams.\
","\
Q. Why did the robber take a bath?\
A. Because he wanted to make a clean getaway.\
","\
Q. What did the judge say to the dentist?\
A. Do you swear to pull the tooth, the whole tooth and nothing but the tooth.\
","\
Q. What do you call a bear with no socks on?\
A. Bare-foot.\
","\
Q. What can you serve but never eat?\
A. A volleyball.\
","\
Q. What did one teddy bear say to the other teddy bear when he offered him some dessert?\
A. No thank you, I am stuffed.\
","\
Q. What kind of shoes do all spies wear?\
A. Sneakers.\
","\
Q. What did one wall say to the other wall?\
A. I'll meet you at the corner.\
","\
Q. Why did the soccer player bring string to the game?\
A. So he could tie the score.\
","\
Q. Why is a baseball team similar to a muffin?\
A. They both depend on the batter.\
","\
Q. What did the alien say to the garden?\
A. Take me to your weeder.\
","\
Q. Have you heard the joke about the butter?\
A. I better not tell you, it might spread.\
","\
Q. How do baseball players stay cool?\
A. Sit next to their fans.\
","\
Q. What gets wetter the more it dries?\
A. A towel.\
","\
Q. Why was the math book sad?\
A. Because it had too many problems.\
","\
Q. What runs but doesn't get anywhere?\
A. A refrigerator.\
","\
Q. How do you catch a squirrel?\
A. Climb a tree and act like a nut!\
","\
Q. What do you do with a blue whale?\
A. Try to cheer him up! \
","\
Q. How do you communicate with a fish?\
A. Drop him a line!\
","\
Q. Where do sheep go to get haircuts?\
A. To the Baa Baa shop!\
","\
Q. What does a shark eat with peanut butter?\
A. Jellyfish!\
","\
Q. Why was the pelican kicked out of the hotel?\
A. Because he had a big bill!\
","\
Q. What do cats eat for breakfast?\
A. Mice Crispies!\
","\
Q. What kind of dog tells time?\
A. A watch dog!\
","\
Q. Why can't a leopard hide?\
A. Because he's always spotted!\
","\
Q. What do you give a dog with a fever?\
A. Mustard, its the best thing for a hot dog!\
","\
Q. What do you get when you cross a cat with a lemon?\
A. A sour puss!\
","\
Q. Why do birds fly south for the winter?\
A. Its easier than walking!\
","\
Q. What kind of key opens a banana?\
A. A monkey!\
","\
Q. How do you know that carrots are good for your eyesight?\
A. Have you ever seen a rabbit wearing glasses?\
","\
Q. Why does a hummingbird hum?\
A. It doesn't know the words!\
","\
Q. Why are some fish at the bottom of the ocean?\
A. Because they dropped out of school!\
","\
Q. What goes up and down but doesn't move?\
A. The temperature!\
","\
Q. What two days of the week start with the letter \"T\"?\
A. Today and Tomorrow!\
","\
Q. Which weighs more, a ton of feathers or a ton of bricks?\
A. Neither, they both weigh a ton!\
","\
Q. What has four eyes but can't see?\
A. Mississippi!\
","\
Q. Where does wood come from?\
A. A guy named woody.\
","\
Q. What has one horn and gives milk\
A. A milk truck.\
","\
Q. Where do bulls get their messages\
A. On a bull-etin board.\
","\
Q. What do bulls do when they go shopping?\
A. They CHARGE!\
","\
Q. Why were the giant's fingers only eleven inches long?\
A. Because if they were twelve inches long, they'd be a foot.\
","\
Q. What is invisible and smells like carrots?\
A. Bunny Farts!\
","\
Q. What runs but can't walk?\
A. The faucet!\
","\
Q. What kind of bed does a mermaid sleep in?\
A. A water bed!\
","\
Q. What kind of crackers do firemen like in their soup?\
A. Firecrackers!\
","\
Q. What did the teddy bear say when he was offered dessert?\
A. No thanks, I'm stuffed!\
","\
Q. Why did the barber win the race?\
A. Because he took a short cut.\
","\
Q. What's taken before you get it?\
A. Your picture.\
","\
Q. Why did the tree go to the dentist?\
A. To get a root canal.\
","\
Q. Why did the child study in the airplane?\
A. He wanted a higher education!\
","\
Q. Why was the broom late?\
A. It over swept!\
","\
Q. What did the fireman's wife get for Christmas?\
A. A ladder in her stocking!\
","\
Q. What did one virus say to another?\
A. Stay away, I think I've got penicillin!\
","\
Q. What did the tie say to the hat?\
A. You go on ahead and I'll hang around!\
","\
Q. What pet makes the loudest noise?\
A. A trum-pet!\
","\
Q. What is a tornado?\
A. Mother nature doing the twist!\
","\
Q. Why did the boy tiptoe past the medicine cabinet?\
A. He didn't want to wake the sleeping pills!\
","\
Q. How do you tease fruit?\
A. Banananananananana!\
","\
Q. Why did Goofy put a clock under his desk?\
A. Because he wanted to work over-time!\
","\
Q. Why did Tommy throw the clock out of the window?\
A. Because he wanted to see time fly!\
","\
Q. How does a moulded fruit-flavoured dessert answer the phone?\
A. Jell-o!\
","\
Q. When do you stop at green and go at red?\
A. When you're eating a watermelon!\
","\
Q. How did the farmer mend his pants?\
A. With cabbage patches!\
","\
Q. Why don't they serve chocolate in prison?\
A. Because it makes you break out!\
","\
Q. What do you call artificial spaghetti?\
A. Mockaroni!\
","\
Q. What happens to a hamburger that misses a lot of school?\
A. He has a lot of ketchup time!\
","\
Q. Why did the man at the orange juice factory lose his job?\
A. He couldn't concentrate!\
","\
Q. How do you repair a broken tomato?\
A. Tomato Paste!\
","\
Q. Why did the baby strawberry cry?\
A. Because his parents were in a jam!\
","\
Q. What did the hamburger name his daughter?\
A. Patty!\
","\
Q. What kind of egg did the bad chicken lay?\
A. A deviled egg!\
","\
Q. What kind of key opens the door on Thanksgiving?\
A. A turkey!\
","\
Q. What kind of cake do you get at a cafeteria?\
A. A stomach-cake!\
","\
Q. Why did the cookie go to the hospital?\
A. He felt crummy!\
","\
Q. When does a cart come before a horse?\
A. In the dictionary!\
","\
Q. Why were the teacher's eyes crossed?\
A. She couldn't control her pupils!\
","\
Q. What do you get when you put a fish and an elephant together?\
A. Swimming trunks.\
","\
Q. What goes up when the rain comes down?\
A. An umbrella.\
","\
Q. What disappears when you stand up?\
A. Your lap.\
","\
Q. What did the big firecracker say to the little firecracker?\
A. My pop is bigger than yours.\
","\
Q. What did the big chimney say to the small chimney?\
A. You are too little to smoke.\
","\
Q. What do you call a surgeon with eight arms?\
A. A doctopus!\
","\
Q. Why did the teacher jump into the lake?\
A. Because she wanted to test the waters!\
","\
Q. Why did the belt go to jail?\
A. Because it held up a pair of pants!\
","\
Q. What is the center of gravity?\
A. The letter V!\
","\
Q. What did the stamp say to the envelope?\
A. Stick with me and we will go places!\
","\
Q. What sort of star is dangerous?\
A. A shooting star!\
","\
Q. Why did the teacher write the lesson on the windows? \
A. He wanted the lesson to be very clear!\
","\
Q. What kind of lights did Noah use on the Ark?\
A. Flood lights!\
","\
Q. What do computers do when they get hungry?\
A. They eat chips!\
","\
Q. Why don't you see giraffes in elementary school?\
A. Because they're all in High School!\
","\
Q. Which is the longest word in the dictionary?\
A. \"Smiles\", because there is a mile between each \"s\"!\
","\
Q. Which month do soldiers hate most?\
A. The month of March!\
","\
Q. What did the painter say to the wall?\
A. One more crack like that and I'll plaster you!\
","\
Q. Why do golfers wear two pairs of pants?\
A. In case they get a hole in one!\
","\
Q. What did the the tie say to the hat?\
A. You go on a head, I'll just hang around!\
","\
Q. What would you call two banana skins?\
A. A pair of slippers.\
"];