const axios = require("axios")
module.exports.config = {
	name: "italictext",
	version: "1.1.1",
	hasPermssion: 0,
	credits: "Dc-Nam",
	description: "Font mới cho đoạn text của bạn",
	commandCategory: "Công cụ",
	usages: "[text]",
	cooldowns: 5
}
module.exports.run = async ({ api, event, args }) => {
  const input = encodeURI(args.join(" "))
  let os = (await axios.get(`https://6821df2e-d4cb-44c6-abb3-185e21d7d2fb.id.repl.co/text?input=${input}&type=bold_italic&api_key=keypro`)).data
  return api.sendMessage(os.text.complete, event.threadID, event.messageID)
}