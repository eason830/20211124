import king from './king666.js'

export default (event) => {
  try {
    for (let i = 0; i <= king.length - 1; i++) {
      console.log(king[i].name)
    }
    // info[Math.floor(Math.random() * 13)].name
    event.reply(king[Math.floor(Math.random() * 13)].name)
  } catch (error) {
    event.reply('錯誤')
  }
}
