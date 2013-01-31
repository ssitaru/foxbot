foxbot - a bot for plug.dj
==========================
foxbot is a great way for room moderators on [plug.dj](http://plug.dj) to entertain and manage the crowd.

Installation
------------
Currently we support three methods of installation:

### Chainloading the script ###
* Click <a href="https://raw.github.com/ssitaru/foxbot/master/chainloader.js" target="_blank">this</a>
* Copy the code
* Paste it into your browser's javascript console (Chrome: Ctrl-Shift-J, Firefox: Ctrl-Shift-K)
* Enjoy!

### Greasemonkey script ####
* Download chainloader.user.js
* Run it in Greasemonkey
* Enjoy!

### Fallback: Manually activate the script ###
* Download foxbot.js
* Copy the code and paste it into your browser's javascript console (Chrome: Ctrl-Shift-J, Firefox: Ctrl-Shift-K)
* Enjoy!

Authors
-------
* 1NT &lt;s.sitaru@gmx.de&gt;
* FoxtrotFire

Find us in the [Super Awesome Electronic Room](http://www.plug.dj/super-awesome-edm-room-2/) (TZ: GMT+1).
If you copy our code, please mention us and include a link to this page.

Changelog
---------
v0.1 (Sep 2, 2012): Initial github version


For Developers
--------------
If you want to fork this and extend it yourself, feel free to do so.

You should find the code very interesting, but here's some notes:
* Look for the variable o_chatcmds if you want to add any commands. The syntax is

```javascript
var o_chatcmds = {
	'/commandname': {
		f: f_yourCommandfunction,
		needsPerm: true/false
	}, ...
};
```

* If you want to add any init code, do so in the `init()` function. By default, it will initialize the following:
	1. send online message
	2. add the event listeners
	3. mute the player

Oh, and a message to the devs at plug.dj: Please, please, please *update your API documentation*, it was a pain reverse-engineering that minified JS code ;)
