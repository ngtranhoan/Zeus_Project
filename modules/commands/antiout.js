module.exports.config = {
    name: "antiout",
    version: "1.1.1",
    hasPermssion: 1,
    credits: "DC-Nam",
    description: "Bật/tắt chống out chùa",
    commandCategory: "Box chat",
    usages: "",
    cooldowns: 0
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
    if (typeof data.antiout == "undefined") {
        data.antiout = {
            status: true,
            storage: []
        }
        await T.setData(t, {
            data
        });
        await global.data.threadData.set(t, data)
    }
    const status = data.antiout.status == true ? false : true
    data.antiout.status = status
    await T.setData(t, {
        data
    });
    await global.data.threadData.set(t, data)
    var msg = `» Đã ${status == true ? "bật" : "tắt"} chế độ chống out chùa`
    a.sendMessage(msg, t, m)
}