
var fs = require('fs');
const child_process = require('child_process');

child_process.execSync('npm run nswag');

var apiClientPath = "src/app/core/client/api-client.ts";
var apiClientTs = fs.readFileSync(apiClientPath, 'utf8');
apiClientTs = apiClientTs.replace("'@angular/common/http';", "'@angular/common/http';\nimport { BaseApiClient, blobToText } from './base-api-client';");
apiClientTs = apiClientTs.replace(/function blobToText([\s\S]*?)$/ig, '')
fs.writeFileSync(apiClientPath, apiClientTs);
console.info("\033[33m *** 生成nswag代理类完成 *** \033[0m");
console.info("\033[33m *** 代理类路径：src/app/core/client/api-client.ts *** \033[0m")
