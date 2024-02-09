const fse = require("fs-extra")
const approved = __dirname + "/../commands/cache/approvedThreads.json"
module.exports.config = {
    name: "checkduyet",
    eventType: ["log:subscribe"],
    version: "1.1.1",
    credits: "DC-Nam",
    description: "Noti check duyệt"
};
module.exports.run = async function({
    api,
    event,
    Users
}) {
    const {
        threadID,
        logMessageData
    } = event
    const {
        PREFIX
    } = global.config
    const {
        getCurrentUserID: botID,
        sendMessage: send,
        unsendMessage: unsend
    } = api
    let data = JSON.parse(fse.readFileSync(approved))
    if (logMessageData.addedParticipants.find(i => i.userFbId == botID())) {
        send("𝐜𝐡𝐞𝐜𝐤 𝐭𝐡𝐞 𝐚𝐩𝐩𝐫𝐨𝐯𝐞𝐝 𝐥𝐢𝐬𝐭...", event.threadID, (error, info) => {
            setTimeout(function() {
                unsend(info.messageID)
                if (!data.includes(threadID)) send("𝐤𝐞̂́𝐭 𝐧𝐨̂́𝐢 𝐭𝐡𝐚̂́𝐭 𝐛𝐚̣𝐢, 𝐧𝐡𝐨́𝐦 𝐛𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐝𝐮̛𝐨̛̣𝐜 𝐝𝐮𝐲𝐞̣̂𝐭 𝐝𝐞̂̉ 𝐠𝐮̛̉𝐢 𝐲𝐞̂𝐮 𝐜𝐚̂̀𝐮 𝐝𝐮̀𝐧𝐠 '" + PREFIX + "request'", threadID)
                else send(`🍎𝐊𝐞̂́𝐭 𝐧𝐨̂́𝐢 𝐝𝐞̂́𝐧 𝐧𝐡𝐨́𝐦 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠!.\n🦄ℎ𝑎̃𝑦 𝑏𝑎̆́𝑡 𝑑𝑎̂̀𝑢 𝑣𝑜̛́𝑖 𝑛ℎ𝑢̛̃𝑛𝑔 𝑙𝑒̣̂𝑛ℎ 𝑑𝑢̛𝑜̛́𝑖 𝑑𝑎̂𝑦 𝑑𝑒̂̉ 𝑙𝑎̀𝑚 𝑞𝑢𝑒𝑛 𝑛ℎ𝑒́!\n༒───────⑄───────༒\n👉 ${PREFIX}help (𝕏𝕖𝕞 𝕕𝕒𝕟𝕙 𝕤𝕒́𝕔𝕙 𝕥𝕠𝕒̀𝕟 𝕓𝕠̣̂ 𝕝𝕖̣̂𝕟𝕙)\n✕═══════〄═══════✕\n💥𝑫𝒖̀𝒏𝒈 𝒍𝒆̣̂𝒏𝒉 𝒄𝒉𝒂̣̂𝒎 𝒕𝒉𝒐̂𝒊 𝒏𝒉𝒂𝒂 :( :(`, threadID)
            }, 5000);
        })
    } else return
}