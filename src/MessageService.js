import {log} from "wechaty";
import {FileBox} from "file-box";
import * as path from 'path';
import {disclaimer} from "./Constants.js";
import {helpReply, strategyMap} from "./ConfigFileService.js";

export async function onMessage(msg) {
    try {
        log.info('Receive message: ', msg.toString());

        var command = msg.text().toLowerCase().replace('？', '?').replace(/\s*/g, "");
        if (command === null || command === '' || command === undefined) {
            return;
        }

        if ('?help' === command) {
            msg.say(helpReply);
        } else if (strategyMap.has(command)) {
            var strategyInfo = strategyMap.get(command);
            let chart = FileBox.fromFile(path.join(process.env.basePath, strategyInfo.chartFile));
            await msg.say('最新的' + strategyInfo.explanation + '\n' +
                disclaimer)
            await msg.say(chart)
        }
    } catch (e) {
        log.error("onMessage error, msg:" + msg.toString() + "error:" + e.toString());
    }
}