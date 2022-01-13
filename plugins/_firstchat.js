let moment = require('moment-timezone')
let fetch = require('node-fetch')
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (m.chat.endsWith('broadcast') || m.fromMe || isBlocked || m.isGroup || db.data.settings[this.user.jid].group) return
    let user = global.db.data.users[m.sender]
    let name = conn.user.name
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    let anu = `
Hai ${await this.getName(m.sender)}, ${ucapan()}
I am Eva, one of the multi-device whatsapp bots, is there anything I can help you with?

Before using the boat, read the bot rules first by typing *#rules *or *#rules *.

Want to chat with simi (bot)? type *#on simi *
`
await conn.sendTemplateButtonLoc(m.chat, anu.trim(), wm, await(await fetch(img)).buffer(), `Menu`, `#menu`, m)
user.pc = new Date * 1
}

module.exports = handler

function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  if (time >= 4) {
    res = "Good morning ☀"
  }
  if (time > 10) {
    res = "Good afternoon 🌞"
  }
  if (time >= 15) {
    res = "Good evening 🌝"
  }
  if (time >= 18) {
    res = "Good night 🌚"
  }
  return res
}
