const child_process = require('child_process');

console.log('*** 安装npm包 ***');
child_process.execSync('npm install', { stdio: [0, 1, 2] });
child_process.execSync('npm run build:browser', { stdio: [0, 1, 2] });
child_process.execSync('npm run build:android', { stdio: [0, 1, 2] });
//child_process.execSync('npm run build:ios', { stdio: [0, 1, 2] });
