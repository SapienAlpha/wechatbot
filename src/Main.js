#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 */
// https://stackoverflow.com/a/42817956/1123955
// https://github.com/motdotla/dotenv/issues/89#issuecomment-587753552

import {ScanStatus, WechatyBuilder, log} from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'
import {onMessage} from "./MessageService.js";
import {refreshFiles} from "./ChartFileService.js";

import * as dotenv from 'dotenv'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})

function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(qrcode),
        ].join('')
        log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

        qrcodeTerminal.generate(qrcode, {small: true})  // show qrcode on console

    } else {
        log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
    }
}

function onLogin(user) {
    log.info('StarterBot', '%s login', user)
}

function onLogout(user) {
    log.info('StarterBot', '%s logout', user)
}

function onError(error) {
    log.error("Bot error:" + error)
}


export const bot = WechatyBuilder.build({
    name: 'SapienAlphaBot',
    /**
     * How to set Wechaty Puppet Provider:
     *
     *  1. Specify a `puppet` option when instantiating Wechaty. (like `{ puppet: 'wechaty-puppet-whatsapp' }`, see below)
     *  1. Set the `WECHATY_PUPPET` environment variable to the puppet NPM module name. (like `wechaty-puppet-whatsapp`)
     *
     * You can use the following providers locally:
     *  - wechaty-puppet-wechat (web protocol, no token required)
     *  - wechaty-puppet-whatsapp (web protocol, no token required)
     *  - wechaty-puppet-padlocal (pad protocol, token required)
     *  - etc. see: <https://wechaty.js.org/docs/puppet-providers/>
     */
    // puppet: 'wechaty-puppet-whatsapp'

    /**
     * You can use wechaty puppet provider 'wechaty-puppet-service'
     *   which can connect to remote Wechaty Puppet Services
     *   for using more powerful protocol.
     * Learn more about services (and TOKEN) from https://wechaty.js.org/docs/puppet-services/
     */
    // puppet: 'wechaty-puppet-service'
    // puppetOptions: {
    //   token: 'xxx',
    // }
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)
bot.on('error', onError)

bot.start()
    .then(() => log.info('SapienAlphaBot', 'SapienAlpha Bot Started.'))
    .catch(e => log.error('SapienAlphaBot', e))

//检查文件更新情况
setInterval(function () {
    refreshFiles();
}, 5 * 60 * 1000)