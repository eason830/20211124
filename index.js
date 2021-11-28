import 'dotenv/config'
import linebot from 'linebot'
// import axios from 'axios'
import que from './que.js'
import flex from './text.js'
// import near from './near.js'
// import distance from './經緯度間距離.js'
import near from './near.js'
import game from './game.js'
import ccc from './ccc.js'
import king from './king.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('!地圖 ')) {
      que(event)
    } else if (event.message.text.startsWith('!搜尋 ')) {
      flex(event)
    } else if (event.message.text.startsWith('!game')) {
      game(event)
    } else if (event.message.text.startsWith('!ccc')) {
      ccc(event)
    } else if (event.message.text.startsWith('!king')) {
      king(event)
    }
  }
  if (event.message.type === 'location') {
    if (event.message.type === 'location') {
      near(event)
    }
  }
})
