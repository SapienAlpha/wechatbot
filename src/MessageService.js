import {log} from "wechaty";
import {FileBox} from "file-box";

export const disclaimer = '策略仅供参考，不构成任何投资建议。请务必阅读免责声明(http://webapp.sapienalpha.net/)';

export default async function onMessage(msg) {
    log.info('Receive message: ', msg.toString());

    var command = msg.text().toLowerCase().replace(/\s*/g, "");
    switch (command) {
        case '?help':
        case '？help':
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
            let longTermWheatChart = FileBox.fromFile(process.env.longTermWheatChartFileName);
            await msg.say('下图是 小麦 长期交易策略。\n' +
                disclaimer)
            await msg.say(longTermWheatChart)
            break

        case '?longtermtqqq':
        case '？longtermtqqq':
            let longTermTQQQChart = FileBox.fromFile(process.env.longTermTQQQChartFileName);
            await msg.say('下图是 TQQQ 长期交易策略。\n' +
                disclaimer)
            await msg.say(longTermTQQQChart)
            break

        case '?qld':
        case '？qld':
            let qldChart = FileBox.fromFile(process.env.qldChartFileName);
            await msg.say('下图是 2倍做多纳指100ETF(QLD) 短期交易策略。\n' +
                disclaimer)
            await msg.say(qldChart)
            break

        case '?daytradev2':
        case '？daytradev2':
            let dayTradeV2Chart = FileBox.fromFile(process.env.dayTradeV2ChartFileName);
            await msg.say('下图是 纳指100 日内交易策略(V2)。\n' +
                disclaimer)
            await msg.say(dayTradeV2Chart)
            break

        case '?daytradev3':
        case '？daytradev3':
            let dayTradeV3Chart = FileBox.fromFile(process.env.dayTradeV3ChartFileName);
            await msg.say('下图是 纳指100 日内交易策略(V3)。\n' +
                disclaimer)
            await msg.say(dayTradeV3Chart)
            break

        case '?daytradev4':
        case '？daytradev4':
            let dayTradeV4Chart = FileBox.fromFile(process.env.dayTradeV4ChartFileName);
            await msg.say('下图是 纳指100 日内交易策略(V4)。\n' +
                disclaimer)
            await msg.say(dayTradeV4Chart)
            break

        case '?daytradev5':
        case '？daytradev5':
            let dayTradeV5Chart = FileBox.fromFile(process.env.dayTradeV5ChartFileName);
            await msg.say('下图是 纳指100 日内交易策略(V5)。\n' +
                disclaimer)
            await msg.say(dayTradeV5Chart)
            break

        case '?rotation':
        case '？rotation':
            let rotationChart = FileBox.fromFile(process.env.rotationChartFileName);
            await msg.say('下图是 QQQ 与 IWM 间风格轮动策略。\n' +
                disclaimer)
            await msg.say(rotationChart)
            break

        case '?longtermiwm':
        case '？longtermiwm':
            let longTermIWMChart = FileBox.fromFile(process.env.longTermIWMChartFileName);
            await msg.say('下图是 IWM 长期交易策略。\n' +
                disclaimer)
            await msg.say(longTermIWMChart)
            break

        case '?nqv4':
        case '？nqv4':
            let NQV4Chart = FileBox.fromFile(process.env.NQV4ChartFileName);
            await msg.say('下图是 纳指100 日内交易策略。\n' +
                disclaimer)
            await msg.say(NQV4Chart)
            break

        case '?sp500':
        case '？sp500':
            let sp500Chart = FileBox.fromFile(process.env.sp500ChartFileName);
            await msg.say('下图是 标普500 日内交易策略。\n' +
                disclaimer)
            await msg.say(sp500Chart)
            break
    }
}