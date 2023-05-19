import {FileBox} from 'file-box';
import * as fs from 'fs';
import {
    dayTradeV2ChartFileName, dayTradeV3ChartFileName,
    dayTradeV4ChartFileName, dayTradeV5ChartFileName, longTermIWMChartFileName,
    longTermTQQQChartFileName,
    longTermWheatChartFileName, NQV4ChartFileName,
    qldChartFileName, rotationChartFileName, sp500ChartFileName
} from "./Constants";
import {log} from 'wechaty'
import {WechatyInterface} from "wechaty/dist/esm/src/wechaty/wechaty-impl";
import {
    daytradev2ToAllRooms, daytradev3ToAllRooms,
    daytradev4ToAllRooms, daytradev5ToAllRooms, longtermiwmToAllRooms,
    longtermtqqqToAllRooms,
    longtermwheatToAllRooms, nqv4ToAllRooms,
    qldToAllRooms, rotationToAllRooms, sp500ToAllRooms
} from "./MessageService";

//是否成功启动
let isInit = false;

//小麦 长期交易策略
export let longTermWheatChart = null;
let longTermWheatChartUpdateTs = 0;

//TQQQ 长期交易策略
export let longTermTQQQChart = null;
let longTermTQQQChartUpdateTs = 0;

// 2倍做多纳指100ETF(QLD) 短期交易策略
export let qldChart = null;
let qldChartUpdateTs = 0;

//纳指100 日内交易策略(V2)
export let dayTradeV2Chart = null;
let dayTradeV2ChartUpdateTs = 0;

//纳指100 日内交易策略(V3)
export let dayTradeV3Chart = null;
let dayTradeV3ChartUpdateTs = 0;

//纳指100 日内交易策略(V4)
export let dayTradeV4Chart = null;
let dayTradeV4ChartUpdateTs = 0;

//纳指100 日内交易策略(V5)
export let dayTradeV5Chart = null;
let dayTradeV5ChartUpdateTs = 0;

//QQQ 与 IWM 间风格轮动策略
export let rotationChart = null;
let rotationChartUpdateTs = 0;

//IWM 长期交易策略
export let longTermIWMChart = null;
let longTermIWMChartUpdateTs = 0;

//纳指100 日内交易策略
export let NQV4Chart = null;
let NQV4ChartUpdateTs = 0;

//标普500 日内交易策略
export let sp500Chart = null;
let sp500ChartUpdateTs = 0;

export function initRefreshFiles() {
    log.info("Init refresh files start");
    refreshFiles(null);
    isInit = true;
    log.info("Init refresh files end.");
}

export async function refreshFiles(bot: WechatyInterface) {
    //小麦 长期交易策略
    var newStats = null;

    newStats = fs.statSync(longTermWheatChartFileName);
    if (newStats.mtimeMs > longTermWheatChartUpdateTs) {
        longTermWheatChart = FileBox.fromFile(longTermWheatChartFileName);
        longTermWheatChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("longTermWheatChart has update, send message");
            await longtermwheatToAllRooms(bot);
        }
    }

    //TQQQ 长期交易策略
    newStats = fs.statSync(longTermTQQQChartFileName);
    if (newStats.mtimeMs > longTermTQQQChartUpdateTs) {
        longTermTQQQChart = FileBox.fromFile(longTermTQQQChartFileName);
        longTermTQQQChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("longTermTQQQChart has update, send message");
            await longtermtqqqToAllRooms(bot);
        }
    }

    // 2倍做多纳指100ETF(QLD) 短期交易策略
    newStats = fs.statSync(qldChartFileName);
    if (newStats.mtimeMs > qldChartUpdateTs) {
        qldChart = FileBox.fromFile(qldChartFileName);
        qldChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("qldChart has update, send message");
            await qldToAllRooms(bot);
        }
    }

    //纳指100 日内交易策略(V2)
    newStats = fs.statSync(dayTradeV2ChartFileName);
    if (newStats.mtimeMs > dayTradeV2ChartUpdateTs) {
        dayTradeV2Chart = FileBox.fromFile(dayTradeV2ChartFileName);
        dayTradeV2ChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("dayTradeV2Chart has update, send message");
            await daytradev2ToAllRooms(bot);
        }
    }

    //纳指100 日内交易策略(V3)
    newStats = fs.statSync(dayTradeV3ChartFileName);
    if (newStats.mtimeMs > dayTradeV3ChartUpdateTs) {
        dayTradeV3Chart = FileBox.fromFile(dayTradeV3ChartFileName);
        dayTradeV3ChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("dayTradeV3Chart has update, send message");
            await daytradev3ToAllRooms(bot);
        }
    }

    //纳指100 日内交易策略(V4)
    newStats = fs.statSync(dayTradeV4ChartFileName);
    if (newStats.mtimeMs > dayTradeV4ChartUpdateTs) {
        dayTradeV4Chart = FileBox.fromFile(dayTradeV4ChartFileName);
        dayTradeV4ChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("dayTradeV4Chart has update, send message");
            await daytradev4ToAllRooms(bot);
        }
    }

    //纳指100 日内交易策略(V5)
    newStats = fs.statSync(dayTradeV5ChartFileName);
    if (newStats.mtimeMs > dayTradeV5ChartUpdateTs) {
        dayTradeV5Chart = FileBox.fromFile(dayTradeV5ChartFileName);
        dayTradeV5ChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("dayTradeV5Chart has update, send message");
            await daytradev5ToAllRooms(bot);
        }
    }

    //QQQ 与 IWM 间风格轮动策略
    newStats = fs.statSync(rotationChartFileName);
    if (newStats.mtimeMs > rotationChartUpdateTs) {
        rotationChart = FileBox.fromFile(rotationChartFileName);
        rotationChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("rotationChart has update, send message");
            rotationToAllRooms(bot);
        }
    }

    //IWM 长期交易策略
    newStats = fs.statSync(longTermIWMChartFileName);
    if (newStats.mtimeMs > longTermIWMChartUpdateTs) {
        longTermIWMChart = FileBox.fromFile(longTermIWMChartFileName);
        longTermIWMChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("longTermIWMChart has update, send message");
            longtermiwmToAllRooms(bot);
        }
    }

    //纳指100 日内交易策略
    newStats = fs.statSync(NQV4ChartFileName);
    if (newStats.mtimeMs > NQV4ChartUpdateTs) {
        NQV4Chart = FileBox.fromFile(NQV4ChartFileName);
        NQV4ChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("NQV4Chart has update, send message");
            nqv4ToAllRooms(bot);
        }
    }

    //标普500 日内交易策略
    newStats = fs.statSync(sp500ChartFileName);
    if (newStats.mtimeMs > sp500ChartUpdateTs) {
        sp500Chart = FileBox.fromFile(sp500ChartFileName);
        sp500ChartUpdateTs = newStats.mtimeMs;
        if (isInit) {
            log.info("sp500Chart has update, send message");
            sp500ToAllRooms(bot);
        }
    }
}