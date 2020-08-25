import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { NgxRequest, NgxResponse } from '@gorniv/ngx-universal';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Pool } from '@type/mariadb';


// 数据库初始
const mariadb = require("mariadb");
const dbPool: Pool = mariadb.createPool({
  host: process.env.mariadb_host, //数据库地址
  user: process.env.mariadb_user,//数据库帐号
  password: process.env.mariadb_password, //数据库密码
  connectionLimit: 5,
  database: process.env.mariadb_database //需要用环境变量代替
});



// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'www');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  let bodyParser = require('body-parser');/*post方法*/
  server.use(bodyParser.json());// 添加json解析
  server.use(bodyParser.urlencoded({ extended: false }));

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    req.cookies = req.headers.cookie;
    res.cookie("render_side", "server");
    res.render(indexHtml, {
      req,
      res,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        // for http and cookies
        {
          provide: REQUEST,
          useValue: req,
        },
        {
          provide: RESPONSE,
          useValue: res,
        },
        /// for cookie
        {
          provide: NgxRequest,
          useValue: req,
        },
        {
          provide: NgxResponse,
          useValue: res,
        },

      ]
    });
  });


  server.get('/server/*', serverHttp);
  server.post('/server/*', serverHttp);
  server.post('/database', databaseHttp);
  function serverHttp(req, res) {
    req.cookies = req.headers.cookie;
    res.render(indexHtml, {
      req,
      res,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        { provide: REQUEST, useValue: req, },
        { provide: RESPONSE, useValue: res, },
        { provide: NgxRequest, useValue: req, },
        { provide: NgxResponse, useValue: res, }
      ]
    }, (err: Error, html: string) => {
      res.type("application/json");
      res.send(getResponseJson(html));
    });
  }
  async function databaseHttp(req, res) {
    res.type("application/json");

    let para: { sql: string, values: Array<any> } = req.body;
    if (para == null) {
      res.send(JSON.stringify(""));
      return;
    }
    req.cookies = req.headers.cookie;
    // 操作数据库的代码
    let connection = await dbPool.getConnection();
    let result = await connection.query(para.sql, para.values);
    connection.release();
    // 返回结果
    res.send(JSON.stringify(result));


  }

  return server;
}
function getResponseJson(html: string): string {
  // 正则取app-root的文本
  let appRoot = "";
  let result = html.match(/<app-root[\s\S]*<\/app-root>/ig);
  if (result != null && result.length > 0) {
    appRoot = result[0];
    let root1 = appRoot.match(/<app-root.*?>/ig);
    if (root1 != null && root1.length > 0) {
      let text = appRoot.replace(/<.*?>/ig, "");
      if (text.trim() == "") {
        return "\"\"";
      }
      return text.trim();
    } else {
      return JSON.stringify({});
    }
  } else {
    return JSON.stringify({});
  }
}

function run() {
  const port = process.env.PORT || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
