/**
buatan qisyana😅
**/

let handler = async (m, { conn, usedPrefix, text }) => {
	function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

	text = no(text)

  if(isNaN(text)) {
		var number = text.split`@`[1]
  } else if(!isNaN(text)) {
		var number = text
  }

  if(!text && !m.quoted) return conn.reply(m.chat, `*DELETE USER*\n\nTag a user, write a number, or reply to the member you want to RESET`, m)
  //let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*Nomor target tidak terdaftar di WhatsApp*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `The number you entered is invalid!`, m)
  if(number.length > 15) return conn.reply(m.chat, `The number you entered is invalid`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
  
	let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
  let participants = m.isGroup ? groupMetadata.participants : []
	let users = m.isGroup ? participants.find(u => u.jid == user) : {}
	let number = user.split('@')[0]
  
	delete global.db.data.users[user]
 	
 	conn.sendButton(m.chat, `*───「 Successful Delete 」───*\n\nDelete successfully @${number} from *DATABASE*`, wm, false, [[`Database`,`${usedPrefix}database`]], m, null, {contextInfo: {
    mentionedJid: [user]
 	}})

 
 }
}
handler.help = ['delete *number*']
handler.tags = ['owner']
handler.command = /^delete$/i

handler.owner = true

module.exports = handler
