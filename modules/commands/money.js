module.exports.config = {
  name: "money",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "DC-Nam",
  description: "Xem số tiền bản thân hoặc người được reply, tag",
  commandCategory: "Tài chính",
  usages: "[...|reply|Tag]",
  cooldowns: 0
}
module.exports.run = async function({ api: a, event: e, args: g, Currencies: C, Users: U }) {
  var { threadID: t, messageID: m, senderID: s, mentions: ms, type } = e
  var uid = type == "message_reply" && !g[0] ? e.messageReply.senderID : !g[0] ? s : Object.keys(ms)[0]
  let moneyUser = (await C.getData(uid)).money
  let nameUser = (await U.getData(uid)).name
  a.sendMessage(`» ${uid == s ? "Bạn" : await F_italic(nameUser)} còn ${await F_italic(CurrencyC(moneyUser))}$`, t, m)
}

function CurrencyC(num) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2
  })
}
var F_italic = async (text) => {
    const enText = encodeURI(text)
    let os = (await require("axios").get("https://6821df2e-d4cb-44c6-abb3-185e21d7d2fb.id.repl.co/text?input=" + enText + "&type=bold_italic&api_key=keypro")).data
    return os.text.complete
    }