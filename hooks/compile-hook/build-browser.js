/// 编译浏览器程序
var fs = require('fs');
const child_process = require('child_process');
var deleteFolder = require('./shared/hook-fs').deleteFolder;
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

console.log('*** 执行编译生产环境 ng run app:build:production && ng run app:server:production ***');

if (fs.existsSync(www_folder)) {
  deleteFolder(www_folder);
}
child_process.execSync('ng run app:build:production && ng run app:server:production', { stdio: [0, 1, 2] });

console.log('*** 正在拷贝 www 到 dist 文件夹 ***');

let dist_folder = 'dist';
let dist_folder_browser = 'dist/www';
if (!fs.existsSync(dist_folder)) {
  fs.mkdirSync(dist_folder);
}

if (fs.existsSync(dist_folder_browser)) {
  deleteFolder(dist_folder_browser);
}

if (!fs.existsSync(dist_folder_browser)) {
  fs.mkdirSync(dist_folder_browser);
}

copyFolder('www', dist_folder_browser);
console.log('*** 已拷贝到 dist 文件夹 ***');

console.info("\033[33m *** 浏览器版本需运行在node环境的http服务器 *** \033[0m");
console.info("\033[33m *** 运行网站 node ./www/server/main.js *** \033[0m");
