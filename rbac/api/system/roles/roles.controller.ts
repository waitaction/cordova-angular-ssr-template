import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { Role } from 'entities/role.entity';
import { RolesService } from './roles.service';
import { Action } from 'entities/action.entity';
import { AuthGuard } from '@nestjs/passport';
import { XControllerService, XIdType, XQuery } from 'rbac/api/core';

@Controller('rbac/roles')
@UseGuards(AuthGuard('jwt'))
export class RolesController extends XControllerService<Role, XQuery> {
  constructor(public rolesService: RolesService) {
    super(rolesService);
  }

  @Get('actions/:id/:menuId')
  async getActions(@Param('id') id: XIdType, @Param('menuId') menuId: XIdType): Promise<Action[]> {
    return await this.rolesService.getActions(id, menuId);
  }

  @Put('actions/:id/:menuId')
  async putActions(@Param('id') id: XIdType, @Param('menuId') menuId: XIdType, @Body('actions') actions: Action[]): Promise<Action[]> {
    return await this.rolesService.putActions(id, menuId, actions);
  }
}
