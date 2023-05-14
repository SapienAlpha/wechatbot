import {log, Message} from "wechaty";
import {FileBox} from 'file-box';

const disclaimer = '策略仅供参考，不构成任何投资建议。请务必阅读免责声明(http://webapp.sapienalpha.net/)';

export default async function onMessage(msg: Message) {
    log.info('Receive message: ', msg.toString());

    var command = msg.text().toLowerCase().replace(/\s*/g, "");
    switch (command) {
        case '?help':
        case '?？help':
            await msg.say(
                '您可以发送以下命令获取最新预测：\n' +
                '?Longtermwheat: 获取最新的 小麦 长期交易策略.\n' +
                '?Longtermtqqq: 获取最新的 TQQQ 长期交易策略.\n' +
                '?QLD: 获取最新的 2倍做多纳指100ETF(QLD) 短期交易策略.\n' +
                '?Daytradev2: 获取最新的 纳指100 日内交易策略(V2).\n' +
                '?Daytradev3: 获取最新的 纳指100 日内交易策略(V3).\n' +
                '?Daytradev4: 获取最新的 纳指100 日内交易策略(V4).\n' +
                '?Daytradev5: 获取最新的 纳指100 日内交易策略(V5).\n' +
                '?Rotation: 获取最新的 QQQ 与 IWM 间风格轮动策略.\n' +
                '?Longtermiwm: 获取最新的 IWM 长期交易策略.\n' +
                '?NQV4: 获取最新的 纳指100 日内交易策略.\n' +
                '?SP500: 获取最新的 标普500 日内交易策略.'
            );
            break

        case '?longtermwheat':
        case '？longtermwheat':
            const longTermWheatChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 小麦 长期交易策略。\n' +
                disclaimer)
            msg.say(longTermWheatChart)
            break

        case '?longtermtqqq':
        case '？longtermtqqq':
            const longTermTQQQChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 TQQQ 长期交易策略。\n' +
                disclaimer)
            msg.say(longTermTQQQChart)
            break

        case '?qld':
        case '？qld':
            const qldChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 2倍做多纳指100ETF(QLD) 短期交易策略。\n' +
                disclaimer)
            msg.say(qldChart)
            break

        case '?daytradev2':
        case '？daytradev2':
            const dayTradeV2Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 纳指100 日内交易策略(V2)。\n' +
                disclaimer)
            msg.say(dayTradeV2Chart)
            break

        case '?daytradev3':
        case '？daytradev3':
            const dayTradeV3Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 纳指100 日内交易策略(V3)。\n' +
                disclaimer)
            msg.say(dayTradeV3Chart)
            break

        case '?daytradev4':
        case '？daytradev4':
            const dayTradeV4Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 纳指100 日内交易策略(V4)。\n' +
                disclaimer)
            msg.say(dayTradeV4Chart)
            break

        case '?daytradev5':
        case '？daytradev5':
            const dayTradeV5Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 纳指100 日内交易策略(V5)。\n' +
                disclaimer)
            msg.say(dayTradeV5Chart)
            break

        case '?rotation':
        case '？rotation':
            const rotationChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 QQQ 与 IWM 间风格轮动策略。\n' +
                disclaimer)
            msg.say(rotationChart)
            break

        case '?longtermiwm':
        case '？longtermiwm':
            const longTermIWMChart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 IWM 长期交易策略。\n' +
                disclaimer)
            msg.say(longTermIWMChart)
            break

        case '?nqv4':
        case '？nqv4':
            const NQV4Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 纳指100 日内交易策略。\n' +
                disclaimer)
            msg.say(NQV4Chart)
            break

        case '?sp500':
        case '？sp500':
            const sp500Chart = FileBox.fromFile('/Users/kongqingchao/IdeaProjects/SapienAlpha/wechatbot/source/testScanChart.png');
            msg.say('下图是 标普500 日内交易策略。\n' +
                disclaimer)
            msg.say(sp500Chart)
            break
    }

}