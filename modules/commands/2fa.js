module.exports.config = {
	name: "2fa",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Jukie~",
	description: "Get the 2fa code for you",
	commandCategory: "Utilities",
	usages: "[2FA CODE]",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let code = args.join(" ");
const res = await axios.get(`https://2fa.live/tok/${code}`);
var codee = res.data.token;
return api.sendMessage(`⚡️Your 2-factor authentication code is: ${codee}`, event.threadID, event.messageID)
}