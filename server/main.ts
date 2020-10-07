import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { environment } from 'src/environments/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const options = new DocumentBuilder().setTitle('api').setDescription('接口文档').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);

  if (!environment.production) {
    fs.writeFileSync("./nswag/swagger.json", JSON.stringify(document));
  }

  SwaggerModule.setup('swagger', app, document);
  setTimeout(() => {
    console.info(`*** 启动服务器：http://0.0.0.0:${process.env.PORT || 4000} ***`);
  }, 0);

  await app.listen(process.env.PORT || 4000);
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch(err => console.error(err));
}

