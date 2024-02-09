const fs = require("fs-extra");
const path = __dirname + '/../../includes/handle/usages.json';

module.exports.config = {
  name: "ld",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Nam",
  description: "như hd",
  usages: "add/del/set || người dùng pay/mua",
  commandCategory: "Tài chính",
  cooldowns: 5
};
module.exports.languages = {
  "vi": {},
  "en": {}
};
module.exports.onLoad = () => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
}

module.exports.run = async ({ event, api, args, Users, permssion, Currencies }) => {
  let ld = JSON.parse(fs.readFileSync(path));
  const { threadID, messageID, senderID } = event;
if(event.type == "message_reply") { id = event.messageReply.senderID }
  else id = senderID;
  const moment = require("moment-timezone"); 
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  let name = await Users.getNameUser(id)
  const data = await api.getThreadInfo(threadID);
  var num = parseInt(args[1]);
  const nmdl = this.config.name
  const cre = this.config.credits
  const prefix = config.PREFIX
   if (args.length == 0) {
    return api.sendMessage(`====== LƯỢT DÙNG ======\n\n${prefix}${nmdl} set => thay đổi số lượt dùng\n\n${prefix}${nmdl} add => cộng thêm lượt dùng\n\n${prefix}${nmdl} del => trừ lượt dùng\n\n${prefix}${nmdl} pay + số => chuyển lượt dùng bot của mình cho người được reply\n\n${prefix}${nmdl} mua => mua lượt dùng bot\n\n${prefix}${nmdl} c/check => xem số lượt bản thân, reply xem người đó\n\n${prefix}${nmdl} c/check + a/all => xem số lượt tất cả thành viên\n\n==== ${cre} ====`, threadID, messageID);
  }if("Nam"!=cre)return;
   if (args[0] == "set") {
     if (!global.config.OWNER) return
    if (permssion < 2) {
      return api.sendMessage("Bạn là thành viên", threadID, messageID);
                       }
    if (isNaN(args[1])) {
      return api.sendMessage("Phải là con số", threadID, messageID);
    }
return api.sendMessage(`Đã thay đổi số lượt dùng bot của ${name} thành ${num}`, threadID, async (error, info) => {
         ld[id].usages = num;
fs.writeFileSync(path, JSON.stringify(ld));
    }, messageID);
  }
  if (args[0] == "add") {
    if (permssion < 2) {
      return api.sendMessage("Bạn là thành viên", threadID, messageID);
    }
    if (isNaN(args[1])) {
      return api.sendMessage("Phải là con số", threadID, messageID);
    }
    else if (num < 0) {
      return api.sendMessage("Số lượt cần cộng phải lớn hơn 0", threadID, messageID);
    }
return api.sendMessage(`Đã cộng thêm ${num} lượt dùng bot cho ${name}`, threadID, async (error, info) => {
         ld[id].usages = parseInt(usages[id].usages) + num
fs.writeFileSync(path, JSON.stringify(ld));
                }, messageID);
  }
  if (args[0] == "del") {
    if (permssion < 2) {
      return api.sendMessage("Bạn là thành viên", threadID, messageID);
    }
    if (isNaN(args[1])) {
      return api.sendMessage("Phải là con số", threadID, messageID);
    }
    else if (num < 0) {
      return api.sendMessage("Số lượt cần trừ phải lớn hơn 0", threadID, messageID);
    }
return api.sendMessage(`Đã trừ ${num} lượt dùng bot của ${name}`, threadID, async (error, info) => {
         ld[id].usages = parseInt(ld[id].usages) - parseInt(num);
fs.writeFileSync(path, JSON.stringify(ld));
                }, messageID);
  }
  if (args[0] == "pay") {
    if (event.type == "message_reply") { id = event.messageReply.senderID }
    if (num > ld[senderID].usages || isNaN(args[1])) {
     return api.sendMessage(`Số lượt cần chuyển phải là 1 con số và không được lớn hơn ${usages[senderID].usages}`, threadID, messageID);
    }
    else if (senderID == id) {
      return api.sendMessage(`Bạn phải tag hoặc reply tin nhắn`, threadID, messageID);
    }
    let name = await Users.getNameUser(id)
    ld[id].usages = parseInt(ld[id].usages) + parseInt(num);
fs.writeFileSync(path, JSON.stringify(ld));
 api.sendMessage(`Đã chuyển cho ${name} ${num} lượt dùng bot`, threadID, async () => {
  ld[senderID].usages = parseInt(ld[senderID].usages) - parseInt(num);
fs.writeFileSync(path, JSON.stringify(ld));
    }, messageID);
	}
  if (args[0] == "reset") {
    if (permssion != 2) return api.sendMessage("Bạn là thành viên", threadID, messageID);
    for (const i of global.data.allUserID) {
      if (!ld[i].usages) return
      ld[i].usages = 1
      fs.writeFileSync(path, JSON.stringify(ld, null, 2));
    }
     api.sendMessage(`done`, threadID)
  }
  if (args[0] == "check" || args[0] == "c") {
     if (args[1] == "all" || args[1] == "a") {
      let storage = [], sl = [];
      for (const value of data.userInfo) storage.push({ "id": value.id, "name": value.name });
      for (const user of storage) {
        if (!(user.id in ld)) ld[user.id] = {
          usages: 99
        }
        sl.push({ "name": user.name, "sl": (typeof ld[user.id].usages == "undefined") ? 0 : ld[user.id].usages, "uid": user.id });
      }
      sl.sort((a, b) => {
        if (a.sl > b.sl) return -1;
        if (a.sl < b.sl) return 1;
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        a.name.localeCompare(b.name, undefined, { numeric: true });
      });
      msg = "==「KIỂM TRA LƯỢT DÙNG」==\n";
      let countsl = 0
      for (let e of sl) {
        msg += `\n${countsl += 1}. ${e.name} - ${e.sl} lượt.`
      }
      msg += `\n\n=== 「${timeNow}」 ===`;
      require("fs").writeFileSync(__dirname + `/../../includes/handle/usages.json`, JSON.stringify(ld, null, 4));
      return api.sendMessage(msg, threadID);
    }
    api.sendMessage(`${name} còn ${ld[id].usages} lượt dùng bot`, threadID, messageID);
    }
  if (args[0] == "mua") {
    const userMoney = (await Currencies.getData(senderID)).money
  	return api.sendMessage(`Nhập số lượt cần mua ( ${CC(userMoney * 10 / 100)}$ = 1 lượt ) `,threadID, (error, info) => {
        global.client.handleReply.push({
            name: nmdl,
            messageID: info.messageID,
            author: senderID,
            type: "a",
        })
    }, messageID);
  }
}


