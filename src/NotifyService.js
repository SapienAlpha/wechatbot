import {FileBox} from 'file-box';
import * as fs from 'fs';
import {log} from 'wechaty'
import path from "path";
import os from 'os';
import {disclaimer} from "./Constants.js";
import {bot} from './Main.js';
import {loadConfigFileAndRefresh, strategyMap} from "./ConfigFileService.js";

let sendSignalRoomList = ['纳指波段冲麦浪🥖🏄‍♀️', 'SapienAlpha技术部', 'SapienAlpha客服群'];
let heartbeatRoomList = ['SapienAlpha客服群'];

let i = 0;

export async function checkAndNotify() {
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

        loadConfigFileAndRefresh();

        if (!fs.existsSync(process.env.notifyStatusFileName)) {
            fs.writeFileSync(process.env.notifyStatusFileName, '');
        }

        let notifyStatusMap = loadNotifyStatusFile();

        for (let strategyInfo of strategyMap.values()) {
            if (!strategyInfo.enableNotify) {
                continue;
            }
            if (strategyInfo.statusFile === 'null' || strategyInfo.statusFile === null || strategyInfo.statusFile === '') {
                log.error(`Status file config error, command:${strategyInfo.command}, statusFile:${strategyInfo.statusFile}`);
                continue;
            }

            let currentStatus = fs.readFileSync(path.join(process.env.basePath, strategyInfo.statusFile), "utf-8").trim();
            if (!notifyStatusMap.has(strategyInfo.command)) {
                //new command, first time not notify
                notifyStatusMap.set(strategyInfo.command, currentStatus);
                continue;
            }

            if (notifyStatusMap.get(strategyInfo.command) !== currentStatus) {
                //status has changed, notify users
                notifyStatusMap.set(strategyInfo.command, currentStatus);
                let chart = FileBox.fromFile(path.join(process.env.basePath, strategyInfo.chartFile));
                await sendMsgToAllRooms(bot,
                    '最新的' + strategyInfo.explanation + '\n' + disclaimer,
                    chart)
                continue;
            }
        }
        saveNotifyStatusFile(notifyStatusMap);
    } catch (error) {
        log.error("refresh files error")
        log.error(error)
    }
}

export async function sendHeartbeat() {
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
}

function loadNotifyStatusFile() {
    let notifyStatusMap = new Map();
    try {
        var statusStr = fs.readFileSync(process.env.notifyStatusFileName, "utf-8");
        var lines = statusStr.split(os.EOL);
        for (let iLine = 0; iLine < lines.length; iLine++) {
            if (iLine === 0) {
                continue;
            }
            let trimLine = lines[iLine].replace(/\s*/g, "");
            if (trimLine === '' || trimLine === null || trimLine === undefined) {
                continue;
            }

            var lineArr = trimLine.split(',');
            notifyStatusMap.set(lineArr[0], lineArr[1]);
        }
    } catch (e) {
        log.error(`Load notify status file error, error:${e}`)
    }
    return notifyStatusMap;
}

function saveNotifyStatusFile(notifyStatusMap) {
    let content = 'command,lastSentStatus' + os.EOL;
    for (let entry of notifyStatusMap.entries()) {
        content = content + entry[0] + ',' + entry[1] + os.EOL;
    }

    fs.writeFileSync(process.env.notifyStatusFileName, content)
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