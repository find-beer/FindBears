/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-30 15:45:11
 * @LastEditTime : 2021-02-28 12:49:15
 * @FilePath     : /src/redux/actions/nim.js
 */
const SDK = require("../../../nim/NIM_Web_SDK_rn_v7.2.0.js");
let instance;

onConnect = (options) => {
  instance.applyFriend({
      account: 'mjx',
      ps: 'sdjfsjdfsjdf',
      done: this.applyFriendDone
  })
};

onWillReconnect = (options) => {
};

onDisconnect = (options) => {
};

onError = (options) => {
};

onRoamingMsgs = (options) => {
};

onOfflineMsgs = (options) => {
};

onMsg = (msg) => {
};


const sendMsgDone = (error, msg) => {
  console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);
  pushMsg(msg);
}

const sendMessage = () => {
  var msg = instance.sendText({
    scene: 'p2p',
    to: 'account',
    text: 'hello',
    done: sendMsgDone
  });

}


const initNIM = async (account, token) => {
  instance = SDK.NIM.getInstance({
    debug: true,
    appKey: "67b35e65c41efd1097ef8504d5a88455",
    token,
    account: account,
    db: false, // 不使用数据库
    onconnect: this.onConnect,
    onwillreconnect: this.onWillReconnect,
    ondisconnect: this.onDisconnect,
    onerror: this.onError,
    onroamingmsgs: this.onRoamingMsgs,
    onofflinemsgs: this.onOfflineMsgs,
    onmsg: this.onMsg,
  });
  return {
    type: 'INIT_IM'
  }
}

export {
  initNIM,
  sendMessage
}
