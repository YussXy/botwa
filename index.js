import chalk from 'chalk'
import axios from 'axios'
import pino from 'pino'
import fs from 'fs'
import {
  default as makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  Browsers
} from 'baileys'
import { downloadContentFromMessage } from 'baileys'
import readline from 'readline'
import { exec, execSync } from 'child_process'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
//=======

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


if (!fs.existsSync('./database')) {
  fs.mkdirSync('./database')
}

if (!fs.existsSync('./database/user.json')) {
  fs.writeFileSync('./database/user.json', JSON.stringify({}, null, 2))
}

//=======
console.log(chalk.cyan('🚀 Starting WhatsApp Bot...'))

//🙂🥲😛😌😇😋😅😌























const db = JSON.parse(fs.readFileSync('./database/user.json'))

function kurangMoney(user, jumlah){
if(!db[user]) return false

if(db[user].money < jumlah) return false

db[user].money -= jumlah

fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

return true
}



function kurangLimit(user, jumlah){

let target = Object.keys(db).find(id => id.startsWith(user.split('@')[0]))

if(!target) return false

if(db[target].limit < jumlah) return false

db[target].limit -= jumlah

fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

return true
}





//🙂🥲😛😌😇😋😅😌
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askNumber() {
  return new Promise(resolve => {
    process.stdout.write('\x1Bc')
    execSync('toilet -f big -F metal "Yuss Xy"', { stdio: 'inherit' })
    console.log(chalk.cyan(`
╭──❏ 「 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗕𝗢𝗧 」
┃
┃ ❏ 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘀𝗶
┃ ┃
┃ ┣ Owner   : Yuss Xy
┃ ┣ System  : WhatsApp Bot
┃ ┗ Status  : Menunggu nomor
┃
┃ ❏ 𝗜𝗻𝘀𝘁𝗿𝘂𝗸𝘀𝗶
┃ ┃
┃ ┣ Masukkan nomor WhatsApp
┃ ┣ Gunakan format 62xxxx
┃ ┗ Contoh : 628123456789
┃
╰──────────────❏
`))
    rl.question(chalk.yellow('📱 Nomor WhatsApp : '), number => {
      resolve(number)
    })
  })
}
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./sessions')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    auth: state,
    version,
    logger: pino({ level: 'silent' }),
    browser: Browsers.ubuntu('Edge'),
    markOnlineOnConnect: true
  })

  if (!sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        const number = await askNumber()
        let code = await sock.requestPairingCode(number)
        code = code?.match(/.{1,4}/g)?.join('-')
        console.log(chalk.black(chalk.bgGreen('PAIRING CODE')), chalk.white(code))
      } catch (err) {
        console.log(chalk.red('❌ Pairing failed'))
        console.error(err)
        process.exit(1)
      }
    }, 3000)
  }

//👿👿👿👿👿

  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0]
    if (!msg.message) return
    //if (msg.key.fromMe) return  <== Biar gk bisa di pake sendiri wok


    if (!msg.message) return
    const sender = msg.key.remoteJid
    const jid = sender
    await sock.sendPresenceUpdate('composing', sender)
    await new Promise(r => setTimeout(r, 600))
    const text =
      (msg.message.conversation) ||
      (msg.message.extendedTextMessage?.text)

   /*  const body = msg.message?.conversation 
   || msg.message?.extendedTextMessage?.text 
   || msg.message?.imageMessage?.caption 
   || msg.message?.videoMessage?.caption 
   || ""

   if (!body) return

   const text = body.trim()
   const command = text.split(" ")[0].toLowerCase()
   const args = text.split(" ").slice(1)*/





   if (!jid.endsWith('@g.us')) return











//=======

