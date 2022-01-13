let handler = async (m, {conn}) => {
     conn.reply(m.chat, `This bot uses github scripts\n\nhttps://github.com/SudoAnirudh/Eva-Md`, m) 
}
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = /^(sc(ript(bot)?)?|sourcecode)$/i

module.exports = handler