module.exports.handleReply = async function ({ event, api, Currencies, handleReply }) {
  let ld = JSON.parse(fs.readFileSync(path));
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type, author } = handleReply;
    const userMoney = (await Currencies.getData(author)).money;
    const arr = body.split(" ")
    const input = parseInt(arr[0]);
    const money = (parseInt(arr[0]) * (userMoney * 10 / 100))
  switch (type) {
        case "a": {
            switch (body) {
                case body: { // tính làm thêm case mua bằng xp nữa :D
                  if (input > userMoney || isNaN(body) || userMoney < money || arr.length >= 2) {
     return api.sendMessage(
       `Bạn không đủ money để giao dịch hoặc số lượt không phải là con số`, threadID, messageID);
      }
                  else if (input <= 0) {
     return api.sendMessage(
       `Số lượt cần mua phải lớn hơn 0`, threadID, messageID);
      }
                 else { await Currencies.decreaseMoney(author, parseInt(money))
ld[author].usages = parseInt(ld[author].usages) + input
fs.writeFileSync(path, JSON.stringify(ld))
                    return api.sendMessage(
                        `Mua thành công ${(input.toLocaleString(`en-US`))} lượt dùng\n - ${(money.toLocaleString(`en-US`))} $`
                  , threadID, messageID);
                }
              }
            }
        }
     }
   }
function CC(n) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2
  })
}