if (/^(\.register|\.daftar)/i.test(text)) {

  const db = JSON.parse(fs.readFileSync('./database/user.json'))
  const user = msg.key.participant || msg.key.remoteJid

  if (db[user]) {
    return sock.sendMessage(jid,{
      text:'✅ Kamu sudah terdaftar.'
    },{ quoted: msg })
  }

  const input = text.replace(/^(\.register|\.daftar)/i,'').trim()

  let nama, umur

  if (input.includes(',')) {
    ;[nama, umur] = input.split(',')
  } else if (input.includes('.')) {
    ;[nama, umur] = input.split('.')
  } else if (input.includes('|')) {
    ;[nama, umur] = input.split('|')
  }

  if (!nama || !umur) {
    return sock.sendMessage(jid,{
      text:`❌ Format salah

Contoh:
.daftar YussXy, 20`
    },{ quoted: msg })
  }

  nama = nama.trim()
  umur = umur.trim()

  const tanggal = new Date().toLocaleDateString('id-ID')

  db[user] = {
    nama,
    umur,
    id:user,
    money:50000,
    saldo:0,
    limit:50,
    tiket:0,
    score:0,
    stamina:100,
    hp:100,
    level:0,
    xp:0,
    tanggal
  }

  fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

  const success = `
╭──❏ 「 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗧𝗜𝗢𝗡 𝗦𝗨𝗖𝗖𝗘𝗦𝗦 」
┃
┃ ❏ 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘀𝗶
┃ ┃
┃ ┣ Nama  : ${nama}
┃ ┣ Umur  : ${umur} Tahun
┃ ┗ Tgl   : ${tanggal}
┃
┃ 🎁 Bonus Awal
┃ ┃
┃ ┣ 💵 Money   : 50.000
┃ ┣ 🎟️ Limit   : 50
┃ ┣ ❤️ HP      : 100
┃ ┣ 💪 Stamina : 100
┃ ┗ ⭐ XP      : 0
┃
╰──────────────❏
`

  await sock.sendMessage(jid,{
    image:{ url:"https://image2url.com/r2/default/images/1773566617514-a9496ea4-0022-4d50-8410-ea3a79a4e262.jpg" },
    caption: success
  },{ quoted: msg })

}

 if (!text) return 
if (text.toLowerCase() === '.tes') {
    await sock.sendMessage(
      sender,
      {
        text: '✅ bot on kak.'
      },
      { quoted: msg }
    )
  }


if (!text.startsWith('.')) return
if (text.trim() === '.') return
const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid
if (!db[user]) {
  return sock.sendMessage(jid,{
    text:`❌ Kamu belum terdaftar!

Silakan daftar dulu dengan cara:

.daftar Nama, Umur

Contoh:
.daftar YussXy, 20`
  },{ quoted: msg })

}













































































if (text.toLowerCase().startsWith('.tomp3')) {

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

let quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage

let mime = quoted?.videoMessage?.mimetype || quoted?.audioMessage?.mimetype

if (!mime) {
return sock.sendMessage(jid,{
text:"Reply video/audio dengan .tomp3"
},{quoted:msg})
}

try {

let stream
if (quoted.videoMessage) {
stream = await downloadContentFromMessage(quoted.videoMessage, 'video')
} else {
stream = await downloadContentFromMessage(quoted.audioMessage, 'audio')
}

let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}

const inputPath = `./tmp_${Date.now()}`
const outputPath = `./tmp_${Date.now()}.mp3`

fs.writeFileSync(inputPath, buffer)

await new Promise((resolve, reject) => {
exec(`ffmpeg -i ${inputPath} -vn -ab 128k -ar 44100 ${outputPath}`, (err) => {
if (err) reject(err)
else resolve()
})
})

await sock.sendMessage(jid,{
audio: fs.readFileSync(outputPath),
mimetype: 'audio/mpeg'
},{quoted:msg})

fs.unlinkSync(inputPath)
fs.unlinkSync(outputPath)

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Gagal convert ke mp3."
},{quoted:msg})

}

}



