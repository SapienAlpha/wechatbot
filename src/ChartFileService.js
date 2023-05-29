import {FileBox} from 'file-box';
import * as fs from 'fs';
import {log} from 'wechaty'
import path from "path";
import os from 'os';
import {disclaimer} from "./Constants.js";
import {bot} from './Main.js';

let sendSignalRoomList = ['纳指波段冲麦浪🥖🏄‍♀️', 'SapienAlpha技术部', 'SapienAlpha客服群'];
let heartbeatRoomList = ['SapienAlpha客服群'];

let i = 0;

export async function refreshFiles() {
    try {
        // if (!fs.existsSync(process.env.sendSignalRoomListFileName)) {
        //     fs.writeFileSync(process.env.sendSignalRoomListFileName, "")
        // }
        // if (!fs.existsSync(process.env.heartbeatRoomListFileName)) {
        //     fs.writeFileSync(process.env.heartbeatRoomListFileName, "")
        // }
        //
        // var sendSignalRoomListStr = fs.readFileSync(process.env.sendSignalRoomListFileName).toString();
        // log.info('Send signal room list:' + sendSignalRoomListStr)
        // sendSignalRoomList = sendSignalRoomListStr.split(",");
        //
        // var heartbeatRoomListStr = fs.readFileSync(process.env.heartbeatRoomListFileName).toString();
        // log.info('Heartbeat room list:' + heartbeatRoomListStr)
        // heartbeatRoomList = heartbeatRoomListStr.split(",");

        if (!fs.existsSync(process.env.notifyStatusFileName)) {
            //第一次部署，无需通知
            initNotifyStatusFile();
            return;
        }

        if (bot === null || !bot.isLoggedIn) {
            //bot为空，或未登录，无法发送通知
            log.error("bot is null or not loggedIn.")
            return;
        }

        //send heartbeat
        for (const roomName of heartbeatRoomList) {
            if (roomName === null || roomName === '') {
                continue;
            }
            try {
                var room = await bot.Room.find({topic: roomName});
                if (room === null) {
                    log.error("find heartbeat room fail, roomName:" + roomName);
                } else {
                    await sendMsgToRoomWithRetry(room, 'SapienAlpha客服群', "heartbeat" + i);
                }
            } catch (error) {
                log.error("find heartbeat room error, roomName:" + roomName);
                log.error(error)
            }
        }
        i = i + 1;

        var allStatus = fs.readFileSync(process.env.notifyStatusFileName, "utf-8");
        var lines = allStatus.split(os.EOL);
        let longtermspy_sentStatus = lines[1].split(",")[2]
        let NQV4_sentStatus = lines[2].split(",")[2]
        let sp500_sentStatus = lines[3].split(",")[2]
        let shorttermnq_sentStatus = lines[4].split(",")[2]
        let daytradev5_sentStatus = lines[5].split(",")[2]

        let longtermspy_currentStatus = fs.readFileSync(path.join(process.env.basePath, "SPY_status.txt"), "utf-8").trim();
        let NQV4_currentStatus = fs.readFileSync(path.join(process.env.basePath, "NQ-QLDV4_status.txt"), "utf-8").trim();
        let sp500_currentStatus = fs.readFileSync(path.join(process.env.basePath, "QLD_SP500V2_status.txt"), "utf-8").trim();
        let shorttermnq_currentStatus = fs.readFileSync(path.join(process.env.basePath, "NQ-composite_status.txt"), "utf-8").trim();
        let daytradev5_currentStatus = fs.readFileSync(path.join(process.env.basePath, "NQ_daytradev5_status.txt"), "utf-8").trim();

        if (longtermspy_sentStatus !== longtermspy_currentStatus) {
            let longtermspyChart = FileBox.fromFile(path.join(process.env.basePath, "longtermspy.png"));
            await sendMsgToAllRooms(bot,
                '下图是 标普500 长期交易策略。\n' + disclaimer,
                longtermspyChart)
        }

        if (NQV4_sentStatus !== NQV4_currentStatus) {
            let nqv4Chart = FileBox.fromFile(path.join(process.env.basePath, "nqv4.png"));
            await sendMsgToAllRooms(bot,
                '下图是 纳指100 日内交易策略。\n' + disclaimer,
                nqv4Chart)
        }

        if (sp500_sentStatus !== sp500_currentStatus) {
            let sp500Chart = FileBox.fromFile(path.join(process.env.basePath, "sp500.png"));
            await sendMsgToAllRooms(bot,
                '下图是 标普500 日内交易策略。\n' + disclaimer,
                sp500Chart)
        }

        if (shorttermnq_sentStatus !== shorttermnq_currentStatus) {
            let shorttermnqChart = FileBox.fromFile(path.join(process.env.basePath, "shorttermnq.png"));
            await sendMsgToAllRooms(bot,
                '下图是 纳指 短期交易策略。\n' + disclaimer,
                shorttermnqChart)
        }

        if (daytradev5_sentStatus !== daytradev5_currentStatus) {
            let daytradev5Chart = FileBox.fromFile(path.join(process.env.basePath, "daytradev5.png"));
            await sendMsgToAllRooms(bot,
                '下图是 纳指100 日内交易策略(V5)。\n' + disclaimer,
                daytradev5Chart)
        }

        var content = "signal_id,filename,sent" + os.EOL
            + "longtermspy,SPY_status.txt," + longtermspy_currentStatus + os.EOL
            + "NQV4,QLDV4_status.txt," + NQV4_currentStatus + os.EOL
            + "sp500,QLD_SP500V2_status.txt," + sp500_currentStatus + os.EOL
            + "shorttermnq,NQ-composite_status.txt," + shorttermnq_currentStatus + os.EOL
            + "daytradev5,NQ_daytradev5_status.txt," + daytradev5_currentStatus;

        fs.writeFileSync(process.env.notifyStatusFileName, content)

    } catch (error) {
        log.error("refresh files error")
        log.error(error)
    }
}

