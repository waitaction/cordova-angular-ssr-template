/// 调试浏览器程序

var fs = require('fs');
const child_process = require('child_process');
var deleteFolder = require('./shared/hook-fs').deleteFolder;
var copyFile = require('./shared/hook-fs').copyFile;
var dateFormat = require('./shared/hook-fs').dateFormat;

// 删除www文件 ， 创建www文件夹 ，拷贝index.html到www文件夹
console.log('*** 清理缓存 ***');
let www_folder = 'www';
if (fs.existsSync(www_folder)) {
    deleteFolder(www_folder);
}
fs.mkdirSync(www_folder);
copyFile("src/index.html", "www/index.html");

try {
    var cdvResult = child_process.execSync('cordova platform').toString();
    if (/electron[\s\S]*Available/ig.test(cdvResult)) {
        console.log('*** 已经安装electron ***');
    } else {
        console.log('*** 正在安装electron ***');
        child_process.execSync('cordova platform add electron', { stdio: [0, 1, 2] });
    }
} catch (error) {
    console.log(error);
}

// 编译angular ng build
console.log('*** 编译electron ng run app:build:production  --output-path=www ***');
child_process.execSync('ng run app:build:production  --output-path=www', { stdio: [0, 1, 2] });

// 编译cordova
console.log('*** 编译electron cordova build electron --release --buildConfig ***');
try {
    child_process.execSync('cordova build electron --release --buildConfig --verbose', { stdio: [0, 1, 2] });
    // 拷贝编译后的apk到dist文件夹
    let dist_folder = 'dist';
    let dist_folder_ios = 'dist/electron';
    if (!fs.existsSync(dist_folder)) {
        fs.mkdirSync(dist_folder);
    }
    if (fs.existsSync(dist_folder_ios)) {
        deleteFolder(dist_folder_ios);
    }
    fs.mkdirSync(dist_folder_ios);
    
} catch (error) {
    console.log('');
    console.info("\033[31m *** 编译失败，请查看错误描述信息 *** \033[0m");
}


