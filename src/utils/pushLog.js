import {
    local_storage, remove_local_storage_item
  } from './localStorage';
  // import { isNTApp } from "libs/bridge/ntBridge";
  import { Tracker, TrackerConfig } from './Tracker.js';
  import md5 from 'md5';
  // import loginData from "libs/loginData";
  
  
  const Cookie_did = 'Tracker_did';
  let _did = local_storage(Cookie_did);
  
  
  if (!_did) {
    _did = md5(navigator.userAgent + +new Date());
    local_storage(Cookie_did, _did);
  }
  
  export const createTracker = function () {
    const tracker = new Tracker(...TrackerConfig);
    // tracker.params = {
    //   host: window.location.host,
    //   currentPage: window.location.href,
    //   pathname: window.location.pathname,
    //   userId: loginData.userId,
    //   mobile: loginData.mobile,
    //   nodeType: loginData.nodeType,
    //   authToken: loginData.Auth_Token,
    //   did: _did,
    //   isNTApp
    // };
    return tracker;
  };
  
  /**
   *
   * @param {*} data
   */
  export const push_log = (data = {}) => {
    if (window.location.hostname !== 'ntapp.goschainccap.com') {
      return;
    }
    const tracker = createTracker();
    const { uid, clickBit, pageFrom, pageTo, type, deviceId } = data;
    tracker.push('clickBit', clickBit || '');
    tracker.push('pageFrom', pageFrom || window.location.href);
    tracker.push('pageTo', pageTo || '');
    tracker.push('type', type || 'click');
    for (let i in data) {
      tracker.push(i, data[i]);
    }
    tracker.logger();
  };
  