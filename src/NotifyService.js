import {FileBox} from 'file-box';
import * as fs from 'fs';
import {log} from 'wechaty'
import path from "path";
import os from 'os';
import {disclaimer} from "./Constants.js";
import {loadConfigFileAndRefresh, strategyMap} from "./ConfigFileService.js";
import {sendChart, sendText} from "./MessageService.js";

let sendSignalRoomList = ['18135061901@chatroom'];
let heartbeatRoomList = ['18135061901@chatroom'];

let i = 0;

export async function checkAndNotify() {
    try {
        if (!fs.existsSync(process.env.sendSignalRoomListFileName)) {
            fs.writeFileSync(process.env.sendSignalRoomListFileName, "")
        }
        if (!fs.existsSync(process.env.heartbeatRoomListFileName)) {
            fs.writeFileSync(process.env.heartbeatRoomListFileName, "")
        }

        var sendSignalRoomListStr = fs.readFileSync(process.env.sendSignalRoomListFileName).toString();
        log.info('Send signal room list:' + sendSignalRoomListStr)
        sendSignalRoomList = sendSignalRoomListStr.split(",");

        var heartbeatRoomListStr = fs.readFileSync(process.env.heartbeatRoomListFileName).toString();
        log.info('Heartbeat room list:' + heartbeatRoomListStr)
        heartbeatRoomList = heartbeatRoomListStr.split(",");

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
                let chartPath = process.env.basePath + strategyInfo.chartFile;
                await sendMsgToAllRooms('最新的' + strategyInfo.explanation + '\r' + disclaimer,
                    chartPath)
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
    //send heartbeat
    for (const wxid of heartbeatRoomList) {
        if (wxid === null || wxid === '') {
            continue;
        }
        try {
            sendText("heartbeat" + i,wxid,fromPort);
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

async function sendMsgToAllRooms(note, chartPath) {
    for (const wxid of sendSignalRoomList) {
        if (wxid === null || wxid === '') {
            continue;
        }
        try {
            sendText(note, wxid, fromPort);
            sendChart(chartPath,wxid,fromPort);
        } catch (error) {
            log.error("send msg to room error, room:" + roomName);
            log.error(error)
        }
    }
}


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))