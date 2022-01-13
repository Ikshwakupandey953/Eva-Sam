function handler(m) {
  this.sendContact(m.chat, '919539102851@s.whatsapp.net', this.getName('9195439102851@s.whatsapp.net'), m)
  return m.reply (`Halo @${m.sender.split`@`[0]} that's the developer bot's number, please contact owner in english language..😖`)
}
handler.help = ['creator']
handler.tags = ['info']

handler.command = /^((creator|dev(eloper)?)(bot)?)$/i

module.exports = handler