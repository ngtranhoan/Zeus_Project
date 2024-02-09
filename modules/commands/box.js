module.exports.config = {
  name: "box",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "HungCho (Khánh Milo Fix)",
  description: "Các cài đặt của nhóm chat.",
  commandCategory: "Box chat",
  usages: "[id/name/setname/emoji/admin/image/info]",
  cooldowns: 1,
  dependencies: {
    "request": "",
    "fs-extra": "path"
  }
};
module.exports.languages = {
  "vi": {},
  "en": {}
};
module.exports.run = async ({
  api,
  event,
  args,
  Threads,
  Users,
  utils
}) => {
  const request = require("request");
  const {
    resolve
  } = require("path");
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
        const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
        const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  const fs = global.nodemodule["fs-extra"];
   if (args.length == 0) return api.sendMessage(`===== [ 𝗕𝗢𝗫 ] =====\n\n${prefix}${this.config.name} emoji [icon] => đổi icon nhóm\n\n${prefix}${this.config.name} name [tên box cần đổi] => đổi tên nhóm\n\n${prefix}${this.config.name} image [reply ảnh] => đổi avt nhóm\n\n${prefix}${this.config.name} admin [tag] => nó sẽ đưa qtv cho người được tag\n\n${prefix}${this.config.name} info => Toàn bộ thông tin của nhóm !\n\n${prefix}${this.config.name} new + tag => tạo 1 nhóm mới với những người được tag!\n\n${prefix}${this.config.name} id => lấy id box
`, event.threadID, event.messageID);

  var id = [event.senderID] || [];
  var main = event.body;
  var groupTitle = main.slice(main.indexOf("|") +2)
  if (args[0] == "new") {
   for (var i = 0; i < Object.keys(event.mentions).length; i++) 
id.push(Object.keys(event.mentions)[i]);
  api.createNewGroup(id, groupTitle,() => {
    api.sendMessage(`Đã tạo nhóm ${groupTitle}`, event.threadID)
  })
}

  if (args[0] == "id") {
    return api.sendMessage(`${event.threadID}`, event.threadID, event.messageID);
  }

  if (args[0] == "name") {
    var nameThread = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
    return api.sendMessage(nameThread, event.threadID, event.messageID);
  }

  if (args[0] == "setname") {
    var content = args.join(" ");
    var c = content.slice(7, 99) || event.messageReply.body;
    api.setTitle(`${c} `, event.threadID);
  }

  if (args[0] == "emoji") {
    const name = args[1] || event.messageReply.body;
    api.changeThreadEmoji(name, event.threadID)

  }

  if (args[0] == "me") {
    if (args[1] == "admin") {
      const threadInfo = await api.getThreadInfo(event.threadID)
      const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
      if (!find) api.sendMessage("BOT cần ném quản trị viên để dùng ?", event.threadID, event.messageID)
      else if (!global.config.ADMINBOT.includes(event.senderID)) api.sendMessage("Quyền hạn lồn ?", event.threadID, event.messageID)
      else api.changeAdminStatus(event.threadID, event.senderID, true);
    }
  }

  if (args[0] == "admin") {
    if (args.join().indexOf('@') !== -1) {
      namee = Object.keys(event.mentions)
    } else namee = args[1]
    if (event.messageReply) {
      namee = event.messageReply.senderID
    }

    const threadInfo = await api.getThreadInfo(event.threadID)
    const findd = threadInfo.adminIDs.find(el => el.id == namee);
    const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
    const finddd = threadInfo.adminIDs.find(el => el.id == event.senderID);

    if (!finddd) return api.sendMessage("» Mày đéo phải quản trị viên box ?", event.threadID, event.messageID);
    if (!find) {
      api.sendMessage("» Không ném quản trị viên dùng con cặc ?", event.threadID, event.messageID)
    }
    if (!findd) {
      api.changeAdminStatus(event.threadID, namee, true);
    } else api.changeAdminStatus(event.threadID, namee, false)
  }

  if (args[0] == "image") {
    if (event.type !== "message_reply") return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
    if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
    if (event.messageReply.attachments.length > 1) return api.sendMessage(`Vui lòng reply chỉ một audio, video, ảnh!`, event.threadID, event.messageID);
    var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/1.png"), event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
    return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
  };

if (args[0] == "info") {
    var threadInfo = await api.getThreadInfo(event.threadID);
    let threadMem = threadInfo.participantIDs.length;
  var gendernam = [];
  var gendernu = [];
  var nope = [];
  for (let z in threadInfo.userInfo) {
    var gioitinhone = threadInfo.userInfo[z].gender;

    var nName = threadInfo.userInfo[z].name;

    if (gioitinhone == 'MALE') {
      gendernam.push(z + gioitinhone);
    } else if (gioitinhone == 'FEMALE') {
      gendernu.push(gioitinhone);
    } else {
      nope.push(nName);
    }
  }
  var nam = gendernam.length;
  var nu = gendernu.length;
  let qtv = threadInfo.adminIDs.length;
  let sl = threadInfo.messageCount;
  let icon = threadInfo.emoji;
  let threadName = threadInfo.threadName;
  let id = threadInfo.threadID;
  var listad = '';
  var qtv2 = threadInfo.adminIDs;
  for (let i = 0; i < qtv2.length; i++) {
const infu = (await api.getUserInfo(qtv2[i].id));
const name = infu[qtv2[i].id].name;
    listad += '•' + name + '\n';
  }
  let sex = threadInfo.approvalMode;
  var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';
  var pdd = sex == false ? '❎' : sex == true ? '✅' : '⭕';
   var callback = () =>
        api.sendMessage(
          {
            body: `Tên box: ${threadName}\nID Box: ${id}\n${pdd} Phê duyệt: ${pd}\nEmoji: ${icon}\n-Thông tin:\nTổng ${threadMem} thành viên\n👨‍🦰Nam: ${nam} thành viên \n👩‍🦰Nữ: ${nu} thành viên\n\n🕵️‍♂️Với ${qtv} quản trị viên gồm:\n${listad}\nTổng số tin nhắn: ${sl} tin.\n\n » Dùng ${PREFIX(event.threadID)}boxinfo để xem chi tiết hơn.`,
            attachment: fs.createReadStream(__dirname + '/cache/1.png')
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + '/cache/1.png'),
          event.messageID
        );
      return request(encodeURI(`${threadInfo.imageSrc}`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());

  }   
 } 
function PREFIX(t) {
var dataThread = global.data.threadData.get(t) || {}
  return dataThread.PREFIX || global.config.PREFIX
}