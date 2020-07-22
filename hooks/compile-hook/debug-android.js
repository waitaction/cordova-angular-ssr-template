/// 调试浏览器程序

var fs = require('fs');
const child_process = require('child_process');
var deleteFolder = require('./shared/hook-fs').deleteFolder;

// 删除www文件 ， 创建www文件夹 ，拷贝index.html到www文件夹
console.log('*** 清理缓存 ***');
let www_folder = 'www';
if (fs.existsSync(www_folder)) {
    deleteFolder(www_folder);
}
fs.mkdirSync(www_folder);

try {
    var cdvResult = child_process.execSync('cordova platform').toString();
    if (/browser[\s\S]*Available/ig.test(cdvResult)) {
        console.log('*** 已经安装cordova-android ***');
    } else {
        console.log('*** 正在安装cordova-android ***');
        child_process.execSync('cordova platform add android', { stdio: [0, 1, 2] });
    }
} catch (error) {
    console.log(error);
}

// 编译angular ng build
console.log('*** 执行编译 ng run app:build ***');
child_process.execSync('ng run app:build', { stdio: [0, 1, 2] });

// 编译cordova run android --device --verbose
console.log('*** 启动调试 cordova run android ***');
try {
    child_process.execSync('cordova run android --device --verbose', { stdio: [0, 1, 2] });
} catch (error) {
    console.log('');
    console.info("\033[31m *** 运行失败，请查看错误描述信息 *** \033[0m");
    console.info("\033[31m *** 请确认你的安卓手机通过USB连接电脑，并已开启调试模式 *** \033[0m");
}



