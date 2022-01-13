let handler = async (m, { usedPrefix, command, conn, text }) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let kon = `*Current database ${totalreg} user*\n*Register now ${rtotalreg} user*`
    await conn.sendButtonLoc(m.chat, kon, wm, await(await require('node-fetch')(fla + `${command}`)).buffer(), [['Menu', '#menu']], m)
}
handler.help = ['user']
handler.tags = ['info']
handler.command = /^(user|(total)?database|user)$/i

module.exports = handler
