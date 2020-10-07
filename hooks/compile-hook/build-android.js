/// 编译安卓程序

var fs = require('fs');
const child_process = require('child_process');
var deleteFolder = require('./shared/hook-fs').deleteFolder;
var copyFile = require('./shared/hook-fs').copyFile;
var dateFormat = require('./shared/hook-fs').dateFormat;

// 删除www文件 ， 创建www文件夹
console.log('*** 清理缓存 ***');
let www_folder = 'www';
if (fs.existsSync(www_folder)) {
    deleteFolder(www_folder);
}
fs.mkdirSync(www_folder);

try {
    var cdvResult = child_process.execSync('cordova platform').toString();
    if (/android[\s\S]*Available/ig.test(cdvResult)) {
        console.log('*** 已经安装cordova-android ***');
    } else {
        console.log('*** 正在安装cordova-android ***');
        child_process.execSync('cordova platform add android', { stdio: [0, 1, 2] });
    }
} catch (error) {
    console.log(error);
}

// 编译angular ng build
console.log('*** 编译Angular ng run app:build:production ***');
child_process.execSync('ng run app:build:production  --output-path=www', { stdio: [0, 1, 2] });
// 编译cordova build android --release --buildConfig
console.log('*** 编译APk cordova build android --release --buildConfig ***');
try {
    child_process.execSync('cordova build android --release --buildConfig --verbose', { stdio: [0, 1, 2] });
    // 拷贝编译后的apk到dist文件夹
    let dist_folder = 'dist';
    let dist_folder_android = 'dist/android';
    if (!fs.existsSync(dist_folder)) {
        fs.mkdirSync(dist_folder);
    }
    if (fs.existsSync(dist_folder_android)) {
        deleteFolder(dist_folder_android);
    }
    fs.mkdirSync(dist_folder_android);
    copyFile('platforms/android/app/build/outputs/apk/release/app-release.apk', dist_folder_android + `/app-release-${dateFormat(new Date().getTime(), "yyyyMMddHHmm")}.apk`);
} catch (error) {
    console.log(error);
    console.info("\033[31m *** 编译失败，请查看错误描述信息 *** \033[0m");
}


