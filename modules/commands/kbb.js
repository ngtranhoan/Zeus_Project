module.exports.config = {
    name: "kbb",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Rip05-mod lechinh",
    description: "kbb [kéo/búa/bao] hoặc [✌/👊/✋] để chơi oằn tù tì",
    commandCategory: "Game",
    usages: "<[kéo/búa/bao] hoặc[✌/👊/✋]> <Số tiền cược (lưu ý phải trên 100$)>",
    cooldowns: 0
  };
  
  module.exports.run = async function({ api, event, args, Currencies, getText, permssion }) {
    try {
      const { threadID, messageID, senderID } = event;
      const { getData, increaseMoney, decreaseMoney } = Currencies;
      const request = require('request');
      const axios = require('axios');
      if (this.config.credits != 'Rip05-mod lechinh') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » Đổi credits con cặc đjt mẹ mày luôn đấy con chó:))');
        return api.sendMessage('[ WARN ] Phát hiện người điều hành bot ' + global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"', threadID, messageID);
      }
      const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
      const slotItems = ["kéo", "búa", "bao"];
      const money = (await getData(senderID)).money;
      if (isNaN(args[1]) == true) return api.sendMessage('Nội dung "Số tiền cược" mà bạn nhập không phải 1 con số hợp lệ!', threadID, messageID);
      var moneyBet = parseInt(args[1]);
      if (isNaN(moneyBet) || moneyBet <= 100) return api.sendMessage('Số tiền đặt cược không được dưới 100$', threadID, messageID);
      if (moneyBet > money) return api.sendMessage('Tài khoản của bạn không đủ tiền để chơi.', threadID, messageID);
      var number = [], list = [], listimg = [], win = false;
      var kbb1 = slotItems[Math.floor(Math.random() * slotItems.length)];
     
      // ARGS
      let content = args[0];
      var content1;
      if (content == 'kéo' || content == '✌') {
        content1 = 'keo';
      }
      else if (content == 'búa' || content == '👊') {
        content1 = 'bua';
      }
      else if (content == 'bao' || content == '✋') {
        content1 == 'bao';
      }
      else {
        return api.sendMessage(`Sai định dạng\n${global.config.PREFIX}${this.config.name} <[kéo/búa/bao] hoặc [✌/👊/✋]> <Số tiền cược (lưu ý phải trên 100$)>`, threadID, messageID);
      }
      // request
      if (!existsSync(__dirname + '/cache/keo.jpg')) {
        request('https://i.imgur.com/PFkQicv.jpg').pipe(createWriteStream(__dirname + '/cache/keo.jpg'));
      }
      if (!existsSync(__dirname + '/cache/bua.jpg')) {
        request('https://i.imgur.com/tcUO1Xx.jpg').pipe(createWriteStream(__dirname + '/cache/bua.jpg'));
      }
      if (!existsSync(__dirname + '/cache/bao.jpg')) {
        request('https://i.imgur.com/HtwJVNE.jpg').pipe(createWriteStream(__dirname + '/cache/bao.jpg'));
    } 
      if (!existsSync(__dirname + '/cache/kbb.gif')) {
        request('https://i.imgur.com/0TcWVd5.gif').pipe(createWriteStream(__dirname + '/cache/kbb.gif'));
      }
      // kbb 1
      if (kbb1 == 'kéo') {
        var kbb1 = 'keo';
        var kbb_1 = __dirname + '/cache/keo.jpg';
      }
      else if (kbb1 == 'búa') {
        var kbb1 = 'bua';
        var kbb_1 = __dirname + '/cache/bua.jpg';
      }
      else if (kbb1 == 'bao') {
        var kbb1 = 'bao';
        var kbb_1 = __dirname + '/cache/bao.jpg';
      }
      
   
      // array kbb
      list.push(kbb1);
      
      // array img
      listimg.push(createReadStream(__dirname + '/cache/' + kbb1 + '.jpg'))
      // icon 1
      if (kbb1 == 'keo') {
        var icon1 = '✌';
      }
      else if (kbb1 == 'bua') {
        var icon1 = '👊'
      }
      else if (kbb1 == 'bao') {
        var icon1 = '✋';
      }
      
      // sendMessage
      api.sendMessage({
        body: ' 💜 > ֍ Oằn Tù Tì Ra Cái Gì Ra Cái Này? ֍ \n⚚ Chúc Bạn May Mắn =))֍  💜',
        attachment: createReadStream(__dirname + '/cache/kbb.gif')
      }, threadID, (err, info) => {
        if (err) return api.sendMessage(err, threadID, messageID);
        setTimeout(() => {
          api.unsendMessage(info.messageID);
          var check = list.findIndex(i => i.toString() == content1);
          var check2 = list.includes(content1);
          //console.log(check);
          //console.log(icon1 + icon2 + icon3);
          if (check >= 0 || check2 == true) {
            return api.sendMessage({
              body: `💙 💜 Kết Quả Oằn Tù Tì : ${icon1} \n💙 💜Bạn đã thắng và nhận được ${moneyBet * 3}$`,
              attachment: listimg
            }, threadID, () => Currencies.increaseMoney(senderID, moneyBet * 3), messageID);
          }
          else if (check < 0 || check2 == false) {
            return api.sendMessage({
              body: `💙 💜 Kết Quả Oằn Tù Tì : ${icon1}\n💙 💜 Đen thôi  , bạn bị trừ ${moneyBet}$ =))`,
              attachment: listimg
            }, threadID, () => Currencies.decreaseMoney(senderID, moneyBet), messageID);
          }
          else {
            return api.sendMessage('Đã xảy ra lỗi. Vui lòng thử lại sau 5s', threadID, messageID);
          }
        }, 3000);
      }, messageID);
    }
    catch (err) {
      console.error(err);
      return api.sendMessage(err, event.threadID, event.messageID);
    }
  }