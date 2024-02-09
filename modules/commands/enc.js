module.exports.config = {
  name: 'enc',
  version: '1.0.0',
  hasPermssion: 2,
  credits: 'NTKhang',
  description: 'encode obf!',
  commandCategory: 'dành cho admin',
  cooldowns: 5,
  dependencies: { 'javascript-obfuscator': '' },
}
module.exports.languages = {
  vi: {},
  en: {},
}
module.exports.run = async ({
  event: e,
  api: a,
  args: g,
}) => {
  const axios = require('axios'),
    fs = require('fs-extra')
  let fill = []
  if (g[0]) {
    for (let d of g) {
      if (!d.endsWith('.js')) {
        d += '.js'
      }
      fill.push(
        fs.readFileSync(__dirname + '/' + d, 'utf8')
      )
    }
    return encObfuscate(fill, a, e)
  } else {
    if (e.attachments.length > 0) {
      for (const q of e.attachments) {
        const w = await axios.get(q.url, {
          responseType: 'arraybuffer',
        })
        fill.push(w.data.toString('utf8'))
      }
      return encObfuscate(fill, a, e)
    } else {
      a.sendMessage(
        'Phản hồi tin nhắn này kèm tên file lệnh hoặc đính kèm file .txt chứa code muốn obf!',
        e.threadID,
        (r, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: e.senderID,
          })
        }
      )
    }
  }
}
module.exports.handleReply = async ({
  api: a,
  event: e,
  handleReply: h,
}) => {
  if (e.senderID != h.author) {
    return
  }
  const axios = require('axios')
  let nek = []
  if (e.body) {
    return (
      (nek = [e.body]),
      encObfuscate(nek, a, e)
    )
  } else {
    if (e.attachments.length > 0) {
      for (const u of e.attachments) {
        const i = await axios.get(u.url, {
          responseType: 'arraybuffer',
        })
        nek.push(i.data.toString('utf8'))
      }
      return encObfuscate(nek, a, e)
    } else {
      return a.sendMessage(
        'Sai cú pháp!',
        e.threadID,
        e.messageID
      )
    }
  }
}
function encObfuscate(o, p, f) {
  const fs = require('fs-extra'),
    js = require('javascript-obfuscator'),
    not = [],
    nekk = [],
    hmm = []
  for (let to = 0; to < o.length; to++) {
    const cunket = __dirname + '/cache/codeEnc' + to + '.txt',
      dark = js.obfuscate(o[to], {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: false,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayCallsTransform: false,
        stringArrayCallsTransformThreshold: 0.5,
        stringArrayEncoding: [],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false,
      })
    fs.writeFileSync(cunket, dark.getObfuscatedCode(), 'utf8')
    not.push(fs.createReadStream(cunket))
    nekk.push(cunket)
  }
  const haizz = {
    body:
      nekk.length > 0
        ? 'Đã obf thành công ' + nekk.length + ' file!'
        : '' + hmm.length > 0
        ? '\nĐã obf thất bại ' + hmm.length + ' file!'
        : '',
  }
  if (not.length > 0) {
    haizz.attachment = not
  }
  p.sendMessage(
    haizz,
    f.threadID,
    (hotnek, cojhot) => {
      for (const machamay of nekk) fs.unlinkSync(machamay)
    },
    f.messageID
  )
}