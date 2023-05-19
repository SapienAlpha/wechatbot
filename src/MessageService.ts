import {log, Message} from "wechaty";
import {
    disclaimer,
} from "./Constants";
import {
    dayTradeV2Chart,
    dayTradeV3Chart,
    dayTradeV4Chart, dayTradeV5Chart, longTermIWMChart,
    longTermTQQQChart,
    longTermWheatChart, NQV4Chart,
    qldChart, rotationChart, sp500Chart
} from "./ChartFileService";
import {RoomInterface} from "wechaty/src/user-modules/room";
import {FileBox} from "file-box";

export default async function onMessage(msg: Message) {
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
            await msg.say('下图是 小麦 长期交易策略。\n' +
                disclaimer)
            await msg.say(longTermWheatChart)
            break

        case '?longtermtqqq':
        case '？longtermtqqq':
            await msg.say('下图是 TQQQ 长期交易策略。\n' +
                disclaimer)
            await msg.say(longTermTQQQChart)
            break

        case '?qld':
        case '？qld':
            await msg.say('下图是 2倍做多纳指100ETF(QLD) 短期交易策略。\n' +
                disclaimer)
            await msg.say(qldChart)
            break

        case '?daytradev2':
        case '？daytradev2':
            await msg.say('下图是 纳指100 日内交易策略(V2)。\n' +
                disclaimer)
            await msg.say(dayTradeV2Chart)
            break

        case '?daytradev3':
        case '？daytradev3':
            await msg.say('下图是 纳指100 日内交易策略(V3)。\n' +
                disclaimer)
            await msg.say(dayTradeV3Chart)
            break

        case '?daytradev4':
        case '？daytradev4':
            await msg.say('下图是 纳指100 日内交易策略(V4)。\n' +
                disclaimer)
            await msg.say(dayTradeV4Chart)
            break

        case '?daytradev5':
        case '？daytradev5':
            await msg.say('下图是 纳指100 日内交易策略(V5)。\n' +
                disclaimer)
            await msg.say(dayTradeV5Chart)
            break

        case '?rotation':
        case '？rotation':
            await msg.say('下图是 QQQ 与 IWM 间风格轮动策略。\n' +
                disclaimer)
            await msg.say(rotationChart)
            break

        case '?longtermiwm':
        case '？longtermiwm':
            await msg.say('下图是 IWM 长期交易策略。\n' +
                disclaimer)
            await msg.say(longTermIWMChart)
            break

        case '?nqv4':
        case '？nqv4':
            await msg.say('下图是 纳指100 日内交易策略。\n' +
                disclaimer)
            await msg.say(NQV4Chart)
            break

        case '?sp500':
        case '？sp500':
            await msg.say('下图是 标普500 日内交易策略。\n' +
                disclaimer)
            await msg.say(sp500Chart)
            break
    }
}

export async function longtermwheatToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 小麦 长期交易策略。\n' + disclaimer,
        longTermWheatChart)
}

export async function longtermtqqqToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 TQQQ 长期交易策略。\n' + disclaimer,
        longTermTQQQChart)
}

export async function qldToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 2倍做多纳指100ETF(QLD) 短期交易策略。\n' + disclaimer,
        qldChart)
}

export async function daytradev2ToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 纳指100 日内交易策略(V2)。\n' + disclaimer,
        dayTradeV2Chart)
}

export async function daytradev3ToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 纳指100 日内交易策略(V3)。\n' + disclaimer,
        dayTradeV3Chart)
}

export async function daytradev4ToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 纳指100 日内交易策略(V4)。\n' + disclaimer,
        dayTradeV4Chart)
}

export async function daytradev5ToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 纳指100 日内交易策略(V5)。\n' + disclaimer,
        dayTradeV5Chart)
}

export async function rotationToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 QQQ 与 IWM 间风格轮动策略。\n' + disclaimer,
        rotationChart)
}

export async function longtermiwmToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 IWM 长期交易策略。\n' + disclaimer,
        longTermIWMChart)
}

export async function nqv4ToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 纳指100 日内交易策略。\n' + disclaimer,
        NQV4Chart)
}

export async function sp500ToAllRooms(bot) {
    await sendMsgToAllRooms(bot,
        '下图是 标普500 日内交易策略。\n' + disclaimer,
        sp500Chart)
}


async function sendMsgToAllRooms(bot, note, chart: FileBox) {
    if (bot !== null && bot.isLoggedIn) {
        const roomList = await bot.Room.findAll();
        for (const room of roomList) {
            var name = room.payload.topic;
            if (name.startsWith("SapienAlpha")) {
                await sendMsgToRoom(room, note, chart)
            }
        }
    }
}

async function sendMsgToRoom(room: RoomInterface, note, chart: FileBox) {
    await room.say(note);
    await room.say(chart)
}