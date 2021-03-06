/**
 * 小程序配置文件
 */

var host = "www.tzslxd.com"

var protocol = "https://";

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  protocol,

  // 漫画目录 目前就一个漫画暂时没用
  mhCatalogUrl: protocol + host + '/api/index',

  // 根据漫画id查询所有满章节
  imgListUrl: protocol + host + '/api/GetMHDir',

  // 根据漫画id查询漫画基本信息
  mhInfoUrl: protocol + host + '/api/GetInfo',

  // 根据漫画id和章节id查询章节详情
  imgInfolUrl: protocol + host + '/api/GetImgInfo',
  
  // 第一次加载2张图片
  imgInfolUrl2: protocol + host + '/api/GetImgInfo2',

  // 生成支付订单的接口
  paymentUrl: protocol + host + '/payment',

  // 发送模板消息接口
  templateMessageUrl: protocol + host + '/templateMessage'

};

module.exports = config
