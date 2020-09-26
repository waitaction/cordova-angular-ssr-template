import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { AuthModule } from './rbac/auth/auth.module';
import { CatsController } from './cats/cats.controller';
import { SystemModule } from './rbac/system/system.module';
import { Action } from './rbac/system/actions/entities/action.entity';
import { Menu } from './rbac/system/menus/entities/menu.entity';
import { Organization } from './rbac/system/organization/entities/organization.entity';
import { Role } from './rbac/system/roles/entities/role.entity';
import { User } from './rbac/system/users/entities/user.entity';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/app/browser'),
      extraProviders: [

      ]
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456abc",
      database: "demo-ssr",
      entities: [
        Action,
        Menu,
        Organization,
        Role,
        User
      ],
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