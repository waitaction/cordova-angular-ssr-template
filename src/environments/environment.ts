//这个是调试用的，配置由调试时决定，正常是开发环境或测试环境的配置，线上环境的配置慎用
export const environment = {
  production: false,
  baseUrl: 'http://192.168.0.123:9000',// baseUrl最未尾的字符不带斜杠，angular客户端通过域名访问接口
  universalBaseUrl: 'http://192.168.0.123:9000'// universalBaseUrl最未尾的字符不带斜杠，angular服务端通过内网访问接口，以避免被服务器认为是ddos攻击
};


