/// 调试浏览器程序

var fs = require('fs');
const child_process = require('child_process');
var deleteFolder = require('./shared/hook-fs').deleteFolder;
var copyFile = require('./shared/hook-fs').copyFile;
var dateFormat = require('./shared/hook-fs').dateFormat;

// 删除www文件 ， 创建www文件夹 ，拷贝index.html到www文件夹
console.log('*** 清理缓存 ***');
let www_folder = 'ios';
if (fs.existsSync(www_folder)) {
    deleteFolder(www_folder);
}
fs.mkdirSync(www_folder);
copyFile("src/index.html", "www/index.html");

try {
    var cdvResult = child_process.execSync('cordova platform').toString();
    if (/browser[\s\S]*Available/ig.test(cdvResult)) {
        console.log('*** 已经安装cordova-ios ***');
    } else {
        console.log('*** 正在安装cordova-ios ***');
        child_process.execSync('cordova platform add ios', { stdio: [0, 1, 2] });
    }
} catch (error) {
    console.log(error);
}

// 编译angular ng build
console.log('*** 编译iOS ng build --prod ***');
child_process.execSync('ng build --prod', { stdio: [0, 1, 2] });

// 编译cordova build ios --release --buildConfig
console.log('*** 编译ios cordova build ios --release --buildConfig ***');
try {
    child_process.execSync('cordova build ios --release --buildConfig --verbose', { stdio: [0, 1, 2] });
    // 拷贝编译后的apk到dist文件夹
    let dist_folder = 'dist';
    let dist_folder_ios = 'dist/ios';
    if (!fs.existsSync(dist_folder)) {
        fs.mkdirSync(dist_folder);
    }
    if (fs.existsSync(dist_folder_ios)) {
        deleteFolder(dist_folder_ios);
    }
    fs.mkdirSync(dist_folder_ios);
    copyFile('platforms/ios/app/build/outputs/apk/release/app-release.apk', dist_folder_ios + `/app-release-${dateFormat(new Date().getTime(), "yyyyMMddHHmm")}.apk`);
} catch (error) {
    console.log('');
    console.info("\033[31m *** 编译失败，请查看错误描述信息 *** \033[0m");
}


