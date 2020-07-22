/// 编译浏览器程序

var fs = require('fs');
const child_process = require('child_process');
var deleteFolder = require('./shared/hook-fs').deleteFolder;
var copyFile = require('./shared/hook-fs').copyFile;
var copyFolder = require('./shared/hook-fs').copyFolder;

// 删除www文件 ， 创建www文件夹
console.log('*** 清理缓存 ***');
let www_folder = 'www';
if (fs.existsSync(www_folder)) {
  deleteFolder(www_folder);
}
fs.mkdirSync(www_folder);
try {
  var cdvResult = child_process.execSync('cordova platform').toString();
  if (/browser[\s\S]*Available/ig.test(cdvResult)) {
    console.log('*** 已经安装cordova-browser ***');
  } else {
    console.log('*** 正在安装cordova-browser ***');
    child_process.execSync('cordova platform add browser', { stdio: [0, 1, 2] });
  }
} catch (error) {
  console.log(error);
}

console.log('*** 执行编译 cordova build browser --release ***');
child_process.execSync('cordova build browser --release --verbose', { stdio: [0, 1, 2] });

// 编译angular开发
console.log('*** 执行编译开发环境 ng run app:build:dev && ng run app:server:dev ***');
if (fs.existsSync(www_folder)) {
  deleteFolder(www_folder);
}
child_process.execSync('ng run app:build:dev && ng run app:server:dev', { stdio: [0, 1, 2] });
copyToDistDir();
copyToPublish("dev");

// 编译angular测试
console.log('*** 执行编译测试环境 ng run app:build:test && ng run app:server:test ***');
if (fs.existsSync(www_folder)) {
  deleteFolder(www_folder);
}
child_process.execSync('ng run app:build:test && ng run app:server:test', { stdio: [0, 1, 2] });
copyToDistDir();
copyToPublish("test");

// 编译angular线上
console.log('*** 执行编译线上环境 ng run app:build:production && ng run app:server:production ***');
if (fs.existsSync(www_folder)) {
  deleteFolder(www_folder);
}
child_process.execSync('ng run app:build:production && ng run app:server:production', { stdio: [0, 1, 2] });
copyToDistDir();
copyToPublish("online");

/**把www文件夹拷贝和整理到dist文件夹 */
function copyToDistDir() {
  console.log('*** 正在拷贝 www 到 dist/browser 文件夹 ***');

  let dist_folder = 'dist';
  let dist_folder_browser = 'dist/www';
  if (fs.existsSync(dist_folder)) {
    deleteFolder(dist_folder);
  }

  if (fs.existsSync(dist_folder_browser + "/browser")) {
    deleteFolder(dist_folder_browser + "/browser");
  }
  if (fs.existsSync(dist_folder_browser)) {
    deleteFolder(dist_folder_browser);
  }
  fs.mkdirSync(dist_folder);
  fs.mkdirSync(dist_folder_browser);
  fs.mkdirSync(dist_folder_browser + "/browser");
  copyFolder('www', dist_folder_browser + "/browser");
  console.log('*** 已拷贝到 dist/browser 文件夹 ***');
  copyFile('www/server/main.js', dist_folder_browser + "/server.js");
  copyFile('config.xml', dist_folder_browser + "/config.xml");

  fs.writeFileSync(dist_folder_browser + "/package.json",
    `
{
  "name": "cordova-angular-ssr-template",
  "version": "1.0.0",
  "author": "QiJing Chen",
  "homepage": "http://www.angular.cn/",
  "scripts": {
  },
  "private": true,
  "dependencies": {
  },
  "devDependencies": {
  },
  "description": "还没有描述"
}`);


  //写入IIS配置文件
  fs.writeFileSync('dist/www/web.config', `<configuration>
<system.webServer>
  <handlers>
    <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
  </handlers>
  <rewrite>
    <rules>
      <rule name="myapp">
        <match url="/*" />
        <action type="Rewrite" url="server.js" />
      </rule>
    </rules>
  </rewrite>
  <security>
    <requestFiltering>
      <hiddenSegments>
        <add segment="node_modules" />
      </hiddenSegments>
    </requestFiltering>
  </security>
</system.webServer>
</configuration>`);
}
/**把dist文件夹拷贝到publish指定的预发布文件夹 */
function copyToPublish(env) {
  console.log('*** 正在拷贝 dist 到 publish/' + env + ' 文件夹 ***');

  let publish = 'publish';
  let publish_env = 'publish/' + env;
  if (!fs.existsSync(publish)) {
    fs.mkdirSync(publish);
  }
  if (fs.existsSync(publish_env)) {
    deleteFolder(publish_env);
  }
  fs.mkdirSync(publish_env);
  copyFolder('dist',publish_env);
}

console.log('');
console.info("\033[33m *** 浏览器版本使用服务端渲染提升首页加载性能，需运行在node环境 *** \033[0m");
console.info("\033[33m *** 运行网站 node server.js *** \033[0m");
console.info("\033[33m *** 如需部署到iis，需安装iisnode模块 *** \033[0m");
