import {log, Message} from "wechaty";

export default async function onMessage (msg: Message) {
  log.verbose('Receive message: ', msg.toString());

  var command = msg.text().toLowerCase().replace(/\s*/g,"");
  if (command === '?help'
      || command === '？help') {
    await msg.say(
        '您可以发送以下命令获取最新的预测图：\n' +
        '?Longtermwheat: 获取最新的长期小麦预测图.\n' +
        '?Longtermtqqq: 获取最新的长期TQQQ预测图.\n' +
        '?QLD: 获取最新的短期2倍做多纳指100ETF(QLD)预测图.\n' +
        '?Daytradev2: 获取最新的日内交易纳指100预测图(V2).\n' +
        '?Daytradev3: 获取最新的日内交易纳指100预测图(V3).\n' +
        '?Daytradev4: 获取最新的日内交易纳指100预测图(V4).\n' +
        '?Daytradev5: 获取最新的日内交易纳指100预测图(V5).\n' +
        '?Rotation: 获取最新的QQQ与IWM间风格轮动策略预测图.\n' +
        '?Longtermiwm: 获取最新的长期IWM预测图.\n' +
        '?NQV4: 获取最新的日内交易纳指100预测图.\n' +
        '?SP500: 获取最新的日内交易标普500预测图.'
    );
    return;
  }


}