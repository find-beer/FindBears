/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-30 15:45:11
 * @LastEditTime : 2021-01-30 16:47:33
 * @FilePath     : /src/redux/actions/nim.js
 */
const SDK = require("../../../nim/NIM_Web_SDK_rn_v7.2.0.js");
let instance;

onConnect = (options) => {
  console.log('instance -----> ', instance)
  instance.applyFriend({
      account: 'mjx',
      ps: 'sdjfsjdfsjdf',
      done: this.applyFriendDone
  })
};

onWillReconnect = (options) => {
  console.log("onWillReconnect", options);
};

onDisconnect = (options) => {
  console.log("onDisconnect", options);
};

onError = (options) => {
  console.log("onError", options);
};

onRoamingMsgs = (options) => {
  console.log("onRoamingMsgs", options);
};

onOfflineMsgs = (options) => {
  console.log("onOfflineMsgs", options);
};

onMsg = (msg) => {
  console.log("收到消息", msg.scene, msg.type, msg);
};


const sendMsgDone = (error, msg) => {
  console.log(error);
  console.log(msg);
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
