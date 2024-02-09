module.exports.config = {
  name: "reload",
  version: "beta",
  hasPermssion: 2,
  credits: "DC-Nam",
  description: "Reload...",
  commandCategory: "Tiện ích",
  usages: "",
  cooldowns: 0
};
module.exports.run = async function ({ api, args, event, Users, permssion, Threads }) {
  const { threadID, messageID, senderID } = event;
  if (args[0] == "config") {
  delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
    return api.sendMessage(`Reload config done!!`, threadID)
  };
}