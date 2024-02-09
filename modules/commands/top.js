module.exports.config = {
    name: "top",
    version: "1.1.1",
    credits: "DC-Nam",
    hasPermssion: 0,
    description: "Xem top money, level... ở trong box hoặc sever?",
    usages: "[boxmoney|boxlevel|svmoney|svlevel] + độ dài list(ko có mặc định là 10)",
    commandCategory: "Box chat",
    cooldowns: 5
};
module.exports.run = async function({
    api: a,
    event: e,
    args: g,
    Currencies,
    Users
}) {
    const {
        threadID: t,
        messageID: m,
        senderID: s,
        participantIDs: pI
    } = e
    var arr = [],
        newArr = [],
        msg = "",
        type = g[0],
        leng = parseInt(g[1]) - 1
    const allType = ["boxmoney", "boxlevel", "svmoney", "svlevel"]
    if (!allType.includes(type)) return a.sendMessage(`» Nhập top bạn muốn xem: ${allType.join(", ")}`, t, m)
    if (isNaN(leng) && leng) return a.sendMessage(`» Độ dài list phải là 1 con số`, t, m)
    switch (type) {
        case "boxmoney": {
            for (const id of pI) {
                let money = (await Currencies.getData(id)).money || 0
                arr.push({
                    id: id,
                    money: money
                })
            }
            arr.sort(S("money"))
            for (const i in arr) {
                newArr.push({
                    stt: i,
                    id: arr[i].id,
                    money: arr[i].money
                })
            }
            msg = `[===》 top 10 đại gia trong nhóm! 《===]\n\n`.toUpperCase()
            for (const i in newArr) {
                let name = (await Users.getData(newArr[i].id)).name || ""
                msg += `${i < 4 ? ICON(i) : `${i}.`} ${name}\n » 𝐌𝐨𝐧𝐞𝐲: ${CC(newArr[i].money)}$\n`
                if (i == leng && i < newArr.length || i == 10) break
            }
            let find = newArr.find(i => i.id == s)
            msg += TX("money", find.stt, find.money)
            a.sendMessage(msg, t, m)
        }
        break
    case "boxlevel": {
        for (const id of pI) {
            let exp = (await Currencies.getData(id)).exp || 0
            arr.push({
                id: id,
                exp: exp
            })
        }
        arr.sort(S("exp"))
        for (const i in arr) {
            newArr.push({
                stt: i,
                id: arr[i].id,
                exp: arr[i].exp
            })
        }
        msg = `[===》 top 10 level trong nhóm! 《===]\n\n`.toUpperCase()
        for (const i in newArr) {
            let name = (await Users.getData(newArr[i].id)).name || ""
            msg += `${i < 4 ? ICON(i) : `${i}.`} ${name}\n » 𝐋𝐞𝐯𝐞𝐥: ${LV(newArr[i].exp)}\n`
            if (i == leng && i < newArr.length || i == 10) break
        }
        let find = newArr.find(i => i.id == s)
        msg += TX("level", find.stt, find.exp)
        a.sendMessage(msg, t, m)
    }
    break
    case "svlevel": {
        let get = await Currencies.getAll(['userID', 'exp'])
        get.sort(S("exp"))
        for (const i in get) {
            arr.push({
                stt: i,
                id: get [i].userID,
                exp: get [i].exp
            })
        }
        msg = `[===》 top 10 level sever! 《===]\n\n`.toUpperCase()
        for (const i in arr) {
            let name = (await Users.getData(arr[i].id)).name || ""
            msg += `${i < 4 ? ICON(i) : `${i}.`} ${name}\n » 𝐋𝐞𝐯𝐞𝐥: ${LV(arr[i].exp)}\n`
            if (i == leng && i < arr.length || i == 10) break
        }
        let find = arr.find(i => i.id == s)
        msg += TX("level", find.stt, find.exp)
        a.sendMessage(msg, t, m)
    }
    break
    case "svmoney": {
        let get = await Currencies.getAll(['userID', 'money'])
        get.sort(S("money"))
        for (const i in get) {
            arr.push({
                stt: i,
                id: get [i].userID,
                money: get [i].money
            })
        }
        msg = `[===》 top 10 đại gia sever! 《===]\n\n`.toUpperCase()
        for (const i in arr) {
            let name = (await Users.getData(arr[i].id)).name || ""
            msg += `${i < 4 ? ICON(i) : `${i}.`} ${name}\n » 𝐌𝐨𝐧𝐞𝐲: ${CC(arr[i].money)}$\n`
            if (i == leng && i < arr.length || i == 10) break
        }
        let find = arr.find(i => i.id == s)
        msg += TX("money", find.stt, find.money)
        a.sendMessage(msg, t, m)
    }
    break
    }
}

function LV(x) {
    return Math.floor((Math.sqrt(1 + (4 * x) / 3) + 1) / 2)
}

function CC(n) {
    return n.toLocaleString('en-US', {
        minimumFractionDigits: 2
    })
}

function ICON(i) {
    return i == 0 ? "🏆" : i == 1 ? "🥇" : i == 2 ? "🥈" : i == 3 ? "🥉" : ""
}

function S(k) {
    return function(a, b) {
        let i = 0;
        if (a[k] > b[k]) {
            i = 1
        } else if (a[k] < b[k]) {
            i = -1
        }
        return i * -1
    }
}

function TX(tx, i, x) {
    return `\n${i >= 11 ? `Bạn đứng top: ${i}\n » ${tx == "money" ? `𝐌𝐨𝐧𝐞𝐲: ${CC(x)}$` : `𝐋𝐞𝐯𝐞𝐥: ${LV(x)}`}` : i >= 1 && i <= 4 ? "» Bạn có trong top 4 rồi, cố lên!" : i == 0 ? "» Thật vip pro bạn đang đứng đầu top" : "» Bạn có trong top 10 rồi, cố lên"}`
}