if (text.toLowerCase().startsWith('.toimg')) {

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

let quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
let mime = quoted?.stickerMessage?.mimetype

if (!mime) {
return sock.sendMessage(jid,{
text:"Reply sticker dengan .toimg"
},{quoted:msg})
}

try {

const stream = await downloadContentFromMessage(quoted.stickerMessage, 'sticker')

let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}

const webpPath = `./tmp_${Date.now()}.webp`
const pngPath = `./tmp_${Date.now()}.png`

fs.writeFileSync(webpPath, buffer)

await new Promise((resolve, reject) => {
exec(`ffmpeg -i ${webpPath} ${pngPath}`, (err) => {
if (err) reject(err)
else resolve()
})
})

await sock.sendMessage(jid,{
image: fs.readFileSync(pngPath),
caption: "Done convert sticker ➜ image"
},{quoted:msg})

fs.unlinkSync(webpPath)
fs.unlinkSync(pngPath)

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Gagal convert sticker."
},{quoted:msg})

}

}




//🙂🥲😛😌😇😋😅😌
if (
text.toLowerCase().startsWith('.stiker') ||
text.toLowerCase().startsWith('.sticker') ||
text.toLowerCase().startsWith('.s')
) {

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

if (db[user].limit < 1){
return sock.sendMessage(jid,{
text:"Limit kamu habis."
},{quoted:msg})
}

let quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
let mime = quoted?.imageMessage?.mimetype || msg.message?.imageMessage?.mimetype

if (!mime) {
return sock.sendMessage(jid,{
text:"Kirim foto dengan caption .s atau reply foto"
},{quoted:msg})
}

db[user].limit -= 1
fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

try {

let media

if (quoted) {
media = await downloadContentFromMessage(quoted.imageMessage, 'image')
} else {
media = await downloadContentFromMessage(msg.message.imageMessage, 'image')
}

let buffer = Buffer.from([])

for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])
}

const inputPath = `./tmp_${Date.now()}.jpg`
const outputPath = `./tmp_${Date.now()}.webp`

fs.writeFileSync(inputPath, buffer)

await new Promise((resolve, reject) => {
exec(`ffmpeg -i ${inputPath} -vf "scale=512:512:force_original_aspect_ratio=increase" ${outputPath}`, (err) => {
if (err) reject(err)
else resolve()
})
})

await sock.sendMessage(jid,{
sticker: fs.readFileSync(outputPath)
},{quoted:msg})

fs.unlinkSync(inputPath)
fs.unlinkSync(outputPath)

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Terjadi error saat membuat sticker."
},{quoted:msg})

}

}




