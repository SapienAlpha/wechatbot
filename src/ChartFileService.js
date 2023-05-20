import {FileBox} from 'file-box';
import * as fs from 'fs';
import {log} from 'wechaty'
import {disclaimer} from "./MessageService.js";

export async function refreshFiles(bot) {
    if (!fs.existsSync(process.env.notifyStatusFileName)) {
        initNotifyStatusFile();
    } else {
        var newStats = null;
        var needSaveNotifyStatus = false;

        var jsonStr = fs.readFileSync(process.env.notifyStatusFileName, "utf-8");
        var jsonObj = JSON.parse(jsonStr.toString());

        let longTermWheatChartNotifyTs = jsonObj['longTermWheatChartNotifyTs'];
        newStats = fs.statSync(process.env.longTermWheatChartFileName);
        if (newStats.mtimeMs > longTermWheatChartNotifyTs) {
            needSaveNotifyStatus = true;
            let longTermWheatChart = FileBox.fromFile(process.env.longTermWheatChartFileName);

            log.info("--------------------longTermWheatChart has updte, send message");
            await sendMsgToAllRooms(bot,
                '下图是 小麦 长期交易策略。\n' + disclaimer,
                longTermWheatChart)
            longTermWheatChartNotifyTs = newStats.mtimeMs;
        }


        let longTermTQQQChartNotifyTs = jsonObj['longTermTQQQChartNotifyTs'];
        newStats = fs.statSync(process.env.longTermTQQQChartFileName);
        if (newStats.mtimeMs > longTermTQQQChartNotifyTs) {
            needSaveNotifyStatus = true;
            let longTermTQQQChart = FileBox.fromFile(process.env.longTermTQQQChartFileName);

            log.info("--------------------longTermTQQQChart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 TQQQ 长期交易策略。\n' + disclaimer,
                longTermTQQQChart)
            longTermTQQQChartNotifyTs = newStats.mtimeMs;
        }

        let qldChartNotifyTs = jsonObj['qldChartNotifyTs'];
        newStats = fs.statSync(process.env.qldChartFileName);
        if (newStats.mtimeMs > qldChartNotifyTs) {
            needSaveNotifyStatus = true;
            let qldChart = FileBox.fromFile(process.env.qldChartFileName);

            log.info("--------------------qldChart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 2倍做多纳指100ETF(QLD) 短期交易策略。\n' + disclaimer,
                qldChart)
            qldChartNotifyTs = newStats.mtimeMs;
        }

        let dayTradeV2ChartNotifyTs = jsonObj['dayTradeV2ChartNotifyTs'];
        newStats = fs.statSync(process.env.dayTradeV2ChartFileName);
        if (newStats.mtimeMs > dayTradeV2ChartNotifyTs) {
            needSaveNotifyStatus = true;
            let dayTradeV2Chart = FileBox.fromFile(process.env.dayTradeV2ChartFileName);

            log.info("--------------------dayTradeV2Chart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 纳指100 日内交易策略(V2)。\n' + disclaimer,
                dayTradeV2Chart)
            dayTradeV2ChartNotifyTs = newStats.mtimeMs;
        }

        let dayTradeV3ChartNotifyTs = jsonObj['dayTradeV3ChartNotifyTs'];
        newStats = fs.statSync(process.env.dayTradeV3ChartFileName);
        if (newStats.mtimeMs > dayTradeV3ChartNotifyTs) {
            needSaveNotifyStatus = true;
            let dayTradeV3Chart = FileBox.fromFile(process.env.dayTradeV3ChartFileName);

            log.info("--------------------dayTradeV3Chart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 纳指100 日内交易策略(V3)。\n' + disclaimer,
                dayTradeV3Chart)
            dayTradeV3ChartNotifyTs = newStats.mtimeMs;
        }

        let dayTradeV4ChartNotifyTs = jsonObj['dayTradeV4ChartNotifyTs'];
        newStats = fs.statSync(process.env.dayTradeV4ChartFileName);
        if (newStats.mtimeMs > dayTradeV4ChartNotifyTs) {
            needSaveNotifyStatus = true;
            let dayTradeV4Chart = FileBox.fromFile(process.env.dayTradeV4ChartFileName);

            log.info("--------------------dayTradeV4Chart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 纳指100 日内交易策略(V4)。\n' + disclaimer,
                dayTradeV4Chart)
            dayTradeV4ChartNotifyTs = newStats.mtimeMs;
        }

        let dayTradeV5ChartNotifyTs = jsonObj['dayTradeV5ChartNotifyTs'];
        newStats = fs.statSync(process.env.dayTradeV5ChartFileName);
        if (newStats.mtimeMs > dayTradeV5ChartNotifyTs) {
            needSaveNotifyStatus = true;
            let dayTradeV5Chart = FileBox.fromFile(process.env.dayTradeV5ChartFileName);

            log.info("--------------------dayTradeV5Chart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 纳指100 日内交易策略(V5)。\n' + disclaimer,
                dayTradeV5Chart)
            dayTradeV5ChartNotifyTs = newStats.mtimeMs;
        }

        let rotationChartNotifyTs = jsonObj['rotationChartNotifyTs'];
        newStats = fs.statSync(process.env.rotationChartFileName);
        if (newStats.mtimeMs > rotationChartNotifyTs) {
            needSaveNotifyStatus = true;
            let rotationChart = FileBox.fromFile(process.env.rotationChartFileName);

            log.info("--------------------rotationChart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 QQQ 与 IWM 间风格轮动策略。\n' + disclaimer,
                rotationChart)
            rotationChartNotifyTs = newStats.mtimeMs;
        }

        let longTermIWMChartNotifyTs = jsonObj['longTermIWMChartNotifyTs'];
        newStats = fs.statSync(process.env.longTermIWMChartFileName);
        if (newStats.mtimeMs > longTermIWMChartNotifyTs) {
            needSaveNotifyStatus = true;
            let longTermIWMChart = FileBox.fromFile(process.env.longTermIWMChartFileName);

            log.info("--------------------longTermIWMChart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 IWM 长期交易策略。\n' + disclaimer,
                longTermIWMChart)
            longTermIWMChartNotifyTs = newStats.mtimeMs;
        }

        let NQV4ChartNotifyTs = jsonObj['NQV4ChartNotifyTs'];
        newStats = fs.statSync(process.env.NQV4ChartFileName);
        if (newStats.mtimeMs > NQV4ChartNotifyTs) {
            needSaveNotifyStatus = true;
            let NQV4Chart = FileBox.fromFile(process.env.NQV4ChartFileName);

            log.info("--------------------NQV4Chart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 纳指100 日内交易策略。\n' + disclaimer,
                NQV4Chart)
            NQV4ChartNotifyTs = newStats.mtimeMs;
        }

        let sp500ChartNotifyTs = jsonObj['sp500ChartNotifyTs'];
        newStats = fs.statSync(process.env.sp500ChartFileName);
        if (newStats.mtimeMs > sp500ChartNotifyTs) {
            needSaveNotifyStatus = true;
            let sp500Chart = FileBox.fromFile(process.env.sp500ChartFileName);

            log.info("--------------------sp500Chart has update, send message");
            await sendMsgToAllRooms(bot,
                '下图是 标普500 日内交易策略。\n' + disclaimer,
                sp500Chart)
            sp500ChartNotifyTs = newStats.mtimeMs;
        }

        if (needSaveNotifyStatus) {
            try {
                const jsonObj = {
                    'longTermWheatChartNotifyTs': longTermWheatChartNotifyTs,
                    'longTermTQQQChartNotifyTs': longTermTQQQChartNotifyTs,
                    'qldChartNotifyTs': qldChartNotifyTs,
                    'dayTradeV2ChartNotifyTs': dayTradeV2ChartNotifyTs,
                    'dayTradeV3ChartNotifyTs': dayTradeV3ChartNotifyTs,
                    'dayTradeV4ChartNotifyTs': dayTradeV4ChartNotifyTs,
                    'dayTradeV5ChartNotifyTs': dayTradeV5ChartNotifyTs,
                    'rotationChartNotifyTs': rotationChartNotifyTs,
                    'longTermIWMChartNotifyTs': longTermIWMChartNotifyTs,
                    'NQV4ChartNotifyTs': NQV4ChartNotifyTs,
                    'sp500ChartNotifyTs': sp500ChartNotifyTs
                }
                var jsonStr = JSON.stringify(jsonObj, null, 4);
                fs.writeFileSync(process.env.notifyStatusFileName, jsonStr)
            } catch (error) {
                log.error("save notify status file error", error)
            }
        }
    }
}

