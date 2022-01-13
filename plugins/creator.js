const delay = time => new Promise(res => setTimeout(res, time))
let handler = async(m, { conn }) => {
  conn.sendContact(m.chat, global.owner[0] + '@s.whatsapp.net', conn.getName(global.owner[0] + '@s.whatsapp.net'), m)
  await delay(500)
  conn.reply(m.chat, `Halo kak ${await conn.getName(m.sender)} that's the developer bot's number, please contact owner in english language😖`, m)
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler
