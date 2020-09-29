import { Controller, UseGuards } from '@nestjs/common';
import { Menu } from 'entities/menu.entity';
import { MenusService } from './menus.service';
import { AuthGuard } from '@nestjs/passport';
import { XControllerService, XQuery } from 'rbac/api/core';

@Controller('rbac/menus')
@UseGuards(AuthGuard('jwt'))
export class MenusController extends XControllerService<Menu, XQuery> {
  constructor(private readonly menusService: MenusService) {
    super(menusService);
  }
}
