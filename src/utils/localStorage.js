const _is_local_storage = !!window.window.localStorage;
let _data_local_dom; let _dataLocalDom_name = window.location.hostname || 'localUserData';
if (!_is_local_storage) {
  try {
    _data_local_dom = document.createElement('input');
    _data_local_dom.type = 'hidden';
    _data_local_dom.style.display = 'none';
    _data_local_dom.addBehavior('#default#userData'); // userData的语法
    document.body.appendChild(_data_local_dom);
    _data_local_dom.expires = new Date().toUTCString(); // 设定过期时间
    // 加载userdata
    _data_local_dom.load(_dataLocalDom_name);
  } catch (e) {
    _data_local_dom = null;
    console.log('userData初始化失败！');
  }
}
export const local_storage = (key, value) => {
  var _return_value;
  if (_is_local_storage) {
    if (typeof value !== 'undefined') {
      window.localStorage.setItem(encodeURIComponent(key), encodeURIComponent(value));
    } else {
      _return_value = window.localStorage.getItem(encodeURIComponent(key));
      return _return_value ? decodeURIComponent(_return_value) : null;
    }
  } else if (_data_local_dom) {
    if (typeof value !== 'undefined') {
      _data_local_dom.setAttribute(key, value);
      _data_local_dom.save(_dataLocalDom_name);
    } else {
      _return_value = _data_local_dom.getAttribute(key);
      return _return_value ? decodeURIComponent(_return_value) : null;
    }
  }
};
export const remove_local_storage_item = (key) => {
  if (_is_local_storage) {
    window.localStorage.removeItem(encodeURIComponent(key));
  } else if (_data_local_dom) {
    _data_local_dom.removeAttribute(encodeURIComponent(key));
    _data_local_dom.save(_dataLocalDom_name);
  }
};
export const clear_local_storage = () => {
  if (_is_local_storage) {
    window.localStorage.clear();
  } else {
    _data_local_dom.remove();
  }
};
