const fs = require("fs"),
      request = require("request"),
      path = __dirname + '/../../includes/handle/usages.json',
      pathDay = __dirname + "/cache/diemdanh.json",
      pathDaily = __dirname + "/cache/daily/";

module.exports.config = {
	name: "daily",
	version: "2.0.1",
	hasPermssion: 0,
	credits: "DC-Nam",
	description: "Điểm danh nhận quà hằng ngày\n daily info => xem thông tin phần quà\n daily 7day => nhận quà bí mật khi tích đủ 7 điểm nhận từ đăng nhập hàng ngày",
	commandCategory: "Kiếm tiền",
	usages: "+ info / 7day",
	cooldowns: 5,
  envConfig: {
        cooldownTime: 86400000,
        rewardCoin: 5000,
        rewardExp: 1000,
        rewardUsages: 100
  }
};

module.exports.handleEvent = async function ({ event }) {
  
  const { senderID, body, participantIDs, isGroup } = event;
  let dataDay = JSON.parse(fs.readFileSync(pathDay));
      if (!dataDay[senderID]) {
    dataDay[senderID] = {
      diemdanh: 0
    }
fs.writeFileSync(pathDay, JSON.stringify(dataDay, null, 2))
        }
      }
module.exports.onLoad = () => {
  
  if (!fs.existsSync(pathDaily + "cache", "daily")) fs.mkdirSync(pathDaily, { recursive: true });
  
  if (!fs.existsSync(pathDaily + this.config.name +".png")) request("https://i.imgur.com/7ltbAS1.gif").pipe(fs.createWriteStream(pathDaily + this.config.name +".gif"));
  
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
  
  if (!fs.existsSync(pathDay)) fs.writeFileSync(pathDay, JSON.stringify({}));
  
    }
         
