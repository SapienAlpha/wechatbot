import {log} from "wechaty";
import {FileBox} from "file-box";
import * as path from 'path';
import {disclaimer} from "./Constants.js";
import {bot} from './Main.js';

export async function onMessage(msg) {
    try {
        log.info('Receive message: ', msg.toString());

        var command = msg.text().toLowerCase().replace(/\s*/g, "");
        if (command === null || command === '') {
            return;
        }
        var msgRoom = msg.room();
        if (msgRoom === null) {
            return;
        }
        if (msgRoom.payload === null) {
            log.error("msg room payload is null")
        }
        var msgTopic = msgRoom.payload.topic;
        log.info("onMessage. msgTopic:" + msgTopic)
        var replyRoom = await bot.Room.find({topic: msgTopic});
        if (replyRoom === null) {
            log.error("onMessage. find room fail. roomTopic:" + msgTopic);
            return
        }

        if (command === '?help' || command === '？help'
            || (command.startsWith('@sapienalpha') && command.includes('?help'))
            || (command.startsWith('@sapienalpha') && command.includes('？help'))) {
            await replyRoom.say(
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
                '?SP500: 获取最新的 标普500 日内交易策略.\n' +
                '?shorttermnq：获取最新的 纳指 短期交易策略.'
            );
        } else if (command === '?longtermwheat' || command === '？longtermwheat'
            || (command.startsWith('@sapienalpha') && command.includes('?longtermwheat'))
            || (command.startsWith('@sapienalpha') && command.includes('？longtermwheat'))) {
            let longTermWheatChart = FileBox.fromFile(path.join(process.env.basePath, "longtermwheat.png"));
            await replyRoom.say('下图是 小麦 长期交易策略。\n' +
                disclaimer)
            await replyRoom.say(longTermWheatChart)
        } else if (command === '?longtermtqqq' || command === '？longtermtqqq'
            || (command.startsWith('@sapienalpha') && command.includes('?longtermtqqq'))
            || (command.startsWith('@sapienalpha') && command.includes('？longtermtqqq'))) {
            let longTermTQQQChart = FileBox.fromFile(path.join(process.env.basePath, "longtermtqqq.png"));
            await replyRoom.say('下图是 TQQQ 长期交易策略。\n' +
                disclaimer)
            await replyRoom.say(longTermTQQQChart)
        } else if (command === '?qld' || command === '？qld'
            || (command.startsWith('@sapienalpha') && command.includes('?qld'))
            || (command.startsWith('@sapienalpha') && command.includes('？qld'))) {
            let qldChart = FileBox.fromFile(path.join(process.env.basePath, "qld.png"));
            await replyRoom.say('下图是 2倍做多纳指100ETF(QLD) 短期交易策略。\n' +
                disclaimer)
            await replyRoom.say(qldChart)
        } else if (command === '?daytradev2' || command === '？daytradev2'
            || (command.startsWith('@sapienalpha') && command.includes('?daytradev2'))
            || (command.startsWith('@sapienalpha') && command.includes('？daytradev2'))) {
            let dayTradeV2Chart = FileBox.fromFile(path.join(process.env.basePath, "daytradev2.png"));
            await replyRoom.say('下图是 纳指100 日内交易策略(V2)。\n' +
                disclaimer)
            await replyRoom.say(dayTradeV2Chart)
        } else if (command === '?daytradev3' || command === '？daytradev3'
            || (command.startsWith('@sapienalpha') && command.includes('?daytradev3'))
            || (command.startsWith('@sapienalpha') && command.includes('？daytradev3'))) {
            let dayTradeV3Chart = FileBox.fromFile(path.join(process.env.basePath, "daytradev3.png"));
            await replyRoom.say('下图是 纳指100 日内交易策略(V3)。\n' +
                disclaimer)
            await replyRoom.say(dayTradeV3Chart)
        } else if (command === '?daytradev4' || command === '？daytradev4'
            || (command.startsWith('@sapienalpha') && command.includes('?daytradev4'))
            || (command.startsWith('@sapienalpha') && command.includes('？daytradev4'))) {
            let dayTradeV4Chart = FileBox.fromFile(path.join(process.env.basePath, "daytradev4.png"));
            await replyRoom.say('下图是 纳指100 日内交易策略(V4)。\n' +
                disclaimer)
            await replyRoom.say(dayTradeV4Chart)
        } else if (command === '?daytradev5' || command === '？daytradev5'
            || (command.startsWith('@sapienalpha') && command.includes('?daytradev5'))
            || (command.startsWith('@sapienalpha') && command.includes('？daytradev5'))) {
            let dayTradeV5Chart = FileBox.fromFile(path.join(process.env.basePath, "daytradev5.png"));
            await replyRoom.say('下图是 纳指100 日内交易策略(V5)。\n' +
                disclaimer)
            await replyRoom.say(dayTradeV5Chart)
        } else if (command === '?rotation' || command === '？rotation'
            || (command.startsWith('@sapienalpha') && command.includes('?rotation'))
            || (command.startsWith('@sapienalpha') && command.includes('？rotation'))) {
            let rotationChart = FileBox.fromFile(path.join(process.env.basePath, "rotation.png"));
            await replyRoom.say('下图是 QQQ 与 IWM 间风格轮动策略。\n' +
                disclaimer)
            await replyRoom.say(rotationChart)
        } else if (command === '?longtermiwm' || command === '？longtermiwm'
            || (command.startsWith('@sapienalpha') && command.includes('?longtermiwm'))
            || (command.startsWith('@sapienalpha') && command.includes('？longtermiwm'))) {
            let longTermIWMChart = FileBox.fromFile(path.join(process.env.basePath, "longtermiwm.png"));
            await replyRoom.say('下图是 IWM 长期交易策略。\n' +
                disclaimer)
            await replyRoom.say(longTermIWMChart)
        } else if (command === '?nqv4' || command === '？nqv4'
            || (command.startsWith('@sapienalpha') && command.includes('?nqv4'))
            || (command.startsWith('@sapienalpha') && command.includes('？nqv4'))) {
            let NQV4Chart = FileBox.fromFile(path.join(process.env.basePath, "nqv4.png"));
            await replyRoom.say('下图是 纳指100 日内交易策略。\n' +
                disclaimer)
            await replyRoom.say(NQV4Chart)
        } else if (command === '?sp500' || command === '？sp500'
            || (command.startsWith('@sapienalpha') && command.includes('?sp500'))
            || (command.startsWith('@sapienalpha') && command.includes('？sp500'))) {
            let sp500Chart = FileBox.fromFile(path.join(process.env.basePath, "sp500.png"));
            await replyRoom.say('下图是 标普500 日内交易策略。\n' +
                disclaimer)
            await replyRoom.say(sp500Chart)
        } else if (command === '?shorttermnq' || command === '？shorttermnq'
            || (command.startsWith('@sapienalpha') && command.includes('?shorttermnq'))
            || (command.startsWith('@sapienalpha') && command.includes('？shorttermnq'))) {
            let shorttermnqChart = FileBox.fromFile(path.join(process.env.basePath, "shorttermnq.png"));
            await replyRoom.say('下图是 纳指 短期交易策略。\n' +
                disclaimer)
            await replyRoom.say(shorttermnqChart)
        }
    } catch (e) {
        log.error("onMessage error, msg:" + msg.toString() + "error:" + e.toString());
    }
}