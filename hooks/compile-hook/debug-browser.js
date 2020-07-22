/// 调试浏览器程序
var fs = require('fs');
const child_process = require('child_process');
var deleteFolder = require('./shared/hook-fs').deleteFolder;

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

// 编译cordova cordova build browser
console.log('*** 执行编译 cordova build browser ***');
child_process.execSync('cordova build browser', { stdio: [0, 1, 2] });

// 启动调试 ng run app:serve-ssr
console.log('*** 启动调试 ng run app:serve-ssr ***');
child_process.execSync('ng run app:serve-ssr', { stdio: [0, 1, 2] });


