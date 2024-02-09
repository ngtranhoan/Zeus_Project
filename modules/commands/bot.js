module.exports.config = {
	name: "bot",
	version: "1.1.1",
	hasPermssion: 0,
	credits: "DC-Nam",
	description: "Xem info bot",
	commandCategory: "System",
  usages: "",
  cooldowns: 0
};
const axios = require("axios");
module.exports.run = async ({ api: a, event: e, args: g, Users }) => {
let osimg = (await axios.get("https://9523cf2a-3f79-4e1f-974e-85da41fd164f.id.repl.co/api_images?tag=chitanda&api_key=keytest")).data
let osfact = (await axios.get("https://9523cf2a-3f79-4e1f-974e-85da41fd164f.id.repl.co/fact?api_key=keytest")).data
let name = (await Users.getData(e.senderID)).name
var uptime = process.uptime(),
		hours = Math.floor(uptime / (60 * 60)),
		miutes = Math.floor((uptime % (60 * 60)) / 60),
		seconds = Math.floor(uptime % 60);

var msg = `👋 ${await ITL(name)}\n\n`
   + `» Bot Name: ${global.config.BOTNAME}\n`
   + `» Uptime: ${await ITL(`${checkTime(hours)}:${checkTime(miutes)}:${checkTime(seconds)}`)}\n`
   + `» All Threads: ${await ITL(global.data.allThreadID.length)}\n`
   + `» All User: ${await ITL(global.data.allUserID.length)}\n`  
   + `» All Comands: ${await ITL(global.client.commands.size)}\n`
   + `» All Events: ${await ITL(global.client.events.size)}\n`  
   + `» FACT: ${await ITL(osfact.fact)}\n`
a.sendMessage({body: msg, attachment: await DownLoad(osimg.url)}, e.threadID, e.messageID)
}
async function DownLoad(url) {
    return (await axios.get(url, {
        responseType: "stream"
    })).data
  }
async function ITL(text) {
  let os = (await axios.get(encodeURI(`https://6821df2e-d4cb-44c6-abb3-185e21d7d2fb.id.repl.co/text?input=${text}&type=bold_italic&api_key=keypro`))).data
  return os.text.complete
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i
    }
  return i
}