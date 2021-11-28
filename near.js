import axios from 'axios'
import distance from './經緯度間距離.js'
import template from './template/flex.js'
export default async (event) => {
  try {
    const results = []
    const results777 = []
    const { data } = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/hotel_C_f.json')
    for (const info of data.XML_Head.Infos.Info) {
      if (distance(event.message.latitude, event.message.longitude, info.Py, info.Px, 'K') < 5) {
        results.push({
          type: 'location',
          title: info.Name,
          address: info.Add,
          latitude: info.Py,
          longitude: info.Px,
          url: info.Picture1,
          add: info.Add,
          class: info.Class
        })
        console.log(distance(event.message.latitude, event.message.longitude, info.Px, info.Py, 'K'))

        if (results.length >= 5) {
          const flex = JSON.parse(JSON.stringify(template))
          flex.altText = '哈囉'
          for (let i = 0; i < 5; i++) {
            flex.contents.contents[i].body.contents[0].text = results[i].title
            flex.contents.contents[i].body.action.text = '!地圖 ' + results[i].title

            // flex.contents.contents[0].footer.contents[1].action.uri = 'https://www.google.com.tw/maps/@25.0431955,121.4686592?hl=zh-TW'

            if (results[i].url.length !== 0) {
              flex.contents.contents[i].hero.url = results[i].url
            }
            if (results[i].add.length !== 0) {
              flex.contents.contents[i].body.contents[2].contents[0].contents[0].text = results[i].add
            } else { flex.contents.contents[i].body.contents[2].contents[0].contents[0].text = '是個好地方' }

            if (results[i].class === '4') {
              flex.contents.contents[i].body.contents[1].contents[4].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
              flex.contents.contents[i].body.contents[1].contents[5].text = '5.0'
            }
          }

          results777.push(flex)
          break
        }
      }
    }
    console.log(results777)

    if (results777.length > 0) {
      event.reply(results777)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
