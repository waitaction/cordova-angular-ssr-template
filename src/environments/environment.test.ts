//测试环境的配置，一经配置，就不要去改动
export const environment = {
  production: false,
 
  // Api请求地址
  api: '/api/',
  baseUrl: 'http://192.168.0.123:9000',// baseUrl最未尾的字符不带斜杠，angular客户端通过域名访问接口
  universalBaseUrl: 'http://192.168.0.123:9000'// universalBaseUrl最未尾的字符不带斜杠，angular服务端通过内网访问接口，以避免被服务器认为是ddos攻击
};
