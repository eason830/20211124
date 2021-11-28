import axios from 'axios'

export default async (event) => {
  const que = event.message.text.replace('!地圖 ', '')
  try {
    const results = []
    const { data } = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/hotel_C_f.json')
    for (const info of data.XML_Head.Infos.Info) {
      if (info.Name === que) {
        results.push({
          type: 'location',
          title: info.Name,
          address: info.Add,
          latitude: info.Py,
          longitude: info.Px
        })
        if (results.length >= 1) {
          break
        }
      }
    }
    console.log(results)
    if (results.length > 0) {
      event.reply(results)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
