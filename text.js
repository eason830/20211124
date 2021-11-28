import template from './template/flex.js'
import axios from 'axios'
export default async (event) => {
  const ttt = event.message.text.replace('!搜尋 ', '')
  try {
    const results = []
    let ccc = 0
    const flex = JSON.parse(JSON.stringify(template))
    const { data } = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/hotel_C_f.json')
    for (const info of data.XML_Head.Infos.Info) {
      if (info.Add.startsWith(ttt)) {
        flex.altText = '哈囉'
        flex.contents.contents[ccc].body.contents[0].text = info.Name
        flex.contents.contents[ccc].body.action.text = '!地圖 ' + info.Name
        if (info.Picture1.length !== 0) {
          flex.contents.contents[ccc].hero.url = info.Picture1
        }
        if (info.Add.length !== 0) {
          flex.contents.contents[ccc].body.contents[2].contents[0].contents[0].text = info.Add
        } else { flex.contents.contents[ccc].body.contents[2].contents[0].contents[0].text = '是個好地方' }
        if (info.Class === '4') {
          flex.contents.contents[ccc].body.contents[1].contents[4].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
          flex.contents.contents[ccc].body.contents[1].contents[5].text = '5.0'
        }
        ccc = ccc + 1
        // results.push({
        //   type: 'location',
        //   title: info.Name,
        //   address: info.Add,
        //   latitude: info.Py,
        //   longitude: info.Px,
        //   url: info.Picture1,
        //   add: info.Add,
        //   class: info.Class
        // })

        // console.log(flex)
        if (ccc >= 5) {
          break
        }
      }
    }

    results.push(flex)

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
