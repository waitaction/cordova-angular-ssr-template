import { Controller, UseGuards } from '@nestjs/common';
import { Menu } from 'entities/menu.entity';
import { MenusService } from './menus.service';
import { AuthGuard } from '@nestjs/passport';
import { XControllerService, XQuery } from 'admin/api/core';

@Controller('admin/menus')
@UseGuards(AuthGuard('jwt'))
export class MenusController extends XControllerService<Menu, XQuery> {
  constructor(private readonly menusService: MenusService) {
    super(menusService);
  }
}