function initNotifyStatusFile() {
    try {
        let longtermspy_currentStatus = fs.readFileSync(path.join(process.env.basePath, "SPY_status.txt"), "utf-8").trim();
        let NQV4_currentStatus = fs.readFileSync(path.join(process.env.basePath, "NQ-QLDV4_status.txt"), "utf-8").trim();
        let sp500_currentStatus = fs.readFileSync(path.join(process.env.basePath, "QLD_SP500V2_status.txt"), "utf-8").trim();
        let shorttermnq_currentStatus = fs.readFileSync(path.join(process.env.basePath, "NQ-composite_status.txt"), "utf-8").trim();
        let daytradev5_currentStatus = fs.readFileSync(path.join(process.env.basePath, "NQ_daytradev5_status.txt"), "utf-8").trim();

        var content = "signal_id,filename,sent" + os.EOL
            + "longtermspy,SPY_status.txt," + longtermspy_currentStatus + os.EOL
            + "NQV4,QLDV4_status.txt," + NQV4_currentStatus + os.EOL
            + "sp500,QLD_SP500V2_status.txt," + sp500_currentStatus + os.EOL
            + "shorttermnq,NQ-composite_status.txt," + shorttermnq_currentStatus + os.EOL
            + "daytradev5,NQ_daytradev5_status.txt," + daytradev5_currentStatus;

        fs.writeFileSync(process.env.notifyStatusFileName, content)
    } catch (error) {
        log.error("save notify status file error", error)
    }
}

async function sendMsgToAllRooms(bot, note, chart) {
    for (const roomName of sendSignalRoomList) {
        if (roomName === null || roomName === '') {
            continue;
        }
        try {
            var room = await bot.Room.find({topic: roomName});
            await sendMsgToRoomWithRetry(room, roomName, note);
            await sendMsgToRoomWithRetry(room, roomName, chart);
        } catch (error) {
            log.error("send msg to room error, room:" + roomName);
            log.error(error)
        }
    }
}

async function sendMsgToRoomWithRetry(room, roomTopic, msg) {
    if (room === null) {
        log.error("Room is null, room:" + roomTopic);
    }

    for (let count = 0; count < 3; count++) {
        try {
            await sleep(1000);
            await room.say(msg);
            return;
        } catch (error) {
            log.error("send msg error, count:" + count)
            log.error(error)
        }
    }

}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))