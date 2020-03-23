# NTBridge

## 基本调用
> 以 getBaseUsetData 为例，BridgeName 为：getBaseUsetData


```js
// 定义 Bridge 回调函数
window.getUserDataCallback = function (res, err) {
  // 业务逻辑
};
const _params = {
  callbackKey : "getUserDataCallback"
  ...其他参数
};

// 安卓调用
window.NTBridge.getBaseUsetData(JSON.stringify(_params));

// IOS调用
_params.fn = "getBaseUsetData"
window.webkit.messageHandlers.NTBridge.postMessage(_params);

```
## 环境判断
```js

const isIosApp = !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.NTBridge && window.webkit.messageHandlers.NTBridge.postMessage);

const isAndroidApp = !!(window.NTBridge && typeof window.NTBridge.isNTApp);

const isNTApp = isIosApp || isAndroidApp;

```
---
## getBaseUsetData
> 获取用户信息

### 返回信息

key | 类型 |说明 |
:-|:-|:-
mobile | String | 手机号 |
nodeType | String | 节点类型：0 临时节点，2标准节点，3主节点 |

---
## getAppData
> 获取设备信息
### 返回信息

key | 类型 |说明 |
:-|:-|:-
appVersion | String | APP版本 |
brand | String | 品牌 |
sysVersion | String | 系统版本 |
deviceId | String | 设备id |
---
## gotoNative
> 打开原生页面

### 参数
key | 类型 |说明 |
:-|:-|:-
path | String | 原生path |

### 原生Path
path | 参数 |说明 |
:-|:-|:-
home_personal | N/A | 个人主页 |

---
## openWebview
> 打开一个新的Webview
### 参数
key | 类型 |说明 |
:-|:-|:-
url | String | 打开webview的url地址 |
---
## setPage
> 设置页面属性
### 参数
key | 类型 | 说明 |
:-|:-|:-
title | String | 标题 |
isPullRefresh | Boolean | 是否下拉刷新
bgColor | String | header背景颜色：#999999
color | String | header文字颜色：#333333
hasHead | Boolean | 是否显示header
menus | Array | 自定义右上角相关图标
menus[text] | String | 右上角图标文字
menus[color] | String | 右上角图标文字颜色：#999999
menus[icon] | String  | 右上角图sha标图片地址
menus[key] | String | 右上角图标图片索引
callbackKey ｜ String ｜ app回调时调用的方法名


> 自定义右上角图标【menus】
- PS：只支持以纯文字或纯图片的方式自定义右上角图标；权重 text > icon
- icon传递图片参数时，图片文件名建议以name@2x形式命名（带上@2x）
- menus暂时只支持单个图标

---
## login
> 登录
### 参数
key | 类型 | 说明 |
:-|:-|:-
callbackUrl | String | 登录成功后跳转地址 |
---
## activeWebview
> 从后台切回app触发。无其他参数，在事件触发时，会执行回调函数
---
## closeWebview
> 关闭自身webview
---
## appBack
> 触发原生返回
---
