import express from "express";
import bodyParser from "body-parser";
import {onMessage} from "./MessageService.js";
import {loadConfigFileAndRefresh} from "./ConfigFileService.js";
import {checkAndNotify, sendHeartbeat} from "./NotifyService.js";

export let fromPort = 8055;

var app = express();

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/wechat', function (req, res) {
    // console.log(req.body);
    if (req.body === null || req.body.data === null
        || req.body.port === null ||
        req.body.data.fromWxid === null || req.body.data.msg === null) {
        return;
    }
    fromPort = req.body.port;
    let fromWxid = req.body.data.fromWxid;
    let msg = req.body.data.msg;
    onMessage(msg, fromWxid, fromPort)
});

//init
loadConfigFileAndRefresh();

//配置服务端口
var server = app.listen(8089, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})

setInterval(function () {
    checkAndNotify();
}, 5 * 60 * 1000)

setInterval(function () {
    sendHeartbeat();
}, 2 * 60 * 60 * 1000)