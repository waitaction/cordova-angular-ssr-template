import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/app/browser')
    }),
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   host: "",
    //   port: 3306,
    //   username: "root",
    //   password: "",
    //   database: "",
    //   // entities: ["server/**/*.entity{.ts,.js}"],
    //   synchronize: false,
    //   logging: ["query", "error"]
    // })
  ],
  controllers: [CatsController]
})
export class AppModule { }
