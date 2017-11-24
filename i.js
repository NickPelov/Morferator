
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { help } = require('./help.js');
const { handleVote } = require('./modules/RoleManagement.js');
const { handleSpeak, handleChannelMute } = require('./modules/speakingQueue.js');
const { handleNameRequest } = require('./modules/nameRequest.js');


const client = new Discord.Client();

const timedout = [];
// const lastMessages = [];
// let spammers = [];

function createHelpEmbed(msg) {
	const embed = new Discord.RichEmbed(help(client, msg));
	return embed;
}

function getMember(name, msg) {
	const guildMember = msg.guild.members
		.filter(m => m.user.username.toLowerCase() === name.toLowerCase());
	const member = guildMember.values().next().value;
	return member;
}

function handleTimeout(msg) {
	const author = msg.member;

	if (msg.content.startsWith(`${prefix}timeout`) && author.hasPermission('ADMINISTRATOR')) {
		const args = msg.content.slice(8).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		if (!command) return;
		const target = getMember(command, msg);
		if (!timedout.includes(target.id) && !target.hasPermission('ADMINISTRATOR')) {
			timedout.push(target.id);
			msg.channel.send(`User ${target} was timed out. All his messages will be deleted. To remove the time out use !removetimeout ${target.user.username.toLowerCase()}`);
		} else if (target.hasPermission('ADMINISTRATOR')) {
			msg.channel.send(`User ${target} is an administrator and will not be timed out`);
		} else {
			msg.channel.send(`User ${target} is already timed out. To remove the time out !remove ${target.user.username.toLowerCase()}`);
		}
	} else if (msg.content.startsWith(`${prefix}removetimeout`) && author.hasPermission('ADMINISTRATOR')) {
		const args = msg.content.slice(14).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const target = getMember(command, msg);
		if (timedout.includes(target.id)) {
			msg.channel.send(`Time out on user ${target} was removed`);
			timedout.splice(timedout.indexOf(target.id), 1);
		}
	}
}


function handleMute(msg) {
	const args = msg.content.slice(5).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const muteTime = Math.ceil(Math.random() * (30000 - 5000)) + 5000;
	const member = getMember(command, msg);

	if (!member) {
		msg.reply(`Няма потребител с име ${command}, бе боклук!`);
	} else if (member.serverMute) {
		msg.reply(`${member} е вече заглушен`);
	} else if (member && member.voiceChannel) {
		member.setMute(true);
		member.send(`${msg.author.tag} те заглуши за ${muteTime / 1000} секунди`);
		client.setTimeout(() => { member.setMute(false); }, muteTime);
	} else {
		msg.reply(`${member} не е в канал за говорене. Няма смисъл да го mute-вам!`);
	}
}

// function addLastMessage(msg) {
// 	if (lastMessages.length > 3) {
// 		lastMessages.shift();
// 		lastMessages.push(msg);
// 	}
// }

// function handleSpam(msg) {
// 	const target = msg.author.id;
// 	addLastMessage(msg);
//
// 	const check = (message) => { if (target === message.author.id) return true; return false; };
// 	if (lastMessages.every(check) && lastMessages[0].createdAt - lastMessages[3].createdAt <= 5000){
// 		msg.delete();
// 		if (!spammers.includes(target)) {
// 			msg.reply('Не спами!');
// 			spammers.push(target);
// 		}
// 		setTimeout(() => {
// 			spammers.splice(spammers.indexOf(target), 1);
// 		}, 1000 * 60 * 5);
// 	}
// }


const handleMessage = (msg) => {
	const i = msg.channel;
	const {
		author,
		content,
		channel,
	} = msg;
	if (!msg.guild) return;

	if (channel.name !== 'music' && author.bot && author.username === 'Rythm') {
		msg.delete();
	} else if (author.bot) return;

	if (timedout.includes(author.id)) {
		msg.delete();
	}
	if (channel.name !== 'music') {
		if (content.includes('!play') || content.includes('.play') || content.includes('!!!play')) {
			msg.delete();
		}
	} else if (!content.includes('https://www.warcraftlogs.com') && channel.name === 'logs') {
		msg.delete();
	}

	if (!content.startsWith(prefix)) {
		// handleSpam(msg);
		return;
	}

	if (content === `${prefix}talk`) {
		handleSpeak(msg);
	} else if (author.username.toLowerCase() === 'morfer' && content === `${prefix}next`) {
		handleSpeak(msg, true);
	} else if (content === `${prefix}help`) {
		author.send(createHelpEmbed(msg));
	} else if (content === `${prefix}mutechannel` && msg.member.hasPermission('ADMINISTRATOR')) {
		handleChannelMute(msg, true);
	} else if (content === `${prefix}unmutechannel` && msg.member.hasPermission('ADMINISTRATOR')) {
		handleChannelMute(msg, false);
	} else if (content.startsWith(`${prefix}voterole`) || content === `${prefix}yes`) {
		handleVote(msg);
	} else if (content.startsWith(`${prefix}mute`)) {
		handleMute(msg);
	} else if (content.startsWith(`${prefix}timeout`) || content.startsWith(`${prefix}removetimeout`)) {
		handleTimeout(msg);
	} else if (content === `${prefix}listids`) {
		msg.guild.roles.forEach((value) => {
			console.log(`${value.id} - ${value.name}`);
		});
	}

	if (msg.channel.name !== 'music' && msg.channel.name !== 'logs') {
		handleNameRequest(msg, i);
	}
};

const handleReady = () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setGame(`${prefix}help`);
};

client.on('ready', handleReady);
client.on('message', handleMessage);

client.login(token);
