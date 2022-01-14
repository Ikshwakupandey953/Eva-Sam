let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let levelling = require('../lib/levelling')
let fs = require('fs')
const util = require('util')
const os = require('os')
let path = require('path')
let { createHash} = require('crypto')
let fetch = require('node-fetch')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
  ╭──「 Eva ──࿐
  │✇ Library : *Baileys-MD*
  │✇ Language : *Javascript*
  │✇ Database : *MongoDB*
  │✇ Version : *^0.0.1*
  │✇ Dev : *@919539102851*
  │✇ Runtime : *${runtime}*
  │✇ Prefix : *Multi Prefix 「 ${usedPrefix} 」*
  │✇ Mode : *${global.opts['self'] ? 'Self' : 'Public'}*
  │✇ User : *${usergakdaftar}*
  │✇ Register : *${userdaftar}*
  ╰─────────⳹
  %readmore `,
  header: '╭─「 *%category* 」',
  body: '│ • %cmd %islimit %isPremium',
  footer: '╰────\n',
          after: ` `,
}

let handler = async (m, { conn, usedPrefix: _p, args, command, DevMode }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'anime', 'update', 'education', 'news', 'random', 'game', 'xp', 'stiker', 'rpg', 'magicshell', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'vote', 'nsfw', 'audio', 'jadibot', 'info', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'MAIN',
    'game': 'GAME',
    'anime': 'ANIME', 
    'rpg': 'RPG', 
    'education': 'EDUCATION', 
    'news': 'NEWS', 
    'random': 'RANDOM',
    'xp': 'EXP & LIMIT',
    'sticker': 'STIKER',
    'magicshell': 'MAGIC SHELL',
    'quotes': 'QUOTES',
    'admin': `ADMIN ${global.opts['restrict'] ? '' : '(DISABLED)'}`,
    'group': 'GROUP',
    'premium': 'PREMIUM',
    'internet': 'INTERNET',
    'anonymous': 'ANONYMOUS CHAT',
    'nulis': 'MAGER NULIS & LOGO',
    'downloader': 'DOWNLOADER',
    'tools': 'TOOLS',
    'fun': 'FUN',
    'database': 'DATABASE',
    'vote': 'VOTING',
    'absen': 'ABSEN',
    'audio': 'AUDIO',
    'jadibot': 'JADI BOT',
    'info': 'INFO',
    'update': 'UPDATE',
    'nsfw': 'NSFW',
    'host': 'HOST',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'education') tags = {
    'education': 'Education'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'magicshell') tags = {
    'magicshell': 'Magic Shell'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Disabled)'}`,
    'group': 'Grup'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'absen') tags = {
    'absen': 'Absen'
  }
  if (teks == 'audio') tags = {
    'audio': 'Audio'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
 if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'update') tags = {
    'update': 'Update'
  }
 

  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = await registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
    
    let aoa = `${ucapan()} ${name}.`.trim()
