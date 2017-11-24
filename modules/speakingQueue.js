let speakList = [];
let timeout;
function handleSpeakRotation(channel) {
	const member = speakList[0];
	if (speakList.length < 1) return;
	if (member.serverMute) {
		member.setMute(false);
		channel.send(`It's ${member}'s turn to speak!`);
		timeout = setTimeout(() => {
			member.setMute(true);
			speakList = speakList.slice(1);
			handleSpeakRotation(channel);
		}, 1000 * 180);
	}
}
function handleChannelMute(msg, mute) {
	const { roles, voiceChannel } = msg.member;
	if (!roles.has('379943529557917696') && !roles.has('379948189098311681') && !roles.has('383554721304281093')) {
		msg.reply('You dont have permissions to use that command!');
		return;
	}
	if (voiceChannel) {
		voiceChannel.members.forEach((value) => {
			if (value.roles.has('379943529557917696') || value.roles.has('379948189098311681') || value.roles.has('383554721304281093')) return;
			if (mute) {
				value.setMute(true);
			} else {
				value.setMute(false);
			}
		});
	} else {
		msg.reply('You have to be in a voice channel to use this command');
	}
}
function handleSpeak(msg, skip) {
	if (skip) {
		clearTimeout(timeout);
		speakList[0].setMute(true);
		speakList = speakList.slice(1);
		handleSpeakRotation(msg.channel);
		return;
	}
	if (speakList.includes(msg.member)) return;
	speakList.push(msg.member);
	msg.reply('You have been added to the queue!I will notify you when its your turn to speak!');
	if (speakList.length < 2) {
		handleSpeakRotation(msg.channel);
	}
}
exports.handleSpeak = handleSpeak;
exports.handleChannelMute = handleChannelMute;