module.exports.run = async function({ api, event, args, Currencies }) {
  
  if (!fs.existsSync(pathDaily)) fs.mkdir(pathDaily);
	const listFile = fs.readdirSync(pathDaily);
  
  let dataPath = JSON.parse(fs.readFileSync(path)),
      dataDay = JSON.parse(fs.readFileSync(pathDay));

  const { threadID, messageID, senderID, body} = event, c = this.config.credits, { daily } = global.configModule,
        cooldownTime = daily.cooldownTime,
        rewardCoin = daily.rewardCoin,
        rewardExp = daily.rewardExp,
        rewardUsages = daily.rewardUsages;

var newDate = new Date(), 
      date = newDate.getDay();
  
  if (date == 0) thu = 'Chủ Nhật'
  if (date == 1) thu = 'Thứ Hai'
  if (date == 2) thu = 'Thứ Ba'
  if (date == 3) thu = 'Thứ Tư'
  if (date == 4) thu = 'Thứ Năm'
  if (date == 5) thu = 'Thứ Sáu'
  if (date == 6) thu = 'Thứ Bảy'
  
   if (args[0] == "info") {
      let msg = "";
          msg = `   ====== THÔNG TIN PHẦN QUÀ ======\n\n\n`;
      let i = 1;
      for (let i = 1; i < 8; i++) {
        const addMoney = Math.floor(rewardCoin*(1+7/100)**((i == 0 ? 7 : i) - 1)),
              addExp  = Math.floor(rewardExp*(1+7/100)**((i == 0 ? 7 : i) - 1)),
              addUsages = Math.floor(rewardUsages*(1+7/100)**((i == 0 ? 7 : i) - 1));
    
        msg += `${i == 7 ? "Chủ Nhật" : "Thứ " + (i+1)}: 💸 ${addMoney} $ tiền mặt, 🧪${addExp} exp 💎 ${addUsages} Lượt dùng\n\n`;
      }
     
      return api.sendMessage(
        `${msg}\n\n    ==== HÔM NAY LÀ ${thu} ====`,
      threadID,
        async (error) => {
          if (error)
            return api.sendMessage(
              `Đã có lỗi xảy ra khi lấy thông tin phần quà`,
                threadID);
        }, messageID);
    }
  
  let exp = (await Currencies.getData(senderID)).exp,
      money = (await Currencies.getData(senderID)).money,
      data = (await Currencies.getData(senderID)).data || {};
  
  
  const addMoney = Math.floor(rewardCoin*(1+7/100)**((date == 1 ? 7 : date) - 1)),
        addExp = Math.floor(rewardExp*(1+7/100)**((date == 0 ? 7 : date) - 1)),
        addUsages = Math.floor(rewardUsages*(1+7/100)**((date == 1 ? 7 : date) - 1));

  
    if (args[0] == "3day") {
      if (dataDay[senderID].diemdanh < 3) {
        return api.sendMessage(
          `Bạn mới điểm danh được ${dataDay[senderID].diemdanh} ngày thôi!!, đủ 3 ngày liên tục mới nhận được quà`,
          threadID);
      }
        
      else if (dataDay[senderID].diemdanh > 3) {
        const money7Day = parseInt(1000000),
              exp7Day = parseInt(10000),
              usages7Day = parseInt(500);
        dataPath[senderID] = {
                   usages: dataPath[senderID].usages + parseInt(usages7Day)
        }
fs.writeFileSync(path, JSON.stringify(dataPath, null, 2));
        
        return api.sendMessage({
     body: "Nhận quà đăng nhập 3 ngày thành công!!\n\n"
     + "◆━━━━━•💜•━━━━━◆\n\n"
     + "     🎊Phần quà bao gồm:🎊\n\n"
     + "     💸 " + money7Day.toLocaleString() + " Tiền mặt\n"
     + "     🧪 " + exp7Day.toLocaleString() + " Kinh Nghiệm\n"
     + "     💎 " + usages7Day.toLocaleString() + " Lượt dùng bot\n\n"
     + "◆━━━━━•💜•━━━━━◆\n\n"
     + "Tích đủ 3 điểm để nhận quà tiếp",
        attachment: fs.createReadStream(pathDaily+"/"+listFile[Math.floor(Math.random() * listFile.length)])},
        threadID,
     async function (error) {
         await Currencies.setData(senderID, {
               exp: exp + parseInt(exp7Day),
               money: money + parseInt(money7Day)
           });
       
       if (error) {
         return api.sendMessage(
           `Đã có lỗi xảy ra khi nhận thưởng!!!`,
             threadID);
           }
        },messageID);
      }
    }
          
  if('DC-Nam'!=c)return;else if(typeof data !== "undefined" && cooldownTime - (Date.now() - (data.dailyCoolDown || 0)) > 0) {

      
    var time = cooldownTime - (Date.now() - data.dailyCoolDown),
        hours = Math.floor((time/(1000*60*60)) % 24),
        minutes = Math.floor((time/1000/60) % 60),
        seconds = Math.floor((time/1000) % 60);
         
     function detect(i) {
         if (i < 10) {
             i = "0" + i;
           }
             return i;
         }
    
     check_hours = detect(hours);
     check_minutes = detect(minutes);
     check_seconds = detect(seconds);
    
		return api.sendMessage(
      `Hôm nay bạn đã nhận quà rồi, hãy quay lại sau ${check_hours} giờ ${check_minutes} phút ${check_seconds} giây`,
 threadID,
    async (error) => {
      if (error) 
        return api.sendMessage(
          `Đã có lỗi xảy ra khi check thời gian!!!`
        )
    }, messageID);
}
    
 else {
   dataPath[senderID].usages = dataPath[senderID].usages + parseInt(addUsages),
   dataDay[senderID].diemdanh = dataDay[senderID].diemdanh + parseInt(1); 
fs.writeFileSync(path, JSON.stringify(dataPath, null, 2)),
fs.writeFileSync(pathDay, JSON.stringify(dataDay, null, 2));
   
   return api.sendMessage({
     body: "Điểm danh " + thu + " thành công!!\n\n"
     + "◆━━━━━•💜•━━━━━◆\n\n"
     + "     🎊Phần quà bao gồm:🎊\n\n"
     + "     💸 " + addMoney.toLocaleString() + " Tiền mặt\n"
     + "     🧪 " + addExp.toLocaleString() + " Kinh Nghiệm\n"
     + "     💎 " + addUsages.toLocaleString() + " Lượt dùng bot\n"
     + "      + " + 1 + " Điểm đăng nhập\n\n"
     + "Bạn hiện tại có " + dataDay[senderID].diemdanh + " Điểm đăng nhập\n"
     + "dùng " + global.config.PREFIX +"daily 3day " + "để nhận quà\n"
     + "◆━━━━━•💜•━━━━━◆",
        attachment: fs.createReadStream(pathDaily+"/"+listFile[Math.floor(Math.random() * listFile.length)])},
        threadID,
     async function (error) {
       data.dailyCoolDown = Date.now();
         await Currencies.setData(senderID, {
               exp: exp + parseInt(addExp),
               money: money + parseInt(addMoney),
               data
           });
       
       if (error) {
         return api.sendMessage(
           `Đã có lỗi xảy ra khi nhận thưởng!!!`,
             threadID);
           }
        },messageID);
       }
     }