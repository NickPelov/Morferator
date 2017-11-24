function createHelpEmbed() {
	const embed = new Discord.RichEmbed({
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
				name: '` !<username> `',
				value: 'Possible values \n!milen\n!bobi\n!tonka\n!sasho\n!radko\n!mario\n!martin\n!kalin\n!valio\n!anatoli\n!ivan\n!georgi\n!svetlio\n\n',
			},
			{
				name: '`!voterole <username> <role>`',
				value: 'Example: !voterole MoRfeR choveka programiral tozi bot\nТази команда ще започне гласуване да се добави тази роля на МoRfeR\nГласува се с !yes.\nГласуването продължава минимум 3мин. След тези 3 мин можете да стартирате ново гласуване, дори старото гласуване да не е плиключило!\n\n\n',
			},
			{
				name: '`!voterole`',
				value: 'Дава информация за гласуването. Ако съществува такова\n\n\n',
			},
			{
				name: '`!yes`',
				value: 'Подкрепяш гласуването\n\n\n',
			},
			{
				name: '`!mute <username>`',
				value: 'Заглушава човекът за период между 5-30 секунди.(не изисква гласуване)\n\n\n',
			},
			{
				name: '`.Help`',
				value: 'Изпраща ви това съобщение\n\n\n',
			},
		],
	});
	return embed;
}