//🙂🥲😛😌😇😋😅😌
//🙂🥲😛😌😇😋😅😌
if (text.toLowerCase().startsWith('.brat ') && !text.toLowerCase().startsWith('.bratvid')) {
let query = text.slice(6).trim()
if (!query) {
return sock.sendMessage(jid,{
text:"Example:\n.brat Yuss xy"
},{quoted:msg})
}

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

if (db[user].limit < 1){
return sock.sendMessage(jid,{
text:"Limit kamu habis."
},{quoted:msg})
}

db[user].limit -= 1
fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

try {

const imgUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(query)}&delay=500`

const pngPath = `./tmp_${Date.now()}.png`
const webpPath = `./tmp_${Date.now()}.webp`

const response = await axios({
method: 'GET',
url: imgUrl,
responseType: 'stream'
})

const writer = fs.createWriteStream(pngPath)
response.data.pipe(writer)

await new Promise((resolve, reject) => {
writer.on('finish', resolve)
writer.on('error', reject)
})

await new Promise((resolve, reject) => {
exec(`ffmpeg -i ${pngPath} -vf "scale=512:512:force_original_aspect_ratio=increase" ${webpPath}`, (err) => {
if (err) reject(err)
else resolve()
})
})

await sock.sendMessage(jid,{
sticker: fs.readFileSync(webpPath)
},{quoted:msg})

fs.unlinkSync(pngPath)
fs.unlinkSync(webpPath)

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Terjadi error saat membuat sticker."
},{quoted:msg})

}

}




//🙂🥲😛😌😇😋😅😌
//🙂🥲😛😌😇😋😅😌

if (text.startsWith('.bratvid')) {
let query = text.slice(9).trim()
if (!query) {
return sock.sendMessage(jid,{
text:"Example:\n.bratvid Yuss xy yuss xy"
},{quoted:msg})
}

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

if (db[user].limit < 1){
return sock.sendMessage(jid,{
text:"Limit kamu habis."
},{quoted:msg})
}

db[user].limit -= 1
fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

try {

const gifUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(query)}&isAnimated=true&delay=500`

const gifPath = `./tmp_${Date.now()}.gif`
const webpPath = `./tmp_${Date.now()}.webp`

const response = await axios({
method: 'GET',
url: gifUrl,
responseType: 'stream'
})

const writer = fs.createWriteStream(gifPath)
response.data.pipe(writer)

await new Promise((resolve, reject) => {
writer.on('finish', resolve)
writer.on('error', reject)
})

await new Promise((resolve, reject) => {
exec(`ffmpeg -i ${gifPath} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=15" -loop 0 -preset default -an -vsync 0 ${webpPath}`, (err) => {
if (err) reject(err)
else resolve()
})
})

await sock.sendMessage(jid,{
sticker: fs.readFileSync(webpPath)
},{quoted:msg})

fs.unlinkSync(gifPath)
fs.unlinkSync(webpPath)

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Terjadi error saat membuat sticker."
},{quoted:msg})

}

}





//🙂🥲😛😌😇😋😅😌
//🙂🥲😛😌😇😋😅😌

if (text.startsWith('.ig') || text.startsWith('.instagram')) {

let url = text.split(' ')[1]
if (!url) {
return sock.sendMessage(jid,{
text:"Example:\n.ig https://instagram.com/xxxxx"
},{quoted:msg})
}

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

if (db[user].limit < 1){
return sock.sendMessage(jid,{
text:"Limit kamu habis."
},{quoted:msg})
}

db[user].limit -= 1
fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

try {

const res = await fetch(`https://zyzzkylin1.vercel.app/api/downloader/all?url=${encodeURIComponent(url)}`)
const json = await res.json()

if (!json.success) {
return sock.sendMessage(jid,{
text:"Gagal mengambil media."
},{quoted:msg})
}

const data = json.data.result

let video = data.links.find(v => v.type === "mp4")
let image = data.links.find(v => v.type === "jpg")

const caption = `╔══☉︎ INSTAGRAM DOWNLOADER

╰⪼ ◉ Judul : ${data.title.replace(/&#.*?;/g,"")}

╔══☉︎ INFO
╰⪼ ◉ Video : ${data.videoCount}
╰⪼ ◉ Image : ${data.imageCount}

© sʏᴜᴢᴏ ʙᴏᴛ`

if (video){

const filePath = `./tmp_${Date.now()}.mp4`

const response = await axios({
method: 'GET',
url: video.url,
responseType: 'stream',
headers: {
'User-Agent': 'Mozilla/5.0',
'Referer': 'https://www.instagram.com/'
}
})

const writer = fs.createWriteStream(filePath)
response.data.pipe(writer)

await new Promise((resolve, reject) => {
writer.on('finish', resolve)
writer.on('error', reject)
})

await sock.sendMessage(jid,{
video: fs.readFileSync(filePath),
caption: caption
},{quoted:msg})

fs.unlinkSync(filePath)

} else if (image){

await sock.sendMessage(jid,{
image: { url: image.url },
caption: caption
},{quoted:msg})

}

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Terjadi error saat mengambil media."
},{quoted:msg})

}

}




//🙂🥲😛😌😇😋😅😌
//🙂🥲😛😌😇😋😅😌

