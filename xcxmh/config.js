/**
 * 小程序配置文件
 */

var host = "localhost:56030"

var protocol = "http://";

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  protocol,

  mhCatalogUrl: protocol + host + '/api/index',

  imgUrl: protocol + host + '/api/GetMHDir',

  // 用code换取openId
  openIdUrl: protocol + host + '/openid',

  // 测试的信道服务接口
  tunnelUrl: protocol + host + '/tunnel',

  // 生成支付订单的接口
  paymentUrl: protocol + host + '/payment',

  // 发送模板消息接口
  templateMessageUrl: protocol + host + '/templateMessage',

  // 上传文件接口
  uploadFileUrl: protocol + host + '/upload',

  // 下载示例图片接口
  downloadExampleUrl: protocol + host + '/static/weapp.jpg'
};

module.exports = config
