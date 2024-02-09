/*
@credit ⚡️D-Jukie
@vui lòng không chỉnh sửa credit
*/
module.exports.config = {
    name: "working",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "⚡D-Jukie", 
    description: "Làm việc để có tiền, có làm thì mới có ăn",
    commandCategory: "Kiếm tiền",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 300000
    }
};
module.exports.languages = {
    "vi": {
        "cooldown": "Bạn đang kiệt sức 🥵, hãy nghỉ ngơi \nThời gian hồi phục thể lực còn: %1 phút %2 giây."      
    },
    "en": {
        "cooldown": "⚡️You're done, come back later: %1 minute(s) %2 second(s)."
    }
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    if (handleReply.author != event.senderID) return;
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
//random coins nhận được khi làm việc ít nhất 1
var coinscn = Math.floor(Math.random() * 9000) + 1; //random coins khi làm ở khu công nghiệp
var coinsdv = Math.floor(Math.random() * 5000) + 1; //random coins khi làm ở khu dịch vụ
var coinsmd = Math.floor(Math.random() * 15000) + 1; //random coins khi làm ở mỏ dầu
var coinsq = Math.floor(Math.random() * 6000) + 1; //random coins khi khai thác quặng
var coinsdd = Math.floor(Math.random() * 12000) + 1; //random coins khi đào đá
var coinsdd1 = Math.floor(Math.random() * 10000) + 1; //random coins khi đào đá
var coinstb = Math.floor(Math.random() * 9000) + 1; //random coins khi kinh doanh thiết bị
var coinsqt = Math.floor(Math.random() * 7000) + 1; //random quân trang
var coinsso = Math.floor(Math.random() * 8000) + 1; //random duễn viên nhật :)))
//random công việc cần làm
var rdcn = ['tuyển dụng nhân viên', 'quản trị khách sạn', 'tại nhà máy điện', 'đầu bếp trong nhà hàng', 'công nhân']; //random công việc khi làm ở khu công nghiệp
var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   

var rddv = ['sửa ống nước', 'sửa điều hòa cho hàng xóm', 'bán hàng đa cấp', 'phát tờ rơi', 'shipper', 'sửa máy vi tính', 'hướng dẫn viên du lịch', 'cho con bú']; //random công việc khi làm ở khu dịch vụ
var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 

var rdmd = ['kiếm được 13 thùng dầu', 'kiếm được 8 thùng', 'kiếm được 9 thùng dầu', 'kiếm được 8 thùng dầu', 'ăn cướp dầu ', 'lấy nước đổ vô dầu rồi bán']; //random công việc khi làm ở mỏ dầu
var work3 = rdmd[Math.floor(Math.random() * rdmd.length)]; 

var rdq = ['quặng sắt', 'quặng vàng', 'quặng than', 'quặng chì', 'quặng đồng ', 'quặng dầu']; //random công việc khi khai thác quặng
var work4 = rdq[Math.floor(Math.random() * rdq.length)]; 

var rddd = ['kim cương', 'vàng', 'than', 'ngọc lục bảo', 'sắt ', 'đá bình thường', 'lưu ly', 'đá xanh']; //random công việc khi đào đá
var work5 = rddd[Math.floor(Math.random() * rddd.length)]; 

var rddd1 = ['khách vip', 'khách quen', 'người lạ', 'thằng ngu tầm 23 tuổi', 'anh lạ mặt', 'khách quen', 'đại gia 92 tuổi', 'thằng nhóc 12 tuổi']; //random công việc khi đào đá
var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];

var rddtb = ['máy ghi hình', 'máy ghi âm', 'máy định vị', 'thiết bị phát tín hiệu', 'Vertu Signature', 'phone 6 Falcon Supernova pink'];//random khi bán thiết bị
var work7 = rddtb[Math.floor(Math.random() * rddtb.length)];

var rddqt = ['vũ khí', 'quân trang', 'kỹ thuật', 'khí tài', 'phương tiện', 'linh kiện', 'vật tư', 'trang thiết bị đặc chủng'];//random đồ dùng cho quân sự
var work8 = rddqt[Math.floor(Math.random() * rddqt.length)];

var rddso = ['Yui Hatano', 'Fujimori Riho', 'Nene Tanaka', 'Yume Nikaido', 'Himari Kinoshita', 'Kaoru Yasui', 'Yua Mikami', 'Himesaki Hana', 'Ichika Matsumoto'];//random diễn viên nhật :))))
var work9 = rddso[Math.floor(Math.random() * rddso.length)];

var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `😺Bạn đang làm việc ${work1} ở khu công nghiệp và kiếm được ${coinscn}$` ; Currencies.increaseMoney(event.senderID, coinscn); break;             
                case "2": msg = `😺Bạn đang làm việc ${work2} ở khu dịch vụ và kiếm được ${coinsdv}$`; Currencies.increaseMoney(event.senderID, coinsdv); break;
                case "3": msg = `😺Bạn ${work3} tại khu mở dầu và bán được ${coinsmd}$`; Currencies.increaseMoney(event.senderID, coinsmd); break;
                case "4": msg = `😺Bạn đang khai thác ${work4} và kiếm được ${coinsq}$`; Currencies.increaseMoney(event.senderID, coinsq); break;
                case "5": msg = `😺Bạn đào được ${work5} và kiếm được ${coinsdd}$` ; Currencies.increaseMoney(event.senderID, coinsdd); break;
                case "6": msg = `😺Bạn được ${work6} cho ${coinsdd1}$ nếu xxx 1 đêm, thế là bạn đồng ý ngay :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "7": msg = `😺Bạn kinh doanh thiết bị bán được ${work7} và thu về ${coinstb}$` ; Currencies.increaseMoney(event.senderID, coinstb); break;
                
                case "8": msg = `😺Bạn là 1 thằng kinh doanh ${work8}. Một hôm may mắn được lực lượng quân sự mua tất cả với giá ${coinsqt}$` ; Currencies.increaseMoney(event.senderID, coinsqt); break;
                
                case "9": msg = `🤧Bạn sang nhật đi làm thì được diễn viên nổi tiếng "${work9}" thuê về nhà sửa dùm ống nước và nhận được ${coinsso}$` ; Currencies.increaseMoney(event.senderID, coinsso); break;
                
                case "10": msg = "Bạn có thể xin admin vài đồng nếu muốn có thể dùng callad"; break; //thêm case nếu muốn 
                default: break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("⚡️Vui lòng nhập 1 con số", event.threadID, event.messageID);
            if (choose > 10 || choose < 1) return api.sendMessage("⚡️Lựa chọn không nằm trong danh sách.", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "⚡️Chưa update...") {
                msg = "⚡️Update soon...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    //cooldownTime cho mỗi lần nhận 
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0); 
        return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage("=== CÔNG VIỆC ===" +
                "\n\n1. Khu công nghiệp 🏞" +
                "\n2. Khu dịch vụ 🏘" +
                "\n3. Khu mỏ dầu 🏯" +
                "\n4. Khai thác quặng 🏗" +
                "\n5. Đào đá 🪨" +
                "\n6. Đứng đường 🤦‍♀️" +
                "\n7. Kinh doanh thiết bị 💻" +
                "\n8. kinh doanh quân trang ⚔" +
                "\n9. Đi sửa ống nước 🧑‍🔧"+
                "\n10. Đang update..." +
                "\n\n↪Hãy reply tin nhắn và chọn theo số" //thêm hiển thị case tại đây ||  \n[number]. [Ngành nghề]" +
            , event.threadID, (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}