if (text.startsWith('.facebook') || text.startsWith('.fb')) {

let url = text.split(' ')[1]
if (!url) {
return sock.sendMessage(jid,{
text:"Example:\n.fb https://facebook.com/xxxxx"
},{quoted:msg})
}

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

if (db[user].limit < 1){
return sock.sendMessage(jid,{
text:"Limit kamu habis."
},{quoted:msg})
}

db[user].limit -= 1
fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

try {

const res = await fetch(`https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(url)}`)
const json = await res.json()

if (!json.status) {
return sock.sendMessage(jid,{
text:"Gagal mengambil video."
},{quoted:msg})
}

const data = json.data
let video = data.downloads.find(v => v.quality.includes("360")) || data.downloads[0]

const filePath = `./tmp_${Date.now()}.mp4`

const response = await axios({
method: 'GET',
url: video.url,
responseType: 'stream',
headers: {
'User-Agent': 'Mozilla/5.0',
'Referer': 'https://www.facebook.com/'
}
})

const writer = fs.createWriteStream(filePath)
response.data.pipe(writer)

await new Promise((resolve, reject) => {
writer.on('finish', resolve)
writer.on('error', reject)
})

const caption = `╔══☉︎ FACEBOOK DOWNLOADER

╰⪼ ◉ Judul    : ${data.title}
╰⪼ ◉ Durasi   : ${data.duration}

╔══☉︎ INFO
╰⪼ ◉ Quality  : ${video.quality}

© sʏᴜᴢᴏ ʙᴏᴛ`

await sock.sendMessage(jid,{
video: fs.readFileSync(filePath),
caption: caption
},{quoted:msg})

fs.unlinkSync(filePath)

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Terjadi error saat mengambil video."
},{quoted:msg})

}

}



//🙂🥲😛😌😇😋😅😌
//🙂🥲😛😌😇😋😅😌

if (text.startsWith('.tiktok') || text.startsWith('.tt')) {

let url = text.split(' ')[1]
if (!url) {
return sock.sendMessage(jid,{
text:"Example:\n.tt https://vt.tiktok.com/xxxxx"
},{quoted:msg})
}

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

if (db[user].limit < 1){
return sock.sendMessage(jid,{
text:"Limit kamu habis."
},{quoted:msg})
}

db[user].limit -= 1
fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

try {

const res = await fetch(`https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(url)}`)
const json = await res.json()

if (!json.status) {
return sock.sendMessage(jid,{
text:"Gagal mengambil video."
},{quoted:msg})
}

const data = json.data
let video = data.media.find(v => v.quality === "SD") || data.media[0]

const filePath = path.join(__dirname, `tmp_${Date.now()}.mp4`)

const response = await axios({
method: 'GET',
url: video.url,
responseType: 'stream'
})

const writer = fs.createWriteStream(filePath)
response.data.pipe(writer)

await new Promise((resolve, reject) => {
writer.on('finish', resolve)
writer.on('error', reject)
})

const caption = `╔══☉︎ TIKTOK DOWNLOADER

╰⪼ ◉ Judul   : ${data.title}
╰⪼ ◉ Author  : ${data.author}

╔══☉︎ INFO
╰⪼ ◉ Type    : ${data.type}
╰⪼ ◉ Quality : ${video.quality}

© sʏᴜᴢᴏ ʙᴏᴛ`

await sock.sendMessage(jid,{
video: fs.readFileSync(filePath),
caption: caption
},{quoted:msg})

fs.unlinkSync(filePath)

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Terjadi error saat mengambil video."
},{quoted:msg})

}

}








//🙂🥲😛😌😇😋😅😌
//🙂🥲😛😌😇😋😅😌

