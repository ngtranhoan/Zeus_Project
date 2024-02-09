var key = ["hello", "hai", "hăi", "hj", "lô"];
module.exports.config = {
	name: "hello",	
  version: "1.0.0", 
	hasPermssion: 0,
	credits: "DC-Nam",
	description: "Auto rep khi có từ khóa " + key.join(", "), 
	commandCategory: "Không cần dấu lệnh",
	usages: "",
	cooldowns: 0
};
function random(arr) {
var rd = arr[Math.floor(Math.random() * arr.length)];
    return rd;
        }
module.exports.handleEvent = async function ({ api, event, Users, Threads }) {
  const { threadID, messageID, senderID, body, isGroup } = event;
  const dataThread = global.data.threadData.get(threadID) || {};
  if (body.indexOf("%hello") != -1) return
  if (isGroup == true && dataThread.hello.status == "undefined" || dataThread.hello.status == true) {
   const name = await Users.getNameUser(senderID);
   const botID = api.getCurrentUserID();
   const moment = require("moment-timezone");
   const time = moment.tz("Asia/Ho_Chi_Minh").format("HH");

       /*============ CHECK TIME ============*/

 if (time >= 5) session = "sáng"
 if (time >= 11) session = "trưa"
 if (time >= 14) session = "chiều"
 if (time >= 18) session = "tối"
 if (time >= 22 || (time >= 0 && time < 5)) session = "khuye"  
        /*============ KEY, VALUE ============*/
    
   var array = [];
   var characters = ["➷"]  
   var icon = ["😛", "🥰", "😜", "😘", "🤪", "😝", "🤗", "🙄", "🤤", "🥴", "🥲", "😋"];
   var icon1 = ["🙆‍♂️", "🙆‍♀️", "🙆", "🙇‍♂️", "🙇‍♀️", "🙇"];
   var icon2 = ["😴", "😪", "🥱", "🤐", "😑", "🙄", "💢"];
   var value = [`xin chào ${name}`, `bot Nam xin chào ${name}`, `chao ${name}`, `hey xin chao ${name}`, `a nhô ${name}`, `xinchao ${name}`, `hêy xin chào ${name}`, `hí xin chào ${name}`];
   var value1 = [`buổi ${session} vui vẻ`, `buổi ${session} vui vẻ nhóa`, `buổi ${session} vui vẻ`];
   var valueLate = [`${session} rồi ngủ đi ${name}`, `${session} rồi hong chào nữa`, `${session} rồi bot hong chào nữa, ngủ i`, `ngu di`, `ngủ đi ${name}`, `chào mãi bot mệt yòi, đi ngủ`, `đi ngủ`]
      
    /*============ CHECK, MATCHING ============*/
    
    for (let e of key) {
     if ((time >= 22 || (time >= 0 && time < 5)) && body.toLowerCase().indexOf(e) != -1 && senderID != botID) {
      array += random(valueLate)+random(icon2)
        break;
      };
      if (time >= 5 && body.toLowerCase().indexOf(e) != -1 && senderID != botID) {
        array += random(characters) + " " + random(value)+random(icon1)+", " + random(value1)+random(icon)
        break;
      };
         };

        /*============ SEND MESSAGE ============*/
    
      return api.sendMessage(array, threadID);
    };
}

  
module.exports.run = async function({
    api: a,
    event: e,
    args: g,
    Threads: T
}) {
    const {
        threadID: t,
        messageID: m,
        senderID: s
    } = e
    let getDataThread = await T.getData(t) || {}
    const {
        data,
        threadInfo
    } = getDataThread
    if (typeof data.hello == "undefined") {
        data.hello = {
            status: true,
            storage: []
        }
        await T.setData(t, {
            data
        });
        await global.data.threadData.set(t, data)
    }
    const status = data.hello.status == true ? false : true
    data.hello.status = status
    await T.setData(t, {
        data
    });
    await global.data.threadData.set(t, data)
    var msg = `» Đã ${status == true ? "bật" : "tắt"} auto rep khi có từ ${key.join(" ")}`
    a.sendMessage(msg, t, m)
}