import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  //  app.setBaseViewsDir(join(__dirname, '..', 'browser'));

  const options = new DocumentBuilder()
    .setTitle('ng-nest-admin-api')
    .setDescription('The ng-nest-admin-api description')
    .setVersion('1.0')
    .addTag('ng-nest-admin-api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync("./nswag/swagger.json", JSON.stringify(document));
  SwaggerModule.setup('swagger', app, document);

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

