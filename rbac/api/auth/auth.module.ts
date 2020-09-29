import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'entities/user.entity';
import { Menu } from 'entities/menu.entity';
import { Action } from 'entities/action.entity';
import { Role } from 'entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Menu, Action])],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
