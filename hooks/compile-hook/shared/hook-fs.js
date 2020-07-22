var fs = require('fs');

/**
 * 删除文件夹
 * @param {string} path 路径
 */
function deleteFolder(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
/**
 * 拷贝文件夹
 * @param {string} src 源目录路径
 * @param {string} dst 目标目录路径
 */
function copyFolder(src, dst) {
    let paths = fs.readdirSync(src); //同步读取当前目录
    for (let index = 0; index < paths.length; index++) {
        const path = paths[index];
        let _src = src + '/' + path;
        let _dst = dst + '/' + path;
        //stats  该对象 包含文件属性
        var stats = fs.statSync(_src);
        if (stats.isFile()) { //如果是个文件则拷贝 
            copyFile(_src,_dst);
        } else if (stats.isDirectory()) {
            //是目录则 递归 
            if (!fs.existsSync(_dst)) {
                fs.mkdirSync(_dst);
            }
            copyFolder(_src, _dst);
        }
    }
}

/**
 * 检查是否是目录，如果是则回调
 * @param {string} src 源目录路径
 * @param {string} dst 目标目录路径
 * @param {string} callback 回调
 */
function checkDirectorySync(src, dst, callback) {
    try {
        fs.accessSync(dst, fs.constants.F_OK);
        callback(src, dst);
    } catch (error) {
        fs.mkdirSync(dst);
        callback(src, dst);
    }

}

/**
 * 复制单个文件
 * @param {string} sourceFile 源文件路径
 * @param {string} targetFile 目标文件路径
 */
function copyFile(sourceFile, targetFile) {
    //stats  该对象 包含文件属性
    var stats = fs.statSync(sourceFile);
    if (stats.isFile()) { //如果是个文件则拷贝 
        // let readable = fs.createReadStream(sourceFile);//创建读取流
        // let writable = fs.createWriteStream(targetFile);//创建写入流
        // readable.pipe(writable);
        fs.copyFileSync(sourceFile,targetFile);
    }
}
function dateFormat(time, format) {
    var t = new Date(time);
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
};
module.exports = {
    copyFile,
    checkDirectorySync,
    copyFolder,
    deleteFolder,
    dateFormat
}