const { prefix } = require('./config.json');

const help = (client, msg) => {
	let embed;
	if (msg.channel.guild === 'Lev1tate the Sun') {
		embed = {
			title: '```Information```',
			description: 'Help information for the Morferator moderator\n\n',
			color: 10534650,
			timestamp: '2017-10-27T11:53:31.234Z',
			author: {
				name: 'Morferator',
			},
			thumbnail: {
				url: client.user.avatarURL,
			},
			fields: [
				{
					name: `${prefix}<username> `,
					value: `Possible values \n${prefix}milen\n${prefix}bobi\n${prefix}tonka\n${prefix}sasho\n${prefix}radko\n${prefix}mario\n${prefix}martin\n${prefix}kalin\n${prefix}valio\n${prefix}anatoli\n${prefix}ivan\n${prefix}georgi\n${prefix}svetlio\n\n`,
				},
				{
					name: `${prefix}voterole <username> <role>`,
					value: `Example: ${prefix}voterole MoRfeR choveka programiral tozi bot\nТази команда ще започне гласуване да се добави тази роля на МoRfeR\nГласува се с !yes.\nГласуването продължава минимум 3мин. След тези 3 мин можете да стартирате ново гласуване, дори старото гласуване да не е плиключило!\n\n\n`,
				},
				{
					name: `${prefix}voterole`,
					value: 'Дава информация за гласуването. Ако съществува такова\n\n\n',
				},
				{
					name: `${prefix}yes`,
					value: 'Подкрепяш гласуването\n\n\n',
				},
				{
					name: `${prefix}mute <username>`,
					value: 'Заглушава човекът за период между 5-30 секунди.(не изисква гласуване)\n\n\n',
				},
				{
					name: `${prefix}timeout <username>`,
					value: 'Слага човекът в лист от заглушени хора. Ботът ще изтрие всяко съобщение написано от човек в този лист. Тази команда може да се използва само от хора с администраторски права.\n\n\n',
				},
				{
					name: `${prefix}removetimeout <username>`,
					value: 'Маха човекa от листа със заглушени.\n\n\n',
				},
				{
					name: `${prefix}channelmute `,
					value: 'Mutes everyone in your voice channel \n\n\n',
				},
				{
					name: `${prefix}talk `,
					value: 'Allows a person to speak for 3 min or if someone is already speaking adds you to a queue\n\n\n',
				},
				{
					name: `${prefix}next `,
					value: 'Skips to the next person in the queue \n\n\n',
				},
				{
					name: `${prefix}help`,
					value: 'Изпраща ви това съобщение\n\n\n',
				},
			],
		};
	} else {
		embed = {
			title: '```Information```',
			description: 'Help information for the Moderator BOT\n\n',
			color: 10534650,
			timestamp: '2017-10-27T11:53:31.234Z',
			author: {
				name: 'Morferator',
			},
			thumbnail: {
				url: client.user.avatarURL,
			},
			fields: [
				{
					name: `${prefix}timeout <username>`,
					value: 'I will delete every message writen, by a specific user. Can only be used by people with administrator privileges\n\n\n',
				},
				{
					name: `${prefix}removetimeout <username>`,
					value: 'Removes the timeout.\n\n\n',
				},
				{
					name: `${prefix}channelmute `,
					value: 'Mutes everyone in your voice channel \n\n\n',
				},
				{
					name: `${prefix}talk `,
					value: 'Allows a person to speak for 3 min or if someone is already speaking adds you to a queue\n\n\n',
				},
				{
					name: `${prefix}next `,
					value: 'Skips to the next person in the queue \n\n\n',
				},
				{
					name: `${prefix}help`,
					value: 'Sends this message.\n\n\n',
				},
			],
		};
	}
	return embed;
};

exports.help = help;
