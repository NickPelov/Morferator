const { prefix } = require('../config.json');

const handleNameRequest = (msg, channel) => {
	switch (msg.content.toLowerCase()) {
	case `${prefix}tonka`:
		channel.send('Научи си тактиките');
		break;
	case `${prefix}milen`:
		channel.send('Брат....на бас, че бърствам по 10М дпс');
		break;
	case `${prefix}sasho`:
		channel.send('Нахрани си хамстера');
		break;
	case `${prefix}valio`:
		channel.send('Правя BG-та по цял ден!');
		break;
	case `${prefix}anatoli`:
		channel.send('Geri-nikol mu e maikata');
		break;
	case `${prefix}bobi`:
		channel.send('Страх ме е да напиша нещо лошо');
		break;
	case `${prefix}eti`:
		channel.send('Вие сте ебати путките!');
		break;
	case `${prefix}mario`:
		channel.send('Не ми обяснявай');
		break;
	case `${prefix}kalin`:
		channel.send('"НАПРАВИХ 15ка ТАЗИ СЕДМИЦА!!!!"');
		break;
	case `${prefix}ivan`:
		channel.send('Посещавам църквата по-често от софтуни');
		break;
	case '!martin':
		channel.send('Оставете ми музиката,БЕ!');
		break;
	case '!georgi':
		channel.send('Ебах 6 пъти в един ден!');
		break;
	case '!radko':
		channel.send('Пуша само по рождени дни..live life with no regrets!');
		break;
	case '!svetlio':
		channel.send('Е сега идвам');
		break;
	default:
		break;
	}
};

exports.handleNameRequest = handleNameRequest;
