const { MessageType } = require("@adiwajshing/baileys-md")
let fetch = require('node-fetch')
async function handler(m, { command, usedPrefix }) {
    //if (!global.db.data.settings.anon) throw `Fitur ini tidak aktif`
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        //case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) {
                await this.sendButtonLoc(m.chat, '_You are not in an anonymous chat', 'Want to find a chat partner?', await(await fetch(fla + 'anonymous chat')).buffer(), [['Start', `${usedPrefix}start`]], m)
                throw false
            }
            conn.reply(m.chat, '_Ok_', m)
            let other = room.other(m.sender)
            if (other) await this.sendButtonLoc(other, '_Partner left chat_', 'Want to find another chat partner?', await(await fetch(fla + 'partner left chat')).buffer(), [['Start Again', `${usedPrefix}start`]], m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
                await this.sendButtonLoc(m.chat, '_You are still in anonymous chat_', 'Want to leave?', await(await fetch(fla + 'leave chat?')).buffer(), [['Leave', `${usedPrefix}leave`]], m)
                throw false
            }
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendButtonLoc(room.a, '_Partner found!_', 'Please chat🤗', await(await fetch(fla + 'partner found')).buffer(), [['Halo', '👋']], m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendButtonLoc(room.b, '_Partner found!_', 'Please chat🤗', await(await fetch(fla + 'partner found')).buffer(), [['Hai', '👋']], m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendButtonLoc(m.chat, '_Waiting for a partner..._', 'If you are tired of waiting, click below to exit!', await(await fetch(fla + 'waiting for partner')).buffer(), [['Leave', `${usedPrefix}leave`]], m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = 'anonymous'

handler.command = ['start', 'leave', 'next']
handler.private = true

module.exports = handler
