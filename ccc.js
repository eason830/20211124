import ccc from './ccc666.js'

export default (event) => {
  try {
    for (let i = 0; i <= ccc.length - 1; i++) {
      console.log(ccc[i].name)
    }
    // info[Math.floor(Math.random() * 11)].name
    event.reply(ccc[Math.floor(Math.random() * 11)].name)
  } catch (error) {
    event.reply('錯誤')
  }
}
