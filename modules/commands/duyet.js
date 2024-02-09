const fs = require("fs"),
    {
        writeFileSync: wf,
        existsSync: es,
        readFileSync: rd
    } = fs,
    {
        stringify: sf,
        parse: pr
    } = JSON,
    path = __dirname + "/cache/approvedThreads.json",
    path2 = __dirname + "/cache/pendingdThreads.json";
module.exports.config = {
    name: "duyet",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "Nam :b",
    description: "Duyệt nhóm nào thì nhóm đó sẽ được sử dụng bot'-'",
    commandCategory: "Admin bot",
    usages: "[pending/list] + reply [STT/All]để gỡ hoặc duyệt box đó.\n [.../del/on/off]\n • ... - duyệt box hiện tại, del - gỡ duyệt box hiện tại\n • on/off - bật tắt chế độ phê duyệt.",
    cooldowns: 0,
    envConfig: {
        status: true
    }
};
module.exports.languages = {
    "vi": {},
    "en": {}
};

module.exports.onLoad = () => {
    if (!es(path)) wf(path, sf([]));
    if (!es(path2)) wf(path2, sf([]));
}
module.exports.run = async function({
    api,
    event,
    args,
    Threads,
    Users
}) {
    var {
        threadID: t,
        messageID: m,
        senderID: s
    } = event, {
        sendMessage: M
    } = api, {
        handleReply: hr
    } = global.client, {
        OWNER: Nam
    } = global.config, {
        name: nameModule,
        credits: cd
    } = this.config, array = [], i = 0, c = (args[0] == "list" ? pr(rd(path)) : pr(rd(path2))), d = (args[0] == "list" ? path : path2), dd = pr(rd(path)), ddd = pr(rd(path2)), statusDuyet = pr(rd(__dirname + "/../../config.json")), onoff = (args[0] == "on" ? true : false), allTid = global.data.allThreadID;
    if (cd != "Nam :b") return;
    if (args[0] == "pending" || args[0] == "list") {
        for (let id of c) {
            var getInfo = (await Users.getInfo(id)) ? (await Users.getInfo(id)) : (await Threads.getInfo(id));
            array += `[${++i}]: ${getInfo.name ? getInfo.name: getInfo.threadName} - ${getInfo.threadName ? `${getInfo.participantIDs.length} member(ID là thread)`: `0 member(ID là user)`}\n`
        }
        M(`${array.length == 0 ? `${args[0] == "pending" ? "không có nhóm nào trong hàng chờ": "không có nhóm nào trong danh sách đã duyệt"}`: `=======『 ${args[0] == "list" ? "𝗔𝗣𝗣𝗥𝗢𝗩𝗘𝗗": "𝗣𝗘𝗡𝗗𝗜𝗡𝗚"}: ${c.length} 』=======\n\n${array}\n👉 Reply tin nhắn này kèm [STT/All] để ${args[0] == "list" ? "gỡ": "duyệt"}`}`, t, (error, info) => {
            hr.push({
                name: nameModule,
                messageID: info.messageID,
                author: Nam,
                data: c,
                ss: d
            })
        }, m)
    };
    if (s != Nam) return;
    if (!args[0]) {
        dd.push(t),
            ddd.splice(ddd.indexOf(t), 1);
        wf(path, sf(dd, null, 2)),
            wf(path2, sf(ddd, null, 2));
        return M(`phê duyệt thành công`, t, m);
    }
    if (args[0] == "del") {
        dd.splice(dd.indexOf(t), 1);
        wf(path, sf(dd, null, 2));
        return M(`gỡ thành công`, t, m);
    }
    if (args[0] == "on" || args[0] == "off") {
        if (onoff == statusDuyet[nameModule].status || allTid.length == 0) return M(`${allTid.length == 0 ? "hiện tại bot không tham gia nhóm nào hoặc đã xảy ra lỗi": `hiện tại duyệt đang bật chế độ ${args[0]} rồi`}`, t, m)
        statusDuyet[nameModule].status = onoff
        wf(__dirname + "/../../config.json", sf(statusDuyet, null, 2));
        delete require.cache[require.resolve(global.client.configPath)];
        global.config = require(global.client.configPath);
        return M(`${args[0] == "on" ? "bật": "tắt"} chế độ chỉ nhóm có trong danh sách duyệt với được phép sử dụng bot`, t, async function() {
            for (var tid of allTid) {
                try {
                    await M(`${args[0] == "on" ? `đã bật chế độ phê duyệt - chỉ những nhóm có trong danh sách duyệt mới được sử dụng bot,\n - ${dd.includes(t) == false ? "nhóm bạn không có trong danh sách đã phê duyệt" : "nhóm bạn có trong danh sách đã phê duyệt"}`: "đã tắt chế độ phê duyệt - tất cả các nhóm đều sử dụng được bot"}`, tid);
                } catch (error) {
                    ++i;
                }
            }
            M(`✅ ${allTid.length - i} thread\n⁉️ ${i} thread`, t, m)
        }, m);
    }
};
module.exports.handleReply = async function({
    api,
    event,
    handleReply
}) {
    var {
        threadID: t,
        messageID: m,
        senderID: s,
        body: y
    } = event, {
        author: a,
        data: dp,
        ss
    } = handleReply, {
        sendMessage: M
    } = api, dataApproved = pr(rd(path)), dataPending = pr(rd(path2)), array = [], arby = y.split(" "), cfo = arby[0] === "All" ? dp : array, nums = arby.map(n => parseInt(n));
    if (s != a) return M("cc cut", t);
    if (dp.length == 0) return;
    /*if (y !== "All") return M(`cách sử dụng và chú ý!\n • ví dụ: reply + 1 2 3 ...\n • STT phải nhỏ hơn ${dp.length}`, t, m);*/
    for (let num of nums) {
        var id = dp[num - 1]
        array.push(`${id}`)
    }
    M(`${arby[0] === "All" ? `${ss == path ? "gỡ": "phê duyệt"} thành công ${dp.length} box`: `${ss == path2 ? `phê duyệt thành công ${array.length} box`: `gỡ ${array.length} box khỏi danh sách duyệt thành công`}`}`, t, function() {
        for (let idd of cfo) {
            if (ss == path2) {
                dataApproved.push(idd), dataPending.splice(dataPending.indexOf(idd), 1);
                wf(path, sf(dataApproved, null, 2)), wf(path2, sf(dataPending, null, 2));
                if (arby[0] === "All" && dp.length == 0) break;
            };
            if (ss == path) {
                dataApproved.splice(dataApproved.indexOf(idd), 1);
                wf(path, sf(dataApproved, null, 2));
                if (arby[0] === "All" && dp.length == 0) break;
            }
            M(`nhóm bạn ${ss == path ? `đã bị gỡ khỏi danh sách` : `đã được admin`} phê duyệt`, idd)
        }
    }, m);
};