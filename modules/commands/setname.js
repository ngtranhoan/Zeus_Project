module.exports.config = {
    name: "setname",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Đổi biệt danh trong nhóm của bạn hoặc của người bạn reply, tag",
    commandCategory: "Box chat",
    usages: "[...|reply|tag] + [name]",
    cooldowns: 5
};
module.exports.run = async function({
    api,
    event,
    args
}) {
    const {
        threadID: t,
        messageID: m,
        senderID: s,
        mentions,
        type
    } = event, {
        sendMessage: send,
        changeNickname: cgname
    } = api
    const mention = Object.keys(mentions)
    const name = !mention[0] ? args.join(" ") : args.join(" ").replace(mentions[mention[0]], "")
    const uid = type == "message_reply" ? event.messageReply.senderID : type != "message_reply" && !mention[0] ? s : mention[0]
    await cgname(name, t, uid)
    return send(`» Thay đổi biệt danh hoàn tất`, t)
}