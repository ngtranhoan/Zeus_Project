const axios = require("axios")
module.exports.config = {
    name: "nino",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: "Trò chuyện cùng nino đáng iuu",
    commandCategory: "Dạy - trò chuyện cùng nino",
    usages: "[on|off]",
    cooldowns: 0
}
module.exports.run = async function({ api: a, event: e, args: g, Threads: T, Users: U }) {
  const { threadID: t, messageID: m, senderID: s } = e
  const { _api, api_key } = global.config
  var msg = ""
  if (["on","off"].includes(g[0])) {
    let getDataThread = await T.getData(t) || {}
    const { data, threadInfo } = getDataThread
    if (typeof data.ninoChat == "undefined") {
        data.ninoChat = {
            status: false,
            storage: []
        }
        await T.setData(t, { data });
        await global.data.threadData.set(t, data)
    }
    const status = data.ninoChat.status == true ? false : true
    const onof = g[0] == "off" ? true : false
    if (onof == status) {
      msg = `» Nino chat đang ${onof != true ? `bật`: `tắt`} rồi ông nội`
       a.sendMessage(msg, t, m)
    }
    if (onof != status) {
    data.ninoChat.status = status
    await T.setData(t, { data });
    await global.data.threadData.set(t, data)
    var msg = `» Đã ${status == true ? "bật" : "tắt"} nino chat`
    a.sendMessage(msg, t, m)
    }
  } else if (!["on","off"].includes(g[0])) {
    var text = encodeURIComponent(g.join(" "))
    let os = (await axios.get(`${_api.api_game}nino/get/${text}?api_key=${api_key.key_game}`)).data
    let nameUser = (await U.getData(e.senderID)).name
    msg = `${os.reply}`
      .replace(/\{name}/g, nameUser)
   a.sendMessage(msg, t, m)
  }
}
module.exports.handleEvent = async function ({ api, event, Threads, Users }) {
  const { threadID: t, messageID: m, senderID: s, body: y } = event
  const { _api, api_key } = global.config
  var msg = ""
  let getDataThread = await Threads.getData(t) || {}
    const { data, threadInfo } = getDataThread
  if (typeof data.ninoChat == "undefined" || data.ninoChat.status == false) return
  else {
    if (s != api.getCurrentUserID() && data.ninoChat.status == true) {
      var text = encodeURIComponent(y)
      let os = (await axios.get(`${_api.api_game}nino/get/${text}?api_key=${api_key.key_game}`)).data
  let nameUser = (await Users.getData(event.senderID)).name
   msg = `${os.reply}`
      .replace(/\{name}/g, nameUser)
   return api.sendMessage(msg, t, m)
    }
  }
}