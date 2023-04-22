import {log, Message} from "wechaty";
import {FileBox} from 'file-box';

export default async function onMessage(msg: Message) {
    log.info('Receive message: ', msg.toString());

    var command = msg.text().toLowerCase().replace(/\s*/g, "");
    switch (command) {
        case '?help':
        case '?？help':
            await msg.say(
                '您可以发送以下命令获取最新的预测图：\n' +
                '?Longtermwheat: 获取最新的长期小麦预测图.\n' +
                '?Longtermtqqq: 获取最新的长期TQQQ预测图.\n' +
                '?QLD: 获取最新的短期2倍做多纳指100ETF(QLD)预测图.\n' +
                '?Daytradev2: 获取最新的日内交易纳指100预测图(V2).\n' +
                '?Daytradev3: 获取最新的日内交易纳指100预测图(V3).\n' +
                '?Daytradev4: 获取最新的日内交易纳指100预测图(V4).\n' +
                '?Daytradev5: 获取最新的日内交易纳指100预测图(V5).\n' +
                '?Rotation: 获取最新的QQQ与IWM间风格轮动策略预测图.\n' +
                '?Longtermiwm: 获取最新的长期IWM预测图.\n' +
                '?NQV4: 获取最新的日内交易纳指100预测图.\n' +
                '?SP500: 获取最新的日内交易标普500预测图.'
            );
            break

        case '?longtermwheat':
        case '？longtermwheat':
            const longTermWheatChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(longTermWheatChart)
            break

        case '?longtermtqqq':
        case '？longtermtqqq':
            const longTermTQQQChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(longTermTQQQChart)
            break

        case '?qld':
        case '？qld':
            const qldChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(qldChart)
            break

        case '?daytradev2':
        case '？daytradev2':
            const dayTradeV2Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(dayTradeV2Chart)
            break

        case '?daytradev3':
        case '？daytradev3':
            const dayTradeV3Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(dayTradeV3Chart)
            break

        case '?daytradev4':
        case '？daytradev4':
            const dayTradeV4Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(dayTradeV4Chart)
            break

        case '?daytradev5':
        case '？daytradev5':
            const dayTradeV5Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(dayTradeV5Chart)
            break

        case '?rotation':
        case '？rotation':
            const rotationChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(rotationChart)
            break

        case '?longtermiwm':
        case '？longtermiwm':
            const longTermIWMChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(longTermIWMChart)
            break

        case '?nqv4':
        case '？nqv4':
            const NQV4Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(NQV4Chart)
            break

        case '?sp500':
        case '？sp500':
            const sp500Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say(sp500Chart)
            break
    }

}