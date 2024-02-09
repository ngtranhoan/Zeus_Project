const axios = require("axios")
module.exports.config = {
    name: "teachnino",
    version: "1.1.1",
    credits: "DC-Nam",
    hasPermssion: 0,
    description: "Dạy nino nói chuyện?",
    usages: "[...]",
    commandCategory: "Dạy - trò chuyện cùng nino",
    cooldowns: 0
}
module.exports.run = async function({ api: a, event: e, args: g }) {
    const { threadID: t, messageID: m, senderID: s } = e
    const { name } = this.config
    msg = `» Reply tin nhắn này để nhập câu hỏi`
    a.sendMessage(msg, t, (error, info) => {
        global.client.handleReply.push({
            name,
            messageID: info.messageID,
            author: s,
            _1st: "a"
        })
    }, m)
}
module.exports.handleReply = async function({ api: a, event: e, handleReply: h }) {
    const { threadID: t, messageID: m, senderID: s, body: y } = e
    const { name } = this.config
    const { _api, api_key } = global.config
    if (s != h.author) return
    if (h._1st) return a.sendMessage(`» Reply tin nhắn này để nhập câu trả lời\n\n 👍 Dùng {name} để auto get tên người chat ở vị trí text bạn đặt`, t, (error, info) => {
        global.client.handleReply.push({
            name,
            messageID: info.messageID,
            author: h.author,
            _2nd: "b",
            input: y
        })
    }, m)
    if (h._2nd) {
const input = encodeURIComponent(h.input)
const output = encodeURIComponent(e.body)
        let os = (await axios.get(`${_api.api_game}nino/add/${input}&&${output}?api_key=${api_key.key_game}`)).data
        a.sendMessage(os.reply, t, m)
    }
}