let anu = `Please Select Menu Below!`.trim()
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })
    if (teks == '404') {
        const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: aoa,
            description: anu,
            buttonText: 'Click Here',
            listType: 1,
            footerText: wm,
            mtype: 'listMessage',
            sections: [
              {
                "rows": [{
                  "title": `All Commands `,
                  "description": "All Commands menu",
                  "rowId": `${_p}? all`
                  }],
                "title": `List Menu ${conn.user.name}`
              }, {
                "rows": [{
                  "title": `Anime Menu`,
                  "description": "Menu search & random anime wibu ",
                  "rowId": `${_p}? anime`
                }],
                "title": "─────「 1 」"
              }, {
                "rows": [{
                  "title": ` Admin & Group Menu`,
                  "description": "Menu for admin & group",
                  "rowId": `${_p}? admin`
                }],
                "title": "─────「 2 」"
              }, {
                "rows": [{
                  "title": ` Anonymous `,
                  "description": "Menu for playing anonymous chat whatsapp version",
                  "rowId": `${_p}? anonymous`
                }],
                "title": "─────「 3 」"
              }, {
                "rows": [{
                  "title": ` Audio Menu`,
                  "description": "Audio sound changer menu or convert audio",
                  "rowId": `${_p}? audio`
                }],
                "title": "─────「 4 」"
              }, {
                "rows": [{
                  "title": `Downloader`,
                  "description": "Menu download media videos, photos, and files",
                  "rowId": `${_p}? downloader`
                }],
                "title": "─────「 5 」"
              }, {
                "rows": [{
                  "title": `Database Menu`,
                  "description": "Bot database check menu",
                  "rowId": `${_p}? database`
                }],
                "title": "─────「 6 」"
              }, {
                "rows": [{
                  "title": `Menu Education`,
                  "description": "Educational menu ",
                  "rowId": `${_p}? edukasi`
                }],
                "title": "─────「 7 」"
              }, {
                "rows": [{
                  "title": ` Fun`,
                  "description": "The fun menu is just for fun",
                  "rowId": `${_p}? fun`
                }],
                "title": "─────「 8 」"
              }, {
                "rows": [{
                  "title": `Game`,
                  "description": "Game Menu",
                  "rowId": `${_p}? game`
                }],
                "title": "─────「 9 」"
              }, {
                "rows": [{
                  "title": `Menu Info`,
                  "description": "Menu info such as bot owner and bot source code",
                  "rowId": `${_p}? info`
                }],
                "title": "─────「 10 」"
              }, {
                "rows": [{
                  "title": `Internet`,
                  "description": "Menu for browsing the internet",
                  "rowId": `${_p}? internet`
                 }],
                 "title": "─────「 11 」"
              }, {
                "rows": [{
                  "title": `Jadibot`,
                  "description": "Temporary bot menu",
                  "rowId": `${_p}? jadibot`
                }],
                "title": "─────「 13 」"
              }, {
                "rows":[{
                  "title": `Magic Shell`,
                  "description": "Menu for random answers from bots",
                  "rowId": `${_p}? kerangajaib`
                }],
                "title": "─────「 14 」"
              }, {
                "rows": [{
                  "title": ` News`,
                  "description": "Local to international news menu",
                  "rowId": `${_p}? news`
                }],
                "title": "─────「 15 」"
              }, {
                "rows": [{
                  "title": ` Nulis & Logo`,
                  "description": "Menu related to  writing & logo",
                  "rowId": `${_p}? nulis`
                }],
                "title": "─────「 16 」"
              }, {
                "rows": [{
                  "title": `Nsfw`,
                  "description": "Adult menu",
                  "rowId": `${_p}? nsfw`
                }],
                "title": "─────「 17 」"
              }, {
                "rows": [{
                  "title": ` Premium`,
                  "description": "Menu for premium users",
                  "rowId": `${_p}? premium`
                }],
                "title": "─────「 18 」"
              }, {
                "rows": [{
                  "title": `Quotes`,
                  "description": "Menu random quotes &  quotes",
                  "rowId": `${_p}? quotes`
                }],
                "title": "─────「 19 」"
              }, {
                "rows": [{
                  "title":  `RPG`,
                  "description": "Menu game rpg(role playing game)",
                  "rowId": `${_p}? rpg`
                }],
                "title": "─────「 20 」"
              }, {
                "rows": [{
                  "title": `Random`,
                  "description": "Random menu of photos, videos, and stickers",
                  "rowId": `${_p}? random`
                }],
                "title": "─────「 21 」"
              }, {
                "rows": [{
                  "title":  `Stiker`,
                  "description": "Menu create stickers and search for stickers",
                  "rowId": `${_p}? stiker`
                }],
                "title": "─────「 22 」"
              }, {
                "rows": [{
                  "title":  ` Tools`,
                  "description": "Convert tool menu",
                  "rowId": `${_p}? tools`
                }],
                "title": "─────「 23 」"
              }, {
                "rows": [{
                  "title":  `Update`,
                  "description": "Bot Upgrading (OWNER)",
                  "rowId": `${_p}? update`
                }],
                "title": "─────「 24 」"
              }, {
                "rows": [{
                  "title":  `Vote & Absent`,
                  "description": "Menu for voting and absent",
                  "rowId": `${_p}? vote`
                }],
                "title": "─────「 25 」"
                }, {
                "rows": [{
                  "title":  `XP and Limit `,
                  "description": "Menu check level, xp, limit, and user registration",
                  "rowId": `${_p}? xp`
                }],
                "title": "─────「 26 」"
                }, {
                "rows": [{
                  "title":  `Owner`,
                  "description": `Special menu for owner @919539102851`,
                  "rowId": `${_p}? update`
                }],
                "title": "Eva-Md"
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: m });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Presented by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? '```Limit```' : '')
                  .replace(/%isPremium/g, menu.premium ? '```Premium```' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      name, weton, week, date, dateIslamic, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    //let pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => path.join(__dirname, '../src/avatar_contact.png'))
    await conn.send3TemplateButtonLoc(m.chat, text.trim(), wm, await(await require('node-fetch')(img)).buffer(), `🏅Owner`, `${_p}owner`, `Source Code`, `${_p}sc`, `🎗  Info Bot  🎗`, `${_p}infobot`, m)
    } catch (e) {
    conn.reply(m.chat, 'Soory,Try Again', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  if (time >= 4) {
    res = "Good Morning ☀"
  }
  if (time > 10) {
    res = "Good Afternoon 🌞"
  }
  if (time >= 15) {
    res = "Good Evening 🌝"
  }
  if (time >= 18) {
    res = "Good Night🌚"
  }
  return res
}