import { Controller, UseGuards } from '@nestjs/common';
import { User } from 'entities/user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { XControllerService, XQuery } from 'admin/api/core';

@Controller('admin/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController extends XControllerService<User, XQuery> {
  constructor(public readonly usersService: UsersService) {
    super(usersService);
  }
}
