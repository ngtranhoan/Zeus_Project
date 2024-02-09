module.exports = function({ api }) {
	return function({ event }) {
        const { senderID, reaction, messageID, threadID, userID } = event;
    if (senderID == api.getCurrentUserID()) {
            if (reaction == "😠") return api.unsendMessage(messageID);
    }
  }
}