function initNotifyStatusFile() {
    try {
        let longTermWheatChartNotifyTs = fs.statSync(process.env.longTermWheatChartFileName).mtimeMs
        let longTermTQQQChartNotifyTs = fs.statSync(process.env.longTermTQQQChartFileName).mtimeMs;
        let qldChartNotifyTs = fs.statSync(process.env.qldChartFileName).mtimeMs;
        let dayTradeV2ChartNotifyTs = fs.statSync(process.env.dayTradeV2ChartFileName).mtimeMs;
        let dayTradeV3ChartNotifyTs = fs.statSync(process.env.dayTradeV3ChartFileName).mtimeMs;
        let dayTradeV4ChartNotifyTs = fs.statSync(process.env.dayTradeV4ChartFileName).mtimeMs;
        let dayTradeV5ChartNotifyTs = fs.statSync(process.env.dayTradeV5ChartFileName).mtimeMs;
        let rotationChartNotifyTs = fs.statSync(process.env.rotationChartFileName).mtimeMs;
        let longTermIWMChartNotifyTs = fs.statSync(process.env.longTermIWMChartFileName).mtimeMs;
        let NQV4ChartNotifyTs = fs.statSync(process.env.NQV4ChartFileName).mtimeMs;
        let sp500ChartNotifyTs = fs.statSync(process.env.sp500ChartFileName).mtimeMs;

        const jsonObj = {
            'longTermWheatChartNotifyTs': longTermWheatChartNotifyTs,
            'longTermTQQQChartNotifyTs': longTermTQQQChartNotifyTs,
            'qldChartNotifyTs': qldChartNotifyTs,
            'dayTradeV2ChartNotifyTs': dayTradeV2ChartNotifyTs,
            'dayTradeV3ChartNotifyTs': dayTradeV3ChartNotifyTs,
            'dayTradeV4ChartNotifyTs': dayTradeV4ChartNotifyTs,
            'dayTradeV5ChartNotifyTs': dayTradeV5ChartNotifyTs,
            'rotationChartNotifyTs': rotationChartNotifyTs,
            'longTermIWMChartNotifyTs': longTermIWMChartNotifyTs,
            'NQV4ChartNotifyTs': NQV4ChartNotifyTs,
            'sp500ChartNotifyTs': sp500ChartNotifyTs
        }
        var jsonStr = JSON.stringify(jsonObj, null, 4);
        fs.writeFileSync(process.env.notifyStatusFileName, jsonStr)
    } catch (error) {
        log.error("save notify status file error", error)
    }
}

async function sendMsgToAllRooms(bot, note, chart) {
    if (bot !== null && bot.isLoggedIn) {
        const roomList = await bot.Room.findAll();
        for (const room of roomList) {
            var name = room.payload.topic;
            if (name.startsWith("SapienAlpha客服群")) {
                await sendMsgToRoomWithRetry(room, note);
                await sendMsgToRoomWithRetry(room, chart);
            }
        }
    }
}

async function sendMsgToRoomWithRetry(room, msg) {
    for (let count = 0; count < 3; count++) {
        try {
            await room.say(msg);
            return;
        } catch (error) {
            log.error("send msg error, count:", count, error.toString())
        }
    }

}