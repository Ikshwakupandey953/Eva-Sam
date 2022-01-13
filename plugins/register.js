const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `You are already registered\nWant to re-register? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Example:\n*${usedPrefix + command} Anirudh.18*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Name cannot be empty (Alphabatic)'
  if (!age) throw 'Age cannot be blank (Numbers)'
  age = parseInt(age)
  if (age > 50) throw 'Age too old'
  if (age < 5) throw 'Age Too Young._.'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  conn.sendButton(m.chat, `
*──「 Successful Registration 」──*

╭─「 Info 」
│• Name   : ${name}
│• Age    : ${age} yrs
│• Status : Registered √
╰─────

*SN* (Serial Number) is sent in private chat and used for re-registration, if you forget *SN* please type *${usedPrefix}sn* to check your *SN*!
`.trim(), wm, false, [[`Profile`,`${usedPrefix}profile`]], m) 
conn.sendMessage(m.sender, {text: `*SN:* ${sn}`}, m)
}
handler.help = ['daftar', 'register'].map(v => v + ' <name>.<age>')
handler.tags = ['xp']

handler.command = /^(daftar|reg(is(ter))?)$/i

module.exports = handler
