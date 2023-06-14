import {disclaimer} from "./Constants.js";
import {helpReply, strategyMap} from "./ConfigFileService.js";
import axios from "axios";

export async function onMessage(msg, fromWxid, fromPort) {
    try {
        let command = msg.toLowerCase().replace('？', '?').replace(/\s*/g, "");
        if (command === null || command === '' || command === undefined) {
            return;
        }

        if ('?help' === command) {
            sendText(helpReply, fromWxid, fromPort);
        } else if (strategyMap.has(command)) {
            var strategyInfo = strategyMap.get(command);
            let path=process.env.basePath+ strategyInfo.chartFile;
            await sendText('最新的' + strategyInfo.explanation + '\r' + disclaimer,
                fromWxid,
                fromPort);
            await sendChart(path,fromWxid,fromPort);
        }
    } catch (e) {
        console.log("onMessage error, msg:" + msg.toString() + "error:" + e.toString());
    }
}

export function sendText(text, fromWxid, fromPort) {
    const data = {
        type: 'Q0001',
        data: {
            wxid: fromWxid,
            msg: text
        }
    }
    let url = 'http://localhost:' + fromPort + '/DaenWxHook/client/';
    axios.post(url, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error)
        })
}

export function sendChart(path, fromWxid, fromPort) {
    const data = {
        type: 'Q0010',
        data: {
            wxid: fromWxid,
            path: path
        }
    }
    let url = 'http://localhost:' + fromPort + '/DaenWxHook/client/';
    axios.post(url, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error)
        })
}