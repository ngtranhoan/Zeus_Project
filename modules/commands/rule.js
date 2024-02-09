module.exports.config = {
  name: "rule",
  version: "1.1.1",
  credits: "DC-Nam",
  hasPermssion: 0,
  description: "Add và xem luật của nhóm bạn",
  usages: "[.../add/edit/del/noti]",
  commandCategory: "Box chat",
  cooldowns: 0
}
module.exports.handleReaction = async function({
  api: a,
  event: e,
  handleReaction: h
}) {
  const {
    threadID: t,
    senderID: s,
    userID: uI
  } = e
  if (uI != h.author) return
  var allID = h.pI.filter(ID => ID != s && ID != uI)
  var mentions = [],
    index = 0;
  var text = `@Mọi Người\n » Admin nhóm đã ${h.set} luật ${h.set == "xóa tất cả" ? "" : `số${h.nl}\n\n 👉 Các bạn vào dùng ${PREFIX(t)}rule để xem thay đổi nhé`}`
  allID.forEach(uid => {
    mentions.push({
      id: uid,
      tag: text,
      fromIndex: index - 1
    })
    index -= 1
  })
  a.sendMessage({
    body: text,
    mentions
  }, t)
}
module.exports.handleReply = async function({
  api: a,
  event: e,
  handleReply: h
}) {
  const {
    threadID: t,
    messageID: m,
    senderID: s,
    body: y,
    participantIDs: pI
  } = e, {
    name
  } = this.config
  if (s != h.author) return
  const arr = y.split(" ")
  var arrayEdit = [],
    newArrayN = [],
    count = 0
  let dataThread = global.data.threadData.get(t) || {}
  var rules = dataThread.customRules.rules
  var n = arr.map(n => parseInt(n))
  switch (h.type) {
    case "add": {
      if (y.indexOf("\n") != -1) {
        const sp = y.split("\n")
        count = rules.length
        sp.forEach(add => {
          rules.push(add.toString())
            ++count
          arrayEdit.push(` ${(count).toString()}`)
        })
      } else {
        rules.push(y.toString())
      }
      global.data.threadData.set(t, dataThread)
      var nl = count > 0 ? arrayEdit : " " + rules.length
      a.sendMessage(`» Đã thêm luật thứ${nl}\n\n 👉 Reaction để tag all thành viên`, t, (error, info) => {
        return global.client.handleReaction.push({
          messageID: info.messageID,
          name,
          pI,
          nl,
          author: s,
          set: "thêm"
        })
      }, m)
    }
    break
  case "edit": {
    const nl = arr[0]
    if (isNaN(nl)) return a.sendMessage(`STT luật phải là 1 con số`, t, m)
    if (y.indexOf("\n") != -1) {
      const sp = y.split("\n")
      sp.forEach(nArr => {
        arrayEdit.push(nArr)
      })
      arrayEdit.forEach(add => {
        const newArr = add.split(" ")
        const nl = newArr[0]
        rules[nl - 1] = newArr.splice(1).join(" ")
        newArrayN.push(` ${nl.toString()}`)
      })
    } else if (y.indexOf("\n") == -1) {
      rules[arr[0] - 1] = arr.splice(1).join(" ")
      newArrayN.push(` ${arr[0].toString()}`)
    }
    global.data.threadData.set(t, dataThread)
    a.sendMessage(`» Đã chỉnh sửa luật số${newArrayN} của nhóm\n\n 👉 Reaction để tag all thành viên`, t, (error, info) => {
      return global.client.handleReaction.push({
        messageID: info.messageID,
        name,
        pI,
        nl: newArrayN,
        author: s,
        set: "chỉnh sửa"
      })
    }, m)
  }
  break
  case "del": {
    if (arr[0].toLowerCase() == "all") {
      a.sendMessage(`» Đã xóa all luật\n\n 👉 Reaction để tag all thành viên`, t, (error, info) => {
        rules.length = []
        global.data.threadData.set(t, dataThread)
        return global.client.handleReaction.push({
          messageID: info.messageID,
          name,
          pI,
          nl: arrayEdit,
          author: s,
          set: arrayEdit.length == 0 ? "xóa tất cả" : "xóa"
        })
      }, m)
    } else {
      if (isNaN(arr)) return a.sendMessage(`STT luật phải là con số`, t, m)
      n.forEach(i => {
        const rule = h.rules[i - 1]
        rules.splice(rules.indexOf(rule), 1)
        arrayEdit.push(` ${i}`)
      })
      global.data.threadData.set(t, dataThread)
      a.sendMessage(`» Đã xóa luật số${arrayEdit}\n\n 👉 Reaction để tag all thành viên`, t, (error, info) => {
        return global.client.handleReaction.push({
          messageID: info.messageID,
          name,
          pI,
          nl: arrayEdit,
          author: s,
          set: arrayEdit.length == 0 ? "xóa tất cả" : "xóa"
        })
      }, m)
    }
  }
  break
  }
}
module.exports.run = async function({
  api: a,
  event: e,
  args: g,
  permssion
}) {
  const {
    threadID: t,
    messageID: m,
    senderID: s
  } = e, {
    name
  } = this.config
  let dataThread = global.data.threadData.get(t) || {}
  var msg = "",
    count = 0
  var allType = ["add", "del", "edit", "noti"]
  const type = g[0]
  if (typeof dataThread.customRules == "undefined") {
    dataThread.customRules = {
      rules: [],
      noti: ""
    }
    global.data.threadData.set(t, dataThread)
  }
  var rules = dataThread.customRules.rules
  if (!type) {
    if (rules.length == 0) return a.sendMessage(`» Nhóm bạn chưa có luật`, t, m)
    msg = `[=======》list ${rules.length} rule《======]\n\n`.toUpperCase()
    list()
    msg += dataThread.customRules.noti == "" ? `\n- hãy tuân thủ luật ~~\n ❗ Có thể dùng ${PREFIX(t)}rule noti + text new để edit cái dòng ml này nha 😅` : "\n" + dataThread.customRules.noti
    a.sendMessage(msg, t)
  }
  if (!allType.includes(type) && type) {
    msg = `[=======》 RULE 《=======]\n\n` +
      PREFIX(t) + "rule add => Thêm Luật" + "\n" +
      PREFIX(t) + "rule edit => Chỉnh Sửa Luật Đã thêm" + "\n" +
      PREFIX(t) + "rule del => Xóa Luật Đã Thêm" + "\n" +
      PREFIX(t) + "rule noti => Thêm Dòng Thông Báo" + "\n\n" +
      "» Muốn Chi Tiết Dùng Là Biết"
    a.sendMessage(msg, t, m)
  }
  if (permssion <= 0 && type && allType.includes(type)) return a.sendMessage(`» Thành viên không được sử dụng [add/del/edit] đâu nha, dùng ${PREFIX(t)}rule để xem luật`, t, m)
  switch (type) {
    case "add": {
      a.sendMessage(`» Reply tin nhắn + text để thêm luật\n\n ❗ có thể add luật sll bằng cách xuống dòng`, t, (error, info) => {
        return global.client.handleReply.push({
          messageID: info.messageID,
          name,
          author: s,
          type: "add"
        })
      }, m)
    }
    break
  case "edit": {
    list()
    msg += `\n» Reply tin nhắn này kèm STT + text luật mới của STT đó\n\n❗ Có thể edit luật sll bằng cách xuống dòng và nhập STT cần edit + text, cứ làm vậy mỗi đầu dòng`
    a.sendMessage(msg, t, (error, info) => {
      return global.client.handleReply.push({
        messageID: info.messageID,
        name,
        rules,
        author: s,
        type: "edit"
      })
    }, m)
  }
  break
  case "del": {
    list()
    msg += `\n» Reply tin nhắn này kèm [all/STT] để xóa luật\n\n❗ Có thể reply nhiều STT bằng cách đặt khoảng trống giữa các STT => VD: 1 2 3 4... or 8 4 5 2...`
    a.sendMessage(msg, t, (error, info) => {
      return global.client.handleReply.push({
        messageID: info.messageID,
        name,
        rules,
        author: s,
        type: "del"
      })
    }, m)
  }
  break
  case "noti": {
    const abc = g[1]
    dataThread.customRules.noti = g.splice(1).join(" ")
    global.data.threadData.set(t, dataThread)
    a.sendMessage(`Đã ${!abc ? `xóa` : `thay đổi`} noti của danh sách luật`, t, m)
  }
  break
  }

  function list() {
    rules.forEach(rule => {
      msg += `${++count}. ${rule}\n`
    })
  }
}

function PREFIX(t) {
  var dataThread = global.data.threadData.get(t) || {}
  return dataThread.PREFIX || global.config.PREFIX
}