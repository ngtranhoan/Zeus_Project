module.exports.config = {
    name: "goibot",
    version: "1.1.1",
    hasPermssion: 1,
    credits: "DC-Nam",
    description: "Sẽ auto rep khi có từ 'bot' có thể bật/tắt",
    commandCategory: "Không cần dấu lệnh",
    usages: "",
    cooldowns: 0
}
module.exports.handleEvent = async function({
    api,
    event,
    Threads: T
}) {
    const {
        threadID: t,
        messageID: m,
        senderID: s,
        body: y
    } = event
    const content = y.toLowerCase()
    const botID = api.getCurrentUserID();
    let getDataThread = await T.getData(t) || {}
    const {
        data,
        threadInfo
    } = getDataThread
    const value = ["Ơiii", "Ơiii bot đây", "Nghe nè", "Gọi gì dợ", "Bot đâyyyy", "Đây", "Bot nghe nè", "Ơii! bot đây, hạn chế chat 'bot' nhoa"]
    const keyword = ["bot", "nam"]
    if (keyword.includes(content) && s != botID && (typeof data.goibot == "undefined" || data.goibot.status == true)) {
       return api.sendMessage(Random(value), t, m)
    }
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
    if (typeof data.goibot == "undefined") {
        data.goibot = {
            status: true,
            storage: []
        }
        await T.setData(t, {
            data
        });
        await global.data.threadData.set(t, data)
    }
    const status = data.goibot.status == true ? false : true
    data.goibot.status = status
    await T.setData(t, {
        data
    });
    await global.data.threadData.set(t, data)
    var msg = `» Đã ${status == true ? "bật" : "tắt"} gọi bot`
    a.sendMessage(msg, t, m)
}

function Random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}