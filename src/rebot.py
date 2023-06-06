from flask import Flask, request
import json
import requests
import urllib
# https://www.apifox.cn/apidoc/project-1222856/api-29054153
app = Flask(__name__)


def talk_with_robot(msg, robot_name=None):
    url = 'http://api.qingyunke.com/api.php?key=free&appid=0&msg={}'.format(urllib.parse.quote(msg))
    html = requests.get(url)
    rt = html.json()["content"]
    rt = rt.replace("{br}","\n")
    if robot_name is not None:
        rt = rt.replace("菲菲", robot_name)
    return rt

def send_msg(wxid, is_img, msg):
    if is_img:
        payload = {"type": "Q0010", "data": {"wxid": wxid, "path": msg}}
    else:
        payload = {"type": "Q0001", "data": {"wxid": wxid, "msg": msg}}

    headers = {
        'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
        'Content-Type': 'application/json'
    }
    # 请求url
    url = 'http://127.0.0.1:8055/DaenWxHook/client/'
    # 请求参数

    # 调用post
    response = requests.post(url, json=payload,
                             headers=headers)  # response 响应对象
    # 获取响应状态码
    print('状态码：', response.status_code)
    # 获取响应头
    print('响应头信息：', response.headers)
    # 获取响应正文
    print('响应正文：', response.text)


def send_txt_msg(wxid, txt):
    send_msg(wxid, False, txt)


def send_img_msg(wxid, img_path):
    send_msg(wxid, True, img_path)


def on_rcv_chatroom_msg(from_wxid, msg):
    print("收到群消息")

def on_rcv_p2p_txt(from_wxid, msg_txt):
    res = talk_with_robot(msg_txt,"Python学习实战")
    # print("收到文本消息", from_wxid, msg_txt)
    send_txt_msg(from_wxid, res)
    # send_img_msg(from_wxid, 'C:\\Users\\Administrator\\Desktop\\6.gif')


@app.route('/wechat/', methods=['get', 'post'])
def wechat():
    data = request.stream.read()
    data = data.decode('utf-8')
    data = json.loads(data)
    type = data['type']
    if type == 'D0003':
        data = data['data']
        msg = data['msg']
        from_wxid = data['fromWxid']
        if "@chatroom" in from_wxid:
            on_rcv_chatroom_msg(from_wxid, msg)
        else:
            on_rcv_p2p_txt(from_wxid, msg)
    return ''


if __name__ == '__main__':
    app.run(debug=True, port=8089)