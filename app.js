/**
 * Author : Loris Levêque
 * Date : 15.12.2019
 * Description : 
 */

// Constants
const {
	token,
	prefix
} = require("./_resources/bot_infos.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const rooter = require("./objects/rooter.js");
// Variables

// Classes

// Instantiations

// Events
client.on('ready', () => {
	console.log("bot ready");
});
client.on('message', (e) => {
	if (e.content.startsWith(prefix)) {
		try {
			var message_splitted = String(e.content).split(' ');
			var command = message_splitted[0].substring(1, message_splitted[0].length);

			try {
				rooter[command](e);
			} catch (exception) {
				console.log(exception);
			}
		} catch (exception) {
			e.channel.send(exception);
		}
	}
});
// Functions

// Others
client.login(token);