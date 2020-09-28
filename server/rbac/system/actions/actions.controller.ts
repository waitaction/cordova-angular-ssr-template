import { Controller, UseGuards } from '@nestjs/common';
import { Action } from './entities/action.entity';
import { ActionsService } from './actions.service';
import { AuthGuard } from '@nestjs/passport';
import { XControllerService, XQuery } from 'server/rbac/core';

@Controller('actions')
@UseGuards(AuthGuard('jwt'))
export class ActionsController extends XControllerService<Action, XQuery> {
  constructor(private readonly entityService: ActionsService) {
    super(entityService);
  }
}