if (text.startsWith('.stalktt')) {

let username = text.split(' ')[1]
if (!username) {
return sock.sendMessage(jid,{
text:"Example:\n.stalktt yuss_xy"
},{quoted:msg})
}

// baca database seperti menu
const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

// cek limit
if (db[user].limit < 1){
return sock.sendMessage(jid,{
text:"Limit kamu habis."
},{quoted:msg})
}

// kurangi limit
db[user].limit -= 1
fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

try {

const res = await fetch(`https://api.siputzx.my.id/api/stalk/tiktok?username=${username}`)
const json = await res.json()

if (!json.status) {
return sock.sendMessage(jid,{
text:"Username tidak ditemukan."
},{quoted:msg})
}

const data = json.data.user
const stats = json.data.stats

const hasil = `╔══☉︎ TIKTOK STALK

╰⪼ ◉ Username : ${data.uniqueId}
╰⪼ ◉ Nickname : ${data.nickname}
╰⪼ ◉ Bio      : ${data.signature || "-"}

╔══☉︎ STATISTIK
╰⪼ ◉ Followers : ${stats.followerCount}
╰⪼ ◉ Following : ${stats.followingCount}
╰⪼ ◉ Likes     : ${stats.heartCount}
╰⪼ ◉ Video     : ${stats.videoCount}

╔══☉︎ STATUS
╰⪼ ◉ Verified  : ${data.verified ? "✅ Ya" : "❌ Tidak"}
╰⪼ ◉ Private   : ${data.privateAccount ? "🔒 Private" : "🌍 Public"}

© sʏᴜᴢᴏ ʙᴏᴛ`

await sock.sendMessage(jid,{
image:{url:data.avatarLarger},
caption:hasil
},{quoted:msg})

} catch(err){

sock.sendMessage(jid,{
text:"Terjadi error saat mengambil data."
},{quoted:msg})

}

}






//🙂🥲😛😌😇😋😅😌
//🙂🥲😛😌😇😋😅😌

  if (text.toLowerCase() === '.rvo' || text.toLowerCase() === '.readviewonce') {
    try {
      if (!msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        return await sock.sendMessage(jid, {
          text: '❌ Reply pesan viewOnce nya!'
        }, { quoted: msg })
      }

      const quoted = msg.message.extendedTextMessage.contextInfo.quotedMessage

      const viewOnceMsg =
        quoted.viewOnceMessage?.message ||
        quoted.viewOnceMessageV2?.message ||
        quoted

      const mediaMsg =
        viewOnceMsg?.imageMessage ||
        viewOnceMsg?.videoMessage ||
        viewOnceMsg?.audioMessage

      if (!mediaMsg || !mediaMsg.viewOnce) {
        return await sock.sendMessage(jid, {
          text: '❌ Pesan itu bukan viewOnce!'
        }, { quoted: msg })
      }

      const stream = await downloadContentFromMessage(
        mediaMsg,
        mediaMsg.mimetype?.includes('image')
          ? 'image'
          : mediaMsg.mimetype?.includes('video')
          ? 'video'
          : 'audio'
      )

      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }

      if (/image/.test(mediaMsg.mimetype)) {
        await sock.sendMessage(jid, { image: buffer, caption: mediaMsg.caption || '' }, { quoted: msg })
      } else if (/video/.test(mediaMsg.mimetype)) {
        await sock.sendMessage(jid, { video: buffer, caption: mediaMsg.caption || '' }, { quoted: msg })
      } else if (/audio/.test(mediaMsg.mimetype)) {
        await sock.sendMessage(jid, { audio: buffer, mimetype: 'audio/mpeg', ptt: false }, { quoted: msg })
      }

    } catch (err) {
      console.error('Error rvo:', err)
      await sock.sendMessage(jid, { text: '❌ Gagal membaca viewOnce.' }, { quoted: msg })
    }
  }










