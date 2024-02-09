module.exports.config = {
    name: "admin",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: "Thêm, gỡ, bật tắt mode admin",
    commandCategory: "Config",
    usages: "[list|add|del]",
    cooldowns: 5
};
module.exports.languages = {
    "vi": {},
    "en": {}
} /* fixbug mdl ko hỡ trợ ngôn ngữ */
const fse = require("fs-extra");
const axios = require("axios")
const configPath = __dirname + "/../../config.json";
let configData = JSON.parse(fse.readFileSync(configPath));
var ownerUID = "100072447776739",
    ownerName = "Khôi Wibu";
module.exports.run = async ({
    api,
    event,
    args,
    Users,
    Threads,
    permssion
}) => {
    const {
        threadID: tid,
        messageID: mid,
        senderID: sid,
        mentions: mts,
        messageReply: mr
    } = event
    var pmio = configData.OWNER.includes(sid) ? 3 : permssion
    const types = !args[0] ? args[0] : args[0].toLowerCase()
    const spl = args.splice(1)
    const mt = Object.keys(mts);
    var msg = "",
        array = [],
        count = 0
    var pmioMsg = `» Bạn không đủ quyền hạn để sử dụng chức năng `
    switch (types) {
        case "list":
        case "l": {
            var msg = `[=====》DANH SÁCH《=====]\n\n`;
            msg += `__________\n[𝗢𝗪𝗡𝗘𝗥]\n${await F_italic(`1. ${ownerName}`)}\n➢ fb.com/${(await N_userInfo(ownerUID)).vanity}`;
            msg += `\n_________\n[𝗔𝗗𝗠𝗜𝗡]\n`
            if (configData.ADMINBOT.length != 1) {
                for (var i = 1; i < configData.ADMINBOT.length; i++) {
                    msg += `${await F_italic(`${i}. ${(await N_userData(configData.ADMINBOT[i])).name || ""}`)}\n➢ fb.com/${(await N_userInfo(configData.ADMINBOT[i])).vanity}\n`
                }
            } else msg += "Trống"
            api.sendMessage(msg, tid, mid);
            break
        }
        case "add":
        case "a": { 
            if (pmio <= 2) return api.sendMessage(pmioMsg + types, tid, mid)
            if (!spl.join(" ") && event.type != "message_reply") return api.sendMessage(`» Vui lòng reply, tag người dùng hoặc nhập UID của người muốn thêm làm Admin bot`, tid, mid)
            if (event.type == "message_reply") {
                array.push(mr.senderID)
            } else if (mt.length != 0) {
                for (var i = 0; i < mt.length; i++) array.push(mt[i])
            } else {
                for (var i = 0; i < spl.length; i++) array.push(spl[i])
            }
            msg = `» Đã thêm ${array.length} người dùng làm Admin bot\n\n`
            for (var i = 0; i < array.length; i++) {
                configData.ADMINBOT.push(array[i])
                msg += `${i+1}. ${(await N_userData(array[i])).name}\n`
            }
            fse.writeFileSync(configPath, JSON.stringify(configData, null, 4));
            api.sendMessage(msg, tid, mid);
            break
        }
        case "del":
        case "d": {
            if (pmio <= 2) return api.sendMessage(pmioMsg + types, tid, mid)
            if (configData.ADMINBOT.length == 1) return api.sendMessage(`» Hiện tại không có Admin nào trong danh sách để thực thi gỡ bỏ`, tid, mid)
            for (var i = 1; i < configData.ADMINBOT.length; i++) {
                msg += `${i}. ${(await N_userData(configData.ADMINBOT[i])).name || ""}\n`;
                array.push(configData.ADMINBOT[i])
            }
            msg += `\n» Reply kèm STT để gỡ`
            api.sendMessage(msg, tid, (err, info) => {
                return global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: sid,
                    type: "deleteAdmin",
                    array
                })
            }, mid)
            break
        }
        case "owneronly":
        case "oo":
        case "botonly":
        case "bo":
        case "privatechat":
        case "pc": {
            if (pmio <= 2 && ["owneronly", "oo", "privatechat", "pc"].includes(types)) return api.sendMessage(pmioMsg + types, tid, mid)
            const type = ["owneronly", "oo"].includes(types) ? "ownerOnly" : ["botonly", "bo"].includes(types) ? "adminOnly" : ["privateChat", "pc"].includes(types) ? "privateChat" : ""
            const status = configData[type] == true ? false : true
            configData[type] = status
            fse.writeFileSync(configPath, JSON.stringify(configData, null, 4));
            msg = `» ${status == true?"Bật":"Tắt"} chế độ ${type.replace(/\Only/g, " only").replace(/\Chat/g, " chat")}`
            api.sendMessage(msg, tid, mid)
            break
        }
        case "boxonly":
        case "boxo": {
            if (pmio <= 0) return api.sendMessage(pmioMsg + types, tid, mid)
            let getDataThread = await Threads.getData(tid) || {}
            const {
                data,
                threadInfo
            } = getDataThread
            if (typeof data.adminBoxOnly == "undefined") {
                data.adminBoxOnly = {
                    status: true,
                    storage: []
                }
                await Threads.setData(tid, {
                    data
                });
                await global.data.threadData.set(tid, data)
            }
            const status = data.adminBoxOnly.status == true ? false : true
            data.adminBoxOnly.status = status
            await Threads.setData(tid, {
                data
            });
            await global.data.threadData.set(tid, data)
            msg = `» ${status == true ? "bật" : "tắt"} chế độ chỉ admin nhóm được dùng lệnh`
            api.sendMessage(msg, tid, mid)
            break
        }
        default: {
            msg = `[=======》ADMIN《=======]\n\n`
            msg += pmio >= 0 ?
                `______\n[list|l]\n=> Xem danh sách Admin bot.\n` :
                ""
            msg += pmio >= 3 ?
                `_______\n[add|a]\n=> Thêm người dùng làm Admin bot.\n` :
                ""
            msg += pmio >= 3 ?
                `______\n[del|d]\n=> Gỡ bỏ Admin bot người được reply.\n` :
                ""
            msg += pmio >= 3 ?
                `________________\n[ownerOnly|oo]\n=> Bật/tắt chế độ Owner bot only.\n` :
                ""
            msg += pmio >= 2 ?
                `__________\n[botOnly|]\n=> Bật/tắt chế độ Admin bot only.\n` :
                ""
            msg += pmio >= 1 ?
                `_______________\n[boxOnly|boxo]\n=> Bật/tắt chế độ Admin nhóm only.\n` :
                ""
            msg += pmio >= 3 ?
                `________________\n[privateChat|pc]\n=> Bật/tắt chế độ chat riêng tư bot.\n` :
                ""
            api.sendMessage(msg, tid, mid)
            break
        }
    }
    delete require.cache[require.resolve(global.client.configPath)];
    global.config = await require(global.client.configPath);
    async function N_userData(uid) {
        return await Users.getData(uid) || {}
    }
    async function N_userInfo(uid) {
        return (await api.getUserInfo(uid))[uid] || {}
    }
}
module.exports.handleReply = async ({
    api,
    event,
    handleReply: h,
    Users
}) => {
    const {
        threadID: tid,
        messageID: mid,
        senderID: sid
    } = event
    if (sid != h.author) return
    const spli = event.body.split(" ")
    var msg = "",
        count = 0
    var nums = spli.map(n => parseInt(n))
    switch (h.type) {
        case "deleteAdmin": {
            try {
                if (isNaN(spli.join(""))) return api.sendMessage(`» STT phải là con số`, tid, mid)
                msg = `» Đã gỡ bỏ ${spli.length} Admin khỏi danh sách\n\n`
                for (var num of nums) {
                    const id = h.array[num - 1]
                    const userData = await Users.getData(id) || ""
                    configData.ADMINBOT.splice(configData.ADMINBOT.indexOf(id), 1)
                    msg += `${++count}. ${userData.name || ""} (${id})\n`
                }
                fse.writeFileSync(configPath, JSON.stringify(configData, null, 4));
                api.sendMessage(msg, tid, mid)
            } catch (err) {
                api.sendMessage(err, tid, mid)
            }
            break
        }
    }
}
var F_italic = async (text) => {
    const enText = encodeURI(text)
    let os = (await require("axios").get("https://6821df2e-d4cb-44c6-abb3-185e21d7d2fb.id.repl.co/text?input=" + enText + "&type=bold_italic&api_key=keypro")).data
    return os.text.complete
}