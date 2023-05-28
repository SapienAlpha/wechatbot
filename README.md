# SapienAlpha Wechat Bot

### prod路径：C:\wechatbot\wechatbot

### 微信群列表配置文件：C:\wechatbot\roomList.txt，以英文逗号分割

## 一、编译&运行

0. 安装 Node.jS (>=10)
1. clone 代码

```text
git clone git@github.com:SapienAlpha/wechatbot.git
cd wechatbot
```

2. 安装依赖

```text
npm install
```

3. 运行

```text
./run.sh
```

4. 停止
    1. windows server上停止任务
    ```text
    cmd中执行命令查找进程id
   tasklist /v | findstr "npm run start:prod"
   杀死进程
   taskkill /pid {pid}
    ```
    2. linux server上停止任务
    ```text
    ps -ef|grep node
    找到Main.js的进程
    kill -9 进程号
    ```

运行成功后，你可以看到下面的界面：
![img.png](source/onScan.png)
打开日志中的链接（日志中的二维码扫描识别速度较慢），扫码登录。

## 二、开发、部署中遇到的一些问题

1. 机器人几个小时后掉线问题

通过定时发送消息，实现心跳功能，防止掉线；

2. 机器人部署几个小时后，发送心跳没问题，但是调msg.say()报错问题

通过wechaty对象发送消息；

3. bot 搜索不到群；

群名不要包含空格、图标之类的

sendSignalRoomList:
纳指波段冲麦浪🥖🏄‍♀️,SapienAlpha技术部