if (text.toLowerCase() === '.menu') {

const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

const nama = db[user].nama
const money = db[user].money
const limit = db[user].limit

// waktu
const now = new Date()
const tanggal = now.toLocaleDateString('id-ID')
const jam = now.toLocaleTimeString('id-ID')

// uptime bot
const uptime = (process.uptime() / 60).toFixed(1) + " menit"

// kirim pesan tunggu dulu
await sock.sendMessage(jid,{
text:`Tunggu sebentar ya kak.`
},{ quoted: msg })

await new Promise(r => setTimeout(r,1500))

const menuText = `𝙷𝚊𝚕𝚘 @${nama}
𝙿𝚎𝚛𝚔𝚎𝚗𝚊𝚕𝚊𝚗 𝚗𝚊𝚖𝚊 𝚜𝚊𝚢𝚊 𝚜𝚢𝚞𝚣𝚘 𝚋𝚘𝚝, 𝚊𝚔𝚞 𝚋𝚘𝚝 𝚢𝚊𝚗𝚐 𝚍𝚒 𝚋𝚞𝚊𝚝 𝚘𝚕𝚎𝚑 𝚢𝚞𝚜𝚜 𝚡𝚢, 𝚟𝚎𝚛𝚜𝚒 𝚔𝚞 𝚜𝚎𝚔𝚊𝚛𝚊𝚗𝚐 1.0, 𝚊𝚔𝚞 𝚖𝚊𝚜𝚒𝚑 𝚝𝚊𝚑𝚊𝚙 𝚙𝚎𝚛𝚔𝚎𝚖𝚋𝚊𝚗𝚐𝚊𝚗. 𝚓𝚒𝚔𝚊 𝚖𝚎𝚗𝚎𝚖𝚞𝚔𝚊𝚗 𝚎𝚛𝚛𝚘𝚛 𝚑𝚞𝚋𝚞𝚗𝚐𝚒 𝚘𝚠𝚗𝚎𝚛 𝚔𝚞 𝚢𝚊 ☺

- 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : 𝚈𝚞𝚜𝚜 𝚇𝚢
- 𝚃𝚒𝚔𝚝𝚘𝚔 : tiktok.com/@yuss_xy

╔══☉︎ USER INFO
╰⪼ ◉ Nama    : ${nama}
╰⪼ ◉ Money   : Rp${money}
╰⪼ ◉ Limit   : ${limit}

╔══☉︎ BOT INFO
╰⪼ ◉ Nama    : Syuzo Bot
╰⪼ ◉ Owner   : Yuss Xy
╰⪼ ◉ Versi   : 1.0
╰⪼ ◉ Uptime  : ${uptime}

╔══☉︎ ${tanggal} | ${jam}

╔══☉︎ BOT - MENU
╰⪼ .stalktt
╰⪼ .tiktok
╰⪼ .facebook
╰⪼ .instagram
╰⪼ .bratvid
╰⪼ .brat
╰⪼ .stiker
╰⪼ .toimg
╰⪼ .tomp3
╰⪼ .rvo
╰⪼ .iqc

© sʏᴜᴢᴏ ʙᴏᴛ - ʙʏ ʏᴜss xʏ`

await sock.sendMessage(jid,{
image:{ url:"https://image2url.com/r2/default/images/1773566617514-a9496ea4-0022-4d50-8410-ea3a79a4e262.jpg" },
caption: menuText,
mentions:[sender]
},{ quoted: msg })

}

//🙂🥲😛😌😇😋😅😌


if (text.startsWith('.iqc')) {

let query = text.slice(5).trim()
if (!query) {
return sock.sendMessage(jid,{
text:"Example:\n.iqc Yuss ganteng"
},{quoted:msg})
}

await sock.sendMessage(jid,{
react:{ text:"🕑", key: msg.key }
})

const db = JSON.parse(fs.readFileSync('./database/user.json'))
const user = msg.key.participant || msg.key.remoteJid

if (db[user].limit < 1){
return sock.sendMessage(jid,{
text:"Limit kamu habis."
},{quoted:msg})
}

db[user].limit -= 1
fs.writeFileSync('./database/user.json', JSON.stringify(db,null,2))

try {

const url = `https://zyzzkylin1.vercel.app/api/image/iqc?text=${encodeURIComponent(query)}`

await sock.sendMessage(jid,{
image: { url: url },
caption: `╔══☉︎ IQC IMAGE

╰⪼ ◉ Text : ${query}

╔══☉︎ INFO
╰⪼ ◉ Sisa Limit : ${db[user].limit}

© sʏᴜᴢᴏ ʙᴏᴛ`
},{quoted:msg})

await sock.sendMessage(jid,{
react:{ text:"✅", key: msg.key }
})

} catch(err){

console.log(err)

sock.sendMessage(jid,{
text:"Terjadi error saat membuat gambar."
},{quoted:msg})

}

}














