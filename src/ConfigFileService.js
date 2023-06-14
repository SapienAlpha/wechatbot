import fs from "fs";
import os from "os";
import {log} from "wechaty";

let defaultConfigStr = 'command,explanation,chartFile,statusFile,enableNotify\n' +
    '?Longtermwheat,小麦长期交易策略,longtermwheat.png,null,false\n' +
    '?Longtermtqqq,TQQQ长期交易策略,longtermtqqq.png,null,false\n' +
    '?Longtermspy,标普长期交易策略,longtermspy.png,SPY_status.txt,true\n' +
    '?QLD,2倍做多纳指100ETF(QLD) 短期交易策略,qld.png,null,false\n' +
    '?Daytradev2,纳指100日内交易策略(V2),daytradev2.png,null,false\n' +
    '?Daytradev3,纳指100日内交易策略(V3),daytradev3.png,null,false\n' +
    '?Daytradev4,纳指100日内交易策略(V4),daytradev4.png,null,false\n' +
    '?Daytradev5,纳指100日内交易策略(V5),daytradev5.png,NQ_daytradev5_status.txt,true\n' +
    '?Daytradev6,纳指100日内交易策略(V6),daytradev6.png,NQ_daytradev6_status.txt,true\n' +
    '?Rotation,QQQ与IWM间风格轮动策略,rotation.png,null,false\n' +
    '?Longtermiwm,IWM长期交易策略,longtermiwm.png,null,false\n' +
    '?NQV4,纳指100日内交易策略,nqv4.png,null,false\n' +
    '?SP500:标普500日内交易策略,sp500.png,QLD_SP500V2_status.txt,true\n' +
    '?shorttermnq, 纳指短期交易策略,shorttermnq.png,NQ-composite_status.txt,true'

export let helpReply = '';
export let strategyMap = new Map();

export function loadConfigFileAndRefresh() {
    let tmpHelpReply = '您可以发送以下命令获取最新预测：\r';

    let configStr = '';
    try {
        configStr = fs.readFileSync(process.env.strategyConfigFileName, "utf-8");
    } catch (e) {
        log.error(`Load config file error. error:${e.toString()}`);
        configStr = defaultConfigStr;
    }

    let tmpStrategyMap = new Map();
    let lines = configStr.split(os.EOL);
    for (let iLine = 0; iLine < lines.length; iLine++) {
        if (iLine === 0) {
            continue;
        }
        let trimLine = lines[iLine].replace(/\s*/g, "");
        if (trimLine === '' || trimLine === null || trimLine === undefined) {
            continue;
        }

        let splitArr = trimLine.split(',');
        if (splitArr.length < 5) {
            continue;
        }
        let strategyInfo = new StrategyInfo(
            splitArr[0].toLowerCase().replace('？', '?'),
            splitArr[1].replace(/\s*/g, ""),
            splitArr[2].replace(/\s*/g, ""),
            splitArr[3].replace(/\s*/g, ""),
            Boolean(splitArr[4].replace(/\s*/g, ""))
        );
        tmpStrategyMap.set(strategyInfo.command, strategyInfo);
        tmpHelpReply = tmpHelpReply + strategyInfo.command + ': 获取最新的' + strategyInfo.explanation + '\r';
    }
    helpReply = tmpHelpReply;
    strategyMap = tmpStrategyMap;
}

class StrategyInfo {
    enableNotify = false;

    constructor(command, explanation, chartFile, statusFile, enableNotify) {
        this.command = command;
        this.explanation = explanation;
        this.chartFile = chartFile;
        this.statusFile = statusFile;
        this.enableNotify = enableNotify;
    }
}