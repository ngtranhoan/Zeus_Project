module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "DC-Nam",
    description: "Cho bot out nhóm?",
    commandCategory: "System",
    usages: "[trống|id|all]",
    cooldowns: 5
};
module.exports.run = async ({
    api,
    event,
    args,
    Threads,
    Users
}) => {
    if (!global.config.OWNER.includes(event.senderID)) return api.sendMessage("?", event.threadID, event.messageID)
    const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
    const p = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    if (args.length == 0) {
        return api.sendMessage("» Nhập all|id|trống", event.threadID);
    }
    if (args[0] == "all") {
        return api.getThreadList(100, null, ["INBOX"], (err, list) => {
            if (err) throw err;
            list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ?
                api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
            api.sendMessage('» Đã out all box', event.threadID);
        });
    };
    if (args[0] == "id") {
        const tid = args[1]
        return api.removeUserFromGroup(api.getCurrentUserID(), tid, () => {
            if (!tid) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID)
            api.sendMessage("» Đã out nhóm này", event.threadID);
        });
      } 
   }