//🙂🥲😛😌😇😋😅😌
})

sock.ev.on('connection.update', async (update) => {
    const { connection } = update

if (connection === 'open') {

    process.stdout.write('\x1Bc')

    // banner
    execSync('toilet -f big -F metal "Yuss Xy"', { stdio: 'inherit' })

    const botNumber = sock.user.id.split(':')[0]

    const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
    const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
    const usedRam = (totalRam - freeRam).toFixed(2)
    const uptime = (process.uptime() / 60).toFixed(1)

    console.log(chalk.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━'))
    console.log(chalk.green('✅ WhatsApp Connected'))
    console.log(chalk.yellow(`🤖 Bot Number : ${botNumber}`))
    console.log(chalk.magenta(`💾 RAM Used : ${usedRam} GB / ${totalRam} GB`))
    console.log(chalk.blue(`⚡ Uptime : ${uptime} minutes`))
    console.log(chalk.white(`🖥 Platform : ${os.platform()}`))
    console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━\n'))

    console.log(chalk.green('✨ Selamat menggunakan bot ini!'))
    console.log(chalk.yellow('Jika ada error, beri tahu owner: Yuss Xy'))
    console.log(chalk.cyan('📢 Jangan lupa ikuti saluran WhatsApp:'))
    console.log(chalk.blue('https://whatsapp.com/channel/0029VbAgFKULSmbeJMLfmR3b\n'))
}

    if (connection === 'close') {
      console.log(chalk.red('❌ Connection closed, restarting...'))
      startBot()
    }
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('group-participants.update', () => {})
}
//🙂🥲😛😌😇😋😅😌


//🙂🥲😛😌😇😋😅😌
const PIN = Buffer.from("MjYwOTgy", 'base64').toString()
async function checkPin() {
  const encodedPin = "MjYwOTgy"
  const decodedPin = Buffer.from(encodedPin, 'base64').toString()

  if (fs.existsSync('.pinbot')) {
    return startBot()
  }
  process.stdout.write('\x1Bc')
  execSync('toilet -f big -F metal "Yuss Xy"', { stdio: 'inherit' })

  console.log(chalk.cyan(`
BOT INI MEMERLUKAN PIN

1️⃣ Masukkan PIN
2️⃣ Minta PIN
`))
  rl.question(chalk.yellow('➡️ Pilih : '), async (pilih) => {
    if (pilih === '2') {
      console.log(chalk.green('\n📲 Membuka WhatsApp...\n'))
      const url = "https://wa.me/6283159657382?text=Min%20Boleh%20Minta%20pin%20untuk%20bot%20(wa%20nya%20v1)"
      execSync(`termux-open-url "${url}"`)
      process.exit()
    }
    if (pilih === '1') {
      rl.question(chalk.yellow('🔑 Masukkan PIN : '), async (inputPin) => {
        process.stdout.write('\n')
        process.stdout.write('🔎 Mengecek PIN')
        for (let i = 0; i < 3; i++) {
          await new Promise(r => setTimeout(r, 700))
          process.stdout.write('.')
        }

        if (inputPin === decodedPin) {

          fs.writeFileSync('.pinbot', 'verified')

          console.log(chalk.green('\n\n✅ PIN benar!'))

          setTimeout(() => {
            startBot()
          }, 1500)
        } else {
          console.log(chalk.red('\n\n❌ PIN salah'))
          process.exit()
        }
      })
    }
  })
}



//🙂🥲😛😌😇😋😅😌


checkPin()
//startBot()

