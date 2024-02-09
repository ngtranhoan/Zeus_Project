module.exports.config = {
	name: "kick",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "abc",
	description: "Xoá người bạn cần xoá khỏi nhóm bằng cách tag",
	commandCategory: "Box chat", 
	usages: "[tag]", 
	cooldowns: 0,
};
module.exports.languages = {
  "vi": {},
  "en": {}
};
module.exports.run = async ({ api, event, permssion }) => {
	let mention = Object.keys(event.mentions);
  if (mention.length == 0 && event.type != "message_reply") return api.sendMessage("vui lòng reply hoặc tag người cần kick", event.threadID, event.messageID)
     else if (permssion >= 1 && event.type != "message_reply") {
			for (const id in mention) {	
      if (mention[id] != api.getCurrentUserID()) api.removeUserFromGroup(mention[id], event.threadID) 
	}
 }
 else if (event.type == "message_reply" && permssion >= 1 && event.messageReply.senderID != api.getCurrentUserID()) {
		 return api.removeUserFromGroup(`${event.messageReply.senderID}`, event.threadID, (error) => {
  if (error) return api.sendMessage("not found", event.threadID)
          })
        }
  else return api.sendMessage(`${event.messageReply.senderID == api.getCurrentUserID() ? "không được kick bot": "mày đéo phải qtv"}`, event.threadID, event.messageID);
      }