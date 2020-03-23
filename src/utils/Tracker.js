// 阿里日志服务  aliyun Log service
import md5 from 'md5';
let type = 'logs-web';
export class Tracker {
  constructor(host, project, logstore) {
    this.uri =
      '//' +
      project +
      '.' +
      host +
      '/logstores/' +
      logstore +
      '/track?APIVersion=0.6.0';
    this.params = {};
    this.dna = md5(navigator.userAgent + +new Date() + '' + Math.random() * 999999999);
  }
  push(key, value) {
    if (!key || !value) {
      return false;
    }
    this.params[key] = value;
  }
  logger() {
    let queryString = '&';
    const _params = {
      dna: this.dna
    };
    // let eventAction = '';
    Object.keys(this.params).forEach(key => {
      // if (key === 'clickBit') {
      //   eventAction = encodeURIComponent(this.params[key]);
      // }
      // if (key === 'type' && this.params[key] === 'error') {
      //   eventAction = this.params[key];
      // }
      // if (key === 'type' && this.params[key] === 'PageLoad') {
      //   eventAction = this.params['currentPage'];
      // }
      _params[key] = encodeURIComponent(this.params[key]);
    });
    queryString += `content=${JSON.stringify(_params)}`;
    let image = new Image();
    image.src = this.uri + queryString;
  }
}


export const TrackerConfig = [
  'cn-beijing.log.aliyuncs.com',//服务域名
  type,// Project name
  'nt_webapp' //Logstore name
];