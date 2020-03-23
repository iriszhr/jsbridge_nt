import {
  APP_OUT_ERROR,
  BRIDGE_NULL_ERROR,
  CALL_APP_ERROR,
  CALLBACK_ERROR,
  TIMEOUT_ERROR
} from './error';
import { push_log } from "libs/pushLog";
console.log('APP_OUT_ERROR', APP_OUT_ERROR);

class _JsBridge {
  constructor(nameSpace = 'NTBridge') {
    let _isIosApp = !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[nameSpace] && window.webkit.messageHandlers[nameSpace].postMessage);
    let _isAndroidApp = !!(window[nameSpace] && typeof window.NTBridge.isNTApp);
    this.nameSpace = nameSpace;
    this.isIosApp = _isIosApp;
    this.isAndroidApp = _isAndroidApp;
    this.isApp = (_isIosApp || _isAndroidApp);
    this.bridge = this.bridge.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getAppData = this.getAppData.bind(this);
    this.gotoNative = this.gotoNative.bind(this);
    this.openWebview = this.openWebview.bind(this);
    this.setPage = this.setPage.bind(this);
    this.login = this.login.bind(this);
    this.activeWebview = this.activeWebview.bind(this);
    this.callPasswordBox = this.callPasswordBox.bind(this);
    this.closeWebview = this.closeWebview.bind(this);
    this.appBack = this.appBack.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }
  bridge(bridgeName, data = {}) {
    return new Promise((resolve, reject) => {
      const callbackKey = `js_callbackKey${+new Date()}_${parseInt((Math.random() * 100000000) + "")}`;
      window[callbackKey] = function (res, err) {
        push_log({ type: 'JsBridgeCallback', callbackKey, res: JSON.stringify(res) });
        if (typeof data.callback === "function") {
          data.callback({ success: !err, data: res, error: err, callbackKey });
        } else {
          resolve({ success: !err, data: res, error: err, callbackKey });
        }
      };
      push_log({ type: 'CallJsBridge', bridgeFunName: bridgeName, nameSpace: this.nameSpace, callbackKey });
      console.log('bridgeFunName', bridgeName, this.nameSpace);
      // console.log(this.isIosApp && typeof window.webkit.messageHandlers[this.nameSpace].postMessage === "function");
      if (!this.isApp) {
        // 调试用：
        // bridgeName === 'setPage' && data.menus && setTimeout(() => {
        //   window[callbackKey]({
        //     item: data.menus[0],
        //     index: 1
        //   }, null);
        // }, 2000);
        window[callbackKey](null, APP_OUT_ERROR);
        return;
      }
      data.callbackKey = callbackKey;
      let _params = JSON.parse(JSON.stringify(data));
      // callback为function时传给ios,ios解析参数有问题。过滤掉～
      _params.callback = '';
      if (this.isAndroidApp && typeof window[this.nameSpace][bridgeName] === "function") {
        window[this.nameSpace][bridgeName](JSON.stringify(_params));
      } else if (this.isIosApp && typeof window.webkit.messageHandlers[this.nameSpace].postMessage === "function") {
        _params = Object.assign({ fn: bridgeName }, _params);
        window.webkit.messageHandlers[this.nameSpace].postMessage(_params);
      } else {
        window[callbackKey](null, BRIDGE_NULL_ERROR);
      }
    });
  }

  getUserData(callback) {
    if (typeof callback === "function") {
      return this.bridge("getUserData", { callback: callback });
    }
    return this.bridge("getUserData");
  }
  getAppData(callback) {
    if (typeof callback === "function") {
      return this.bridge("getAppData", { callback: callback });
    }
    return this.bridge("getAppData");
  }
  gotoNative(path, callback) {
    if (typeof path === 'string' && callback) {
      return this.bridge("gotoNative", { path, callback });
    } else if (typeof path === 'string' && !callback) {
      return this.bridge("gotoNative", { path });
    }
    if (typeof path === "object") {
      return this.bridge("gotoNative", path);
    }
  }
  openWebview(url, callback) {
    if (typeof url === 'string' && callback) {
      return this.bridge("openWebview", { url, callback });
    } else if (typeof url === 'string' && !callback) {
      return this.bridge("openWebview", { url });
    }
    if (typeof url === "object") {
      return this.bridge("openWebview", url);
    }
  }
  setPage(data, callback) {
    if (typeof data === "string") {
      return this.bridge("setPage", { title: data });
    }
    if (data && data.menus) {
      if (Object.prototype.toString.call(data.menus) === "[object Array]") {
        return this.bridge("setPage", Object.assign(data, {callback: callback}));
      } else {
        return this.bridge("setPage", Object.assign(data, {
          menus: [data.menus],
          callback: callback
        }));
      }
    }
    return this.bridge("setPage", data);
  }
  login(callbackUrl) {
    if (callbackUrl) {
      return this.bridge("login", { callbackUrl });
    }
    return this.bridge("login");
  }
  activeWebview(callback) {
    if (typeof callback === "function") {
      return this.bridge("activeWebview", { callback });
    }
    console.error('jsBridge activeWebview callback is not function');
  }
  callPasswordBox(title, callback) {
    if (typeof title === 'string') {
      typeof callback === 'function' && this.bridge("callPasswordBox", { title, callback });
      typeof callback !== 'function' && this.bridge("callPasswordBox", { title });
      return;
    } else if (typeof title === "function") {
      return this.bridge("callPasswordBox", { callback: title });
    }
    if (!title && !callback) {
      return this.bridge("callPasswordBox", {});
    }
  }
  closeWebview() {
    return this.bridge("closeWebview");
  }
  appBack() {
    return this.bridge("appBack");
  }
  fullScreen(isFullScreen = true, callback) {
    return this.bridge("fullScreen", { isFullScreen, callback });
  }
}

export default new _JsBridge();
export const JsBridge = _JsBridge;
