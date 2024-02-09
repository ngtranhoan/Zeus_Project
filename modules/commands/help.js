module.exports.config = {
    name: "help",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: "Xem danh sách lệnh và info",
    commandCategory: "System",
    usages: "[tên lệnh/all]",
    cooldowns: 5
};
module.exports.languages = {
    "vi": {},
    "en": {}
}
module.exports.run = async function({
    api,
    event,
    args
}) {
    const {
        threadID: tid,
        messageID: mid,
        senderID: sid
    } = event
    var type = !args[0] ? "" : args[0].toLowerCase()
    var msg = "",
        array = [],
        i = 0
    const cmds = global.client.commands
    const TIDdata = global.data.threadData.get(tid) || {}
    var prefix = TIDdata.PREFIX || global.config.PREFIX
    if (type == "all") {
        for (const cmd of cmds.values()) {
            msg += `${++i}. ${cmd.config.name}: ${cmd.config.description}\n`
        }
        return api.sendMessage(msg, tid, mid)
    }
   // if (type == "all") return
    if (type) {
        for (const cmd of cmds.values()) {
            array.push(cmd.config.name.toString())
        }
        if (!array.find(n => n == args[0].toLowerCase())) {
            const stringSimilarity = require('string-similarity')
            commandName = args.shift().toLowerCase() || ""
            var allCommandName = [];
            const commandValues = cmds['keys']()
            for (const cmd of commandValues) allCommandName.push(cmd)
            const checker = stringSimilarity.findBestMatch(commandName, allCommandName)
            if (checker.bestMatch.rating >= 0.5) command = client.commands.get(checker.bestMatch.target)
            msg = `❗ Không tìm thấy lệnh '${type}' trong hệ thống.\n» Lệnh gần giống được tìm thấy => '${checker.bestMatch.target}'`
            api.sendMessage(msg, tid, mid)
        }
        const cmd = cmds.get(type).config
        msg = `》 ${cmd.name} 《\n➢ 𝐏𝐡𝐢𝐞̂𝐧 𝐁𝐚̉𝐧: ${cmd.version}\n➢ 𝐐𝐮𝐲𝐞̂̉𝐧 𝐇𝐚̣𝐧: ${TextPr(cmd.hasPermssion)}\n➢ 𝐓𝐚́𝐜 𝐆𝐢𝐚̉: ${cmd.credits}\n➢ 𝐌𝐨̂ 𝐓𝐚̉: ${cmd.description}\n➢ 𝐓𝐡𝐮𝐨̣̂𝐜 𝐍𝐡𝐨́𝐦: ${cmd.commandCategory}\n➢ 𝐂𝐚́𝐜𝐡 𝐃𝐮̀𝐧𝐠: ${cmd.usages}\n➢ 𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 𝐂𝐡𝐨̛̀: ${cmd.cooldowns}s`
        api.sendMessage(msg, tid, mid)
    } else {
        CmdCategory()
        array.sort(S("nameModule"))
        for (const cmd of array) {
            msg += `${++i}. 》 ${cmd.cmdCategory.toUpperCase()} 《\n ➢ 𝐐𝐮𝐲𝐞̂̉𝐧 𝐇𝐚̣𝐧: ${TextPr(cmd.permission)}\n ➢ 𝐓𝐨̂̉𝐧𝐠 ${cmd.nameModule.length} 𝐋𝐞̣̂𝐧𝐡, 𝐆𝐨̂̀𝐦:\n↬ ${cmd.nameModule.join(", ")}\n────────────────────\n`
        }
        msg += `\n » Tổng số lệnh: ${cmds.size}\n » ${prefix}help + tên lệnh để xem chi tiết\n » ${prefix}help + all để xem tất cả lệnh`
        api.sendMessage(msg, tid)
    }

    function CmdCategory() {
        for (const cmd of cmds.values()) {
            const {
                commandCategory,
                hasPermssion,
                name: nameModule
            } = cmd.config
            if (!array.find(i => i.cmdCategory == commandCategory)) {
                array.push({
                    cmdCategory: commandCategory,
                    permission: hasPermssion,
                    nameModule: [nameModule]
                })
            } else {
                const find = array.find(i => i.cmdCategory == commandCategory)
                find.nameModule.push(nameModule)
            }
        }
    }
}

function S(k) {
    return function(a, b) {
        let i = 0;
        if (a[k].length > b[k].length) {
            i = 1
        } else if (a[k].length < b[k].length) {
            i = -1
        }
        return i * -1
    }
}

function TextPr(permission) {
    p = permission
    return p == 0 ? "Thành Viên" : p == 1 ? "Admin Box" : p = 2 ? "Admin bot" : "Toàn Quyền"
}