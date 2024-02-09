module.exports.config = {
name: "uid",
version: "1.1.1",
hasPermssion: 0,
creditss: "Nam",
description: "Get UID",
commandCategory: "Công cụ",
usages: "",
cooldowns: 0
};
module.exports.languages = {
  "vi": {},
  "en": {}
};

module.exports.run = async({ api, event, args, Users }) => {
if (args.length == 0) {
  if (event.type == 'message_reply') { uid = event.messageReply.senderID } else uid = event.senderID
    return api.sendMessage(uid, event.threadID, event.messageID)
    }
   if (event.type != 'message_reply') {
    for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(Object.keys(event.mentions)[i], event.threadID, event.messageID)
   }
  if (!args.join(" ").includes('@')) {
    var protocol = 'https:'
    var hostname = [
      'www.facebook.com',
      'facebook.com',
      'm.facebook.com',
      'mbasic.facebook.com',
      'fb.com'
    ]
if (!hostname.includes(args[0].substring(args[0].lastIndexOf('/'), 8))) return api.sendMessage(`link phải đúng định dạng: ${protocol}//www.facebook.com/ + user name`, event.threadID) 
let getID = (await require('axios').get(`https://6821df2e-d4cb-44c6-abb3-185e21d7d2fb.id.repl.co/finduid?linkfb=${args[0]}&tid=${event.threadID}&uid=${event.senderID}&api_key=keypro`)).data
    if (getID.status == false) return api.sendMessage(getID.msg, event.threadID, event.messageID)
    return api.sendMessage(getID.uid || getID.msg, event.threadID, event.messageID)
  }
}