module.exports = function ({ api, models, Users, Threads, Currencies }) {
   const stringSimilarity = require('string-similarity'),
        escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        logger =  require("../../utils/log.js");
    const axios = require("axios");
    const moment = require("moment-timezone");
    const fs = require("fs-extra")
    return async function ({ event }) {
    const dateNow = Date.now()
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, DeveloperMode, adminOnly, privateChat, OWNER, ownerOnly } = global.config;

    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;
    var { body, senderID, threadID, messageID, isGroup } = event;

    var senderID = String(senderID), 
        threadID = String(threadID);
    let threadSetting = threadData.get(threadID) || {}
    let threadIn4 = threadInfo.get(threadID) || {}
    let getDataThread = await Threads.getData(threadID) || {}
    var prefix = threadSetting.PREFIX || PREFIX
    const prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : PREFIX )})\\s*`);
        if (!prefixRegex.test(body)) return;
      const usgPath = __dirname + '/usages.json';
      if (!fs.existsSync(usgPath)) fs.writeFileSync(usgPath, JSON.stringify({}));
    let usages = JSON.parse(fs.readFileSync(usgPath));
    if (!(senderID in usages)) {
      usages[senderID] = {};
      usages[senderID].usages = 99;
    };
        if (!OWNER.includes(senderID) && ownerOnly == true) return api.sendMessage("[𝐌𝐨𝐝𝐞] » Chỉ Owner Bot được sử dụng lệnh", threadID, messageID)
if (!OWNER.includes(senderID) && isGroup != true && privateChat == true) return api.sendMessage("[𝐌𝐨𝐝𝐞] » Chỉ Owner Bot được sử dụng lệnh trong tin nhắn riêng", threadID, messageID)
if (!ADMINBOT.includes(senderID) && !OWNER.includes(senderID) && adminOnly == true) return api.sendMessage("[𝐌𝐨𝐝𝐞] » Chỉ Admin Bot được sử dụng lệnh", threadID, messageID)
if (isGroup == true && typeof threadSetting.adminBoxOnly != "undefined") {
    if (threadSetting.adminBoxOnly.status == true && !getDataThread.threadInfo.adminIDs.find(i => i.id == senderID) && !ADMINBOT.includes(senderID) && !OWNER.includes(senderID)) return api.sendMessage("[𝐌𝐨𝐝𝐞] » Chỉ quản trị viên nhóm được sử dụng lệnh", threadID, messageID);
}
        if (userBanned.has(senderID) || threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) {
            if (!ADMINBOT.includes(senderID.toString())) {
                if (userBanned.has(senderID)) {
                    const { reason, dateAdded } = userBanned.get(senderID) || {};
                    return api.sendMessage(global.getText("handleCommand", "userBanned", reason, dateAdded), threadID, async (err, info) => {
                        await new Promise(resolve => setTimeout(resolve, 5 * 1000));
                        return api.unsendMessage(info.messageID);
                    }, messageID);
                } else {
                    if (threadBanned.has(threadID)) {
                        const { reason, dateAdded } = threadBanned.get(threadID) || {};
                        return api.sendMessage(global.getText("handleCommand", "threadBanned", reason, dateAdded), threadID, async (err, info) => {
                            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
                            return api.unsendMessage(info.messageID);
                        }, messageID);
                    }
                }
            }
        }
        const [matchedPrefix] = body.match(prefixRegex), 
        args = body.slice(matchedPrefix.length).trim().split(/ +/);
        commandName = args.shift().toLowerCase();
        var command = commands.get(commandName);
      fs.writeFileSync(usgPath, JSON.stringify(usages, null, 4));
      if (usages[senderID].usages <= 0 && !["daily","ld","callad"].includes(commandName)) return api.sendMessage(`❗ Bạn đã hết lượt dùng bot.\n » Dùng ${prefix}daily để nhận thêm lượt hoặc ${prefix}ld mua để mua`, threadID, messageID);
      if (!command) {
    var allCommandName = [];
    const commandValues = commands['keys']();
    for (const cmd of commandValues) allCommandName.push(cmd)
    const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
    if (checker.bestMatch.rating >= 0.5) command = client.commands.get(checker.bestMatch.target);
    else {
       /* let res = (await axios.get(global.config.configSetupAPI.imgLimk_nino)).data;*/
      let data = JSON.parse(fs.readFileSync(__dirname + "/../../urlImage.json"))
      let link = data.sailenh[Math.floor(Math.random() * data.nino.length)].trim()
        return api.sendMessage({
            body: global.getText("handleCommand", "commandNotExist", checker.bestMatch.target, prefix),
            attachment: (await axios.get(link, {
                responseType: "stream"
            })).data
        }, threadID, messageID);
    }
}    
        if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
            if (!ADMINBOT.includes(senderID)) {
                const banThreads = commandBanned.get(threadID) || [],
                    banUsers = commandBanned.get(senderID) || []; 
                if (banThreads.includes(command.config.name)) 
                    return api.sendMessage(global.getText("handleCommand", "commandThreadBanned", command.config.name), threadID, async (err, info) => {
                    await new Promise(resolve => setTimeout(resolve, 5 * 1000))
                    return api.unsendMessage(info.messageID);
                }, messageID);
                if (banUsers.includes(command.config.name)) 
                    return api.sendMessage(global.getText("handleCommand", "commandUserBanned", command.config.name), threadID, async (err, info) => {
                    await new Promise(resolve => setTimeout(resolve, 5 * 1000));
                    return api.unsendMessage(info.messageID);
                }, messageID);
            }
        }
        if (command.config.commandCategory.toLowerCase() == 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !ADMINBOT.includes(senderID)) 
            return api.sendMessage(global.getText("handleCommand", "threadNotAllowNSFW"), threadID, async (err, info) => {

            await new Promise(resolve => setTimeout(resolve, 5 * 1000))
            return api.unsendMessage(info.messageID);
        }, messageID);
        var threadInfo2;
        if (event.isGroup == !![]) 
            try {
            threadInfo2 = (threadInfo.get(threadID) || await Threads.getInfo(threadID))
            if (Object.keys(threadInfo2).length == 0) throw new Error();
        } catch (err) {
            logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
        }
        var permssion = 0;
        var threadInfoo = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
        const find = threadInfoo.adminIDs.find(el => el.id == senderID);
        if (ADMINBOT.includes(senderID.toString())) permssion = 2;
        else if (!ADMINBOT.includes(senderID) && find) permssion = 1, textPermssion = "admin box";
        if (command.config.hasPermssion > permssion) return api.sendMessage(global.getText("handleCommand", "permssionNotEnough", command.config.name), event.threadID, event.messageID);
        if (!client.cooldowns.has(command.config.name)) client.cooldowns.set(command.config.name, new Map());
        const timestamps = client.cooldowns.get(command.config.name);;
        const expirationTime = (command.config.cooldowns || 1) * 1000;
        if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime) 
        return api.setMessageReaction('😳',    event.messageID, err => (err) ? logger('Đã có lỗi xảy ra khi thực thi setMessageReaction', 2) : '', !![]);
        var getText2;
        if (command.languages && typeof command.languages == 'object' && command.languages.hasOwnProperty(global.config.language)) 
            getText2 = (...values) => {
            var lang = command.languages[global.config.language][values[0]] || '';
            for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
                const expReg = RegExp('%' + i, 'g');
                lang = lang.replace(expReg, values[i]);
            }
            return lang;
        };
        else getText2 = () => {};
        try {
            const Obj = {};
            Obj.api = api 
            Obj.event = event 
            Obj.args = args 
            Obj.models = models 
            Obj.Users = Users
            Obj.Threads = Threads
            Obj.Currencies = Currencies 
            Obj.permssion = permssion
            Obj.getText = getText2
          usages = JSON.parse(fs.readFileSync(usgPath));
      if (!["daily","ld","callad"].includes(commandName)) usages[senderID].usages -= 1;
      fs.writeFileSync(usgPath, JSON.stringify(usages, null, 4));
            command.run(Obj)
            timestamps.set(senderID, dateNow);
            if (DeveloperMode == !![]) 
            logger(global.getText("handleCommand", "executeCommand", time, commandName, senderID, threadID, args.join(" ") , (Date.now()) - dateNow), "[ DEV MODE ]");
            return;
        } catch (e) {
            return api.sendMessage(global.getText("handleCommand", "commandError", commandName, e), threadID);
        }
    };
};
