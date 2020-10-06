import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { AuthModule } from 'admin/api/auth/auth.module';
import { CatsController } from './cats/cats.controller';
import { SystemModule } from 'admin/api/system/system.module';
import { Action } from 'entities/action.entity';
import { Menu } from 'entities/menu.entity';
import { Organization } from 'entities/organization.entity';
import { Role } from 'entities/role.entity';
import { User } from 'entities/user.entity';
import { AngularUniversalModule } from '@waitaction/nestjs-ng-universal/dist/angular-universal.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/app/browser'),
      useEjsEngine: true, // 标记为使用ejs引擎，不在服务端渲染
      extraProviders: []
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456abc",
      database: "demo-ssr",
      entities: [Action, Menu, Organization, Role, User],
      synchronize: true,
      logging: ["query", "error"]
    }),
    SystemModule,
    AuthModule
  ],
  controllers: [CatsController]
})
export class AppModule {

}
