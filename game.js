import ddd from './game666.js'

export default (event) => {
  try {
    for (let i = 0; i <= ddd.length - 1; i++) {
      console.log(ddd[i].name)
    }
    // info[Math.floor(Math.random() * 19)].name
    event.reply(ddd[Math.floor(Math.random() * 19)].name)
  } catch (error) {
    event.reply('錯誤')
  }
}
