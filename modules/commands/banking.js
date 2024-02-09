module.exports.config = {
    name: "banking",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: ":v",
    commandCategory: "Tài chính",
    usages: "[register|checkmoney|sendmoney|getmoney|topmoney|paymoney|find|renameaccount|changepasswork|deleteaccount]",
    cooldowns: 0
}
const axios = require("axios")
const cctl = "6821df2e-d4cb-44c6-abb3-185e21d7d2fb"
const l_api = "https://" + cctl + ".id.repl.co/"
module.exports.run = async ({
    api: a,
    event: e,
    args: g
}) => {
    switch (g[0]) {
        case "register":
        case "r": {
            a.sendMessage(`» Check tin nhắn riêng với bot để tiến hành nhập thông tin...`, e.threadID, () => {
                a.sendMessage(`» Reply tin nhắn này để nhập STK banking`, e.senderID, (err, info) => {
                    return global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: e.senderID,
                        type: "register",
                        st: "0"
                    })
                })
            }, e.messageID)
            break
        }
        case "checkmoney":
        case "check":
        case "c": {
            const uid = e.type == "message_reply" && !g[1] ? e.messageReply.senderID : !g[1] ? e.senderID : Object.keys(e.mentions)[0]
            let os = (await axios.get(`${l_api}banking?type=checkmoney&uid=${uid}&api_key=keypro`)).data
            a.sendMessage(os.msg, e.threadID, e.messageID)
            break
        }
        case "sendmoney":
        case "send":
        case "s": {
            a.sendMessage(`» Check tin nhắn riêng với bot để tiến hành giao dịch`, e.threadID, (error, info) => {
                a.sendMessage(`» Reply tin nhắn này để nhập mật khẩu`, e.senderID, (err, info) => {
                    return global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: e.senderID,
                        type: "sendmoney",
                        st: "0"
                    })
                })
            }, e.messageID)
            break
        }
        case "getmoney":
        case "get":
        case "g": {
            a.sendMessage(`» Check tin nhắn riêng với bot để tiến hành giao dịch`, e.threadID, (error, info) => {
                a.sendMessage(`» Reply tin nhắn này để nhập mật khẩu`, e.senderID, (err, info) => {
                    return global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: e.senderID,
                        type: "getmoney",
                        st: "0"
                    })
                })
            }, e.messageID)
            break
        }
        case "topmoney":
        case "top":
        case "t": {
            let os = (await axios.get(`${l_api}banking?type=topmoney&uid=${e.senderID}&api_key=keypro`)).data
            if (os.status == false) return a.sendMessage(os.msg, e.threadID, e.messageID);
            else {
                a.sendMessage(os.msg + os.topmoney + os.msg2, e.threadID)
            }
            break
        }
        case "paymoney":
        case "pay":
        case "pm": {
            a.sendMessage(`» Check tin nhắn riêng với bot để tiến hành chuyển tiền`, e.threadID, (err, info) => {
                a.sendMessage(`» Reply tin nhắn này để nhập mật khẩu`, e.senderID, (err, info) => {
                    return global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: e.senderID,
                        type: "paymoney",
                        st: "0"
                    })
                })
            }, e.messageID)
            break
        }
        case "search":
        case "find":
        case "f": {
            let os = (await axios.get(encodeURI(`${l_api}banking?type=search&search=${g.splice(1).join(" ")}&uid=${e.senderID}&api_key=keypro`))).data
            a.sendMessage(os.msg, e.threadID, e.messageID)
            break
        }
        case "resetpasswork":
        case "rspw": {
            a.sendMessage(`» Check tin nhắn riêng với bot để tiến hành resetpasswork`, e.threadID, (err, info) => {
                a.sendMessage(`» Reply tin nhắn này để nhập senderID`, e.senderID, (err, info) => {
                    return global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: e.senderID,
                        type: "resetpasswork",
                        st: "0"
                    })
                })
            }, e.messageID)
            break
        }
        case "changepasswork":
        case "cgpw": {
            a.sendMessage(`» Check tin nhắn riêng với bot để tiến hành đổi mật khẩu`, e.threadID, (err, info) => {
                a.sendMessage(`» Reply tin nhắn này để nhập mật khẩu hiện tại`, e.senderID, (err, info) => {
                    return global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: e.senderID,
                        type: "changepasswork",
                        st: "0"
                    })
                })
            }, e.messageID)
            break
        }
        case "renameaccount":
        case "rename": {
            a.sendMessage(`» Check tin nhắn riêng với bot để tiến hành đổi tên người dùng tài khoản`, e.threadID, (err, info) => {
                a.sendMessage(`» Reply tin nhắn này để nhập senderID`, e.senderID, (err, info) => {
                    return global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: e.senderID,
                        type: "renameaccount",
                        st: "0"
                    })
                })
            }, e.messageID)
            break
        }
        case "deleteaccount":
        case "del": {
            a.sendMessage(`» Check tin nhắn riêng với bot để tiến hành xóa tài khoản`, e.threadID, (err, info) => {
                a.sendMessage(`» Reply tin nhắn này để nhập senderID`, e.senderID, (err, info) => {
                    return global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: e.senderID,
                        type: "deleteaccount",
                        st: "0"
                    })
                })
            }, e.messageID)
            break
        }
        default: {
            msg = `[======》🏦𝗕𝗔𝗡𝗞𝗜𝗡𝗚🏦《======]\n\n` +
                `___________\n[register/r]\n🍓 Đ𝐚̆𝐧𝐠 𝐊𝐲́ 𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧\n` +
                `________________________\n[checkmoney/check/c]\n🍓 𝐊𝐢𝐞̂̉𝐦 𝐓𝐫𝐚 𝐓𝐢𝐞̂̀𝐧 𝐓𝐫𝐨𝐧𝐠 𝐓𝐡𝐞̉\n` +
                `______________________\n[sendmoney/send/s]\n🍓 𝐆𝐮̛̉𝐢 𝐓𝐢𝐞̂̀𝐧 𝐕𝐚̀𝐨 𝐓𝐫𝐨𝐧𝐠 𝐓𝐡𝐞̉\n` +
                `__________________\n[getmoney/get/g]\n🍓 𝐑𝐮́𝐭 𝐓𝐢𝐞̂̀𝐧 𝐓𝐮̛̀ 𝐓𝐡𝐞̉\n` +
                `_____________________\n[paymoney/pay/pm]\n🍓 𝐂𝐡𝐮𝐲𝐞̂̉𝐧 𝐓𝐢𝐞̂̀𝐧 𝐐𝐮𝐚 𝐓𝐡𝐞̉\n` +
                `__________________\n[topmoney/top/t]\n🍓 𝐗𝐞𝐦 𝐁𝐗𝐇 Đ𝐚̣𝐢 𝐆𝐢𝐚\n` +
                `_______________\n[search/find/f]\n🍓 𝐗𝐞𝐦 𝐈𝐧𝐟𝐨 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠 𝐐𝐮𝐚 𝐓𝐞̂𝐧, 𝐈𝐃, 𝐒𝐓𝐊\n` +
                `________________________\n[resetpassowork/rspw]\n🍓 𝐑𝐞𝐬𝐞𝐭 𝐌𝐚̣̂𝐭 𝐊𝐡𝐚̂̉𝐮 𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧\n` +
                `__________________________\n[changepasswork/cgpw]\n🍓 𝐓𝐡𝐚𝐲 Đ𝐨̂̉𝐢 𝐌𝐚̣̂𝐭 𝐊𝐡𝐚̂̉𝐮 𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧\n` +
                `___________________________\n[renameaccount/rename]\n🍓 𝐓𝐡𝐚𝐲 𝐃𝐨̂̉𝐢 𝐓𝐞̂𝐧 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠\n` +
                `___________________\n[deleteaccount/del]\n🍓 𝐗𝐨́𝐚 𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧 𝐇𝐢𝐞̣̂𝐧 𝐓𝐚̣𝐢`
            a.sendMessage(msg, e.threadID, e.messageID)
            break
        }
    }
}
module.exports.handleReply = async ({
    api: a,
    event: e,
    handleReply: h,
    Users,
    Currencies
}) => {
    switch (h.type) {
        case "register": {
            let os = (await axios.get(encodeURI(`${l_api}banking?type=register&uid=${h.author}&stk=${e.body}&api_key=keypro`))).data
            if (h.st == "0") {
                if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    return a.sendMessage(os.msg, h.author, (err, info) => {
                        return global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: h.author,
                            type: "register",
                            stk: e.body,
                            st: "1"
                        })
                    }, e.messageID)
                }
            }
            if (h.st == "1") {
                let userData = await Users.getData(h.author)
                let os = (await axios.get(encodeURI(`${l_api}banking?type=register&name=${userData.name}&uid=${h.author}&stk=${h.stk}&pass=${e.body}&api_key=keypro`))).data
                if (os.status == false) return a.sendMessage(os.msg, e.threadID, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    return a.sendMessage(os.msg + os.register + os.msg2, h.author, e.messageID)
                }
            }
            break
        }
        case "sendmoney": {
            let os = (await axios.get(encodeURI(`${l_api}banking?type=checkpass&uid=${h.author}&pass=${e.body}&api_key=keypro`))).data
            if (h.st == "0") {
                if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    return a.sendMessage(`» Reply tin nhắn này để nhập số money cần gửi vào banking`, e.senderID, (err, info) => {
                        return global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: e.senderID,
                            type: "sendmoney",
                            pass: e.body,
                            st: "1"
                        })
                    })
                }
            }
            if (h.st == "1") {
                if ((await Currencies.getData(h.author)).money < (+e.body) || isNaN(e.body)) {
                    a.sendMessage(`» Bạn không đủ ${+e.body}$ để gửi vào banking hoặc không phải là con số`, h.author, e.messageID)
                    break
                }
                let os = (await axios.get(encodeURI(`${l_api}banking?type=sendmoney&sendmoney=${e.body}&uid=${h.author}&pass=${h.pass}&api_key=keypro`))).data
                if (os.status == false) return a.sendMessage(os.msg, e.threadID, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    return a.sendMessage(os.msg, h.author, () => Currencies.decreaseMoney(h.author, +e.body), e.messageID)
                }
            }
            break
        }
        case "getmoney": {
            let os = (await axios.get(encodeURI(`${l_api}banking?type=checkpass&uid=${h.author}&pass=${e.body}&api_key=keypro`))).data
            if (h.st == "0") {
                if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    return a.sendMessage(`» Reply tin nhắn này để nhập số money cần rút khỏi banking`, e.senderID, (err, info) => {
                        return global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: e.senderID,
                            type: "getmoney",
                            pass: e.body,
                            st: "1"
                        })
                    })
                }
            }
            if (h.st == "1") {
                let os = (await axios.get(encodeURI(`${l_api}banking?type=getmoney&getmoney=${e.body}&uid=${h.author}&pass=${h.pass}&api_key=keypro`))).data
                if (os.status == false) return a.sendMessage(os.msg, e.threadID, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    return a.sendMessage(os.msg, h.author, () => Currencies.increaseMoney(h.author, +e.body), e.messageID)
                }
            }
            break
        }
        case "resetpasswork": {
            let os = (await axios.get(encodeURI(`${l_api}banking?type=resetpasswork&sid=${e.body}&uid=${h.author}&api_key=keypro`))).data
            if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
            else {
                a.unsendMessage(h.messageID)
                a.sendMessage(os.msg, h.author, e.messageID)
            }
            break
        }
        case "changepasswork": {
            if (h.st == "0") {
                let os = (await axios.get(encodeURI(`${l_api}banking?type=checkpass&pass=${e.body}&uid=${h.author}&api_key=keypro`))).data
                if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    return a.sendMessage(`» Reply tin nhắn này để nhập pass mới`, h.author, (err, info) => {
                        return global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: e.senderID,
                            type: "changepasswork",
                            pass: e.body,
                            st: "1"
                        })
                    }, e.messageID)
                }
            }
            if (h.st == "1") {
                let os = (await axios.get(encodeURI(`${l_api}banking?type=changepasswork&changepasswork=${e.body}&uid=${h.author}&pass=${h.pass}&api_key=keypro`))).data
                a.unsendMessage(h.messageID)
                return a.sendMessage(os.msg, h.author, e.messageID)
            }
            break
        }
        case "renameaccount": {
            if (h.st == "0") {
                let os = (await axios.get(encodeURI(`${l_api}banking?type=renameaccount&sid=${e.body}&uid=${h.author}&api_key=keypro`))).data
                if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    return a.sendMessage(`» Reply tin nhắn này để nhập tên mới`, h.author, (err, info) => {
                        return global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: e.senderID,
                            type: "renameaccount",
                            sid: e.body,
                            st: "1"
                        })
                    }, e.messageID)
                }
            }
            if (h.st == "1") {
                let os = (await axios.get(encodeURI(`${l_api}banking?type=renameaccount&renameaccount=${e.body}&uid=${h.author}&sid=${h.sid}&api_key=keypro`))).data
                a.unsendMessage(h.messageID)
                return a.sendMessage(os.msg, h.author, e.messageID)
            }
            break
        }
        case "paymoney": {
            if (h.st == "0") {
                let os = (await axios.get(encodeURI(`${l_api}banking?type=checkpass&pass=${e.body}&uid=${h.author}&api_key=keypro`))).data
                if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    a.sendMessage(`» Reply tin nhắn này nhập STK, name TK hoặc uid người cần chuyển để tiến hành chuyển tiền`, h.author, (err, info) => {
                        return global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: e.senderID,
                            type: "paymoney",
                            pass: e.body,
                            st: "1"
                        })
                    }, e.messageID)
                }
            }
            if (h.st == "1") {
                let os = (await axios.get(encodeURI(`${l_api}banking?type=paymoney&search=${e.body}&uid=${h.author}&api_key=keypro`))).data
                if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    a.sendMessage(os.msg, h.author, (err, info) => {
                        return global.client.handleReaction.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: h.author,
                            type: "paymoney",
                            search: e.body
                        })
                    }, e.messageID)
                }
            }
            if (h.st == "2") {
              const spl = e.body.split(" ")
                let os = (await axios.get(encodeURI(`${l_api}banking?type=paymoney&inputmoney=${spl[0]}&contentpay=${spl.splice(1).join(" ")}&search=${h.search}&uid=${h.author}&api_key=keypro`))).data
                if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
                else {
                    a.unsendMessage(h.messageID)
                    a.sendMessage(`${os.msg}${os.lsgd}${os.contentpay}`, h.author, (err, info) => {
              a.sendMessage(`${os.msg2}${os.lsgd2}${os.contentpay}`, os.uidcd.toString())
                   }, e.messageID)
                }
            }
            break
        }
        case "deleteaccount": {
            let os = (await axios.get(encodeURI(`${l_api}banking?type=deleteaccount&sid=${e.body}&uid=${h.author}&api_key=keypro`))).data
            if (os.status == false) return a.sendMessage(os.msg, h.author, e.messageID);
            else {
                a.unsendMessage(h.messageID)
                a.sendMessage(os.msg, h.author, e.messageID)
            }
            break
        }
    }
}
module.exports.handleReaction = async ({
    api: a,
    event: e,
    handleReaction: h
}) => {
    if (e.userID != h.author) return
    switch (h.type) {
        case "paymoney": {
            a.unsendMessage(h.messageID)
            a.sendMessage(`» Reply tin nhắn này để nhập số tiền cần chuyển`, h.author, (err, info) => {
                return global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: h.author,
                    type: "paymoney",
                    search: h.search,
                    st: "2"
                })
            })
            break
        }
    }
}