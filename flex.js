import template from './template/flex.js'
import axios from 'axios'
export default async (event) => {
  const ttt = event.message.text.replace('!搜尋 ', '')
  try {
    const results = []
    const results666 = []
    const { data } = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/hotel_C_f.json')
    for (const info of data.XML_Head.Infos.Info) {
      if (info.Add.startsWith(ttt)) {
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

        // console.log(flex)
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

          results666.push(flex)
          break
        }
      }
    }

    console.log(results)
    // console.log(results666)
    if (results666.length > 0) {
      event.reply(results666)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
