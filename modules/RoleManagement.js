
const { prefix } = require('../config.json');
const Discord = require('discord.js');

let votes = 0;
let votedIDs = [];
let nominated = null;
let roleName = null;
let role;
let startTime;
let elapsedTime;

function createRoleEmbed(desc, titel) {
	const embed = new Discord.RichEmbed()
		.setDescription(desc)
		.setTitle(titel)
		.setColor('#00FF00');
	return embed;
}

function getUserRole(member) {
	return member.roles.values().next().value;
}

function createRoleData(args, nom) {
	const userPermissions = getUserRole(nom).permissions;
	const roleData = {
		name: args.join(' '),
		color: '#FF69B4',
		permissions: userPermissions,
		mentionable: true,
	};
	return roleData;
}

function getRoleIDByName(name, guild) {
	const collection = guild.roles.filter(r => r.name === name);
	const roleID = collection.values().next().value.id;
	return roleID;
}

function getMember(name, msg) {
	const guildMember = msg.guild.members
		.filter(m => m.user.username.toLowerCase() === name.toLowerCase());
	const member = guildMember.values().next().value;
	return member;
}

function getRequiredVotes(message) {
	const server = message.guild;
	let requiredVotes = server.presences.size - server.members.filter(member => member.user.bot).size;
	if (requiredVotes >= 9) {
		requiredVotes = Math.floor(requiredVotes / 3);
	} else {
		requiredVotes = 3;
	}
	return requiredVotes;
}

function handleVote(msg) {
	const args = msg.content.slice(9).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const requiredVotes = getRequiredVotes(msg);
	console.log(`nominated: ${command}`);
	console.log(`role: ${args}`);

	if (startTime) {
		elapsedTime = Math.round((msg.createdTimestamp - startTime) / 60000);
	}


	if (msg.content.startsWith(`${prefix}voterole`)) {
		if (startTime && msg.createdTimestamp - startTime > 180000) {
			nominated = null;
			votes = 0;
			votedIDs = [];
			role = null;
			roleName = null;
		}
		if (nominated === null && roleName === null && args.length > 0 && command) {
			roleName = args.join(' ');
			nominated = getMember(command, msg);
			startTime = msg.createdTimestamp;
			if (!nominated) {
				msg.reply(`Не беше намерен човек в сървъра със името ${command}`);
				nominated = null;
				roleName = null;
				return;
			}
			msg.channel.send(`Беше започнато гласуване дали да се сложи ролята ${roleName} на ${nominated}. Можете да гласувате с командата !yes`);
		} else if (nominated !== null && roleName !== null) {
			if (elapsedTime === 1) {
				msg.reply(`Гласува се дали да се сложи роля: ${roleName} на ${nominated}.Можеш да гласуваш с !yes. Миналa e ${elapsedTime} минутa от пускането на гласуването!`);
			} else {
				msg.reply(`Гласува се дали да се сложи роля: ${roleName} на ${nominated}.Можеш да гласуваш с !yes. Минали са ${elapsedTime} минути от пускането на гласуването!`);
			}
			return;
		} else {
			msg.reply('Няма или зададена роля, или зададен кандидат');
			return;
		}
	}

	if (msg.content === `${prefix}yes` || msg.content.startsWith(`${prefix}voterole`)) {
		if (votedIDs.includes(msg.author.id)) {
			msg.reply('Вече си гласувал боклук');
		} else if (nominated && roleName) {
			votes++;
			votedIDs.push(msg.author.id);
			msg.reply(`Votes ${votes}/${requiredVotes}`);
		}
	}

	if (votes >= requiredVotes) {
		const desc = `**${nominated}**'s role will be set to __${roleName}__`;
		const titel = 'Role Set!';
		msg.guild.createRole(createRoleData(args, nominated), 'Vote Passed!');
		setTimeout(() => {
			role = getRoleIDByName(roleName, msg.guild);
			nominated.addRole(role, 'Vote Passed!');
			msg.channel.send(createRoleEmbed(desc, titel));
			nominated = null;
			votes = 0;
			votedIDs = [];
			role = null;
			roleName = null;
		}, 1000);
	}
}

exports.handleVote = handleVote;
