var copyFolder = require('./shared/hook-fs').copyFolder;
// 读取参数
var targetDirPath = null;
var sourceDirPath = null;

if (process.argv != null && process.argv.length > 0) {
    sourceDirPath = process.argv.find(m => m.indexOf('source') == 0);
    targetDirPath = process.argv.find(m => m.indexOf('target') == 0);
}
if (sourceDirPath != null) {
    sourceDirPath = sourceDirPath.replace("source=", "");
}
if (targetDirPath != null) {
    targetDirPath = targetDirPath.replace("target=", "");
}

console.log("*** 复制目录 ***")
copyFolder(sourceDirPath, targetDirPath);
console.log("*** 复制完成 ***")