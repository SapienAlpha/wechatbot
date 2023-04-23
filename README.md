# SapienAlpha Wechat Bot

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
3. 执行编译
注意，需要修改读取文件的路径
```text
npm run build
```
编译生成的文件在dist目录内。
4. 运行
执行dist内生成的main.js；win上部署命令应该还需要优化
```shell
node ./dist/src/main.js
```

运行成功后，你可以看到下面的界面：
![img.png](source/onScan.png)
打开日志中的链接（日志中的二维码扫描识别速度较慢），扫码登录。
